import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  dts: true,
  treeshake: true,
  clean: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  shims: true,
  hash: false,
  target: 'es2020',
  platform: 'browser',
  external: [
    'node:*',
  ],
})
