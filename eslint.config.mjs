import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    env: {
      'browser': true,
      'es2021': true
    },
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      'ecmaVersion': 'latest',
      'sourceType': 'module'
    },
    plugins: [
      'react',
      '@typescript-eslint',
      'react-hooks'
    ],
    rules: {
      'no-console': [2, {
        'allow': ['info', 'warn', 'error']
      }],
      'no-debugger': 'off',
      'react/display-name': 'off',
      // ** Variables
      'no-use-before-define': ['error', {
        'functions': true,
        'variables': false
      }],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '[iI]gnored',
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          ignoreRestSiblings: false
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^[A-Z]',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          'allow': ['arrowFunctions']
        }
      ],
      'no-useless-return': 'error',
      'eqeqeq': 'error',

      // ** Stylistic issues
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'block-spacing': ['error', 'always'],
      'comma-dangle': 'error',
      'comma-spacing': 'error',
      'comma-style': 'error',
      'indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          ObjectExpression: 1
        }],
      'quotes': ['error', 'single'],
      'curly': 'error',
      'semi': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
      'object-curly-spacing': [
        'error',
        'always', {
          'arraysInObjects': true,
          'objectsInObjects': true
        }
      ],
      'array-bracket-spacing': [
        'error',
        'never'
      ],
      'key-spacing': 'error',
      'template-tag-spacing': [
        'error',
        'never'
      ],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',

      // ** ES6
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',

      // ** Typescript
      '@typescript-eslint/no-explicit-any': 'off',

      // ** Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          'extensions': [
            '.ts',
            '.tsx'
          ]
        }
      ],
      'import/prefer-default-export': 'off',
      'import/extensions': 'off'
    },
    settings: {
      'import/resolver': {
        'typescript': {},
        'node': {
          'paths': ['src'],
          'extensions': ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  })
];

export default eslintConfig;
