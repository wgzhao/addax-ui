import vue from 'eslint-plugin-vue'
import vuetify from 'eslint-plugin-vuetify'


export default [
  ...vue.configs['flat/base'],
  ...vuetify.configs['flat/base'],
]

/** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   ...pluginVue.configs["flat/essential"],
//   {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
// ];