<template>
	<div class="box">
		<h3 @click="bindHandler">Child_one</h3>
	</div>
</template>

<script lang="ts" setup>
import PubSub from "pubsub-js";

// 定义事件
const myTask = (arg?: string) => {
    console.log(">>> myTask:", arg || "null")
}

// 订阅消息 - 绑定事件 - （消息事件名称，事件回调-接收参数）
const bindHandler = () => {
    PubSub.subscribe("task", myTask);
    console.log(">>> bind success!")
}

</script>
