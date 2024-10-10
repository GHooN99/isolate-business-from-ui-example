import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  skipNodeModulesBundle: true,
  target: 'es2022',
  format: ['cjs'],
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  minify: false,
  dts: true,
  tsconfig: './tsconfig.build.json',
});
