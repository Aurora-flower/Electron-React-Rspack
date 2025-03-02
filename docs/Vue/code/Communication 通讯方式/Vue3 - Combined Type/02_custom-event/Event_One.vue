<template>
  <!-- 无唯一根标签包裹  -->
	<h3 class="box" @click="touch_clone">Event_One</h3>
</template>

<script lang="ts" setup>
import {defineEmits} from "vue";

// 无 ts 类型写法 - string[] 写法，可以接收一个数组，同时触发多个自定义事件；
const emits = defineEmits(
    ["click"] // 被 defineEmits 接收的事件也会解析为自定义事件
);
// console.log(emits); // (event, ...args) => instance.emit(event, ...args)



const touch_clone = () => {
  emits("click", 2);
}
</script>
