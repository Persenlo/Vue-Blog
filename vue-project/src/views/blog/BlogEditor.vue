<template>
    <div class=" md:inset-x-40 md:inset-y-6 flex items-center justify-center">
        <div class=" bg-white-bg md:rounded-xl select-none overflow-hidden flex flex-col backdrop-blur-md"
            style="width: 100%; height: 100%; max-width: 1250px;">

            <!-- 顶部栏 -->
            <div class=" flex justify-center items-center py-2 px-1 gap-x-2 brightness-90 bg-no-repeat bg-cover"
                :style="{ backgroundImage: `url(${postData.postCover})` }">
                <!-- 返回 -->
                <MainItem class=" self-start hover:bg-white-hover mr-3" @click="router.go(-1)">
                    <LeftOutlined class="icon text-black"></LeftOutlined>

                </MainItem>

                <div class=" flex-grow"></div>

                <div class=" grid grid-cols-3 gap-2 md:flex">
                    <MainItem v-if="editMode" @click="startDeletePost()">
                        删除文章
                    </MainItem>

                    <MainItem @click="modifyCoverShow = true">
                        文章封面
                    </MainItem>

                    <MainItem @click="showCategory()">
                        分类
                    </MainItem>

                    <MainItem v-if="store.userPermission >= 6" @click="">
                        置顶
                        <a-switch size="small" v-model:checked="postData.postTop"
                            :class="[postData.postTop == '1' ? 'bg-blue' : 'bg-white-bg']" checkedValue="1"
                            unCheckedValue="0" />
                    </MainItem>

                    <MainItem v-if="store.userPermission >= 6" @click="startPostPost()">
                        发布文章
                    </MainItem>
                </div>
            </div>

            <div class=" rounded-lg overflow-hidden" style="min-height: 100%;">
                <Toolbar style="" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" class=" bg-white " />
                <div class=" bg-white" style="width: 100%; height: 50px;">
                    <a-input v-model:value="postData.postTitle" placeholder="请输入标题"
                        class=" px-3 text-xl font-bold border-none focus:border-none bg-alpha"
                        style="width: 100%; height: 50px;" />
                </div>
                <Editor style=" overflow-y: hidden;" v-model="postData.postHtml" :defaultConfig="editorConfig" :mode="mode"
                    class=" bg-white" @onCreated="handleCreated">
                </Editor>
            </div>

        </div>


        <!-- 修改封面 -->
        <a-modal v-model:visible="modifyCoverShow" centered="true">
            <p class=" font-bold text-xl">编辑封面</p>
            <div class="flex flex-col justify-center items-center pt-10">
                <VueCropper style="width: 256px; height: 256px;" ref="cropper" autoCrop="true" :fixed="false"
                    :centerBox="true" :img="imgPreview" :outputSize="1" :enlarge="2.5" :outputType="png">
                </VueCropper>
                <a-button type="primary" @click="callInput()" class=" bg-blue  " style="width: 256px">选择图片</a-button>
                <!-- 隐藏上传按钮，通过方法调用上传功能 -->
                <input type="file" id="icon-upload" class=" hidden" accept="image/*" @change="getPicture($event)" />
                <a-button type="primary" @click="startUploadIcon()" class=" bg-blue rounded-md mt-5"
                    :disabled="imgPreview == ''">确认</a-button>
            </div>
        </a-modal>
        <!-- 编辑分类 -->
        <a-modal v-model:visible="modifyCategoryShow" centered="true">
            <p class=" font-bold text-xl">编辑分类</p>
            <div class=" flex flex-col pt-10 h-72 overflow-x-scroll gap-y-3">
                <div v-for="item in categoryDatas" @click="currentCategory = item"
                    :class="[item.categoryId == currentCategory?.categoryId ? 'border-blue' : 'border-black-border']"
                    class=" transition-all duration-300 flex flex-row justify-between items-center w-full px-3 py-3 border-2 rounded-lg hover:border-blue">
                    <p>{{ item.categoryName }}</p>
                    <div class=" flex gap-x-2">
                        <!-- 重命名 -->
                        <a-button @click="renameCategoryShow = true; changeCategoryData = item">
                            <template #icon>
                                <EditOutlined />
                            </template>
                        </a-button>
                        <!-- 删除确认弹窗 -->
                        <a-popconfirm title="确定要删除该分类吗" ok-text="删除" cancel-text="取消" ok-type="danger"
                            @confirm="startDeleteCategory(item.categoryId)" @cancel="cancel">
                            <a-button>
                                <template #icon>
                                    <DeleteOutlined />
                                </template>
                            </a-button>
                        </a-popconfirm>
                    </div>
                </div>
            </div>
            <a-button @click="createCategoryShow = true"><template #icon>
                    <PlusOutlined />
                </template></a-button>
        </a-modal>
        <!-- 创建分类 -->
        <a-modal v-model:visible="createCategoryShow" centered="true">
            <p class=" font-bold text-xl">创建分类</p>
            <div class=" flex flex-col pt-10 overflow-x-scroll gap-y-3">
                <a-input-group compact class="w-full">
                    <a-input v-model:value="createCategoryData.categoryName" style="width: calc(100% - 72px)" />
                    <a-button @click="createCategory()">确定</a-button>
                </a-input-group>
            </div>
        </a-modal>
        <!-- 重命名分类 -->
        <a-modal v-model:visible="renameCategoryShow" centered="true">
            <p class=" font-bold text-xl">重命名分类</p>
            <div class=" flex flex-col pt-10 overflow-x-scroll gap-y-3">
                <a-input-group compact class="w-full">
                    <a-input v-model:value="changeCategoryData.categoryName" style="width: calc(100% - 72px)" />
                    <a-button @click="renameCategory()">确定</a-button>
                </a-input-group>
            </div>
        </a-modal>


    </div>
