import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ["www/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly"
      }
    },
    rules: {
      indent: ["error", 4],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  },
  eslintConfigPrettier
]; 