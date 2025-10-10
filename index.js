import eslint from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import eslintComments from 'eslint-plugin-eslint-comments'
import importPlugin from 'eslint-plugin-import'
import jsoncPlugin from 'eslint-plugin-jsonc'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import promisePlugin from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import regexpPlugin from 'eslint-plugin-regexp'
import unicornPlugin from 'eslint-plugin-unicorn'
import yamlPlugin from 'eslint-plugin-yml'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default class Config {
  _builtConfig = [
    // eslint config - needs files manually specified
    {
      files: ['**/*.{js,jsx,cjs,mjs,ts,tsx}'],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
      },
      ...eslint.configs.recommended,
    },

    ...tseslint.configs.recommended,

    perfectionist.configs['recommended-natural'],

    unicornPlugin.configs.recommended,

    // comments config - needs plugins manually specified
    {
      ...eslintComments.configs.recommended,
      plugins: {
        'eslint-comments': eslintComments,
      },
    },

    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,

    promisePlugin.configs['flat/recommended'],

    regexpPlugin.configs['flat/recommended'],

    {
      files: ['**/*.{js,jsx,cjs,mjs,ts,tsx}'],
      ...stylisticPlugin.configs.customize({
        braceStyle: '1tbs',
      }),
    },

    ...jsoncPlugin.configs['flat/recommended-with-json'],

    yamlPlugin.configs['flat/standard'],

    // Rule overrides
    {
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        'import/no-unresolved': [0], // Lots of false positives
        'no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        'object-curly-newline': [2, {
          ExportDeclaration: 'always',
          ImportDeclaration: {
            minProperties: 3,
            multiline: true,
          },
          ObjectExpression: {
            minProperties: 1,
            multiline: true,
          },
          ObjectPattern: {
            minProperties: 1,
            multiline: true,
          },
        }],
        'object-property-newline': [2],
        'react/react-in-jsx-scope': [0], // Not needed with a bundler
        'unicorn/filename-case': [0], // Some files are PascalCase, we're happy with this
      },
    },
  ]

  constructor() {}

  build() {
    return this._builtConfig
  }

  withReact() {
    this._builtConfig = [
      ...this._builtConfig,

      // react config - doesn't fully support flat config yet
      {
        files: ['**/*.{jsx,tsx}'],
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
        plugins: {
          react: reactPlugin,
        },
        rules: reactPlugin.configs.recommended.rules,
        settings: {
          react: {
            version: 'detect',
          },
        },
      },

      reactHooksPlugin.configs['flat/recommended'],

      jsxA11yPlugin.flatConfigs.recommended,
    ]
    return this
  }

  withTailwind() {
    this._builtConfig = [
      ...this._builtConfig,
      ...require('eslint-plugin-tailwindcss').configs['flat/recommended'],
    ]
    return this
  }
}
