import antfu from '@antfu/eslint-config'

export function createConfig(options, userConfig = []) {
  return antfu({
    type: 'app',
    typescript: true,
    formatters: true,
    css: true,
    rules: {
      'perfectionist/sort-imports': ['error', {
        tsconfigRootDir: '.',
      }],
    },
    ...options,
  }, ...userConfig)
}
