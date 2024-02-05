module.exports = {
  parser: '@typescript-eslint/parser',
  // env: {
  //   browser: true,
  //   node: true,
  // },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    // 'airbnb/hooks',
    // 'eslint:recommended',
    // 'plugin:import/recommended',
    // 'plugin:react/recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // 'prettier',
  ],
  
  plugins: ['@typescript-eslint', 'prettier'], // removed: 'jest', 'react-hooks', 'prettier'
  rules: {
    // 'arrow-parens': ['error', 'always'],
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
    /** @see https://github.com/benmosher/eslint-plugin-import/issues/1453 */
    // 'import/no-cycle': 0,
    // 'import/no-extraneous-dependencies': 'off',
    // 'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    // 'spaced-comment': ['error', 'always', { markers: ['/'] }],
    // 'sort-imports': [
    //   'error',
    //   {
    //     ignoreCase: false,
    //     ignoreDeclarationSort: true,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    //   },
    // ],
    // '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-empty-interface': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/no-var-requires': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/ban-ts-comment': 'off',
    // '@typescript-eslint/ban-types': 'off',
    // 'react/display-name': 'off',
    // 'no-use-before-define': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
    // camelcase: 'off',
    // 'no-shadow': 'off',
    // '@typescript-eslint/no-shadow': 'error',
    // 'react/jsx-boolean-value': ['error', 'always'],
    // 'react/require-default-props': 'off',
    // 'react/jsx-curly-spacing': [
    //   'error',
    //   {
    //     when: 'never',
    //     children: true,
    //   },
    //   {
    //     allowMultiline: true,
    //   },
    // ],
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    // 'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    // 'react-hooks/exhaustive-deps': [
    //   'error',
    //   {
    //     additionalHooks: '(useIsomorphicLayoutEffect)',
    //   },
    // ],
    // 'jsx-a11y/anchor-is-valid': 'off',
    // 'jsx-a11y/no-static-element-interactions': [
    //   'warn',
    //   {
    //     handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
    //   },
    // ],
    // 'no-restricted-syntax': [
    //   'error',
    //   {
    //     selector: ':matches(ImportNamespaceSpecifier[local.name="React"])',
    //     message: `Please use "import React from 'react';" instead`,
    //   },
    // ],
  },
  // settings: {
  //   'import/parsers': {
  //     '@typescript-eslint/parser': ['.ts', '.tsx'],
  //   },
  //   'import/resolver': {
  //     alias: {
  //       map: [
  //         ['@src', './src'],
  //         ['test-utils', './src/test-utils'],
  //       ],
  //       extensions: ['.ts', '.js', '.jsx', '.tsx'],
  //     },
  //   },
  //   'import/ignore': ['./src/test-utils'],
  // },
  
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'jest/expect-expect': [
          'off',
          {
            assertFunctionNames: ['expect'],
          },
        ],
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'import/first': 'off',
      },
    },
  ],
};
