<template>
	<div class="h-screen font-satoshi text-xs relative overflow-hidden">
		<div class="h-3/4 flex gap-2 p-2">
			<Drawing id="acad-view" class="bg-slate-800" />
			<Drawing id="plot-view" class="bg-white" />
		</div>
		<div class="h-1/4 flex gap-2 p-2">
			<Styles for="acad-view" />
			<Styles for="plot-view" />
		</div>
		<ColorPickerBox v-show="visible" class="absolute" />
	</div>
</template>

<script setup>
const visible = useState('visible')
visible.value = false

</script>
