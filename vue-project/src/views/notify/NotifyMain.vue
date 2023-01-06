<template>

    <div class=" md:inset-x-40 md:inset-y-6">
        <div ref="mainView" @scroll="handleScroll" class=" bg-white-bg md:rounded-xl select-none overflow-scroll flex flex-col" style="width: 100%; height: 100%; max-width: 1250px;">
            
            <!-- 顶部栏 -->
            <div class=" flex justify-center items-center py-8 px-10">
                <!-- 返回 -->
                <MainItem class=" self-start hover:bg-white-hover mr-3" @click="router.go(-1)">
                        <LeftOutlined class="icon text-black"></LeftOutlined>
                </MainItem>
                <p class=" font-bold text-2xl">公告</p>
                <div class=" flex-grow"></div>
                <div v-if="store.userPermission >= 6" class=" rounded-lg bg-white-bg-second duration-300 hover:bg-white-hover py-2 px-3 font-bold">发布公告</div>
            </div>

            <!-- 公告列表 -->
            <div class=" px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style="width: 100%;">
                <NotifyItem  v-for="item in datas" :title="item.notifyTitle" :content="item.notifyContent" :date="formateDataWithT(item.updateTime)" :isTop="item.notifyTop" :id="item.notifyId"/>
                
            </div>
            <div class="flex-grow"></div>
            <a-spin v-if="isMore" class=" my-3"/>
            <a-empty v-if="!isMore" class="my-3" description="——到底啦——"/>

        </div>

    </div>

</template>

<script setup>
import { LeftOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import NotifyItem from '../../components/notify/NotifyItem.vue';
import MainItem from '../../components/MainItem.vue';
import { useBlogStore } from '../../stores/store';
import { getNotify,getNotifyById,postNotify,updateNotify,deleteNotify } from '../../request/api/notify.js'
import { onMounted,ref } from 'vue';



const store = useBlogStore();
const router = useRouter();
const route = useRoute();


const count = 15;
let index = ref(0);

let datas = ref([]);
let isMore = ref(true);

const mainView = ref();

async function startGetNotify(){
    if(isMore.value){
        let res = await getNotify(count,index.value);
        if(res.data.success){
        index.value++;
        if(res.data.data.total <= count*index.value){
                isMore.value = false;
            }
        if(datas.value.length == 0){
            datas.value=res.data.data.data;
        }else{
            datas.value = datas.value.concat(res.data.data.data);
        }
        
        }
    }
}

//去除日期中的T
function formateDataWithT() {
    //时间格式中含有T
    let date = '2022-12-15T16:14:24',
    dateTimeres = date.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')
    return dateTimeres;
}
//是否滚动到底部
function handleScroll(e){
    const {scrollTop, clientHeight, scrollHeight} = e.target
    // console.log(scrollTop+"  "+clientHeight+"  "+scrollHeight)
      if (scrollTop + clientHeight >= scrollHeight){
        //滚动到底部，继续获取信息
        startGetNotify();
      }
}

onMounted(()=>{
    startGetNotify();
})



</script>

<style>
.icon{
    font-size: 18px;
}

</style>