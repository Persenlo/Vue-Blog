<template>
    <div class=" md:inset-x-40 md:inset-y-6 flex items-center justify-center">
        <div class=" bg-white-bg-big md:rounded-xl select-none overflow-hidden flex flex-col  backdrop-blur-sm"
            style="width: 100%; height: 100%; max-width: 1250px;">



            <div class=" rounded-lg overflow-hidden" style="min-height: 100%;">
                <div class="w-full">
                    <!-- 顶部栏 -->
                    <div class="w-full flex justify-center items-center py-2 px-3 gap-x-2 z-50">
                        <!-- 返回 -->
                        <MainItem noBg class=" hover:bg-white-hover" @click="router.go(-1)">
                            <LeftOutlined class="icon text-black"></LeftOutlined>
                        </MainItem>
                        <p class=" text-xl font-bold">{{ postData?.postTitle }}</p>
                        <div class=" flex-grow"></div>
                        <MainItem v-if="store.userInfo.uid == postData?.postAuthorId"
                            @click="router.push({ name: 'blogEdit', query: { id: postData?.postId } })">
                            编辑文章
                        </MainItem>
                    </div>
                    <!-- 顶部图片 -->
                    <div class=" h-36 brightness-75 mx-6 rounded-xl overflow-hidden">
                        <img :src="postData.postCover" class="object-cover h-full w-full " />
                    </div>

                </div>
                <Editor style=" overflow-y: hidden;" v-model="postData.postHtml" :defaultConfig="editorConfig" :mode="mode" @scoll="postData.postCover = ''"
                    class=" bg-alpha pl-5" @onCreated="handleCreated">
                </Editor>
            </div>

        </div>
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
import { useBlogStore } from '../../stores/store';
import { useRoute, useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';
import { uploadImage, getImage, deleteImage } from '../../request/api/image.js'
import { getPostById } from '../../request/api/blog.js'
import { LeftOutlined } from '@ant-design/icons-vue';
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


//文章数据
let postId = ref(route.query.id);
let postData = ref({
    postHtml: '',
    postAuthor: '',
})

// 编辑器实例，必须用 shallowRef
let editorRef = shallowRef()

const editorConfig = {
    placeholder: '内容为空...',
    MENU_CONF: {},
}


const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
    editor.disable();
}



//获取文章
async function startGetPost() {
    console.log('111')
    let res = await getPostById(postId.value);
    if (res.data.success) {
        postData.value = res.data.data[0];
    } else {
        openNotification('warning', res.data.msg);
    }
}

onMounted(() => {
    startGetPost();
})


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

</script>   

<style>
.w-e-text-container {
    background-color: rgb(255, 255, 255, 0%);
}

.w-e-bar {
    background-color: rgb(255, 255, 255, 0%);
}
</style>