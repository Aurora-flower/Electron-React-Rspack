<template>
	<div class="box">
		<ul >
			<li v-for="(item,index) in list" :key="item.id" @click="changeChecked">
				<slot :row="item" :$index="index">
				</slot>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(["list"]);
console.log(">>> props:", props);

const changeChecked = (e: Event) => {
    console.log(">>>", e.target)
}
</script>

<style scoped>
li {
    /*list-style: none;*/
}
</style>