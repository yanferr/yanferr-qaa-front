import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import axios from 'axios'

const app = createApp(App)
app.use(ElementPlus)
app.provide('$axios', axios) // 全局引入axios
app.mount('#app')
