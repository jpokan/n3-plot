<template>
  <div :id="props.id" class="bg-gray-500">a</div>
</template>


<script setup>
import iro from '@jaames/iro'
const props = defineProps(['id'])

onMounted(() => {
  const colorPicker = new iro.ColorPicker(`#${props.id}`, {
    layout: [
      {
        component: iro.ui.Box,
        options: {
          borderColor: '#ffffff',
          borderWidth: 1
        }
      }
    ]
  })
})

</script>

<style scoped>
input[type="color"]::-webkit-color-swatch {
  border-radius: 50%;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-moz-color-swatch-wrapper {
  padding: 0;
}
</style>