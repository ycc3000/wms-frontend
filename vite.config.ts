import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// 参考：https://cn.vitejs.dev/config/
export default defineConfig({
	base: './',
	resolve: {
		// 配置别名
		alias: {
			'@': resolve(__dirname, './src'),
			'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
		}
	},
	plugins: [
		vue(),
		vueSetupExtend(),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass'
				})
			]
		}),
		createSvgIconsPlugin({
			iconDirs: [resolve(__dirname, 'src/assets/icons/svg')],
			symbolId: 'icon-[dir]-[name]'
		})
	],
	server: {
		https: false,
		host: '0.0.0.0',
		port: 3000, // 端口号
		open: false // 是否自动打开浏览器
	},
	optimizeDeps: {
		include: ['pinia', 'vue-i18n', '@vueuse/core'],
		exclude: []
	},
	build: {
		sourcemap: false,
		chunkSizeWarningLimit: 4000
	},
	define: {
		__INTLIFY_PROD_DEVTOOLS__: false
	}
})
