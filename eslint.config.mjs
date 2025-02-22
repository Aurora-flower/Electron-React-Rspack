/**
 * @file ESLint 的扁平配置（flat config）
 */
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';
// import pluginReact from 'eslint-plugin-react';

const ignores = ['app/', 'dist/', 'node_modules/', 'temp/'];

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

export default [
  /* ***** ***** ***** ***** 忽略 ***** ***** ***** ***** */
  //   ignorePatterns: ignores
  {
    /**
     * @summary
     * 如果一个配置对象只有 ignores，没有其他字段，它会全局生效；
     * 如果一个配置对象既有 ignores，也有rules，它只在该配置对象范围内生效。
     */
    ignores
  },

  /* ***** ***** ***** ***** 公共配置 ***** ***** ***** ***** */
  {
    languageOptions: {
      globals: /* globals.browser,*/ {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 'latest'
      }
    }
  },

  /* ***** ***** ***** ***** JS\TS 专属配置 ***** ***** ***** ***** */
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    ...pluginJs.configs.recommended
  },

  /* ***** ***** ***** ***** React 配置  ***** ***** ***** ***** */

  {
    files: ['**/*.{jsx,tsx}'],
    // ...pluginReact.configs.flat.recommended,
    settings: {
      react: { version: 'detect' } // 自动检测 React 版本
    },
    // plugins: ['react'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  /* ***** ***** ***** ***** 代码规则 ***** ***** ***** ***** */
  {
    rules: {
      /* 允许使用未定义的变量 -- 暂时写法，对全局类型处理 */
      'no-undef': 'off',

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
      'no-fallthrough': 'warn',

      /* 允许使用 any */
      '@typescript-eslint/no-explicit-any': 'warn',

      /**
       * @summary 允许使用未使用的变量
       * @see {@link https://eslint.org/docs/latest/rules/no-unused-vars}
       * @see {@link https://typescript-eslint.io/rules/no-unused-vars/}
       */
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          /**
           * @summary
           * - `all` - 检查所有变量的使用情况
           * - `local` - 只检查局部变量的使用情况
           */
          vars: 'all',

          /**
           * @summary
           * 忽略名称与 regexp 模式匹配的变量
           */
          varsIgnorePattern: '^_',

          /**
           * @summary
           * - `after-used` - 不会检查在上次使用的参数之前出现的未使用的位置参数，但会检查所有命名参数和上次使用的参数之后的所有位置参数。
           * - `all` - 必须使用所有命名参数。
           * - `none` - 不要检查参数。
           */
          args: 'after-used',

          /**
           * @summary
           * 忽略名称与 regexp 模式匹配的参数
           */
          argsIgnorePattern: '^_',

          /**
           * @summary
           * 对于 `try {} catch (error) {}` 块中的错误对象
           * - `all` - 必须使用所有命名参数。这是默认设置。
           * - `none` - 不检查错误对象。
           */
          caughtErrors: 'none',

          /**
           * @summary
           * 忽略名称与 regexp 模式匹配的错误对象
           */
          caughtErrorsIgnorePattern: '^_',

          /**
           * @summary
           * 忽略名称与 regexp 模式匹配的数组解构模式的元素
           */
          destructuredArrayIgnorePattern: '^_',

          /**
           * @summary
           * 使用 Rest 属性可以从对象中“省略”属性，但默认情况下，同级属性被标记为“未使用”。
           */
          ignoreRestSiblings: false,

          /* 将报告与任何有效 ignore 匹配的变量 pattern 选项 */
          reportUsedIgnorePattern: false
        }
      ],

      /* 允许使用没有副作用的表达式  */
      'no-unused-expressions': noUnusedConfig,
      '@typescript-eslint/no-unused-expressions': noUnusedConfig

      /* 允许无效转义 */
      // 'no-useless-escape': 'off'
    }
  }
];
