const user = [
  {
    path: '/trip',
    name: 'user-layout',
    component: () => import('../layouts/web-user/UserLayout.vue'),
    children: [
      {
        path: '/trip/tours',
        name: 'user-tours',
        component: () => import('../pages/web-user/tours/index.vue')
      }
    ]
  }
]

export default user
