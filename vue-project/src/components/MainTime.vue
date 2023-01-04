<template>

    <div
        v-if="time!=''" 
        class="
         select-none    
         px-3 py-3
         flex flex-col items-center">
        <p class=" transition-all font-bold font-mono text-5xl lg:text-6xl text-white">{{ time }}</p>
        <p class=" transition-all pt-3 text-md lg:text-xl font-bold text-white">{{ date }}</p>
    </div>

</template>

<script setup>
import { onMounted,ref } from 'vue';

let time = ref('');
let date = ref('');

function getNowTime() {
    let speed = 1000;
    let theNowTime = function () {
        timeNumber();
    }
    setInterval(theNowTime, speed);
}
function timeNumber() {
    let today = new Date()
    date.value = today.getFullYear() + '年' + twoDigits(today.getMonth() + 1) + '月' + twoDigits(today.getDate()) + '日';
    time.value = twoDigits(today.getHours()) + ':' + twoDigits(today.getMinutes()) + ':' + twoDigits(today.getSeconds());
}
function twoDigits(val) {
    if (val < 10) return '0' + val;
    return val;
}

onMounted(()=>{
    timeNumber();
    getNowTime();
})








</script>

<style>

</style>