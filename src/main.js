import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {
    createApp
} from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import axios from 'axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mitt from "mitt"
import router from './router.js'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.provide('$axios', axios) // 全局引入axios
app.mount('#app')
app.config.globalProperties.mittBus = new mitt()

// 导入所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

