<template>
    <div
        class=" flex flex-col items-center justify-center">
                <!-- 时间 -->
                <MainTime class=""></MainTime>
                <!-- 主界面导航栏 -->
                <div class=" flex items-center justify-center space-x-3">


                    <!-- 公告 -->
                    <a-tooltip placement="bottom">
                        <template #title>
                            <span>公告</span>
                        </template>
                        <MainItem noBg>
                            <BellOutlined class="icon text-white " />
                        </MainItem>
                    </a-tooltip>


                    <!-- 论坛 -->
                    <a-tooltip placement="bottom">
                        <template #title>
                            <span>论坛（未开放）</span>
                        </template>
                        <MainItem noBg>
                            <TeamOutlined class="icon text-white " />
                        </MainItem>
                    </a-tooltip>

                
                    <!-- 用户中心 -->
                    <a-tooltip placement="bottom">
                        <template #title >
                            <span>用户中心</span>
                        </template>
                        <MainItem noBg @click="onUserClicked()">
                            <a-avatar :size="32" :src="store.userIcon">
                
                            </a-avatar>
                        </MainItem>
                    </a-tooltip>

                
                    <!-- 打卡 -->
                    <a-tooltip placement="bottom">
                        <template #title>
                            <span>打卡</span>
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
    
</template>

<script setup>
import MainTime from '../components/MainTime.vue';
import MainItem from '../components/MainItem.vue';
import { useBlogStore } from '../stores/store.js';
import {BellOutlined,ApiOutlined, CalendarOutlined,SettingOutlined,TeamOutlined} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

const store = useBlogStore();
const router = useRouter();

function onUserClicked(){
    if(store.isLogin){
        router.push({
            name: 'user'
        })
    }else{
        router.push({
            name: 'login'
        })
    }
}


</script>

<style scoped>
.icon{
    font-size: 18px;
}



</style>