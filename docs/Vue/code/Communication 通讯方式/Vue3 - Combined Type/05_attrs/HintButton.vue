<template>
  <!--
  需求: 高亮 Popover 气泡卡片 - clickHint
    placement - 出现位置 - bottom
    title - 标题
    trigger - 触发方式 - click - click/focus/hover/contextmenu
    content - 显示的内容(可以通过写入默认 slot 修改显示内容)
    width - 宽度（最小宽度 150 px）
  -->
	<el-popover
			placement="bottom"
			v-if="!visible"
			trigger="hover"
			:title="title"
			:content="content"
	>
		<template #reference>
			<el-button class="ml-5" v-bind="$attrs" @click="changeVisible">Click to activate</el-button>
		</template>
	</el-popover>
</template>

<script lang="ts" setup>
// region >>> 依赖
import {getCurrentInstance, ref, useAttrs, watch} from 'vue';
// endregion

// region >>> 相关变量

// $attrs
const $attrs = useAttrs();
console.log(">>> $attrs:", $attrs); // click - onClick

// props
// defineProps 使用频率高，vue 宏环境中存在，不需要单独引入；
// interface PropsModel {
//
// }
interface PropsModel {
    title: string,
    content: string
}

const props = defineProps<PropsModel>();
console.log(">>> props:", props);

// 控制 Popover 弹出框的显示
const visible = ref(false);

// emits
const emits = defineEmits<{
    (e: string): void
}>();
console.log(">>> emits:", emits);

// 当前组件实例
const Target = getCurrentInstance();
console.log(">>> CurrentInstance:", Target);
// endregion

// region >>> 定义函数

const changeVisible = () => {
    visible.value = !visible.value;
    console.log(">>> visible:", visible.value);
}
// endregion

// region >>> Hook

// watch
// Tip: 以下两者，效果相同，默认监听 visible 的下一层属性变化
watch(visible, () => {
    emits("trigger");
})

// watch(() => visible, () => {
//     emits("trigger");
// }, {deep: true})

// endregion
</script>

<style lang="less" scoped></style>
