<template>
	<h3>GrandChild</h3>
	<div>Content: {{ content }}</div>
	<div class="box">
<!--		<div>Object:</div>-->
		<div>Name: {{ obj.name }}</div>
		<!--		<div>Age: {{ obj.age }}</div>-->
	</div>
	<button @click="changeHandle">Change</button>
</template>

<script lang="ts">
export default {
    name: 'GrandChild',
}
</script>

<script lang="ts" setup>
import {inject} from "vue";

const obj = inject("obj"); // 引用数据类型
const content = inject("content"); // 基本数据类型
const changeHandle = inject("changeHandle"); // 函数

</script>
