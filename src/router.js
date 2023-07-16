import { createRouter, createWebHistory } from 'vue-router'
import mainComponent from './components/mainComponent.vue'
import task from './components/task/task.vue'


const routes = [
  { path: '/', component: mainComponent },
  { path: '/task', component: task }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
