/**
 * @file ESLint 的扁平配置（flat config）
 */
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

const noUnusedExpressions = [
  'error',
  {
    enforceForJSX: true,
    allowShortCircuit: true,
    allowTernary: true
  }
];

const ignores = [
  '**/source/common',
  '**/node_modules',
  '**/public',
  '**/test',
  '**/core',
  '**/app',
  '**/gen',
  '**/docs/other'
];

export default [
  {
    // ignorePatterns: ignores

    /**
     * @summary
     * 如果一个配置对象只有 ignores，没有其他字段，它会全局生效；
     * 如果一个配置对象既有 ignores，也有rules，它只在该配置对象范围内生效。
     */
    ignores
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect' // 自动检测 React 版本
      }
    }
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      /* ***** ***** ***** ***** 代码风格 ***** ***** ***** ***** */
      /* 强制使用分号 */
      'semi': ['error', 'always'],

      /* 强制使用单引号 */
      'quotes': [
        'error',
        'single',
        { allowTemplateLiterals: true /* 允许使用模板字符串 */ }
      ],

      /* 限制每个文件的最大行数为 800 行 */
      'max-lines': [
        'error',
        {
          max: 800
        }
      ],

      /* 限制代码最大列数为 80 列 */
      'max-len': [
        'error',
        {
          code: 80,
          ignoreComments: true // 忽略注释的长度限制
        }
      ],

      /* 禁止出现多行空行 */
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1 /* 间隔允许的最大连续空行数 */,
          maxBOF: 0 /* 文件开头的最大空行数  */,
          maxEOF: 0 /* 文件结尾的最大空行数  */
        }
      ],

      /* 允许使用 require */
      '@typescript-eslint/no-require-imports': 'off',

      /* 允许使用 switch 语句的 fallthrough */
      'no-fallthrough': 'off',

      /* 允许使用没有副作用的表达式  */
      'no-unused-expressions': noUnusedExpressions,
      '@typescript-eslint/no-unused-expressions':
        noUnusedExpressions,

      /* 允许使用 any */
      '@typescript-eslint/no-explicit-any': 'warn',

      /* 无效 转义 */
      'no-useless-escape': 'warn'

      /* 允许使用 rest 参数 */
      // 'prefer-rest-params'
    }
  }
];
