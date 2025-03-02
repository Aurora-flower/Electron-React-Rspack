<template>
  <div class="box">
    <div>Value: {{value || "稍微等待一会儿..."}}</div>

    <label for="">
      CustomInput: <input type="text" :value="value" @input="inputHandler">
    </label>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: ["value"],
  methods: {
    inputHandler(e){
      this.$emit("input", e.target.value);
    },
  }
}
</script>

<style lang="less" scoped>

</style>