# 开发过程中问题记录

1. 类型初始化不当造成的错误

场景：

    (Swicth) 组件中期望传入的 `Boolean` 类型，但是传入的类型为 `Number`，显示为关闭状态。
    需要根据外部传入的值显示，外部值改变时，会发现赋值不成功。

调试过程:

    原数据: `undefined`
    第一次修改: `1` (Number) - 初始获取
    第二次修改: `0` (Number) - Switch 组件触发 `onChange` 事件，由于类型不匹配，显示仍为关闭状态。
    第三次修改: `0` (Number) - 初始获取 - 由于监听着外部变化，值被完全更改。

解决办法:

    确保传入的参数类型与组件的预期类型一致。

2. 同步循环与闭包陷阱

原写法：

    ```JavaScript
    function previewSignleAction() {
    animateStore.getFrameList.forEach((item, index) => {
        currentFrameIndex.value = index;
        let timer = setTimeout(
        () => {
            animateLayer.animate?.clear();
            renderAnimate(item, animateLayer.animate);
            clearTimeout(timer);
        },
        (item.delay || 0.1) * 1000
        );
    });
    }
    ```

问题分析:

- `同步循环问题`：forEach 会同步创建所有定时器，所有动画帧的定时器会同时开始计时
- `闭包陷阱`：setTimeout 回调中访问的 index 最终会是循环结束后的值(此代码使用了参数传入的 index，问题暂不存在)

修改代码:

    ```JavaScript
    async function previewSignleAction() {
    animateLayer.animate?.clear()

    for (const [index, item] of animateStore.getFrameList.entries()) {
        currentFrameIndex.value = index

        await new Promise((resolve) => {
        setTimeout(() => {
            animateLayer.animate?.clear()
            renderAnimate(item, animateLayer.animate)
            resolve(true)
        }, (item.delay || 0.1) * 1000)
        })
    }

    currentFrameIndex.value = -1
    }
    ```
