const admin = [
  {
    path: '/',
    name: 'admin',
    component: () => import('../layouts/admin/AdminLayout.vue'),

    redirect: (to) => {
      return { path: '/tours' }
    },
    children: [
      {
        path: '/tours',
        name: 'admin-tours',
        component: () => import('../pages/admin/tours/index.vue')
      },
      {
        path: '/reviews',
        name: 'admin-reviews',
        component: () => import('../pages/admin/reviews/index.vue')
      },
      {
        path: '/users',
        name: 'admin-users',
        component: () => import('../pages/admin/users/index.vue')
      }
    ]
  }
]

export default admin
