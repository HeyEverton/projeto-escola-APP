<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ user.name }}
            </p>
            <span class="user-status">{{ user.role }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="user.profile_photo"
            :text="avatarText(user.name)"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{name: 'lista-alunos'}"
        >
          <feather-icon
            size="16"
            icon="UsersIcon"
            class="mr-50"
          />
          <span>Alunos</span>
        </b-dropdown-item>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{name: 'lista-cursos'}"
        >
          <feather-icon
            size="16"
            icon="BookOpenIcon"
            class="mr-50"
          />
          <span>Cursos</span>
        </b-dropdown-item>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{name: 'lista-turma'}"
        >
          <feather-icon
            size="16"
            icon="BookIcon"
            class="mr-50"
          />
          <span>Turmas</span>
        </b-dropdown-item>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{name: 'lista-professores'}"
        >
          <feather-icon
            size="16"
            icon="UsersIcon"
            class="mr-50"
          />
          <span>Professores</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Sair</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,

} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,
  },

  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      user: {},
      avatarText,
    }
  },

  mounted() {
    this.$http.get('auth/me')
      .then((response => {
        this.user = response.data
      }))
  },

  methods: {
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_data')
      localStorage.removeItem('user_email')
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_role')
      this.$router.replace('/login')
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Até logo ',
          icon: 'LogOutIcon',
          variant: 'success',
        },
      })
    },
  },

}
</script>
