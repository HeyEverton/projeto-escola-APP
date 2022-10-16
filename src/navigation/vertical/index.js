export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  },

  {
    header: 'Área Alunos',
  },
  {
    title: 'Alunos',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Matricular aluno',
        route: 'cadastrar-alunos',
        icon: 'UserPlusIcon',
      },
      {
        title: 'Lista de alunos',
        route: 'lista-alunos',
        icon: 'UsersIcon',
      },
    ],
  },

  {
    header: 'Área Professores',
  },

  {
    title: 'Professores',
    icon: 'UsersIcon',
    children: [
      {
        title: 'Cadastrar professor',
        route: 'cadastrar-professores',
        icon: 'UserPlusIcon',
      },
      {
        title: 'Lista de professores',
        route: 'lista-professores',
        icon: 'UsersIcon',
      },

    ],

  },

  {
    header: 'Área Cursos',
  },

  {
    title: 'Cursos',
    icon: 'BookOpenIcon',
    children: [
      {
        title: 'Cadastrar curso',
        route: 'cadastrar-curso',
        icon: 'BookIcon',
      },

      {
        title: 'Todos os cursos',
        route: 'lista-cursos',
        icon: 'BookIcon',
      },
    ],
  },

  {
    header: 'Área Turmas',
  },

  {
    title: 'Turmas',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Cadastrar turma',
        route: 'cadastrar-turma',
        icon: 'FileIcon',
      },

      {
        title: 'Todos as turmas',
        route: 'lista-turma',
        icon: 'FileIcon',
      },

    ],
  },
  {
    header: 'Configurações Gerais',
  },
  {
    title: 'Configurações',
    route: null,
    icon: 'SettingsIcon',
    disabled: true,
  },

]
