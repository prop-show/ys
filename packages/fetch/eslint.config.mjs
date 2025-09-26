import pluginQuery from '@tanstack/eslint-plugin-query'
import { createConfig } from '@ys/eslint-config/create-config'

export default createConfig(null, [
  ...pluginQuery.configs['flat/recommended'],
])
