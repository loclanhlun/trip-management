const auth = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../layouts/auth/AuthLayout.vue')
  }
]

export default auth
