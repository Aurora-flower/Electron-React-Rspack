/**
 * @file eslint 配置文件
 * @see https://eslint.org/docs/latest/use/configure/
 */
import globals from 'globals';
// import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsc from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';

// ************************** Custom **************************
// import JS from '@eslint/js';
// import { fileURLToPath } from 'node:url';
// import { dirname, resolve } from 'node:path';
// import { includeIgnoreFile } from '@eslint/compat';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const gitignorePath = resolve(__dirname, '.gitignore');

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // ************************** Custom **************************
  // {
  //   ...JS.configs.recommended,
  //   files: ['**/*.js'],
  //   languageOptions: {
  //     globals: {
  //       ...globals.node,
  //       ...globals.commonjs
  //     }
  //   }
  // },
  // includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.d.ts'],
    plugins: {
      pluginReact
      // tseslint
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsc,
      // 使用最新发布的ECMAScript版本。
      ecmaVersion: 'latest',
      // 指定模块系统为ES模块。
      // sourceType: 'module',
      // 启用 jsx
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect' // 18
      }
    },
    rules: {
      'indent': [
        'error',
        // 'tab',
        2,
        {
          SwitchCase: 1, // Switch Case 语句的缩进级别
          VariableDeclarator: 1, // 变量声明的缩进级别
          outerIIFEBody: 0, // 立即调用的函数表达式的外部函数体的缩进级别
          MemberExpression: 1, // 成员表达式的缩进级别
          FunctionDeclaration: { parameters: 1 }, // 函数声明参数的缩进
          FunctionExpression: { parameters: 1 }, // 函数表达式参数的缩进
          CallExpression: { arguments: 1 }, // 函数调用参数的缩进
          ArrayExpression: 1, // 数组表达式的元素缩进
          ObjectExpression: 1, // 对象表达式的属性缩进
          ImportDeclaration: 1, // 导入声明的缩进
          flatTernaryExpressions: false, // 是否允许扁平的三元表达式
          ignoredNodes: ['TemplateLiteral *'], // 忽略模板字符串内的缩进
          offsetTernaryExpressions: true // 是否在三元表达式中应用偏移缩进
        }
      ],
      'quotes': [
        'error',
        'single',
        { allowTemplateLiterals: true } // 允许使用模板字符串
      ],
      // 每个文件的最大行数
      'max-lines': [
        'error',
        {
          // max: 600
          max: 1000
        }
      ],
      // 强制代码最大列数为 80
      // 'max-len': [
      //   'error',
      //   {
      //     code: 80
      //   }
      // ],
      // 规定语句必须以分号结尾。
      'semi': ['error', 'always'],
      'no-unused-vars': [
        'off'
        // {
        //   vars: 'all',
        //   args: 'after-used',
        //   caughtErrors: 'all',
        //   argsIgnorePattern: '^_',
        //   ignoreRestSiblings: false,
        //   destructuredArrayIgnorePattern: '^_',
        //   ignoreClassWithStaticInitBlock: false
        // }
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1, // 允许的最大连续空行数
          maxBOF: 0, // 文件开头的最大空行数
          maxEOF: 0 // 文件结尾的最大空行数
        }
      ],
      'prefer-const': [
        'error',
        { ignoreReadBeforeAssign: true }
      ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      // 控制 JSX 元素的缩进
      'react/jsx-indent': ['error', 2],
      // 控制JSX元素属性的缩进
      'react/jsx-indent-props': ['error', 2]
    }
  }
];
