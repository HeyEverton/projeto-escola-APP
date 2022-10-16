<template>
  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0 d-flex"
    >
      <h1 class="mx-auto mt-2 mb-2">
        Todos as turmas
      </h1>

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <!-- <b-col
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
          </b-col> -->

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
            class=""
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
                    <feather-icon icon="FileTextIcon"/>
                   &nbsp; Nome
                  </b-dropdown-item>
                  
                  <b-dropdown-item
                  id="turno"
                  @click="event"
                  >
                  <feather-icon icon="ClockIcon"/>
                      Turno
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
                    :to="{name: 'cadastrar-turma' }"
                    title="Criar nova turma"
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
        :items="turmas"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        :sort-desc.sync="isSortDirDesc"
        show-empty
        empty-text="Nenhuma turma foi encontrada"
      >

        <template #cell(turma)="data">
          <b-link
            :to="{ name: 'editar-turma', params: { id: data.item.id } }"
            class="font-weight-bold d-block text-nowrap"
          >
            {{ data.item.nome }}
          </b-link>
        </template>

        <template #cell(professor_id)="data">
          {{ data.item.professor.nome | truncate(9, '...') }}
        </template>

        <template #cell(data_inicio)="data">
          {{ moment(data.item.data_inicio).format('DD/M/YYYY') }}
        </template>

        <template #cell(curso_id)="data">
          {{ data.item.curso.nome | truncate(12, '...') }}
        </template>

        <template #cell(horario_entrada)="data">
          <span class="text-primary">{{ data.item.horario_entrada }}</span>
        </template>

        <template #cell(horario_saida)="data">
          <span class="text-primary">{{ data.item.horario_saida }}</span>
        </template>

        <template #cell(qt_atual_alunos)="data">
          <span class="text-primary">{{ data.item.qt_atual_alunos }}</span>
        </template>

        <template #cell(status)="data">
          <b-badge
            pill
            :variant="status(data.item.status)"
          >
            {{ data.item.status}}
            {{changeStatus}}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <!-- <b-button
            v-b-tooltip.hover
            variant="primary"
            class="btn-icon mr-1"
            :to="{ name: 'editar-usuario', params: { id: data.item.id } }"
            title="Editar perfil"
          >
            <feather-icon icon="EditIcon" />
          </b-button> -->

          <b-button
            v-b-tooltip.hover
            variant="danger"
            class="btn-icon "
            title="Excluir turma"
            @click="excluirTurma(data.item.id)"
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
// import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { debounce } from 'lodash'
import useUsersList from './useUsersList'
import { kFormatter } from '@core/utils/filter'

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
      turmas: [],
      campoPesquisa: '',
      campo: '',

    }
  },

  computed: {
    changeStatus(status) {
      status.turmas.forEach(turmas => {
        if (turmas.status === 'A') {
         turmas.status = 'Em aberto'
         return 
        }
        if (turmas.status === 'AN') {
          turmas.status = 'Em andamento'
          return 
        }
        if (turmas.status === 'F') {
          turmas.status = 'Fechada'
          return 
        }
      });

      status.turmas.forEach(turmas => {
        if (turmas.turno === 'M') {
         turmas.turno = 'Manhã'
         return 
        }
        if (turmas.turno === 'T') {
          turmas.turno = 'Tarde'
          return 
        }
        if (turmas.turno === 'N') {
          turmas.turno = 'Noite'
          return 
        }
      });

    }
  },

  methods: {
    kFormatter,
    status(status) {
      if( status === 'Em aberto') return 'light-info' 
      if( status === 'Em andamento') return 'light-primary'
      if( status === 'Fechada') return 'light-danger'
    },

    excluirTurma(id) {
      this.$swal({
        title: 'Tem certeza?',
        text: 'Você não conseguirá desfazer isso.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Não, Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
        .then(res => {
          if (res.isConfirmed) {
            this.$http
              .delete(`/turmas/${id}`)
              .then(response => {
                if (response.status == 200 || response.status == 204) {
                  this.$swal({
                    icon: 'success',
                    title: 'Excluído',
                    text: 'Esta turma foi excluída com sucesso',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                  this.$http.get('turmas')
                    .then(response => this.turmas = response.data.data)
                } else {
                  this.$swal({
                    title: 'Falha ao excluir!',
                    text: 'Ops! parece que houve um erro ao excluir esta turma!',
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
                    text: 'Você não tem autorização para excluir uma turma.',
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

    pesquisaNome(nome) {
      this.$http.get(`turmas/pesquisar/nome/${nome}`)
        .then(response => {
          this.turmas = response.data
        })
    },

    pesquisaTurno(turno) {
      this.$http.get(`turmas/pesquisar/turno/${turno}`)
        .then(response => {
          this.turmas = response.data
        })
    },
    event(e) {
      this.campo = e.target.id
    },

    pesquisar() {
      if (this.campo == 'nome') {
        this.pesquisaNome(this.campoPesquisa)
      }
      if (this.campo == 'turno') {
        this.pesquisaTurno(this.campoPesquisa)
      }
    },

    handleInput: debounce(function () {
      this.pesquisar()
    }, 1000),

    get() {
      this.$http.get('turmas/curso/professor')
        .then(response => this.turmas = response.data.data)
    },
  },

  created() {
    this.$http.get('turmas/curso/professor')
      .then(response =>  this.turmas = response.data.data)
  },

  setup() {
    // const USER_APP_STORE_MODULE_NAME = 'app-user'

    // // Register module
    // if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    // })

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
