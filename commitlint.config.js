module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type-enum: 定义提交类型
    'type-enum': [
      2,
      'always',
      [
        'feat' /* 新功能 */,
        'fix' /* 修补 bug */,
        'docs' /* 文档 */,
        'style' /* 代码风格 | 样式 */,
        'refactor' /* 代码重构 */,
        'perf' /* 性能优化 */,
        'test' /* 增加测试 */,
        'build' /* 项目基础变动 | 工具性依赖的安装与配置 | 构建工具相关 */,
        'ci' /* CI 配置相关 */,
        'chore' /* 杂项任务 */,
        'revert' /* 回滚 */,
        'workflow' /* 工作流 */,
        'mod' /* 不明确类型的代码或模块调整 */,
        'wip' /* 开发进行中 */,
        'types' /* 类型定义文件 */,
        'release' /* 版本发布相关 */,
        'merge' /* 分支合并操作 */,
        'bug' /* 修正非功能性问题 */,
        'log' /* 日志类型 */,
        'del' /* 删除 */,
        'assets' /* 资源 */,
        'editor' /* 编辑器配置 */
      ]
    ],
    // subject-case: 定义主题的大小写格式
    'subject-case': [
      2,
      'never',
      [
        'sentence-case',
        'start-case',
        'pascal-case',
        'upper-case'
      ]
    ],
    // subject-full-stop: 定义主题是否以句号结尾
    'subject-full-stop': [2, 'never', '.'],
    // header-max-length: 定义头部的最大长度
    'header-max-length': [2, 'always', 72]
  }
};
