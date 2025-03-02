<template>
  <div class="box">
    <h3> Daughter: {{ money }}</h3>
    <button @click="toDadMoney(100)">To Dad: 100</button>
  </div>
</template>

<script>

export default {
  name: 'Daughter',
  data() {
    return {
      money: 2000
    }
  },
  methods: {
    // $parent 用来获取当前组件的父组件;
    // Tip: 由于有很多时候并不确定父组件，所以使用 $parent 时要小心。
    toDadMoney(num){
      this.money -= num;
      this.$parent.money += num;
    },
  }
}
</script>
