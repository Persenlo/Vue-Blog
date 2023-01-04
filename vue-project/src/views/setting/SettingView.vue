<template>

    <div class=" select-none">

        <!-- 背景图片 -->
        <a-collapse v-model:activeKey="activeKey"  :bordered="false" expandIconPosition="right">
            <template #expandIcon="{ isActive }">
                <CaretDownOutlined :rotate="isActive ? 180 : 0" />
            </template>
            <a-collapse-panel key="1" header="背景图片" :style="customStyle">
                <div class=" flex flex-col justify-start items-center" style="width: 100%; height: auto;">
                    <div class=" relative w-64 h-32">
                        <!-- 隐藏上传按钮，通过方法调用上传功能 -->
                        <input type="file" id="bg-upload" class=" hidden" accept="image/*" @change="getPicture($event)" />
                        <!-- 上传和背景图预览 -->
                        <img :src="store.nowBG" class=" absolute inset-0 object-cover" style="height: 128px; width: 256px;" />
                        <p @click="callInput" class="inset-0 absolute text-center duration-300 text-alpha hover:bg-white hover:brightness-75 hover:opacity-75 hover:text-black leading-10" style="height: 128px; width: 256px; line-height: 128px;">更改背景</p>
                    </div>
                </div>
            </a-collapse-panel>    
        </a-collapse>

        <!-- 关于 -->
        <a-collapse v-model:activeKey="activeKey"  :bordered="false" expandIconPosition="right">
            <template #expandIcon="{ isActive }">
                <CaretDownOutlined :rotate="isActive ? 180 : 0" />
            </template>
            <a-collapse-panel key="2" header="关于" :style="customStyle">
                <div class="flex flex-col gap-y-1 px-3">
                    <p>制作：Persenlo Design</p>
                    <p>技术：Vue3 + ANTD + TailwindCss</p>
                    <p>声明：本站仅用于学习</p>
                </div>
                
            </a-collapse-panel>    
        </a-collapse>

    </div>

</template>

<script setup>
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { ref,onMounted } from 'vue';
import { liveQuery } from "dexie";
import { db } from "../../utils/db.js";
import { useObservable } from "@vueuse/rxjs";
import { useBlogStore } from '../../stores/store';

const store = useBlogStore();

//折叠面板样式
const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';

let activeKey = ref(['1','2'])


//调用图片上传按钮
function callInput(){
    let fileDom = document.querySelector("#bg-upload")
	fileDom.click();
}
//获取本地图片的base64格式
let bgImgPreview = ref();
let dbImg = ref([]);
function getPicture(e) {
    //将图片文件转化成base64格式图片
    var reader = new FileReader();
    reader.onload = (e) => {
        //e.target.result  就是从本地读取的图片的base64格式
        bgImgPreview.value = e.target.result;
        savePicToDB();
    }
    reader.readAsDataURL(e.target.files[0])
}
//将图片保存到indexdb数据库
async function savePicToDB(){
    if(dbImg.value.length == ''){
        await db.bgpic.add({key: "bg" , pic: bgImgPreview.value});
    }else{
        console.log(bgImgPreview.value)
        await db.bgpic.put({key: "bg" , pic: bgImgPreview.value});
    }
    store.nowBG = bgImgPreview.value;
}




</script>






<style scoped>

</style>