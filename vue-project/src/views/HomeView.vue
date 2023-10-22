<template>
    <div class=" w-full h-full relative">
        <div class=" absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center">
            <!-- 时间 -->
            <MainTime class=""></MainTime>
            <!-- 主界面导航栏 -->
            <div class=" flex items-center justify-center space-x-3">


                <!-- 公告 -->
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>公告</span>
                    </template>
                    <MainItem noBg @click="router.push({ name: 'notify' })">
                        <BellOutlined class="icon text-white " />
                    </MainItem>
                </a-tooltip>


                <!-- 论坛 -->
                <a-tooltip placement="bottom" tigger="mouseenter">
                    <template #title>
                        <span>博客</span>
                    </template>
                    <MainItem noBg @click="router.push({ name: 'blog' })">
                        <TeamOutlined class="icon text-white " />
                    </MainItem>
                </a-tooltip>


                <!-- 用户中心 -->
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>用户中心</span>
                    </template>
                    <MainItem noBg @click="onUserClicked()">
                        <a-avatar :size="32" :src="store.userIcon">

                        </a-avatar>
                    </MainItem>
                </a-tooltip>


                <!-- 项目 -->
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>项目（未开放）</span>
                    </template>
                    <MainItem noBg>
                        <CalendarOutlined class="icon text-white " />
                    </MainItem>
                </a-tooltip>


                <!-- 设置 -->
                <a-tooltip placement="bottom">
                    <template #title>
                        <span>设置</span>
                    </template>
                    <MainItem noBg @click="store.showSetting = true">
                        <SettingOutlined class="icon text-white " />
                    </MainItem>
                </a-tooltip>
            </div>
        </div>
        <!-- 全屏 -->
        <MainItem noBg class=" absolute right-8 bottom-8 opacity-50" v-if="!store.isTouchMode">
            <ExpandOutlined class="icon text-white " @click="changeFullScreen()" />
        </MainItem>
    </div>
</template>

<script setup>
import MainTime from '../components/MainTime.vue';
import MainItem from '../components/MainItem.vue';
import { useBlogStore } from '../stores/store.js';
import { BellOutlined, ApiOutlined, CalendarOutlined, SettingOutlined, TeamOutlined, ExpandOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

const store = useBlogStore();
const router = useRouter();

function onUserClicked() {
    if (store.isLogin) {
        router.push({
            name: 'user'
        })
    } else {
        router.push({
            name: 'login'
        })
    }
}






//全屏切换
function changeFullScreen() {
    if (!store.isFullScreen) {
        if (document.documentElement.RequestFullScreen) {
            document.documentElement.RequestFullScreen();
        }
        //兼容火狐
        if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
        //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
        if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen();
        }
        //兼容IE,只能写msRequestFullscreen
        if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullScreen) {
            document.exitFullscreen()
        }
        //兼容火狐
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        }
        //兼容谷歌等
        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
        //兼容IE
        if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    }
}


</script>

<style scoped>
.icon {
    font-size: 18px;
}
</style>