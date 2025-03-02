<template>
  <div class="box">
    <h3>Son: {{ money }}</h3>
    <button @click="toDadMoney(50)">To Dad: 50</button>
  </div>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: 'Son',
  // 引入 mixin （数组写法）
  mixins: [mixin],
  data() {
    return {
      money: 3000
    }
  },
}
</script>
