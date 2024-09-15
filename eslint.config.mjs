import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
// Импортируем eslint-plugin-prettier
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      // Опции для парсера
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      prettier: prettierPlugin,
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tsEslint.configs.recommended.rules,
      'prettier/prettier': 'error',
      // Ваши пользовательские правила (пример)
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
