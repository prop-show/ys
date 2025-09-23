import antfu from '@antfu/eslint-config'

export function createConfig(options) {
return  antfu({
      type: 'app',
    typescript: true,
    formatters: true,
    css: true,
  ...options
})
}
