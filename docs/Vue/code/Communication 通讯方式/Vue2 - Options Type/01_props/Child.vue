<template>
  <div class="box">
    <div>
      <h3>Child</h3>
      <div>普通属性: {{ message }}</div>
      <br>
      <div>v-bind 基本数据类型: {{ value }}</div>
      <button @click="change_value"> change_value </button>
      <br><br>

      <button @click="change_add"> change_add </button>
      <button @click="change_sub"> change_sub </button>
      <br><br>


      <div>v-bind 引用数据类型: {{ obj }}</div>
      <div>v-bind 引用数据类型 - name: {{ obj.name }}</div>
      <div>v-bind 引用数据类型 - age: {{ obj.age }}</div>
      <button @click="change_obj"> change_obj</button>
      <br><br>


      <button @click="change_obj_address">changeAddress</button>
      <button @click="change_obj_attribute">changeAttribute</button>

      <br><br>
      <button @click="fun_test($event)"> fun_test </button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Child",
  // 1. 字符串数组形式接收 props 参数
  // props: ["message", "value", "obj"], // ["props 属性名" ]

  // 2. 对象形式接收 props 参数
  // props: {
  //   // 属性名: 数据类型
  //   message: String 字符串,
  //   value: Number,
  //   obj: Object,
  // },

  // 3. 对象配置形式接收 props 参数
  props: {
    message: {
      type: String, // 数据类型
      required: true, // 是否必填
    },
    value: {
      type: Number, // 数据类型
      default: 10, // 默认值 - 基本数据类型
    },
    obj: {
      type: Object,
      /*
      Tip: 引用数据类型的默认值， Object/Array 类型不能直接定义空对象或空数组，
      必须使用工厂函数 return 回一个默认值。
      */
      default: () => ({}),  // 默认值 - 引用数据类型
    },
    fun_test: {
      type: Function,
      required: false,
    },
    add: {
      type: Function,
      required: false,
    },
    sub: {
      type: Function,
      required: false,
    },
    changeAddress: {
      type: Function,
      required: false,
    },
    changeAttribute: {
      type: Function,
      required: false,
    },
  },
  methods: {
    // [测试] - 尝试直接修改基本数据类型 - 【error】
    change_value(){
      // Tip: 避免直接更改属性，因为每当父组件重新渲染时，该值将被覆盖
      // this.$props.value = 2;
      console.log(this.value);
      // console.log(this.$props.value);
    },
    change_add(){
      this.add();
    },
    change_sub(){
      this.sub();
    },
    change_obj(){
      // Tip: 避免直接更改属性，因为每当父组件重新渲染时，该值将被覆盖
      // this.$props.obj = {
      //   name: "huayin"
      // }
      // 可以直接改变属性，但违反了单向数据流；
      this.$props.obj.name = "huayin";
    },
    change_obj_address(){
      this.changeAddress();
    },
    change_obj_attribute(){
      this.changeAttribute();
    },
  }
}
</script>

<style scoped>

</style>
