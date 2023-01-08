<template>


    <!-- md:nav -->
    <div class="
                h-full
                absolute
                px-10
                py-10 
                hidden 
                space-y-2
                md:flex md:flex-col md:align-middle md:justify-center
                ">
        <div class="grow"></div>
        <Nav class=" 
                    h-auto w-auto 
                    md:flex md:align-middle md:justify-center
                    ">
            <!-- 用户中心 -->
            
            <a-avatar :size="50" class="hover:brightness-75 duration-300" @click="onUserClicked()" :src="store.userIcon">
            
            </a-avatar>
            
            

            
        </Nav>
        <Nav class=" 
                    h-auto w-auto 
                    md:flex md:align-middle md:justify-center
                    ">
            <!-- 首页 -->
            <a-tooltip placement="right">
                <template #title>
                    <span>主页</span>
                </template>
                <MainItem @click="onHomeClicked()"> 
                    <HomeOutlined class="icon text-black " />
                </MainItem>
            </a-tooltip>

            <!-- 公告 -->
            <a-tooltip placement="right">
                <template #title>
                    <span>公告</span>
                </template>
                <MainItem @click="onNotifyCilck()">
                    <BellOutlined class="icon text-black " />
                </MainItem>
            </a-tooltip>
            
            
            <!-- 论坛 -->
            <a-tooltip placement="right">
                <template #title>
                    <span>论坛（未开放）</span>
                </template>
                <MainItem>
                    <TeamOutlined class="icon text-black " />
                </MainItem>
            </a-tooltip>
            
            
            
            
            
            <!-- 打卡 -->
            <a-tooltip placement="right">
                <template #title>
                    <span>打卡</span>
                </template>
                <MainItem>
                    <CalendarOutlined class="icon text-black " />
                </MainItem>
            </a-tooltip>
            
            
            <!-- 设置 -->
            <a-tooltip placement="right">
                <template #title>
                    <span>设置</span>
                </template>
                <MainItem @click="onSettingClick()">
                    <SettingOutlined class="icon text-black " />
                </MainItem>
            </a-tooltip>
        </Nav>
        <div class="grow"></div>
    </div>



    <!-- sm:nav -->
    <div class="w-full
                bottom-0
                absolute
                flex items-center justify-center
                md:hidden
              bg-white
                ">

        <a-avatar :size="24" class="hover:brightness-75 duration-300 " @click="onUserClicked()" :src="store.userIcon">
            
        </a-avatar>

        <!-- 首页 -->
        <MainItem @click="onHomeClicked()">
            <HomeOutlined class="icon text-black " />
        </MainItem>
        
        <!-- 公告 -->
        <MainItem @click="onNotifyCilck()">
            <BellOutlined class="icon text-black " />
        </MainItem>
        
        
        <!-- 论坛 -->
        <MainItem>
            <TeamOutlined class="icon text-black " />
        </MainItem>
        
        
        <!-- 打卡 -->
        <MainItem>
            <CalendarOutlined class="icon text-black " />
        </MainItem>
        
        
        <!-- 设置 -->
        <MainItem @click="onSettingClick()">
            <SettingOutlined class="icon text-black " />
        </MainItem>
        
    </div>

</template>

<script setup>
import {BellOutlined,ApiOutlined, CalendarOutlined,SettingOutlined,TeamOutlined, HomeOutlined} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router';
import MainItem from '../components/MainItem.vue';
import NavItem from '../components/NavItem.vue';
import Nav from '../layout/Nav.vue'
import SmallNav from '../layout/SmallNav.vue'
import { useBlogStore } from '../stores/store';

const route = useRoute();
const router = useRouter();

const store = useBlogStore();

function onUserClicked(){
    if(route.path != '/user'){
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
}

function onHomeClicked(){
    router.push({name: 'home'})
}

function onSettingClick(){
    store.showSetting = true;
}

function onNotifyCilck(){
    router.push({name: 'notify'})
}


</script>



<style scoped>
.icon{
    font-size: 18px;
}
</style>