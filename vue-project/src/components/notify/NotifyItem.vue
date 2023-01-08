<template>

    <div class=" flex justify-center items-center duration-300 hover:pb-3" style=" height: 155px; width: 100%;"  >
        <div class=" rounded-lg  bg-white duration-300 hover:bg-white-bg p-3 " style=" height: 150px; width: 100%; ">
        <div class="  inset-5 flex flex-col gap-y-2">
            <div class="flex justify-center items-center gap-x-3">
                <p class="pt-1 px-2 font-bold text-lg whitespace-nowrap overflow-ellipsis overflow-hidden flex-grow" >{{props.title}}</p>
                <PushpinFilled v-if="props.isTop==1" class=" text-blue"></PushpinFilled>
            </div>
            <p class=" px-2 pb-1">{{props.date}}</p>
            <p class="content text-md px-2 mr-7 mb-3" style="">{{props.content}}</p>
        </div>
        
        
    </div>
    </div>

</template>

<script setup>
import { PushpinFilled } from '@ant-design/icons-vue';


const props = defineProps({
    id:{
        require: true,
    },
    title:{
        type: String,
        require: true,
    },
    content:{
        type: String,
        require: true,
    },
    date:{
        type: String,
        require: true,
    },
    isTop:{
        require: true,
    }
})

</script>

<style scoped>
.content {
    display: -webkit-box;
    /*弹性伸缩盒子*/
    -webkit-box-orient: vertical;
    /*垂直排列*/
    line-clamp: 2;
    -webkit-line-clamp: 2;
    /*只显示6行*/
    overflow: hidden;
    /*溢出隐藏*/
    text-overflow: ellipsis;
    /*省略号代替*/
}
</style>