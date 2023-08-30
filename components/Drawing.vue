<template>
	<div class="p-5 shadow-md w-1/2 h-full border-solid border rounded-lg overflow-hidden">
		<SVGFile class="w-full h-full" :id="props.id" />
	</div>
	<!-- <object :id="props.id" :data="svg" type="image/svg+xml"
		class="p-5 shadow-md w-1/2 h-full border-solid border rounded-lg">
	</object> -->
</template>

<script setup>
import panzoom from 'panzoom'
import Theme from 'assets/aci/theme.js'
import SVGFile from 'assets/drawing.svg?skipsvgo'
const props = defineProps(['id'])

// Create theme for each svg
const theme = useState('theme-' + props.id)
// Initial component state to be false
const ready = useState(props.id + '-svg-ready')
ready.value = false

onBeforeMount(() => {
	const acadSVG = document.getElementById(props.id)
	theme.value = new Theme(props.id, acadSVG)
	const item = localStorage.getItem("theme-" + props.id)
	if (item) {
		console.log('theme found:', props.id);
		theme.value.load()
	} else {
		console.log('first time setup:', props.id);
		theme.value.save()
	}

	panzoom(theme.value.svg)
})

onMounted(() => {
	// Set state to be ready, used by Styles.vue Component
	ready.value = true
})

function getPosition(e) {
	// console.log(rect.width, rect.height);
	// console.log(e.offsetX, e.offsetY);
	// console.log(e.x, e.y);
}

function zoom(e) {
	// const rect = e.currentTarget.getBoundingClientRect()

	// const offsetX = e.clientX - rect.left
	// const offsetY = e.clientY - rect.top

	// let dim = (scale.value * 0.1) + 1.0
	// switch (Math.sign(e.deltaY)) {
	// 	case -1:
	// 		scale.value++
	// 		break;
	// 	case 1:
	// 		if (dim > 0.1)
	// 			scale.value--
	// 		break;
	// }

	// const percentX = Math.trunc(100 * offsetX / rect.width)
	// const percentY = Math.trunc(100 * offsetY / rect.height)

	// theme.value.svg.style.transformOrigin = `${percentX}% ${percentY}%`

	// theme.value.svg.style.transform = `scale(${dim})`
	// console.log('zoom', dim);
}

function pan(e) {
	console.log('pan', e);
}
// onMounted(() => {
	// const obj = document.getElementById(props.id).contentDocument.documentElement

// 	if (props.id == 'acad-view') {
// 		// const walls = obj.getElementById('Walls-exterior')
// 		// walls.setAttribute('color', '#fff')
// 		const whiteStrokesList = obj.querySelectorAll('[stroke="#000"]')
// 		for (let item = 0; item < whiteStrokesList.length; item++) {
// 			const element = whiteStrokesList[item]
// 			element.setAttribute('stroke', '#fff')
// 		}
// 	}
// })
</script>

<style scoped>
svg {
	transform: scale(1.0);
	transform-origin: 50% 50%;
}
</style>
