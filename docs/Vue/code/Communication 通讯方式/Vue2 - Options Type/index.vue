<template>
  <div class="com">
    <h1>
      <span style="color: red;"> Vue 组件间通信/传值(重要)</span>
    </h1>
    <div class="box">
      <router-link to="/props">props 参数</router-link>
      <router-link to="/event">自定义事件</router-link>
      <router-link to="/bus">bus 事件总线</router-link>
      <router-link to="/model">v-model</router-link>
      <router-link to="/sync">.sync 修饰符</router-link>
      <router-link to="/attrs-listeners">$attrs & $listeners</router-link>
      <router-link to="/ref-children-parent">$ref & $children & $parent</router-link>
      <router-link to="/mixin">mixin 混入</router-link>
      <router-link to="/provide-inject">provide-inject 提供-注入</router-link>
      <router-link to="/vuex">vuex 集中状态管理</router-link>
      <router-link to="/slot">slot 插槽</router-link>
      <router-link to="/pubsub">Pubsub 消息订阅插件</router-link>
    </div>
    <br>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Communication', // 通信
}
</script>

<style lang="less" scoped>
.com {
  margin: 10px;

  a {
    font-size: 16px;
    margin-right: 65px;

    width: max-content;
    &.router-link-active {
      color: red;
    }
  }
}

.box {
  border: solid 1px #aaa;
  margin: 5px;
  padding: 5px;
}

</style>