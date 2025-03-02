<template>
  <div class="box">
    <!-- 原始写法-->
    <!--<div> Child_Two: {{ $store.state.two  }}</div>-->
    <!-- 映射写法-->
    <div> Child_Two: {{two}}</div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Child_Two",
  computed: {
    // 数组写法
    // ...mapState(["two"]),

    // 对象返回值写法
    ...mapState({
      two: state => state.two,
    }),
  }
};
</script>

<style scoped>
</style>
