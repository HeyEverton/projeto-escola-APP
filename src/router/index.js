import Vue from 'vue'
import VueRouter from 'vue-router'

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

    // {
    //   path: '/cadastrar-aluno',
    //   name: 'cadastrar-aluno',
    //   component: () => import('@/views/cadastro-alunos/FormWizardIcon.vue'),
    //   meta: {
    //     pageTitle: 'Home',
    //     breadcrumb: [
    //       {
    //         text: 'Home',
    //         active: true,
    //       },
    //     ],
    //   },
    // },

    {
      path: '/cadastrar-alunos',
      name: 'cadastrar-alunos',
      component: () => import('@/views/cadastro-alunos/FormWizard.vue'),
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

    // {
    //   path: '/cadastrar-teste',
    //   name: 'cadastrar-teste',
    //   component: () => import('@/views/cadastro-alunos/FormWizardVertical.vue'),
    //   meta: {
    //     pageTitle: 'Home',
    //     breadcrumb: [
    //       {
    //         text: 'Home',
    //         active: true,
    //       },
    //     ],
    //   },
    // },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
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