<template>
	<div class="box">
		<h3>Daughter: {{ money }}</h3>
		<button @click="sendMoney($parent, 100)">send Dad 100</button>
	</div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const money = ref(10000);

// TIP: defineExpose 与 defineProps 一样，不需要再单独引入;
defineExpose({money});

const sendMoney = (parent: any, num: number) => {
    if (money.value - num < 0) return;
    money.value -= num;
		parent.money += num;
}
</script>
