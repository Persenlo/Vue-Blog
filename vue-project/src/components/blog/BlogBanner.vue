<template>
    <a-carousel autoplay :style="{ height: h }" class=" rounded-lg overflow-hidden">
        <div v-for="item in datas" class=" relative" @click="jumpToLink(item.bannerLink)">
            <p class=" absolute w-full z-50 top-1/4 text-center text-white text-xl">{{ item.bannerTitle }}</p>
            <p class=" absolute w-full z-50 bottom-1/3 text-center text-white text-xs">{{ item.bannerContent }}</p>
            <img :src="item.bannerCover" :style="{ height: h }" class="w-full object-cover brightness-50">
        </div>
    </a-carousel>
</template>

<script setup>

const props = defineProps({
    datas: { default: [] },
    h: { default: "160px" }
})

function jumpToLink(link) {
    window.open(link)
}

</script>

<style></style>