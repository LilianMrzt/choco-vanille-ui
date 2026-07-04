import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

const sharedRules = {
  indent: ['error', 4, { SwitchCase: 1, flatTernaryExpressions: false }],
  quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
  semi: ['error', 'never'],
  'no-extra-semi': 'error',
  'func-style': ['error', 'expression', { allowArrowFunctions: true }],
  'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
  'arrow-body-style': 'off',
  'object-property-newline': 'off',
  'object-curly-newline': 'off',
  'object-curly-spacing': ['error', 'always', { arraysInObjects: true, objectsInObjects: true }],
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
  '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': 'allow-with-description' }],
  eqeqeq: ['error', 'smart'],
  curly: ['error', 'all'],
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'no-debugger': 'error',
  'no-shadow': 'error',
  'no-duplicate-imports': 'error',
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
  'object-shorthand': ['error', 'always'],
  'prefer-const': ['error', { destructuring: 'all' }],
  'no-var': 'error',
  'import/order': 'off',
  'import/no-unresolved': 'off',
  'import/newline-after-import': 'warn',
}

const reactRules = {
  'react/jsx-indent': ['error', 4],
  'react/jsx-indent-props': ['error', 4],
  'react/jsx-curly-brace-presence': ['error', { props: 'always', propElementValues: 'always', children: 'ignore' }],
  'jsx-quotes': ['error', 'prefer-single'],
  'react/jsx-curly-spacing': 'off',
  'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
  'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
  'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
  // Disabled because eslint-plugin-react <8 relies on the ESLint 8 API
  // `SourceCode#isSpaceBetweenTokens`, which was removed in ESLint 10.
  'react/jsx-one-expression-per-line': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'off',
}

const a11yRules = {
  'jsx-a11y/alt-text': 'warn',
  'jsx-a11y/anchor-has-content': 'warn',
  'jsx-a11y/anchor-is-valid': 'warn',
  'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
  'jsx-a11y/aria-props': 'error',
  'jsx-a11y/aria-proptypes': 'error',
  'jsx-a11y/aria-role': 'error',
  'jsx-a11y/aria-unsupported-elements': 'error',
  'jsx-a11y/click-events-have-key-events': 'warn',
  'jsx-a11y/heading-has-content': 'warn',
  'jsx-a11y/img-redundant-alt': 'warn',
  'jsx-a11y/interactive-supports-focus': 'warn',
  'jsx-a11y/label-has-associated-control': 'warn',
  'jsx-a11y/no-access-key': 'warn',
  'jsx-a11y/no-autofocus': 'off',
  'jsx-a11y/no-noninteractive-element-interactions': 'warn',
  'jsx-a11y/no-noninteractive-tabindex': 'warn',
  'jsx-a11y/no-redundant-roles': 'warn',
  'jsx-a11y/role-has-required-aria-props': 'error',
  'jsx-a11y/role-supports-aria-props': 'error',
  'jsx-a11y/tabindex-no-positive': 'warn',
}

export default [js.configs.recommended, {
  ignores: ['dist/**', 'node_modules/**', 'storybook-static/**', 'coverage/**', '*.config.js', '*.config.mjs', '*.config.ts'],
},
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    plugins: { '@typescript-eslint': tseslint, react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y, import: importPlugin, 'unused-imports': unusedImports },
    settings: { react: { version: 'detect' }, 'import/resolver': { typescript: { project: ['./tsconfig.json', './tsconfig.node.json'] } } },
    rules: {
      ...sharedRules,
      ...reactRules,
      ...a11yRules,
      'no-undef': 'off',
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['../../*'], message: 'Use path aliases instead of relative parent imports.' },
          { group: ['./*'], message: 'Use path aliases instead of relative parent imports.' },
          { group: ['../*'], message: 'Use path aliases instead of relative parent imports.' },
        ],
      }],
    },
  },
  {
    files: ['src/**/*.stories.tsx', 'src/stories/**/*.tsx'],
    rules: {
      'import/order': 'off',
      'import/newline-after-import': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    /*
     * Plain JS files served from /public run in the browser but are outside
     * the TypeScript src/ tree. Declare browser globals so `no-undef` does
     * not flag `document`, `window`, etc.
     */
    files: ['public/**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'script', globals: { ...globals.browser } },
    rules: {
      indent: ['error', 4, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      eqeqeq: ['error', 'smart'],
      curly: ['error', 'all'],
      'no-undef': 'error',
    },
  },
  {
    files: ['scripts/**/*.{js,cjs}'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'script', globals: { ...globals.node } },
    rules: {
      indent: ['error', 4, { SwitchCase: 1, flatTernaryExpressions: false }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      semi: ['error', 'never'],
      'no-extra-semi': 'error',
      eqeqeq: ['error', 'smart'],
      curly: ['error', 'all'],
      'no-console': 'off',
      'no-process-exit': 'off',
      'no-undef': 'off',
      'no-debugger': 'error',
      'no-shadow': 'error',
      'no-duplicate-imports': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'object-shorthand': ['error', 'always'],
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-var': 'error',
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { ...globals.browser, ...globals.jest },
    },
    plugins: { '@typescript-eslint': tseslint, import: importPlugin, 'unused-imports': unusedImports },
    settings: { 'import/resolver': { typescript: { project: ['./tsconfig.json'] } } },
    rules: { ...sharedRules, 'no-undef': 'off', 'no-console': 'off' },
  }]
