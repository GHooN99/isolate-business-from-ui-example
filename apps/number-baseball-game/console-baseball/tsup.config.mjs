import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'es2022',
  format: 'cjs',
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  noExternal: ['@ibfu/number-baseball'],
  minify: false,
  tsconfig: './tsconfig.build.json',
});
