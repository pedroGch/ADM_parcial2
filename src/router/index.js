import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CargarRecetaView from '@/views/CargarRecetaView.vue'
import RecetasGuardadas from '@/views/RecetasGuardadas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cargarReceta',
    name: 'cargarReceta',
    component: CargarRecetaView
  },
  {
    path: '/recetasGuardadas',
    name: 'recetasGuardadas',
    component: RecetasGuardadas
  }
]

const router = new VueRouter({
  routes
})

export default router
