
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'start', component: () => import('pages/Start.vue') },
      { path: 'selection', component: () => import('pages/Selection.vue') },
      { path: 'gameplay', component: () => import('pages/Gameplay.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
