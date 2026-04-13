import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
    {
        ignores: ['dist/', '.astro/', 'node_modules/', 'old_site/'],
    },
    js.configs.recommended,
    ...astro.configs['flat/recommended'],
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
        },
        rules: {
            'no-undef': 'off',
        },
    },
    {
        files: ['**/*.astro'],
        rules: {
            'no-undef': 'off',
        },
    },
    {
        files: ['astro.config.mjs', 'eslint.config.js'],
        languageOptions: {
            globals: globals.node,
        },
    },
];
