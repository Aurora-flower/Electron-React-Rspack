<template>
    <div class="box">
        <Child_One></Child_One>
        <Child_Two></Child_Two>
    </div>
</template>

<script>
import Child_One from "@/pages/12_pubsub/Child_One.vue";
import Child_Two from "@/pages/12_pubsub/Child_Two.vue";
export default {
    name: "PubsubTest",
    components: { Child_One, Child_Two }
}
</script>

<style scoped>

</style>