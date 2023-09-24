import { createRouter, createWebHistory } from 'vue-router'
import admin from './admin'
import auth from './auth'
import user from './user'
const routes = [...admin, ...auth, ...user]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const data = window.localStorage.getItem('userData')
  const userData = JSON.parse(data)
  const adminRouterNames = ['admin', 'admin-users', 'admin-tours', 'admin-reviews']
  const userRouterNames = ['user-tours']
  if (!data) {
    if (to.name === 'Login') {
      next()
    }
    if (!to.name) {
      next({ name: 'user-tours' })
    }

    if (adminRouterNames.includes(to.name)) {
      next({ name: 'Login' })
    } else if (userRouterNames.includes(to.name)) {
      next()
    }
  } else {
    if (userData.roles[0] === 'ROLE_ADMIN') {
      if (to.name === 'Login' && data && userData.accessToken !== null) {
        next({ name: 'admin' })
      }
      if (userRouterNames.includes(to.name)) {
        next({ name: 'admin' })
      } else {
        next()
      }
    } else {
      if (to.name === 'Login' && data && userData.accessToken !== null) {
        next({ name: 'user-tours' })
      }
      if (adminRouterNames.includes(to.name)) {
        next({ name: 'user-tours' })
      } else {
        if (userRouterNames.includes(to.name)) {
          next()
        }
      }
    }
  }

  // co token

  // if (to.name !== 'Login' && to.name === 'user-layout' && !data) {
  //   next({ name: 'user-tours' })
  // } else if (to.name === 'Login' && data && userData.accessToken !== null) {
  //   next({ name: from.name })
  // } else if (to.name !== 'Login' && data && userData.accessToken !== null && userData.roles[0] === 'ROLE_USER') {
  //   next({ name: 'user-tours' })
  // } else if (to.name !== 'Login' && !data) {
  //   next({ name: 'Login' })
  // }

  // if (to.name !== 'Login' && !data)
  // if (to.name === 'Login' && data && userData.accessToken !== null) next({ name: from.name })
  // if (to.name !== 'Login' && data && userData.accessToken !== null && userData.roles[0] === 'ROLE_USER') {
  //   next({ name: 'user-tours' })
  // } else next()
})

export default router
