import { defineConfig } from 'oxlint';

export default defineConfig({
  rules: {
    'react/only-export-components': 'warn',
  },
  categories: {
    correctness: 'warn',
  },
  plugins: ['node', 'react', 'react-perf', 'import', 'promise'],
  jsPlugins: [],
  overrides: [],
  extends: [],
  ignorePatterns: ['**/dist/**', '**/build/**', '**/*.mjs', '**/*.js', '**/*.cjs'],
  env: {},
  globals: {},
  settings: {},
  options: {},
});
