<template>
	<div class="box">
		<h3>Son: {{ money }}</h3>
		<button @click="sendMoney($parent,300)">send Dad 300</button>
	</div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const money = ref(20000);

// TIP: defineExpose 允许组件(组合函数)外部直接修改数据;
defineExpose({money});

const sendMoney = (parent: any, num: number) => {
    if (money.value - num < 0) return;
    money.value -= num;
		parent.money += num;
}

</script>
