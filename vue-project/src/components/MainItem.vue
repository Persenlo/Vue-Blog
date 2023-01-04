<template>

<div
        :class="
         ['select-none px-3 py-3 flex items-center justify-center duration-300 rounded-lg ', noBg? '':'bg-white-bg', noHover?'':'hover:bg-white-bg-second hover:duration-300']">
        <slot class=" w-6 h-6"></slot>
    </div>

</template>

<script setup>

const props = defineProps({
    noBg:{
        type: Boolean,
        required: false,
    },
    noHover:{
        type: Boolean,
        required: false,
    }
})

</script>

<style>

</style>