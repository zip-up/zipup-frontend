module.exports = {
  ignorePatterns: ['*.d.ts'],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
    'no-console': [
      'warn',
      {
        allow: ['error'],
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],

    'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
    'react/no-unused-prop-types': 'error',
    'react/react-in-jsx-scope': 'off',

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // react > next > @ > a~z
          ['^react$', '^next', '^@', '^[a-z]'],
          // `../` > './'
          ['^\\.\\./?$', '^\\./?$'],
          // Side effect imports
          ['^\\u0000'],
        ],
      },
    ],

    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
    ],
  },
};
