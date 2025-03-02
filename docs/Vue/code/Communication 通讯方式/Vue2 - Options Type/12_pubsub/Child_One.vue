<template>
  <div class="box">
    <div>One: {{ message }}</div>
    <br>
    <button @click="clickHandler"> Send</button>
    <hr>
  </div>
</template>

<script>
import PubSub from "pubsub-js";

export default {
  name: "Child_One",
  data() {
    return {
      message: "我在北京等你",
    }
  },
  methods: {
    clickHandler() {
      // 发布消息，传递参数
      PubSub.publish("getData", this.message);
    }
  },
};
</script>

<style scoped>
</style>
