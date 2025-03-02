<template>
  <div class="box">
    <!-- 原始写法-->
    <!--<div> Child_One: {{$store.state.one}} </div>-->

    <!-- 映射写法 -->
    <div> Child_One: {{one}}</div>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "Child_One",
  computed: {
    // 数组写法
    // ...mapState(["one"]),

    // 对象返回值写法
    ...mapState({
      one: state => state.one,
    }),
  }
};
</script>

<style scoped>
</style>
