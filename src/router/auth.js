const auth = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../layouts/auth/AuthLayout.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../layouts/auth/Register.vue')
  }
]

export default auth
