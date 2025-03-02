<template>
  <div class="box">
    <div>One: {{msg}}</div>
    <button @click="clickHandler">Modify Message</button>
  </div>
</template>

<script>
export default {
  name: "Child_One",
  props: ["msg"],
  methods: {
    clickHandler(){
      this.$emit("update:msg", "hello world. _ one");
    },
  }
}
</script>

<style scoped>

</style>