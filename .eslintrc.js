module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"plugin:prettier/recommended",
		"@vue/prettier",
		"@vue/eslint-config-typescript"
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: 'latest',
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: [
		"vue", "prettier"
	],
	rules: {
		quotes: [2, "single"], //单引号
		semi: [2, "never"], // 不使用分号
		curly: "error", // 控制语句需要大括号
		"no-multiple-empty-lines": [1, { max: 3 }], //空行最多不能超过2行
		"comma-dangle": [2, "never"], //对象字面量项尾不能有逗号
		"vue/multi-word-component-names": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-explicit-any": "off", // Unexpected any. Specify a different type
		// "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // console在生产模式不生效
		// "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // debugger在生产模式不生效
		"@typescript-eslint/ban-types": [
			"error",
			{
				"extendDefaults": true,
				"types": {
					"{}": false
				}
			}
		],
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		"no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		"vue/html-self-closing": [
			"error",
			{
				html: {
					void: "always",
					normal: "never",
					component: "always"
				},
				svg: "always",
				math: "always"
			}
		],
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto"
			}
		]
	}
}
