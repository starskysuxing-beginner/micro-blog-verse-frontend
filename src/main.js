import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueCookies from 'vue-cookies'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as echarts from 'echarts'

const app = createApp(App)
// 注册路由
app.use(router)
// 注册Element Plus
app.use(ElementPlus)

// 注册其他插件
app.use(VueCookies)
app.use(mavonEditor)

// 挂载全局属性（Vue 3方式）
app.config.globalProperties.$echarts = echarts
// 挂载应用
app.mount('#app')
