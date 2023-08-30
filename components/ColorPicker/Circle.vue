<template>
    <button class="w-full h-4 cursor-pointer" :style="`background-color: ${color}`">
    </button>
</template>

<script setup>
const props = defineProps(['color'])

</script>