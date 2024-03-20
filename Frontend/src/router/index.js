import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/iniciar-sesion',
      name: 'iniciar-sesion',
      meta: {
        rutaProtegida: true
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/registro-de-empleado',
      name: 'registro-de-empleado',
      meta: {
        rutaProtegida: true
      },
      component: () => import('../views/RegistroView.vue')
    }
  ]
})

export default router
