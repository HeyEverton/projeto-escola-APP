<template>
  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0 d-flex"
    >
      <h1 class="mx-auto mt-2 mb-2">
        Todos os alunos
      </h1>

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Por pág.</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>registros</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Pesquisando por..."
                @input="handleInput"
              />
              <b-button
                variant="primary"
                @click="pesquisarUsuarios"
              >
                <span class="text-nowrap">Pesquisar</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="alunos"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="Nenhum aluno foi encontrado"
        :sort-desc.sync="isSortDirDesc"
      >

        <template #cell(user)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="30"
                :src="data.item.aluno_foto"
                :text="avatarText(data.item.nome)"
                :variant="`light-${resolveUserRoleVariant(data.item.role)}`"
              />
            </template>
            <b-link
              :to="{ name: 'editar-aluno', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.nome }}
            </b-link>
            <!-- <small >@{{ data.item.perfil }}</small> -->
          </b-media>
        </template>

        <!-- Column: Actions -->
        <!-- <template #cell(actions)="data">
          <b-button
            v-b-tooltip.hover
            variant="primary"
            class="btn-icon mr-1"
            :to="{ name: 'editar-usuario', params: { id: data.item.id } }"
            title="Editar perfil"
          >
            <feather-icon icon="EditIcon" />
          </b-button>

          <b-button
            v-b-tooltip.hover
            variant="danger"
            class="btn-icon "
            title="Excluir usuário"
            @click="() => deleteUser(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
        </template> -->

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Monstrando {{ dataMeta.from }} de {{ dataMeta.to }} de {{ dataMeta.of }}
              registros</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalUsers"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  VBTooltip,

} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { debounce } from 'lodash'
import UsersListFilters from './AlunosFiltros.vue'
import useUsersList from './useUsersList'
import userStoreModule from './userStoreModule'
import UserListAddNew from './AlunosListaNew.vue'

export default {
  components: {
    UsersListFilters,
    UserListAddNew,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    VBTooltip,
    vSelect,
  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  data() {
    return {
      alunos: [],
      searchQuery: '',

    }
  },

  methods: {
    deleteUser(id) {
      this.$swal({
        title: 'Tem certeza?',
        text: 'Você não conseguirá desfazer isso.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
        .then(res => {
          if (res.isConfirmed) {
            this.$http
              .delete(`/alunos/${id}`)
              .then(response => {
                if (response.status == 200 || response.status == 204) {
                  this.$swal({
                    icon: 'success',
                    title: 'Excluído',
                    text: 'Este aluno foi excluído com sucesso',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                  this.$http.get('alunos')
                    .then(response => this.alunos = response.data.data)
                } else {
                  this.$swal({
                    title: 'Falha ao excluir!',
                    text: 'Ops! parece que houve um erro ao excluir este aluno!',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
              })
              .catch(error => {
                if (error.message) {
                  this.$swal({
                    title: 'Acesso negado!',
                    text: 'Você não tem autorização para excluir um aluno.',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
              })
          }
        })
    },

    pesquisarUsuarios() {
      this.$http.get(`users?search=${this.searchQuery}`)
        .then(response => {
          this.users = response.data.data
        })
    },

    handleInput: debounce(function () {
      this.pesquisarUsuarios()
    }, 1000),
  },

  created() {
    this.$http.get('alunos')
      .then(response => this.alunos = response.data.data)
  },

  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const isAddNewUserSidebarActive = ref(false)

    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Maintainer', value: 'maintainer' },
      { label: 'Subscriber', value: 'subscriber' },
    ]

    const planOptions = [
      { label: 'Basic', value: 'basic' },
      { label: 'Company', value: 'company' },
      { label: 'Enterprise', value: 'enterprise' },
      { label: 'Team', value: 'team' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    const {
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    } = useUsersList()

    return {

      // Sidebar
      isAddNewUserSidebarActive,

      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      roleOptions,
      planOptions,
      statusOptions,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
