import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/Login.page.vue'),
      },
    ],
  },
  {
    path: '/products',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'list-products',
        component: () => import('src/pages/products/ListPage.vue'),
      },
      {
        path: 'new',
        name: 'new-product',
        component: () => import('src/pages/products/NewPage.vue'),
      },
    ],
  },
  {
    path: '/clients',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'list-clients',
        component: () => import('pages/clients/ListPage.vue'),
      },
      {
        path: 'new',
        name: 'new-client',
        component: () => import('pages/clients/NewPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
