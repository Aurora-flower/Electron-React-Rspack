<template>
	<div class="box">
		<h4>Child_Two</h4>
		<input type="text" @input="InputChange">
	</div>
</template>

<script lang="ts" setup>
// region >>> 接收 props
interface PropsModel {
    str: string,
}

const props = defineProps(["modelValue", "str"]);
const {modelValue,  str} = props;
console.log(">>> props:", props);
// endregion


// region >>> 接收自定义事件
interface EmitsModel {
    (e: string): void
}

const emits = defineEmits(["update:modelValue", "update:str"]);
// console.log(">>> emits:", emits);
// endregion


// region >>> 定义函数
// Tip: 接收一个事件对象，目标对象是个 DOM 元素。
const InputChange = (e: Event) => {
    console.log(">>> InputChange:", (e.target as HTMLInputElement).value);
    emits("update:modelValue", (e.target as HTMLInputElement).value);
		emits("update:str", (e.target as HTMLInputElement).value);
};
// endregion


</script>
