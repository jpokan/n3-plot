<template>
    <select class="w-full" :value="modelValue" @change="$emit('update:modelValue', Number($event.target.value))">
        <option v-for="option in defaultLineWeights" :key="option" :value="option">{{ option }}</option>
    </select>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const defaultLineWeights = ref([
    0.00,
    0.05,
    0.09,
    0.10,
    0.13,
    0.15,
    0.18,
    0.20,
    0.25,
    0.30,
    0.35,
    0.40,
    0.45,
    0.50,
    0.53,
    0.60,
    0.65,
    0.70,
    0.80,
    0.90,
    1.00,
    1.06,
    1.20,
    1.40,
    1.58,
    2.00,
    2.11,
])
</script>