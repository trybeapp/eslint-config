import { defineConfig } from 'eslint/config'

import Config from './index.js'

export default defineConfig(
  new Config().withReact().build(),

  // Some overrides as `require` is used to resolve the tailwind config only if required
  {
    languageOptions: {
      globals: {
        require: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
)