</template>

<script setup>

import 'vue-cropper/dist/index.css'
import VueCropper from "vue-cropper/lib/vue-cropper.vue";

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import { useBlogStore } from '../../stores/store';
import { useRoute, useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';
import { uploadImage, getImage, deleteImage } from '../../request/api/image.js'
import { getPost, getPostById, postPost, updatePost, deletePost } from '../../request/api/blog.js'
import { getCategory, postCategory, updateCategory, deleteCategory } from '../../request/api/category.js';
import { LeftOutlined, TagOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import MainItem from '../../components/MainItem.vue';

const route = useRoute();
const router = useRouter();
const store = useBlogStore();

//弹窗
const openNotification = (type, message) => {
    notification[type]({
        message: '提示信息',
        description:
            message,
        style: {
            width: '300px',
            marginLeft: `${335 - 600}px`,
        },
        class: 'rounded-lg bg-white-bg font-bold',
    });
};


//分类数据
let categoryDatas = ref([]);
let currentCategory = ref({
    categoryId: null,
    categoryName: "",
    categoryParent: null,
});
const createCategoryData = ref({
    categoryName: "",
    categoryParent: 0,
})
const changeCategoryData = ref({
    categoryId: 0,
    categoryName: "",
    categoryParent: 0,
})
//显示分类编辑弹窗
const modifyCategoryShow = ref(false);
const createCategoryShow = ref(false);
const renameCategoryShow = ref(false);
//展示分类编辑弹窗
async function showCategory() {
    startGetCategory();
    modifyCategoryShow.value = true;
}
//重命名分类
async function renameCategory() {
    const res = await updateCategory(store.token, changeCategoryData.value);
    if (res.data.success) {
        openNotification('success', '重命名成功');
        startGetCategory();
        renameCategoryShow.value = false;
    } else {
        openNotification('warning', res.data.msg);
    }
}
//删除分类
async function startDeleteCategory(id) {
    const res = await deleteCategory(store.token, id);
    if (res.data.success) {
        openNotification('success', '删除成功');
        startGetCategory();
    } else {
        openNotification('warning', res.data.msg);
    }
}
//新增分类
async function createCategory() {
    const res = await postCategory(store.token, createCategoryData.value);
    if (res.data.success) {
        openNotification('success', '分类添加成功');
        startGetCategory();
        createCategoryData.value.categoryName = '';
        createCategoryShow.value = false;
    } else {
        openNotification('warning', res.data.msg);
    }
}


//显示修改封面弹窗
const modifyCoverShow = ref(false);
//获取本地图片blob
let imgPreview = ref();
const cropper = ref();
function getPicture(e) {
    //预览图片
    let src = window.URL.createObjectURL(e.target.files[0]);
    imgPreview.value = src;

    //将图片文件转化成base64格式图片
    var reader = new FileReader();
    reader.onload = (e) => {
        //e.target.result  就是从本地读取的图片的base64格式,将它上传给服务器即可
        //使用axios的post方法上传即可
    }
    reader.readAsDataURL(e.target.files[0])
}
//调用图片上传按钮
function callInput() {
    let fileDom = document.querySelector("#icon-upload")
    fileDom.click()
}
//开始上传图片
async function startUploadIcon() {
    cropper.value.startCrop();
    cropper.value.getCropBlob(data => {
        startUpload(data);
    })
}
//上传图片方法
async function startUpload(data) {
    if (data != null) {
        const formData = new FormData();
        //文件命名为用户名+时间
        formData.append('file', data, store.userName + new Date().getTime());
        formData.append('type', 'cover');
        let res = await uploadImage(formData, store.token);
        if (res.data.success) {
            //修改文章信息
            postData.value.postCoverId = res.data.data.id;
            postData.value.postCover = res.data.data.url;
            openNotification('success', "封面修改成功");
            modifyCoverShow.value = false;
        } else {
            openNotification('warning', res.data.msg);
        }
    }
}




//修改模式数据
let postId = ref(route.query.id)
let editMode = ref(false);
//文章数据
let postData = ref({
    postTop: '0',
    postTitle: '',
    postHtml: '',
    postContent: '',
    postCoverId: '',
    postCover: '',
})

// 编辑器实例，必须用 shallowRef
let editorRef = shallowRef()

let toolbar;

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}

const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {},
}


