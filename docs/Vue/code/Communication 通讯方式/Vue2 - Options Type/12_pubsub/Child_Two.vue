<template>
  <div>
    Two: {{msg || "稍微等待一会儿..."}}
  </div>
</template>

<script>

import PubSub from "pubsub-js";

export default {
  name: "Child_Two",
  data(){
    return {
      msg: "",
    }
  },
  mounted() {
    setTimeout(()=>{
      // 订阅消息，留下回调
      PubSub.subscribe("getData", this.getData);
    }, 1500)
  },
  methods:{
    // 订阅消息的回调，接收的第一个参数是消息类型;
    getData(type , data){
      this.msg = data;
      console.log(">>> Get Data:", type, data);
    }
  }
};
</script>

<style scoped>
</style>
