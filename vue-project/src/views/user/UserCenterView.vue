<template>
    <div 
        class=" 
             md:inset-x-60 md:inset-y-32
             flex items-center justify-center
             "
                >
        <div style="width: 100%; max-width: 800px; height: 100%;" 
            class=" transition-all flex flex-col lg:flex-row items-cente justify-start gap-x-10 gap-y-10 py-12 md:py-0">
            <div class="flex flex-col items-center px-5 gap-y-10">
                
                <!-- 返回 -->
                <MainItem class=" self-start" @click="router.go(-1)">
                        <div class=" flex flex-col md:flex-row justify-center items-center gap-x-1">
                            <LeftOutlined class="icon text-black"></LeftOutlined>
                        </div>
                </MainItem>
                <!-- 头像 -->
                <a-avatar :size="{  xs: 80, sm: 80, md: 85, lg: 100, xl: 128, xxl: 128 }" @click="modifyUserIconShow = true"
                    :src="store.userIcon"
                    class=" transition-all hover:brightness-75 duration-300">
                    
                </a-avatar>
                <!-- 用户名 -->
                <div class="flex rounded-md bg-white-bg py-1 px-3" style="width: 100%;">
                    <p class=" font-bold text-center text-lg flex-grow" style="width: 100%;">{{ store.userInfo.userName }}</p>
                </div>
                <!-- 编辑按钮组 -->
                <div class="flex gap-y-3 gap-x-3 w-max ">
                    <a-tooltip placement="bottom">
                        <template #title>
                            <span>编辑名称</span>
                        </template>
                        <MainItem @click="modifyUserNameShow = true">
                            <div class=" flex flex-col md:flex-row justify-center items-center gap-x-1">
                                <EditOutlined class="icon text-black"></EditOutlined>
                                <span class="md:hidden">编辑名称</span>
                            </div>
                        </MainItem>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                        <template #title>
                            <span>修改密码</span>
                        </template>
                        <MainItem @click="modifyPwdShow = true">
                            <div class=" flex flex-col md:flex-row justify-center items-center gap-x-1">
                                <LockOutlined class="icon text-black"></LockOutlined>
                                <span class="md:hidden">修改密码</span>
                            </div>
                        </MainItem>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                        <template #title>
                            <span>退出登录</span>
                        </template>
                        <MainItem @click="startLogout">
                            <div class=" flex flex-col md:flex-row justify-center items-center gap-x-1">
                                <ExportOutlined class="icon text-black"></ExportOutlined>
                                <span class="md:hidden">退出登录</span>
                            </div>
                        </MainItem>
                    </a-tooltip>
                    
                    
                </div>
            </div>
            
            <div class="flex flex-col flex-grow items-center justify-start gap-y-5" style="height: 100%;">
                <!-- 按钮组 -->
                <div class="flex gap-y-3 gap-x-3 w-max lg:self-end "  >
                    <MainItem>
                        <div class=" flex flex-col md:flex-row justify-center items-center gap-x-1">
                            <PieChartOutlined class="icon text-black"></PieChartOutlined>
                            <span class="">近期活动</span>
                        </div>
                    </MainItem>
                    <MainItem>
                        <div class=" flex flex-col md:flex-row justify-center items-center gap-x-1">
                            <HighlightOutlined class="icon text-black"></HighlightOutlined>
                            <span class="">近期文章</span>
                        </div>
                    </MainItem>
                    <MainItem>
                        <div class=" flex flex-col md:flex-row justify-center items-center gap-x-1">
                            <StarOutlined class="icon text-black"></StarOutlined>
                            <span class="">文章收藏</span>
                        </div>
                    </MainItem>
                </div>
                <!-- 内容 -->
                <div style="height: 100%; width: 100%;" 
                    class=" bg-white-bg rounded-xl">

                </div>
            </div>
        </div>

        <!-- 修改用户名 -->
        <a-modal v-model:visible="modifyUserNameShow" centered="true">
            <p class=" font-bold text-xl">修改名称</p>
            <div class=" flex flex-col justify-center items-center pt-10 gap-y-5 px-3">
                <a-input v-model:value="userData.userName" placeholder="新用户名" class="rounded-md" size="large" />
                <a-button type="primary" @click="startModifyUserName()" class=" bg-blue rounded-md self-end" :disabled="userData.userName==''">确认</a-button>
            </div>
        </a-modal>

        <!-- 修改密码 -->
        <a-modal v-model:visible="modifyPwdShow" centered="true">
            <p class=" font-bold text-xl">修改密码</p>
            <div class=" flex flex-col justify-center items-center pt-10 gap-y-5 px-3">
                <a-input-password v-model:value="passwordData.oldPassword" placeholder="原密码" class="rounded-md" size="large" />
                <a-input-password v-model:value="passwordData.newPassword" placeholder="新密码" class="rounded-md" size="large" />
                <a-button type="primary" @click="startModifyPassword()" class=" bg-blue rounded-md self-end" :disabled="passwordData.newPassword==''||passwordData.password==''">确认</a-button>
            </div>
        </a-modal>

        <!-- 修改头像 -->
        <a-modal v-model:visible="modifyUserIconShow" centered="true">
            <p class=" font-bold text-xl">编辑头像</p>
            <div class="flex flex-col justify-center items-center pt-10">
                <VueCropper
                style="width: 256px; height: 256px;"
				ref="cropper"
                autoCrop="true"
                fixed="true"
				:img="imgPreview"
				:outputSize="0.5"
				:outputType="png">
            </VueCropper>
            <a-button type="primary" @click="callInput()" class=" bg-blue  " style="width: 256px">选择图片</a-button>
            <!-- 隐藏上传按钮，通过方法调用上传功能 -->
            <input type="file"
               id="icon-upload"
               class=" hidden"
               accept="image/*"
               @change="getPicture($event)"
            />
            <a-button type="primary" @click="startUploadIcon()" class=" bg-blue rounded-md mt-5" :disabled="imgPreview==''">确认</a-button>
            </div>

               
            
        </a-modal>

    </div>

    


