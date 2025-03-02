<template>
	<div class="box">
		<h3 @click="send">Child_two</h3>
		<button @click="cancelHandler">cancel</button>
	</div>
</template>

<script lang="ts" setup>
import PubSub from "pubsub-js";

// 发布消息 - 触发事件 - （消息事件名称，传递参数）
// Tip: 当多次点击发布消息时，订阅消息的回调总会重复触发，触发次数与发布消息的次数相同；
const send = () => {
    PubSub.publish("task", "study");
}

// 取消订阅 - 一般在组件销毁前取消订阅 （beforeDestroy \ beforeUnmount）
const cancelHandler = () => {
	PubSub.unsubscribe("task");
}
</script>