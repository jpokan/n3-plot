<template>
    <div id="colorPickerBox" name="colorPicker" class="rounded-lg bg-stone-100 w-[419px] p-[6px] cursor-move shadow-lg">
        <div v-if="currentBox"> {{ currentBox.id }} | {{ currentBox.layer }}</div>
        <div class="flex flex-wrap flex-col-reverse h-[84px] gap-[1px] mb-1">
            <ColorPickerButton @click="pick(item.rgb)" @mouseover="hovering(item.rgb, item.aci)" :id="`Color_${item.aci}`"
                :title="`Color ${item.aci}`" v-for="item in groupEvens" :style="`background-color: ${item.rgb}`" />
        </div>
        <div class="flex flex-wrap flex-col h-[84px] gap-[1px]">
            <ColorPickerButton @click="pick(item.rgb)" @mouseover="hovering(item.rgb, item.aci)" :id="`Color_${item.aci}`"
                :title="`Color ${item.aci}`" v-for="item in groupOdds" :style="`background-color: ${item.rgb}`" />
        </div>
        <div class="flex flex-wrap mt-1 gap-[1px]">
            <ColorPickerButton @click="pick(item.rgb)" @mouseover="hovering(item.rgb, item.aci)" :id="`Color_${item.aci}`"
                :title="`Color ${item.aci}`" v-for="item in groupStart" :style="`background-color: ${item.rgb}`" />
        </div>
        <div class="flex flex-wrap mt-1 gap-[1px]">
            <ColorPickerButton @click="pick(item.rgb)" @mouseover="hovering(item.rgb, item.aci)" :id="`Color_${item.aci}`"
                :title="`Color ${item.aci}`" v-for="item in groupEnd" :style="`background-color: ${item.rgb}`" />
        </div>
        <div class="flex justify-between ">
            <div>Index color: {{ index }}</div>
            <div class="text-right">{{ rgb }}</div>
        </div>
    </div>
</template>

<script setup>
import aci from 'assets/aci/aci.js'
const props = defineProps(['color'])
const currentBox = useState('currentBox')
const visible = useState('visible')

const rgb = ref('')
const index = ref('')

function pick(rgb) {
    // Get current theme svg
    const theme = useState('theme-' + currentBox.value.id)

    // Update svg drawing
    theme.value.updateSVGColor(currentBox.value.layer, rgb)

    // Update theme style
    const style = theme.value.stylesList.find(({ layer }) => layer === currentBox.value.layer)
    style.setColor(rgb)

    // Save to localstorage
    theme.value.save()
}

onMounted(() => {
    // Hide color picker if clicked outside
    document.addEventListener('click', (e) => {
        const attribute = e.target.getAttribute('name')
        const colorPickerBox = e.target.closest('#colorPickerBox')
        // Check if target has colorPicker attribute or is inside colorPickerBox element
        if (attribute === 'colorPicker' || colorPickerBox) {
            visible.value = true
        } else {
            visible.value = false
        }
    })

    let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;
    let el = document.querySelector('#colorPickerBox')

    function mouseMove(e) {
        // calculate the new position
        newPosX = startPosX - e.clientX;
        newPosY = startPosY - e.clientY;

        // with each move we also want to update the start X and Y
        startPosX = e.clientX;
        startPosY = e.clientY;

        // set the element's new position:
        el.style.top = (el.offsetTop - newPosY) + "px";
        el.style.left = (el.offsetLeft - newPosX) + "px";
    }

    // when the user clicks down on the element
    el.addEventListener('mousedown', function (e) {
        e.preventDefault();

        // get the starting position of the cursor
        startPosX = e.clientX;
        startPosY = e.clientY;

        document.addEventListener('mousemove', mouseMove);

        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', mouseMove);
        });

    });

})

// Displays preview values of color index and rgb values
function hovering(colorValue, aciValue) {
    rgb.value = colorValue
    index.value = aciValue
}

const table = ref(aci.list)
const groupStart = computed(() => {
    return table.value.slice(1, 10)
})

const groupEvens = computed(() => {
    return table.value.slice(10, 250).filter((n) => n.aci % 2 === 0)
})

const groupOdds = computed(() => {
    return table.value.slice(10, 250).filter((n) => n.aci % 2 !== 0)
})

const groupEnd = computed(() => {
    return table.value.slice(250, 256)
})

</script>

<style></style>