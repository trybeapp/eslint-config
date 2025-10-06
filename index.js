import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import stylisticPlugin from '@stylistic/eslint-plugin';
import eslintComments from 'eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';
import jsoncPlugin from 'eslint-plugin-jsonc';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import regexpPlugin from 'eslint-plugin-regexp';
import yamlPlugin from 'eslint-plugin-yml';

export default [
  // eslint config - needs files manually specified
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      }
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

  // react config - doesn't fully support flat config yet
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: reactPlugin.configs.recommended.rules,
  },

  reactHooksPlugin.configs['flat/recommended'],

  jsxA11yPlugin.flatConfigs.recommended,

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
      'unicorn/filename-case': [0], // Some files are PascalCase, we're happy with this
      'react/react-in-jsx-scope': [0], // Not needed with a bundler
    }
  }
]
