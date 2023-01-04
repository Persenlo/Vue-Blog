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
                <MainItem>
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
                <MainItem>
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
                flex align-middle justify-center
                md:hidden
                ">
        <SmallNav class=" 
                    h-auto w-full 
                    ">
            <NavItem>111</NavItem>
            
        </SmallNav>
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
        router.push({name: 'user'})
    }
}

function onHomeClicked(){
    router.push({name: 'home'})
}


</script>



<style scoped>
.icon{
    font-size: 18px;
}
</style>