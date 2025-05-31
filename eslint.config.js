import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier/flat';
import html from 'eslint-plugin-html';
import css from 'eslint-plugin-css';

export default [
  js.configs.recommended,
  prettier,
  {
    files: ["www/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-undef': 'error',
      'semi': ['error', 'always']
    }
  },
  {
    files: ["www/**/*.html"],
    plugins: {
      html
    },
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    files: ["www/**/*.css"],
    plugins: {
      css
    }
  }
]; 