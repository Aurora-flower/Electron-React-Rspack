/**
 * @file gulp 自动任务脚本配置
 * @see {@link https://gulp.nodejs.cn/docs/en/api/concepts Gulp API 文档}
 *
 * @remarks
 * Gulp 提供了两种强大的组合方法，`series()` 和 `parallel()`，允许将单个任务组合成更大的操作。
 * 两种方法都接受任意数量的任务函数或组合操作。
 * series() 和 parallel() 可以自行嵌套或彼此嵌套任意深度。
 *
 *
 * - 关于 API:
 * 1. `series` - 让任务按顺序执行。
 *    series() 函数接受一个或多个任务函数，返回一个任务函数，该任务函数将按顺序依次调用这些任务函数。
 * 2. `parallel` - 使任务以最大并发度运行。
 *    parallel() 函数接受一个或多个任务函数，返回一个任务函数，该任务函数将并行调用这些任务函数。
 * 3. `watch` - 监视文件系统，当文件系统发生更改时，自动重新构建。
 *    watch() 函数接受一个或多个文件路径，返回一个任务函数，该任务函数将监视这些文件，并调用相应的任务函数。
 *    允许在发生更改时监视全局并运行任务。任务与任务系统的其余部分统一处理。
 */
const Dev = require('./tasks/dev');

module.exports = {
  Dev
};