const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    //等待DOM加载完成
    setTimeout(() => {
        toolbar = DomEditor.getToolbar(editor)
        const curToolbarConfig = toolbar?.getConfig();
        // console.log(curToolbarConfig?.toolbarKeys);
    }, 1000)
}

//工具栏配置
toolbarConfig.excludeKeys = [
    "group-video"
]
//增加：插入视频
toolbarConfig.insertKeys = {
    index: 23,
    keys: ["insertVideo"],
}

//图片上传配置
editorConfig.MENU_CONF["uploadImage"] = {
    server: store.ServerUrl,
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'
    fieldName: store.userInfo.userName,

    // 单个文件的最大体积限制，默认为 3M
    maxFileSize: 3 * 1024 * 1024, // 1M

    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 10,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],

    // 跨域是否传递 cookie ，默认为 false
    withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 20 * 1000, // 20 秒


    //上传
    async customUpload(file, insertFn) {
        if (file != null) {
            const formData = new FormData();
            //文件命名为用户名
            formData.append('file', file, store.userName);
            formData.append('type', 'notify');
            let res = await uploadImage(formData, store.token);
            if (res.data.success) {
                insertFn(res.data.data.url, "", res.data.data.url);
                openNotification("success", "图片上传成功")
            } else {
                openNotification('warning', res.data.msg);
            }
        }

    },

}
//获取文章
async function startGetPost() {
    let res = await getPostById(postId.value);
    if (res.data.success) {
        postData.value = res.data.data[0];
        if (postData.value.postCategory != null) {
            currentCategory.value.categoryId = postData.value.postCategory
        }
    } else {
        openNotification('warning', res.data.msg);
    }
}
//删除文章
async function startDeletePost() {
    let res = await deletePost(store.token, postId.value);
    if (res.data.success) {
        openNotification('success', '删除成功');
        router.go(-2);
    } else {
        openNotification('warning', res.data.msg);
    }
}
//发布或更新文章
async function startPostPost() {
    //更新文章
    postData.value.postContent = editorRef.value.getText();
    postData.value.postHtml = editorRef.value.getHtml();
    currentCategory.value.categoryId ? postData.value.postCategory = currentCategory.value.categoryId : null
    //写入数据
    const data = {
        postId: postData.value.postId ? postData.value.postId : 0,
        postCategory: postData.value.postCategory ? postData.value.postCategory : 0,
        postContent: postData.value.postContent,
        postHtml: postData.value.postHtml,
        postCover: postData.value.postCoverId ? postData.value.postCoverId : 0,
        postEvent: 0,
        postTag: 0,
        postTitle: postData.value.postTitle,
        postTop: postData.value.postTop
    }
    if (editMode.value) {
        let res = await updatePost(store.token, data);
        if (res.data.success) {
            openNotification('success', '文章更新成功');
            router.go(-2);
        } else {
            openNotification('warning', res.data.msg);
        }
    } else {
        let res = await postPost(store.token, data);
        if (res.data.success) {
            openNotification('success', '文章发布成功');
            router.go(-1);
        } else {
            openNotification('warning', res.data.msg);
        }
    }
}

//开始获取分类
async function startGetCategory() {
    const res = await getCategory()

    if (res.data.success) {
        categoryDatas.value = res.data.data
    }
}


onMounted(() => {
    //判断是否为修改模式
    if (postId.value != null) {
        editMode.value = true;
        startGetPost();
    }
})


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

</script>   

<style></style>