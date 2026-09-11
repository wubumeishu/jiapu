import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import SurnameDetailPage from '@/pages/SurnameDetailPage.vue'
import GenealogyDetailPage from '@/pages/GenealogyDetailPage.vue'
import PersonDetailPage from '@/components/person/PersonDetailPage.vue'
import MemorialPage from '@/pages/MemorialPage.vue'

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
    },
    {
      path: '/surname/:slug/genealogy/:genealogyId/member/:personId',
      name: 'PersonDetail',
      component: PersonDetailPage
    },
    {
      path: '/surname/:slug/genealogy/:genealogyId/member/:personId/memorial',
      name: 'Memorial',
      component: MemorialPage
    }
  ]
})

export default router
