<template>
  <div class="box">
    <h3> Child_Two </h3>
    <div> message: {{ message || "稍微等待一会儿..." }}</div>
  </div>
</template>

<script>
// 在接收数据的组件中，找到总线，绑定事件，留下回调，接收参数;
export default {
  name: "Child_Two",
  data(){
    return {
      message: "",
    }
  },
  mounted() {
    this.$bus.$on("getData", this.getData);
  },
  methods: {
    getData(msg) {
      this.message = msg;
      console.log(">>> message:", msg);
    },
  }
}
</script>

<style scoped>

</style>