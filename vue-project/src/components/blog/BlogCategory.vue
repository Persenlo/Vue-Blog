<template>

    <div class=" transition-all flex items-center overflow-scroll-x h-12 gap-x-5 px-3">
        <span  
            @click="$emit('category',-1)" 
            class=" transition-all rounded-lg px-4 py-2 hover:bg-white-bg-second" 
            :class="[currentCategory == -1? 'bg-white-bg-second' : 'bg-white']">
            全部
        </span>
        <span 
            v-for="item in datas"  
            @click="$emit('category',item.categoryId)" 
            class="  transition-all rounded-lg px-4 py-2 hover:bg-white-bg-second" 
            :class="[currentCategory == item.categoryId? 'bg-white-bg-second' : 'bg-white']">
            {{ item.categoryName }}
        </span>
    </div>

</template>

<script setup>

const props = defineProps({
    datas: {default:[]},
    currentCategory: {default: -1}
})

</script>

<style>

</style>