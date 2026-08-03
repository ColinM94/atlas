import { defineConfig } from 'oxlint';

export default defineConfig({
  //Enable or disable rules, set severity, and configure rule options.
  rules: {
    'react/only-export-components': 'warn',
  },
  //  Enable groups of rules with similar intent.
  categories: {
    correctness: 'warn',
  },
  // Enable built-in plugins that provide additional rules.
  plugins: ['node', 'react', 'react-perf', 'import', 'promise'],
  // Configure JavaScript plugins (alpha).
  jsPlugins: [],
  // Apply different configuration to different file patterns.
  overrides: [],
  // Inherit configuration from other files.
  extends: [],
  // Ignore additional files from the config file.
  ignorePatterns: ['**/dist/**', '**/build/**', '**/*.mjs', '**/*.js', '**/*.cjs'],
  // Enable predefined globals for common environments.
  env: {},
  // Declare custom globals as read-only or writable.
  globals: {},
  // Plugin-wide configuration shared by multiple rules.
  settings: {},
  //  Linter-level options (for example, options.typeAware and options.typeCheck).
  options: {},
});
