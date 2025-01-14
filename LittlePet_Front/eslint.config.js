import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  }, // 대상 파일 패턴
  { languageOptions: { globals: globals.browser } }, // 브라우저 환경 글로벌 변수 설정
  pluginJs.configs.recommended, // ESLint 추천 규칙
  ...tseslint.configs.recommended, // TypeScript 추천 규칙
  pluginReact.configs.flat.recommended, // React 추천 규칙
  {
    settings: { 
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    // Prettier 설정 포함
    rules: {
      'no-unused-vars': 'warn', // 사용하지 않는 변수에 대해 경고
      'no-undef': 'warn', // 정의되지 않은 변수에 대해 경고
      'react/prop-types': 'off', // PropTypes 사용 안 할 경우 비활성화
      'react/react-in-jsx-scope': 'off', // React 17+에서는 필요 없음
      'no-console': 'warn', // console.log 사용 경고
      'prettier/prettier': 'error', // Prettier 규칙 위반 시 ESLint 오류로 표시
    },
  },
];
