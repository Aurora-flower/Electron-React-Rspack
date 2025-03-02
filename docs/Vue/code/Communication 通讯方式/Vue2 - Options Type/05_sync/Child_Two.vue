<template>
  <div class="box">
    <div>Two: {{msg}}</div>
    <button @click="clickHandler">Modify Message</button>
  </div>
</template>

<script>
export default {
  name: "Child_Two",
  props: ["msg"],
  methods: {
    clickHandler(){
      this.$emit("update:msg", "hello world. _ two");
    },
  },
}
</script>

<style scoped>

</style>