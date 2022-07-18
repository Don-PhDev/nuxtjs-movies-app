module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/multi-word-component-names': 0,
    'vue/multi-word-component-names': ['error', {
      'ignores': ['hero']
    }],
    "no-unused-vars": "off",
    "no-dupe-keys": "off",
    "vue/no-dupe-keys": "off",
  },
}
