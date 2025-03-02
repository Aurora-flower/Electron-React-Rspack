<template>
  <div class="box">
    <GrandChild/>
  </div>
</template>

<script>
import GrandChild from './GrandChild.vue'

export default {
  name: 'Child',
  components: {
    GrandChild
  }
}
</script>

<style lang="less" scoped>
</style>
