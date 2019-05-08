module.exports = {
  root: true,
  env: {
	node: true,
	jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
	'no-mixed-spaces-and-tabs': 'off',
    'no-console': 'off',
	"vue/no-use-v-if-with-v-for": 'off',
	"no-unused-vars": 0,
	"no-useless-escape": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
