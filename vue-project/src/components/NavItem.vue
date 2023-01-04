<template>
    <li>
        <template :class="['block px-3 py-3 rounded-xl hover:bg-white-hover hover:duration-300 duration-300', isActive ? 'text-white' : 'md:bg-white-hover-second']">
            <slot></slot>
        </template>
    </li>
</template>

<script setup>

const props = defineProps({
    isActive: {
        type: Boolean,
        required: false,
    },
    herf: {
        type: String,
        required: false,
    }
})

</script>

<style>

</style>