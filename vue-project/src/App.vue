<template>

  <div class=" h-full w-full bg-fixed">
    <div class=" h-full w-full relative ">
      
      <img 
        :style="['user-select: none; -webkit-user-drag: none; background-color: #868e96; filter:brightness('+store.bgBrightness/100+')']"
        class=" transition-all absolute w-full h-full top-0 left-0 object-cover"
        :src="store.nowBG" />



      <router-view v-slot="{ Component }" class=" transition-all absolute inset-x-0 inset-y-0">
          <transition name="MainFade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>


        <Navs 
            v-if="route.path != '/' &&
                  route.path != '/login' && 
                  route.path != '/register' &&
                  route.path != '/login/forget'" 
                  />
      
    </div>
  </div>


  <!-- 设置 -->
  <a-drawer
    v-model:visible="store.showSetting"
    class=""
    style=""
    width="320px"
    title="设置"
    placement="right"
    @after-visible-change="afterVisibleChange"
  >
    <SettingView></SettingView>
  </a-drawer>
  
  

</template>

<script setup>
import { ref,watch,onBeforeMount } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Navs from './layout/Navs.vue';
import { useBlogStore } from './stores/store.js';
import SettingView from './views/setting/SettingView.vue';
import { liveQuery } from "dexie";
import { db } from "./utils/db.js";
import { useObservable } from "@vueuse/rxjs";




const route = useRoute();

const store = useBlogStore();


let dbImg = useObservable(liveQuery(()=> db.bgpic.where("key").equalsIgnoreCase('bg').toArray()));



//监听数据库，获取本地图片，无本地图片时使用网络图片
watch(dbImg,async()=>{
    if(dbImg.value!=''){
      store.nowBG = dbImg.value[0].pic;
    }else{
      store.nowBG = store.networkBG;
    }
})

onBeforeMount(()=>{
  //检查是否为触屏设备
  window.onload = function() { if('ontouchstart' in document.documentElement) { store.isTouchMode = true; } else { store.isTouchMode = false;; }};
})


</script>



<style scoped>
.MainFade-enter-from, .MainFade-leave-to {
  opacity: 0;
}
.MainFade-enter-to, .MainFade-leave-from {
  opacity: 1;
}
.MainFade-enter-active,
.MainFade-leave-active {
  transition: opacity 0.2s;
}

</style>
