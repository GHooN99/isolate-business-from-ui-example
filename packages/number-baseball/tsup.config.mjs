import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', 'src/index.ts'],
  skipNodeModulesBundle: true,
  target: 'es2022',
  format: 'esm',
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  minify: false,
  // dts: true,
  tsconfig: './tsconfig.build.json',
});
