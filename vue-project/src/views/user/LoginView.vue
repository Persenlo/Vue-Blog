<template>

    <div 
        class=" flex flex-col items-center justify-center gap-y-3">

        <Verify @success="success" :mode="pop" captchaType="blockPuzzle" :imgSize="{ width: '330px', height: '155px' }" ref="verify"></Verify>
        
        <!-- 登录 -->
        <div class=" transition-all flex flex-col gap-x-1 py-5 md:rounded-xl select-none" style="width: 100%;max-width: 500px;height: 100%;max-height: 600px;">


            <!-- 操作栏 -->
            <div class="flex justify-center items-center gap-x-1 px-10 md:px-18 py-3" style="width: 100%;max-width: 500px; height: 60px;">
                <div class="">
                    <MainItem @click="router.push({ name: 'home' })" noBg>
                        <LeftOutlined class="icon text-white " />
                    </MainItem>
                </div>
                <div class=" flex-grow rounded-xl"></div>
                <div class="">
                    <MainItem noBg @click="router.push({name: 'register'})">
                        <span class=" text-sm text-white">注册</span>
                    </MainItem>
                </div>
            </div>

            <!-- 表单 -->
            <p class=" text-center text-3xl py-14 font-bold text-white">登录</p>
            <div class="transition-all flex flex-col px-10 md:px-20 gap-y-5">

                <a-input v-model:value="userInput.userEmail" placeholder="邮箱" class="rounded-md" size="large" />

                <a-input-password v-model:value="userInput.password" placeholder="密码" class="rounded-md" size="large" />

                <a class=" self-end pb-5 text-white hover:text-white-bg-second" @click="router.push({name: 'forgetPassword'})">忘记密码？</a>

                <a-button type="primary" html-type="submit" style="width: 100%;" @click="startVerify()" class=" bg-blue rounded-md" :disabled="userInput.userEmail==''||userInput.password==''">登录</a-button>
            </div>
                    
        </div>
        
    </div>

    
</template>

<script setup>
import { LeftOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';
import { actionlogin,getUserInfo,getImage } from '../../request/api/user'
import { getRolebyId } from '../../request/api/role';
import MainItem from '../../components/MainItem.vue';
import Verify from "../../components/verifition/Verify.vue";
import { useBlogStore } from '../../stores/store';

const route = useRoute();
const router = useRouter();

const verify = ref();

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

//登录信息
let userInput = ref({
    userEmail: '',
    password: '',
    verifyCode: '',
})

//开始验证
function startVerify(){
    verify.value.show();
}

function success(params){
    startLogin(params)
}

//登录
async function startLogin(params){
    let res = await actionlogin(userInput.value,params.captchaVerification);
    if(res.data.success){
        let token = res.data.data
        //登录成功，尝试获取用户信息
        let infoRes = await getUserInfo(token);
        if(infoRes.data.success){
            //获取用户信息成功，保存token和信息
            let userInfo = infoRes.data.data;
            localStorage.setItem("token",JSON.stringify(token));
            localStorage.setItem("userInfo",JSON.stringify(infoRes.data.data));

            //尝试获取用户头像
            let iconRes = await getImage(userInfo.icon,token);
            if(iconRes.data.success == true){
                localStorage.setItem("userIcon",JSON.stringify(iconRes.data.data));
                store.userIcon = iconRes.data.data;
            }

            //尝试获取用户权限等级
            let permissionRes = await getRolebyId(userInfo.userRole);
            if(permissionRes.data.success == true){
                localStorage.setItem("userPermission",JSON.stringify(permissionRes.data.data[0].roleLevel));
                store.userPermission = permissionRes.data.data[0].roleLevel;
            }

            store.isLogin = true;
            store.token = token;
            store.userInfo = userInfo;

            openNotification('success',"欢迎，"+userInfo.userName);
            router.push({name: 'home'})
        

        }else{
            openNotification('warning',infoRes.data.msg);
        }

    }else{
        openNotification('warning',res.data.msg);
    }
}

</script>

<style scoped>
.icon{
    font-size: 18px;
}


</style>