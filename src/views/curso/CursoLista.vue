<template>
  <div>

    <b-col
      cols="12"
      md="6"
    >
      <h1 class="mx-auto mt-2 mb-2">
        Todos os cursos
      </h1>

      <div class="d-flex align-items-center justify-content-end mb-3 mt-2">
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
                <feather-icon icon="FileTextIcon" />
                Nome
              </b-dropdown-item>

              <b-dropdown-item
                id="preco"
                @click="event"
              >
                <feather-icon icon="DollarSignIcon" />
                Preço
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
              :to="{name: 'cadastrar-curso' }"
              title="Cadastrar novo curso"
            >
              <feather-icon icon="PlusIcon" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </div>

    </b-col>

    <div class="d-flex flex-wrap">
      <b-col
        v-for="cursoItem in cursos"
        :key="cursoItem.id"
        md="6"
        lg="4"
      >
        <CursoComponente
          :id="cursoItem.id"
          :curso="cursoItem"
          :nome="cursoItem.nome"
          :descricao="cursoItem.descricao"
          :preco="cursoItem.preco"
          :carga_horaria="cursoItem.carga_horaria"
          :desconto="cursoItem.desconto"
          :created_at="cursoItem.created_at"
          @afterDeleting="afterDeleting"
        />
      </b-col>
    </div>

    <div
      v-if="cursos.length == 0"
      class="d-flex flex-wrap ml-1"
    >
      <b-alert
        variant="warning"
        show
      >
        <h4 class="alert-heading">
          Ops!
        </h4>
        <div class="alert-body">
          <span>Nenhum curso foi encontrado.</span> <b-link
            class="text-primary"
            :to="{name: 'cadastrar-curso'}"
          >
            Cadastre um curso!
          </b-link>
        </div>
      </b-alert>
    </div>

  </div>
</template>
<script>
import {
  BCard,
  BCardText,
  BButton,
  BRow,
  BCol,
  BModal,
  VBModal,
  BAlert,
  BFormInput,
  BDropdown,
  BDropdownItem,
  BDropdownDivider,
  BPagination,
  VBTooltip,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BLink,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'
import { debounce } from 'lodash'
import CursoComponente from './CursoComponente.vue'

export default {
  components: {
    BCard,
    BButton,
    BCardText,
    BRow,
    BCol,
    CursoComponente,
    BModal,
    VBModal,
    BAlert,
    BFormInput,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    BPagination,
    VBTooltip,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BLink,
  },

  directives: {
    'b-modal': VBModal,
    'b-tooltip': VBTooltip,
    Ripple,
  },

  data() {
    return {
      cursos: [],
      campoPesquisa: '',
      campo: '',
    }
  },

  created() {
    this.$http.get('cursos')
      .then(response => {
        this.cursos = response.data.data
      })
  },

  methods: {
    afterDeleting() {
      this.$http.get('cursos')
        .then(response => {
          this.cursos = response.data.data
        })
    },

    event(e) {
      this.campo = e.target.id
    },

    pesquisar() {
      if (this.campo == 'nome') {
        this.pesquisarNome(this.campoPesquisa)
      }
      if (this.campo == 'preco') {
        this.pesquisarPreco(this.campoPesquisa)
      }
      if (this.campoPesquisa == '') {
        this.get()
      }
    },

    pesquisarNome(nome) {
      this.$http.get(`cursos/pesquisar/nome/${nome}`)
        .then(response => {
          this.cursos = response.data.data
        })
        .then(() => {
          this.campoPesquisa = ''
        })
    },

    pesquisarPreco(preco) {
      this.$http.get(`cursos/pesquisar/preco/${preco}`)
        .then(response => {
          this.cursos = response.data.data
        })
        .then(() => {
          this.campoPesquisa = ''
        })
    },

    get() {
      this.$http.get('cursos')
        .then(response => this.cursos = response.data.data)
        .finally(() => {
          this.campoPesquisa = ''
        })
    },

    handleInput: debounce(function () {
      this.pesquisar()
    }, 1000),
  },

}
</script>
