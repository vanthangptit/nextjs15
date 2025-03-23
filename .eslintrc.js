module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'tailwindcss'
  ],
  rules: {
    'no-console': [ 2, {
      'allow': ['info', 'warn', 'error'],
    }],
    'no-debugger': 'off',
    "react/display-name": "off",
    // ** Variables
    'no-use-before-define': ['error', {
      'functions': true,
      'variables': false
    }],
    // 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z]' }],
    'no-unused-vars': 'off',
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
    'indent': ['error', 2],
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
      'always'
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
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never',
        'tsx': 'never'
      }
    ]
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
};