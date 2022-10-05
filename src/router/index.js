import Vue from 'vue'
import VueRouter from 'vue-router'
import Guard from '@/service/middleware.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },

    {
      path: '/lista-alunos',
      name: 'lista-alunos',
      component: () => import('@/views/alunos/AlunosLista.vue'),
      meta: {
        pageTitle: 'Todos os alunos',
        breadcrumb: [
          {
            text: 'Lista de alunos',
            active: true,
          },
        ],
      },
    },

    {
      path: '/cadastrar-alunos',
      name: 'cadastrar-alunos',
      component: () => import('@/views/cadastro-alunos/FormWizard.vue'),
      meta: {
        pageTitle: 'Matricular aluno',
        breadcrumb: [
          {
            text: 'Matrículas',
            active: true,
          },
        ],
      },
    },

    {
      path: '/cadastrar-professores',
      name: 'cadastrar-professores',
      component: () => import('@/views/professores/ProfessorCadastro.vue'),
      meta: {
        pageTitle: 'Cadastrar professor',
        breadcrumb: [
          {
            text: 'cadastrar professor',
            active: true,
          },
        ],
      },
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/cadastre-se',
      name: 'cadastre-se',
      component: () => import('@/views/auth/Cadastro.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/esqueceu-senha',
      name: 'esqueceu-senha',
      component: () => import('@/views/auth/EsqueceuSenha.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/recuperar-senha',
      name: 'recuperar-senha',
      component: () => import('@/views/auth/RecuperarSenha.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
