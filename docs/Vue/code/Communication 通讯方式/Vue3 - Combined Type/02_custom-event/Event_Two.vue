<template>
  <!-- 有唯一根标签包裹  -->
  <div class="box">
    <h3 @click="touch">Event_Two</h3>
  </div>

</template>

<script lang="ts" setup>
import {defineEmits} from "vue";


// 有 ts 类型写法
// Tip: 为使用接口表示函数类型，需要给接口定义一个调用签名；
// 可以看作一个只有参数列表和返回值类型的函数定义，参数列表的每个参数 都需要名字和类型;
interface EmitsModel {
  (e: string, arg?: number): void;
}

const emits = defineEmits<EmitsModel>()

const touch = () => {
  emits("trigger");
}
</script>