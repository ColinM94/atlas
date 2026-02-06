import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default defineConfig(
  {
    ignores: ['**/dist/**', '**/build/**', '**/*.mjs', '**/*.js', '**/*.cjs'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    rules: {
      'react-hooks/exhaustive-deps': 'off', // Complains about missing useCallbacks and useMemos even though they are no longer required with React Compiler.
      '@typescript-eslint/no-misused-promises': 'off', // This rule feels very unnesessary.
      '@typescript-eslint/restrict-template-expressions': 'off', // Doesn't allow string union types in template expressions. Which is annoying.
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  }
);
