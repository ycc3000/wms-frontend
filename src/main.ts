import { createApp, Directive } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { i18n } from './i18n'
import 'virtual:svg-icons-register'

import '@/assets/icons/iconfont/iconfont'
import '@/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/notification.scss'

const app = createApp(App)

import * as directive from '@/directives'
Object.keys(directive).forEach(key => {
	app.directive(key, (directive as { [key: string]: Directive })[key])
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
