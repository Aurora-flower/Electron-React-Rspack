# 开发过程中问题记录

1. 类型初始化不当造成的错误

    **场景**:

        (Swicth) 组件中期望传入的 `Boolean` 类型，但是传入的类型为 `Number`，显示为关闭状态。
        需要根据外部传入的值显示，外部值改变时，会发现赋值不成功。

    **调试过程**:

        - 原数据: `undefined`
        - 第一次修改: `1` (Number) - 初始获取
        - 第二次修改: `0` (Number) - Switch 组件触发 `onChange` 事件，由于类型不匹配，显示仍为关闭状态。
        - 第三次修改: `0` (Number) - 初始获取 - 由于监听着外部变化，值被完全更改。

    **解决办法**:

        确保传入的参数类型与组件的预期类型一致。

2. 同步循环与闭包陷阱

    原写法:

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

    - `同步循环问题`:forEach 会同步创建所有定时器，所有动画帧的定时器会同时开始计时
    - `闭包陷阱`:setTimeout 回调中访问的 index 最终会是循环结束后的值(此代码使用了参数传入的 index，问题暂不存在)

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

3. eval 函数报错

    **原因**:
    在开启 CSP 时， webpack 打包构建的资源内部使用 `eval()` 函数，导致 CSP 策略无法正常工作。

    **解决方式**:
    指定 `devtool` 属性 为 `source-map`，控制 Source Map 的生成方式，从而避免 `eval()` 函数的使用。

4. 使用 react-router-dom 后，本地刷新匹配 404 问题

    **原因**:
    在单页应用中，前端负责处理页面间的导航和内容的更新，而服务器只提供初始的 HTML 页面。
    当用户刷新页面或直接访问某个内部路径时，服务器会尝试根据 URL 找到对应的资源文件。
    由于 SPA 中的路径是由前端路由管理的，服务器上实际上并没有这些路径对应的资源文件，因此会产生 404 错误。

    **解决方式**:
    让服务器在接收到未知路径的 GET 请求时，总是返回 SPA 的入口 HTML 文件，从而让前端路由接管并显示正确的页面内容。

5. 一旦引入 `@douyinfe/semi-ui` 组件库的使用，在打包时会报错

    ```text
    Field 'browser' doesn't contain a valid alias configuration
    ```

    **原因**:

    需要配置适当的 Loader 来处理 JS、CSS 文件，哪怕我的代码中未使用；

    **解决方式**:

    配置 webpack 的 `rules` 以及 `extensions` 配置项，关于 js、css 的处理。

6. 无法使用 webpack 的 `require.context` 函数 ✅

    错误提示：类型“NodeRequire”上不存在属性“context”

    **原因**:
    TypeScript 默认不识别 require.context 这个方法

    **解决方式**:

    安装依赖 `@types/webpack-env`

    ```TypeScript
    declare global {
      interface NodeRequire {
        /** A special feature supported by webpack's compiler that allows you to get all matching modules starting from some base directory.  */
        context: (
          directory: string,
          useSubdirectories: boolean,
          regExp: RegExp
        ) => any;
      }
    }
    export {};
    ```
