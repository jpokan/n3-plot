<template>
  <div class="h-full w-1/2 overflow-y-auto style">
    <table class="table-auto w-full">
      <thead class="sticky top-0">
        <tr class="bg-gray-200">
          <th class="text-left px-2">Layer</th>
          <th>Color</th>
          <th>Lineweight</th>
          <th>Linetype</th>
        </tr>
      </thead>
      <tbody v-if="ready">
        <tr v-for="style in theme.stylesList" class="even:bg-gray-100">
          <td class="capitalize px-2">
            {{ style.layer }}
          </td>
          <td class="flex justify-center items-center">
            <ColorPickerCircle name="colorPicker" @click="openColorPicker($event, style)" :color="style.color" />
          </td>
          <td>
            <LineWeight :key="style.layer + '-lineweight'" v-model="style.lineweight"
              @update:model-value="updateDrawing($event, style.layer, 'stroke-width')" />
          </td>
          <td>
            <LineType :key="style.layer + '-linetype'" v-model="style.linetype"
              @update:model-value="updateDrawing($event, style.layer, 'stroke-dasharray')" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps(['for'])
const emit = defineEmits(['openBox'])
const theme = useState('theme-' + props.for)
const ready = useState(props.for + '-svg-ready')
const currentBox = useState('currentBox')

function updateDrawing(value, layer, attribute) {
  // Select svg element with id of the current layer
  const group = theme.value.svg.querySelector('#' + layer)
  // Select all group elements, add it to list
  const list = group.querySelectorAll(`g`)
  // Apply new line weight, linetype or color to all the elements in that list
  for (let index = 0; index < list.length; index++) {
    const node = list[index]
    if (node.firstChild.nodeName === 'text') {
      node.firstChild.setAttribute('fill', value)
    } else {
      node.firstChild.setAttribute(attribute, value)
    }

    // fix: updates hatch path
    if (node.children.length >= 2) {
      node.children[1].setAttribute(attribute, value)
    }
  }

  // Save to localstorage
  theme.value.save()
}

function openColorPicker(e, style) {
  // 1. Pass id, layer, and color to ColorPickerBox component
  currentBox.value = {
    id: theme.value.id,
    layer: style.layer,
    color: style.color
  }

  const box = document.querySelector('#colorPickerBox')

  box.style.left = e.clientX + 'px'
  box.style.top = (-255 + e.clientY) + 'px'

  console.log(box);

  console.log('updated currentBox ->', currentBox.value.id, currentBox.value.layer, currentBox.value.color);
}

</script>

<style scoped>
.style::-webkit-scrollbar {
  width: 4px;
}

.style::-webkit-scrollbar-track {}

.style::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  /* color of the scroll thumb */
  border-radius: 4px;
  /* roundness of the scroll thumb */
  border: 4px solid transparent;
}
</style>

