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
    ]
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
        icon: 'UserPlusIcon'
      },
      {
        title: 'Lista de professores',
        route: 'lista-professores',
        icon: 'UsersIcon',
      },

    ]
      
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
        icon: 'BookIcon'
      },

      {
        title: 'Todos os cursos',
        route: 'lista-cursos',
        icon: 'UsersIcon',
      },

    ]
      
  },

  

]
