<template>
  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0 d-flex"
    >
      <h1 class="mx-auto mt-2 mb-2">
        Todos os professores
      </h1>

      <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >

            <div class="d-flex align-items-center justify-content-end">
              <b-input-group>
                <b-input-group-prepend>
                  <b-dropdown
                    text="Pesquisando por"
                    variant="outline-primary"
                  >
                    <b-dropdown-item
                      id="nome"
                      @click="event"
                    >
                      <feather-icon icon="UserIcon" />

                      Nome
                    </b-dropdown-item>

                    <b-dropdown-item
                      id="cpf"
                      @click="event"
                    >
                      <feather-icon icon="FileTextIcon" />
                      CPF
                    </b-dropdown-item>

                    <b-dropdown-item
                      id="email"
                      @click="event"
                    >
                      <feather-icon icon="MailIcon" />
                      E-mail
                    </b-dropdown-item>

                    <b-dropdown-divider />

                    <b-dropdown-item
                      id="turno"
                      @click="get"
                    >
                      Listar todos
                    </b-dropdown-item>
                  </b-dropdown>
                </b-input-group-prepend>
                <b-form-input
                  v-model="campoPesquisa"
                  class="d-inline-block"
                  placeholder="Pesquisando..."
                  @input="handleInput"
                />
                <b-input-group-append>
                  <b-button
                    variant="outline-primary"
                    @click="pesquisar"
                  >
                    <feather-icon icon="SearchIcon" />
                  <!-- <span class="text-nowrap">Pesquisar</span> -->
                  </b-button>
                  <b-button
                    v-b-tooltip.hover
                    variant="outline-info"
                    :to="{name: 'cadastrar-professores' }"
                    title="Cadastrar novo professor"
                  >
                    <feather-icon icon="PlusIcon" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>

          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="professores"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="Nenhum professor foi encontrado"
        :sort-desc.sync="isSortDirDesc"
      >

        <template #cell(user)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="30"
                :src="data.item.professor_foto"
                :text="avatarText(data.item.nome)"
                :variant="`light-${resolveUserRoleVariant(data.item.role)}`"
              />
            </template>
            <b-link
              :to="{ name: 'editar-professor', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.nome | truncate(12, '...') }}
            </b-link>
          </b-media>
        </template>

        <template #cell(professor_cpf)="data">
          {{ data.item.professor_cpf | truncate(10, '...') }}
        </template>

        <template #cell(formacao)="data">
          {{ data.item.formacao | truncate(7, '...') }}
        </template>

        <template #cell(tel_contato)="data">
          {{ data.item.tel_contato | truncate(7, '...') }}
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-button

            v-b-tooltip.hover
            variant="danger"
            class="btn-icon"
            title="Excluir professor"
            @click="() => excluirProfessor(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
        </template>

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
  BDropdownDivider,
  BPagination,
  VBTooltip,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BSpinner,

} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { debounce } from 'lodash'
import configProfessor from './configProfessor'
import userStoreModule from './userStoreModule'

export default {
  components: {

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
    BDropdownDivider,
    BPagination,
    VBTooltip,
    vSelect,
    VBTooltip,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BSpinner,
  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  data() {
    return {
      professores: [],
      campo: '',
      campoPesquisa: '',

    }
  },

  methods: {
    excluirProfessor(id) {
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
              .delete(`/professores/${id}`)
              .then(response => {
                if (response.status == 200 || response.status == 204) {
                  this.$swal({
                    icon: 'success',
                    title: 'Excluído',
                    text: 'Este professor foi excluído com sucesso',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                  this.$http.get('professores')
                    .then(response => this.professores = response.data.data)
                } else {
                  this.$swal({
                    title: 'Falha ao excluir!',
                    text: 'Ops! parece que houve um erro ao excluir este professor!',
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
                    text: 'Você não tem autorização para excluir um professor.',
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

    event(e) {
      this.campo = e.target.id
    },
    pesquisar() {
      if (this.campo == 'nome') {
        this.pesquisarNome(this.campoPesquisa)
      }
      if (this.campo == 'cpf') {
        this.pesquisarCpf(this.campoPesquisa)
      }
      if (this.campo == 'email') {
        this.pesquisarEmail(this.campoPesquisa)
      }

      if (this.campoPesquisa.length == 0) {
        this.get()
      }
    },

    pesquisarNome(nome) {
      this.$http.get(`professores/pesquisar/nome/${nome}`)
        .then(response => {
          this.professores = response.data.data
        })
    },

    pesquisarCpf(cpf) {
      this.$http.get(`professores/pesquisar/cpf/${cpf}`)
        .then(response => {
          this.professores = response.data.data
        })
    },

    pesquisarEmail(email) {
      this.$http.get(`professores/pesquisar/email/${email}`)
        .then(response => {
          this.professores = response.data.data
        })
    },

    get() {
      this.$http.get('professores')
        .then(response => this.professores = response.data.data)
        .finally(() => {
          this.campoPesquisa = ''
        })
    },

    handleInput: debounce(function () {
      this.pesquisar()
    }, 1000),
  },

  created() {
    this.$http.get('professores')
      .then(response => this.professores = response.data.data)
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
    } = configProfessor()

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
