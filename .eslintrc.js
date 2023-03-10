module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'unused-imports',
    'functional',
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-bind': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'no-template-curly-in-string': 'off',
    'no-nested-ternary': 'off',
    'prefer-spread': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'off',
    'functional/no-let': 'error',
    'functional/no-this-expression': 'error',
    'functional/no-loop-statement': 'error',
    'functional/no-class': 'error',
    'functional/immutable-data': 'warn',
    'no-underscore-dangle': 'off'
  },
};
