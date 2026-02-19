import { MainPage } from '@/pages/main'

import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainPage,
    },

    // unfamiliar path
    {
      redirect: '/',
      path: '/:pathMatch(.*)*',
    },
  ],
})
