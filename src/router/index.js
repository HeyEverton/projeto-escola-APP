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
      path: '/cadastrar-alunos',
      name: 'cadastrar-alunos',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/cadastro-alunos/CadastroAluno.vue'),
      meta: {
        pageTitle: 'Alunos',
        breadcrumb: [
          {
            text: 'Matricular aluno',
            active: true,
          },
        ],
      },
    },

    {
      path: '/lista-alunos',
      name: 'lista-alunos',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/alunos/AlunosLista.vue'),
      meta: {
        pageTitle: 'Alunos',
        breadcrumb: [
          {
            text: 'Lista de alunos',
            active: true,
          },
        ],
      },
    },

    {
      path: '/editar-aluno/:id',
      name: 'editar-aluno',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/alunos/editar-aluno/AlunoEdit.vue'),
      meta: {
        pageTitle: 'Alunos',
        breadcrumb: [
          {
            text: 'Editar de aluno',
            active: true,
          },
        ],
      },
    },

    {
      path: '/cadastrar-professores',
      name: 'cadastrar-professores',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/cadastro-professor/ProfessorCadastro.vue'),
      meta: {
        pageTitle: 'Professores',
        breadcrumb: [
          {
            text: 'Cadastrar professor',
            active: true,
          },
        ],
      },
    },

    {
      path: '/lista-professores',
      name: 'lista-professores',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/professores/ProfessoresLista.vue'),
      meta: {
        pageTitle: 'Professores',
        breadcrumb: [
          {
            text: 'Lista de professores',
            active: true,
          },
        ],
      },
    },

    {
      path: '/editar-professor/:id',
      name: 'editar-professor',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/professores/editar-professor/ProfessorEdit.vue'),
      meta: {
        pageTitle: 'Professores',
        breadcrumb: [
          {
            text: 'Editar de professor',
            active: true,
          },
        ],
      },
    },

    {
      path: '/cadastrar-curso',
      name: 'cadastrar-curso',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/curso/CadastroCurso.vue'),
      meta: {
        pageTitle: 'Cursos',
        breadcrumb: [
          {
            text: 'Cadastrar curso',
            active: true,
          },
        ],
      },
    },

    {
      path: '/editar-curso/:id',
      name: 'editar-curso',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/curso/EditarCurso.vue'),
      meta: {
        pageTitle: 'Cursos',
        breadcrumb: [
          {
            text: 'Editar curso',
            active: true,
          },
        ],
      },
    },

    {
      path: '/lista-cursos',
      name: 'lista-cursos',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/curso/CursoLista.vue'),
      meta: {
        pageTitle: 'Cursos',
        breadcrumb: [
          {
            text: 'Lista de cursos',
            active: true,
          },
        ],
      },
    },

    {
      path: '/cadastrar-turma',
      name: 'cadastrar-turma',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/turmas/CadastroTurma.vue'),
      meta: {
        pageTitle: 'Turmas',
        breadcrumb: [
          {
            text: 'Cadastrar turma',
            active: true,
          },
        ],
      },
    },

    {
      path: '/lista-turma',
      name: 'lista-turma',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/turmas/TurmaLista.vue'),
      meta: {
        pageTitle: 'Turmas',
        breadcrumb: [
          {
            text: 'Todas as turmas',
            active: true,
          },
        ],
      },
    },

    {
      path: '/editar-turma/:id',
      name: 'editar-turma',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      component: () => import('@/views/turmas/TurmaEditar.vue'),
      meta: {
        pageTitle: 'Turmas',
        breadcrumb: [
          {
            text: 'Editar turma',
            active: true,
          },
        ],
      },
    },

    {
      path: '/login',
      name: 'login',
      beforeEnter: Guard.redirectIfAuthenticated,
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
      path: '/nao-autenticado',
      name: 'nao-autenticado',
      component: () => import('@/views/error/NaoAutenticado.vue'),
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
