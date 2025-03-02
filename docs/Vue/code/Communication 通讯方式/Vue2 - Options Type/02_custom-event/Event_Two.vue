<template>
    <div class="box">
      <div> Event_Two </div>
      <br>
      <button @click="click_target"> Click </button>
    </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
    name: "Event_Two",
  methods: {
    click_target(){
      // $emit 手动触发自定义事件
      this.$emit("trigger", 20);
    },
  }
}
</script>

<style lang="less" scoped>
.box {
  border: 1px solid indianred;
}
</style>