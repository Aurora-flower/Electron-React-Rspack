<template>
  <div class="box">
    <h3>Son: {{ money }}</h3>
    <button @click="toDadMoney(50)">To Dad: 50</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  data() {
    return {
      money: 3000
    }
  },
  methods: {
    toDadMoney(num) {
      this.money -= num;
      this.$parent.money += num;
    },
  }
}
</script>
