<template>
    <div class=" transition-all md:right-24 md:left-40 md:inset-y-6 flex items-center justify-center">
        <div @scroll="handleScroll"
            class=" transition-all bg-white-bg md:rounded-xl select-none overflow-scroll flex flex-col backdrop-blur-md"
            style="width: 100%; height: 100%; max-width: 1550px;">
            <!-- 顶部内容 -->
            <div class=" flex flex-row" style="height: 240px;">
                <banner :datas="bannerDatas" h="160px" class=" w-full mx-2 md:mx-16 my-8" />
                <!-- <div class=" hidden md:block flex-1 w-full h-full bg-white my-8 mx-8 rounded-lg" style="height: 160px;">

                </div> -->
            </div>
            <!-- 分类 -->
            <div class=" flex px-2 md:px-16" style="min-height: 72px;">
                <category :datas="categoryDatas" :currentCategory="currentCategory" @category="changeCategory" class=" flex-grow" />
                <!-- 新增文章 -->
                <MainItem class=" self-start hover:bg-white-hover mr-3" @click="router.push({name: 'blogEdit'})">
                    <PlusOutlined class="icon text-black"></PlusOutlined>
                </MainItem>
            </div>
            <!-- 文章 -->
            <div class="px-2 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8"
                style="width: 100%;">
                <item 
                    v-for="(item, index) in datas" 
                    class="" :id="item.postId" 
                    @click="router.push({name: 'blogView', query: {id: item.postId}})"
                    :title="item.postTitle"
                    :content="item.postContent" 
                    :isTop="item.postTop" 
                    :img="item.postCover" />
            </div>




            <div class="flex-grow"></div>
            <a-spin v-if="isMore" class=" my-3" />
            <a-empty v-if="!isMore" class="my-3" description="——到底啦——" />
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useBlogStore } from '../../stores/store';
import { getPost, getPostByCategory } from '../../request/api/blog.js'
import { getBanner } from '../../request/api/banner.js';
import { getCategory } from '../../request/api/category.js';
import { PlusOutlined } from '@ant-design/icons-vue';
import banner from '../../components/blog/BlogBanner.vue';
import category from '../../components/blog/BlogCategory.vue';
import item from '../../components/blog/BlogPostItem.vue';
import MainItem from '../../components/MainItem.vue';


const store = useBlogStore();
const router = useRouter();
const route = useRoute();

const count = 15;
let index = ref(0);

let datas = ref([]);
let bannerDatas = ref([]);
let categoryDatas = ref([]);
let isMore = ref(true);

let currentCategory = ref(-1);


//切换分类
function changeCategory(id) {
    console.log(id)
    currentCategory.value = id;
    //重置页码
    index.value = 0;
    isMore.value = true
    datas = ref([]);
    startGetPost();
}

//是否滚动到底部
function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    // console.log(scrollTop+"  "+clientHeight+"  "+scrollHeight)
    if (scrollTop + clientHeight >= scrollHeight) {
        //滚动到底部，继续获取信息
        startGetPost
    }
}

//开始获取文章
async function startGetPost() {
    if (isMore.value) {
        if (currentCategory.value != -1) {
            //根据分类获取文章
            let res = await getPostByCategory(count, index.value, currentCategory.value);
            resolveData(res);
        } else {
            //获取全部文章
            let res = await getPost(count, index.value);
            resolveData(res);
        }
    }
}
//处理数据
function resolveData(res) {
    if (res.data.success) {
        index.value++;
        if (res.data.data.total <= count * index.value) {
            isMore.value = false;
        }
        if (res.data.data.total == null) {
            isMore.value = false;
        }
        if (datas.value.length == 0) {
            datas.value = res.data.data.data;
        } else {
            datas.value = datas.value.concat(res.data.data.data);
        }

    }
}

//开始获取轮播图
async function startGetBanner() {
    const res = await getBanner()
    if (res.data.success) {
        bannerDatas.value = res.data.data
    }
}
//开始获取分类
async function startGetCategory() {
    const res = await getCategory()
    if (res.data.success) {
        categoryDatas.value = res.data.data
    }
}

onMounted(() => {
    startGetPost()
    startGetBanner()
    startGetCategory()
})



</script>

<style></style>