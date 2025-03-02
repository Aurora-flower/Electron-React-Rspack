<template>
  <div class="box">
    <h3>孙组件</h3>
    <div @click="changeText"> text: {{text}}</div>
    <div @click="changeContent"> content: {{content.name}}</div>
  </div>
</template>

<script>
export default {
  name: "GrandChild",
  inject: ["text", "content"],
  methods: {
    changeText(){
      // 避免直接更改注入的值，因为每当提供的组件重新渲染时，更改都会被覆盖。
      this.text += "hello";
    },
    changeContent(){
      this.content.name += "MioMio"
    },
  }
};
</script>
