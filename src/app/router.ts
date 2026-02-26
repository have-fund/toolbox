import { createRouter, createWebHistory } from 'vue-router'

import { MainPage } from '@/pages/main'
import { EncryptPage } from '@/pages/encrypt'
import { DecryptPage } from '@/pages/decrypt'

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
    {
      name: 'decrypt',
      path: '/decrypt',
      component: DecryptPage,
    },

    // unfamiliar path
    {
      redirect: '/',
      path: '/:pathMatch(.*)*',
    },
  ],
})
