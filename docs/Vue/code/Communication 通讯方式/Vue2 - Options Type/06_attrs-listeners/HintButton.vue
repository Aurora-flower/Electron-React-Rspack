<template>
  <!--popover
  placement:  出现位置 （string），默认是 bottom；
  title:      标题（string）
  trigger:    触发方式（string），默认是 click；
  content:    显示的内容（string），也可以通过 slot 传入 DOM；
  -->

  <!-- 原始写法 -->
  <!--<el-popover-->
  <!--    placement="top-start"-->
  <!--    width="200"-->
  <!--    trigger="hover"-->
  <!--    :title="title"-->
  <!--    :content="content"-->
  <!--&gt;-->
  <!--  <el-button-->
  <!--      :icon="icon"-->
  <!--      :type="type"-->
  <!--      @clickn.native="clickHandler"-->
  <!--      slot="reference"-->
  <!--  >-->
  <!--    hover 激活-->
  <!--  </el-button>-->
  <!--</el-popover>-->

  <!-- 使用 $attrs 与 $listeners -->
  <el-popover
      placement="top-start"
      width="200"
      trigger="hover"
      :title="title"
      :content="content"
  >
    <!--
      $attrs: （除 props 已接收的, class 与 style 之外） 获取到父组件传递给子组件的所有 props 属性
      $listeners: 获取到子组件标签上所有的事件

      Tip: 绑定 $attrs 时 v-bind 不能简写为 ":"，绑定 $listeners 时 v-on 不能简写为 "@";
    -->
    <el-button
        v-bind="$attrs"
        v-on="$listeners"
        slot="reference">
      hover 激活
    </el-button>
  </el-popover>
</template>

<script>
export default {
  name: "HintButton",
  // props: ["title", "content", "icon", "type", "clickHandler"],
  props: ["title", "content"],

}
</script>

<style scoped>

</style>