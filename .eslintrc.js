module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'prettier',
    'react-hooks',
    'simple-import-sort',
    '@typescript-eslint',
  ],
  rules: {
    'react/require-default-props': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 1,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/sort-comp': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y/label-has-for': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: true,
      },
    ],
    'jsx-quotes': [2, 'prefer-double'],
    'import/extensions': [
      1,
      {
        ts: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              // Side effect imports.
              ['^\\u0000', '^react$', '^@?\\w', '^redux$'],
              // Packages.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ['^@?\\w'],
              // Absolute imports and other imports such as Vue-style `@/foo`.
              // Anything not matched in another group.
              ['^'],
              // Relative imports.
              // Anything that starts with a dot.
              ['^\\.'],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
