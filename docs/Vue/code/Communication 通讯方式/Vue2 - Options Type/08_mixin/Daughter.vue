<template>
  <div class="box">
    <h3> Daughter: {{ money }}</h3>
    <button @click="toDadMoney(100)">To Dad: 100</button>
  </div>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: 'Daughter',
  // 引入 mixin （数组写法）
  mixins: [mixin],
  data() {
    return {
      money: 2000
    }
  },

}
</script>
