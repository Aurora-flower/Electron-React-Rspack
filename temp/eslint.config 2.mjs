/**
 * @file ESLint 的扁平配置（flat config）
 */
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { fixupConfigRules } from '@eslint/compat';
import reactHooks from 'eslint-plugin-react-hooks';
import reactJsx from 'eslint-plugin-react/configs/jsx-runtime.js';
import react from 'eslint-plugin-react/configs/recommended.js';

const noUnusedConfig = [
  'error',
  {
    /* 允许使用 JSX */
    enforceForJSX: true,

    /* 允许使用短路运算符 */
    allowShortCircuit: true,

    /* 允许使用三元运算符 */
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
  '**/docs/other',
  'temp/'
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
    ...pluginReact.configs.flat.recommended
  },
  ...fixupConfigRules([
    // ...pluginReact.configs.flat.recommended,
    {
      ...react,
      settings: {
        react: { version: 'detect' } // 自动检测 React 版本
      }
    },
    reactJsx
  ]),
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

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

      /* 允许使用没有副作用的表达式 | 变量 */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          /* 下划线变量 */
          argsIgnorePattern: '^_'
        }
      ],
      'no-unused-expressions': noUnusedConfig,
      '@typescript-eslint/no-unused-expressions': noUnusedConfig,

      /* 允许使用 any */
      '@typescript-eslint/no-explicit-any': 'warn',

      /* 无效 转义 */
      'no-useless-escape': 'warn'

      /* 允许使用 rest 参数 */
      // 'prefer-rest-params'
    }
  }
];
