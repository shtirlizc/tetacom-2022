import js from "@eslint/js";
import ts from "typescript-eslint";
import astroEslintParser from "astro-eslint-parser";
import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginAstro from "eslint-plugin-astro";

// require("eslint:recommended"),
//   require("plugin:astro/recommended"),
//   require("plugin:@typescript-eslint/recommended"),

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["src/**/*.{js,ts,astro}"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    files: ["src/**/*.astro"],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        ecmaVersion: 2022,
        sourceType: "module",
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    files: ["src/**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: typescriptEslintParser,
      globals: {
        browser: true,
        node: true,
        es6: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      astro: eslintPluginAstro,
    },
  },
);
