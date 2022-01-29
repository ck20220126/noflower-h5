import { BasicLayout } from '@/layouts';

export const constantRouterMap = [
  {
    name: 'index',
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    meta: {
      title: '首页',
    },
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('../views/home'),
      },
    ],
  },
  {
    name: 'tools',
    path: '/tools',
    component: () => import('../views/tools'),
    children: [
      {
        name: 'calculator',
        path: 'calculator',
        component: () => import('../views/tools/calculator'),
        meta: {
          title: '记账，哦是想算啥算啥计算器',
        },
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/user/auth'),
    meta: {
      title: '验证',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/exception/404'),
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];
