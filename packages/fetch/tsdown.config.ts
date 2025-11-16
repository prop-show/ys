import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  dts: true,
  clean: true,
  treeshake: true,
  hash: false,
  format: ['esm'],
  outDir: 'dist',
  shims: true,
  target: 'es2020',
  platform: 'browser',
  external: [
    'node:*',
  ],
})
