<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <slot></slot>
      <slot name="show" :id="item.id"  :text="item.text" :isComplete="item.isComplete">
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: ["list"],
};
</script>
