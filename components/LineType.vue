<template>
    <select class="w-full" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
        <option v-for="option in defaultLineWeights" :key="option.text" :value="option.value">{{ option.text }}</option>
    </select>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const defaultLineWeights = ref([
    { text: 'Continous', value: '0' },
    { text: 'Dashed', value: '2.28 3.41' }
])
</script>
