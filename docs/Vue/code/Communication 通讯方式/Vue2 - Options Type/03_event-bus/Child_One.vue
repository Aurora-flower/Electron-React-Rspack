<template>
  <div class="box">
    <h3> Child_One </h3>
    <div>{{ message }}</div>
    <br>
    <button @click="sendHandler"> Send</button>
  </div>
</template>

<script>
// 在发送数据的组件中，找到总线，触发事件，传递参数
export default {
  name: "Child_One",
  data(){
    return {
      message: "this is a news."
    }
  },
  methods: {
    sendHandler(){
      this.$bus.$emit("getData", this.message);
    },
  }
}
</script>

<style scoped>

</style>