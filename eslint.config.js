import { defineConfig } from 'eslint/config'

import Config from './index.js'

export default defineConfig(
  new Config().withReact().build(),
)
