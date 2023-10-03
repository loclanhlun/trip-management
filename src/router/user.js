const user = [
  {
    path: '/trip',
    name: 'user-layout',
    component: () => import('../layouts/web-user/UserLayout.vue'),
    redirect: () => {
      return { path: '/trip/tours' }
    },
    children: [
      {
        path: '/trip/tours',
        name: 'user-tours',
        component: () => import('../pages/web-user/tours/index.vue')
      },
      {
        path: '/trip/reviews',
        name: 'user-reviews',
        component: () => import('../pages/web-user/reviews/index.vue')
      }
    ]
  }
]

export default user
