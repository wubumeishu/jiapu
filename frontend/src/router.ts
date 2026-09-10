import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import SurnameDetailPage from '@/pages/SurnameDetailPage.vue'
import GenealogyDetailPage from '@/pages/GenealogyDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/surname/:slug',
      name: 'SurnameDetail',
      component: SurnameDetailPage
    },
    {
      path: '/surname/:slug/genealogy/:id',
      name: 'GenealogyDetail',
      component: GenealogyDetailPage
    }
  ]
})

export default router
