<template>

    <div 
        class=" flex flex-col items-center justify-center gap-y-3">

        <Verify @success="success" :mode="pop" captchaType="blockPuzzle" :imgSize="{ width: '330px', height: '155px' }" ref="verify"></Verify>
        
        <!-- 登录 -->
        <div class=" transition-all flex flex-col gap-x-1 py-5 md:rounded-xl select-none" style="width: 100%;max-width: 500px;height: 100%;max-height: 600px;">


            <!-- 操作栏 -->
            <div class="flex justify-center items-center gap-x-1 px-10 md:px-18 py-3" style="width: 100%;max-width: 500px; height: 60px;">
                <div class="">
                    <MainItem @click="router.go(-1)" noBg>
                        <LeftOutlined class="icon text-white " />
                    </MainItem>
                </div>
                <div class=" flex-grow rounded-xl"></div>
            </div>

            <!-- 表单 -->
            <p class=" text-center text-3xl py-14 font-bold text-white">忘记密码</p>
            <div class="transition-all flex flex-col px-10 md:px-20 gap-y-5">

                <a-input v-model:value="userInput.userEmail" placeholder="邮箱" class="rounded-md" size="large" />

                <a-input-password v-model:value="userInput.newPassword" placeholder="新密码" class="rounded-md" size="large" />

                <div class="flex gap-x-2 pb-5">
                    <a-input v-model:value="userInput.verifyCode" placeholder="邮箱验证码" class="rounded-md" size="large" :disabled="userInput.userEmail==''" />
                    <a-button class=" bg-white rounded-lg" style="height: 100%; " @click="startVerify()" :disabled="userInput.userEmail==''||countdownTime>0">{{countdownTime>0? countdownTime+'秒后再次发送':'发送邮箱验证码'}}</a-button>
                </div>

                <a-button type="primary" html-type="submit" style="width: 100%;" @click="startReset()" class=" bg-blue rounded-md" 
                    :disabled="userInput.userEmail==''||userInput.userName==''||userInput.newPassword==''||userInput.verifyCode==''">重置密码</a-button>
            </div>
                    
        </div>
        
    </div>

    
</template>

<script setup>
import { LeftOutlined } from '@ant-design/icons-vue';
import { ref,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';
import { getMailVerify,resetPassword } from '../../request/api/user'
import MainItem from '../../components/MainItem.vue';
import Verify from "../../components/verifition/Verify.vue";

const route = useRoute();
const router = useRouter();

const verify = ref();


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


//注册信息
let userInput = ref({
    userEmail: '',
    newPassword: '',
    verifyCode: '',
})

//开始验证
function startVerify(){
    verify.value.show();
}

function success(params){
    //获取邮箱验证码
    const regCN = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (!regCN.test(userInput.value.userEmail)) {
        openNotification('warning','邮箱格式不正确')
      } else {
        startGetEmailVerify(params);
      }

}

//开始获取邮箱验证码
async function startGetEmailVerify(params){
    let data = {
        'mail' : userInput.value.userEmail,
        'captchaVerification' : params.captchaVerification,
    }
    let res = await getMailVerify(data);
    if(res.data.success){
        openNotification('success','邮件已发送至'+userInput.value.userEmail);
        setCountDown();
    }else{
        openNotification('warning',res.data.msg);
    }
}
//倒计时
let countdownTime = ref(0);
//当前时间（onMounted用）
let nowTime = new Date().getTime();
//设置倒计时
function setCountDown(){
    nowTime = new Date().getTime();
    localStorage.setItem("verifyCodeCD", nowTime);
    countdownTime.value = 60;
    countdown();
}
//开始倒计时
function countdown(){
    let t = setInterval(() => {
        countdownTime.value--
        if(countdownTime.value<=0){
            //倒计时结束，清除储存时间和计时器
            localStorage.removeItem("verifyCodeCD");
            clearInterval(t);
        }
      }, 1000)
}

//开始重置密码
async function startReset(){
    let res = await resetPassword(userInput.value);
    if(res.data.success){
        openNotification('success','密码重置成功');
        router.go(-1);
    }else{
        openNotification('warning',res.data.msg);
    }
}





onMounted(()=>{
    checkCountdown();
})

//检查是否在倒计时
function checkCountdown(){
    let cdStart = localStorage.getItem('verifyCodeCD');
    if(cdStart){
        countdownTime.value = 60 - parseInt((nowTime - cdStart) / 1000, 10);
        countdownTime.value = countdownTime.value <= 0 ? 0 : countdownTime.value;
        countdown();
    }
}

</script>

<style scoped>
.icon{
    font-size: 18px;
}


</style>