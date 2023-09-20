import { createRouter, createWebHistory } from 'vue-router'
import admin from './admin'
import auth from './auth'
const routes = [...admin, ...auth]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const accessToken = window.localStorage.getItem('accessToken')
  if (to.name !== 'Login' && accessToken === null) next({ name: 'Login' })
  if (to.name === 'Login' && accessToken !== null) next({ name: from.name })
  next()
})

export default router