</template>

<script setup>

import 'vue-cropper/dist/index.css'
import VueCropper from "vue-cropper/lib/vue-cropper.vue";

import { useBlogStore } from '../../stores/store.js';
import {BellOutlined,ApiOutlined, CalendarOutlined,SettingOutlined,TeamOutlined, EditOutlined, LockOutlined, LogoutOutlined, PieChartOutlined, ExportOutlined, LeftOutlined, HighlightOutlined, StarOutlined} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';
import { updateUser,modifyPwd,logout } from '../../request/api/user';
import { uploadImage,getImage,deleteImage } from '../../request/api/image.js'
import MainItem from '../../components/MainItem.vue';
import { notification } from 'ant-design-vue';
import { ref } from 'vue';


const router = useRouter();

const store = useBlogStore();

const cropper = ref();

let modifyPwdShow = ref(false);
let modifyUserNameShow = ref(false);
let modifyUserIconShow = ref(false);

let passwordData = ref({
    oldPassword: '',
    newPassword: '',
    uid: store.userInfo.uid,
})

let userData = ref({
    uid: store.userInfo.uid,
    userIcon: store.userInfo.userIcon,
    userMail: store.userInfo.userMail,
    userName: store.userInfo.userName,
    userPassword: "inaccess",
    userRole: store.userInfo.userRole,
})


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

//获取本地头像blob
let imgPreview = ref();
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
function callInput(){
    let fileDom = document.querySelector("#icon-upload")
	fileDom.click()
}
//开始上传图片
async function startUploadIcon(){
    
    cropper.value.startCrop();
    cropper.value.getCropBlob(data => {
           startUpload(data);
    })
    

}
//上传图片方法
async function startUpload(data){
    if(data!=null){
        const formData = new FormData();
        //文件命名为用户名
        formData.append('file', data, store.userName);
        formData.append('type', 'icon');
        let res = await uploadImage( formData,store.token);
        if(res.data.success){
            if(store.userInfo.icon != 1){
                await deleteImage(store.userInfo.icon,store.token);
            }
            //修改用户信息
            userData.value.userIcon = res.data.data.id
            let changeInfo = await updateUser(store.token, userData.value);
            if (changeInfo.data.success) {
                store.userInfo = changeInfo.data.data;
                localStorage.setItem("userInfo", JSON.stringify(store.userInfo));
                store.userIcon = res.data.data.url;
                localStorage.setItem("userIcon", JSON.stringify(store.userIcon));
                openNotification('success', '头像修改成功');
                modifyUserIconShow.value = false;
            } else {
                openNotification('warning', res.data.msg);
            }
            
        }else{
            openNotification('warning',res.data.msg);
        }
    }
}


//修改用户名
async function startModifyUserName(){
    let res = await updateUser(store.token,userData.value);
    if(res.data.success){
        openNotification('success','用户名修改成功');
        localStorage.setItem("userInfo",JSON.stringify(res.data.data));
        store.userInfo = res.data.data;
        modifyUserNameShow.value = false;
    }else{
        openNotification('warning',res.data.msg);
    }
}
//修改密码
async function startModifyPassword(){
    let res = await modifyPwd(store.token,passwordData.value);
    if(res.data.success){
        await logout(store.token);
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userIcon");
        store.token = '';
        store.isLogin = false;
        openNotification('success','修改成功，请重新登录');
        router.push({name: 'login'});
    }else{
        openNotification('warning',res.data.msg);
    }
}
//登出
async function startLogout(){
    await logout(store.token);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userIcon");
    store.token = '';
    store.isLogin = false;
    store.userIcon = '';
    openNotification('success','已登出');
    router.go(-1);
}



</script>

<style scoped>
.icon{
    font-size: 18px;
}

</style>