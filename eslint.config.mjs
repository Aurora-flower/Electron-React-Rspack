import css from "@eslint/css"
import js from "@eslint/js"
import json from "@eslint/json"
import markdown from "@eslint/markdown"
import parser from "@typescript-eslint/parser"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  {
    ignores: [
      "app/",
      "dist/",
      "node_modules/",
      "temp/",
      "backup/",
      "public/resource/scripts/",
      "core/",
      "test/",
      "release/",
      "submodules/",
      "**/scripts/**/*.js",
      // "*.config.*",
      // "*config.*",
      // "*config.*.*",
      "package-lock.json"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: { react: pluginReact },
    settings: {
      react: { version: "detect" }
    }
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"]
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"]
  },
  {
    files: ["**/*.json5"],
    plugins: { json },
    language: "json/json5",
    extends: ["json/recommended"]
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/commonmark",
    extends: ["markdown/recommended"]
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
    rules: {
      "css/no-invalid-at-rules": "off",
      "css/no-invalid-properties": "warn"
      // [
      //   "error",
      //   {
      //     /**
      //      * @theme is a custom at-rule that is used in TailwindCSS.
      //      */
      //     ignoreAtRules: ["theme"]
      //   }
      // ]
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    }
  },
  {
    // files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0
        }
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "export",
          next: "*"
        },
        {
          blankLine: "always",
          prev: "function",
          next: "*"
        },
        {
          blankLine: "always",
          prev: "import",
          next: "function"
        },
        {
          blankLine: "always",
          prev: "import",
          next: "const"
        },
        {
          blankLine: "always",
          prev: "import",
          next: "export"
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "vars": "all",
          "args": "after-used",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          enforceForJSX: true,
          // allowShortCircuit: true,
          allowTernary: true
        }
      ],
      "max-len": [
        "error",
        {
          code: 80,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true
        }
      ],
      "max-lines": [
        "error",
        {
          max: 200,
          // functions: 30,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      "max-statements": [
        "error",
        {
          max: 30
          // ignoreTopLevelFunctions: true
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "warn",
      // "@typescript-eslint/no-empty-function": "error",
      // "@typescript-eslint/no-unsafe-function-type": "error",
      "@typescript-eslint/prefer-function-type": "error",
      // 与当前 eslint-plugin-react 版本不兼容配置
      "react/display-name": "off",
      "react/jsx-key": "off",
      "react/jsx-uses-react": "off",
      "react/no-deprecated": "off",
      "react/no-direct-mutation-state": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-render-return": "off"
    }
  }
  // TODO: eslint-plugin-import
  // {
  //   "plugins": ["import"],
  //   "rules": {
  //     "import/no-unresolved": [2, { "commonjs": true }],
  //     "import/order": [
  //       "error",
  //       {
  //         "groups": [["builtin", "external"], "internal", "parent", "sibling", "index"],
  //         "newlines-between": "always"
  //       }
  //     ]
  //   }
  // }
])
