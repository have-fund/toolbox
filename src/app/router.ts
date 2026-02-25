import { createRouter, createWebHistory } from 'vue-router'

import { MainPage } from '@/pages/main'
import { EncryptPage } from '@/pages/encrypt'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainPage,
    },
    {
      name: 'encrypt',
      path: '/encrypt',
      component: EncryptPage,
    },

    // unfamiliar path
    {
      redirect: '/',
      path: '/:pathMatch(.*)*',
    },
  ],
})
