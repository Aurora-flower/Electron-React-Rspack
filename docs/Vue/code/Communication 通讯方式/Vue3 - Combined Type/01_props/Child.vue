<template>
  <div class="box">
    <h3>Child</h3>
    <div> message: {{ message }}</div>
    <div> data: {{ data["name"] }}</div>
    <button @click="changeData"> change</button>
    <br>
    <label for="">
      <input type="text" @input="changeMsg">
    </label>
  </div>
</template>

<script lang="ts" setup>
// defineProps 用于接收 props 参数

// region >>> 接收 props 参数 (三种方式)

// 数组形式
// const props = defineProps(["message"]);

// 对象形式
// const props = defineProps({
//   message: String 字符串,
// })

// region >>> 配置对象形式
// const props = defineProps(
//     {
//       message: {
//         type: String 字符串,
//         // default: "message",
//         require: false,
//       },
//       data: {
//         type: Object,
//         default: ()=> ({}), // 对象默认值写法
//       }
//     }
// )
// endregion

// 配置 ts 形式 (interface)
interface PropsModel {
  message: string,
  data: { name: string }, // 对象写法
  // data: object, // 对象写法
  changeData: () => void, // 函数写法
  changeMsg: ()=> void,
}
const props = defineProps<PropsModel>();

// endregion

console.log(props); // 得到一个代理对象


</script>
