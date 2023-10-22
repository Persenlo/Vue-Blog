<template>

    <div class=" md:inset-x-40 md:inset-y-6 flex items-center justify-center">
        <div 
            class=" bg-white-bg md:rounded-xl select-none overflow-hidden flex flex-col backdrop-blur-md"
            style="width: 100%; height: 100%; max-width: 1250px;">

            <!-- 顶部栏 -->
            <div class=" flex justify-center items-center py-2 px-1 gap-x-2">
                <!-- 返回 -->
                <MainItem class=" self-start hover:bg-white-hover mr-3" @click="router.go(-1)">
                        <LeftOutlined class="icon text-black"></LeftOutlined>
                        
                </MainItem>
                
                <div class=" flex-grow"></div>

                <MainItem v-if="editMode" 
                    @click="startDeleteNotify()">
                    删除公告
                </MainItem>

                <MainItem v-if="store.userPermission >= 6" 
                    @click="">
                    置顶
                    <a-switch size="small" v-model:checked="notifyData.notifyTop" :class="[notifyData.notifyTop=='1'? 'bg-blue':'bg-white-bg']" checkedValue="1" unCheckedValue="0"/>
                </MainItem>
               
                <MainItem v-if="store.userPermission >= 6" 
                    @click="startPostNotify()">
                    发布公告
                </MainItem>
            </div>

            <div class=" rounded-lg overflow-hidden" style="min-height: 100%;" >
                <Toolbar style="" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" class=" bg-white " />
                <div class=" bg-white" style="width: 100%; height: 50px;">
                    <a-input v-model:value="notifyData.notifyTitle" placeholder="请输入标题" class=" px-3 text-xl font-bold border-none focus:border-none bg-alpha" style="width: 100%; height: 50px;"/>
                </div>
                <Editor style=" overflow-y: hidden;" v-model="notifyData.notifyHtml" :defaultConfig="editorConfig" :mode="mode" class=" bg-white"
                    @onCreated="handleCreated" >
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
import { uploadImage,getImage,deleteImage } from '../../request/api/image.js'
import { getNotify,getNotifyById,postNotify,updateNotify,deleteNotify } from '../../request/api/notify.js'
import { LeftOutlined } from '@ant-design/icons-vue';
import MainItem from '../../components/MainItem.vue';

const route = useRoute();
const router = useRouter();
const store = useBlogStore();

//弹窗
const openNotification= (type,message) =>{
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

//修改模式数据
let notifyId = ref(route.query.id)
let editMode = ref(false);
//公告数据
let notifyData = ref({
    notifyTop: '0',
    notifyTitle: '',
    notifyHtml: '',
    notifyContent: '',
    notifyImg: 0,
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
                openNotification("success","图片上传成功")
            } else {
                openNotification('warning', res.data.msg);
            }
        }
        
    },
    
}
//获取公告
async function startgetNotify(){
    let res = await getNotifyById(notifyId.value);
    if(res.data.success){
        notifyData.value = res.data.data[0];
        console.log(notifyData.value)
    }else{
        openNotification('warning',res.data.msg);
    }
}
//删除公告
async function startDeleteNotify(){
    let res = await deleteNotify(store.token,notifyId.value);
    if(res.data.success){
        openNotification('success','删除成功');
        router.go(-2);
    }else{
        openNotification('warning',res.data.msg);
    }
}
//发布或更新公告
async function startPostNotify(){
    if(editMode.value){
        //更新公告
        notifyData.value.notifyContent = editorRef.value.getText();
        notifyData.value.notifyHtml = editorRef.value.getHtml();
        let res = await updateNotify(store.token, notifyData.value);
        if (res.data.success) {
            openNotification('success', '公告更新成功');
            router.go(-2);
        } else {
            openNotification('warning', res.data.msg);
        }
    }else{
        //发布公告
        notifyData.value.notifyContent = editorRef.value.getText();
        notifyData.value.notifyHtml = editorRef.value.getHtml();
        let res = await postNotify(store.token, notifyData.value);
        if (res.data.success) {
            openNotification('success', '公告发布成功');
            router.go(-1);
        } else {
            openNotification('warning', res.data.msg);
        }
    }
}


onMounted(()=>{
    //判断是否为修改模式
    if(notifyId.value != null){
        editMode.value = true;
        startgetNotify();
    }
})


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
})

</script>   

<style>

</style>