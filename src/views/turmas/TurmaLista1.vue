<template>
  <b-card>
    <h1 class="mb-3 d-flex justify-content-center">
      Todas as turmas
    </h1>

    <b-row>
      <b-col
        lg="6"
        class="mb-1"
      >
        <!-- dropdown in right side -->
        <b-input-group>
          <b-input-group-prepend>
            <b-dropdown
              text="Pesquisando por"
              variant="outline-primary"
            >
              <b-dropdown-item
                id="nome"
                ref="nome"
              >
                Nome
              </b-dropdown-item>
              <b-dropdown-item
                id="turno"
                ref="turno"
              >
                Turno
              </b-dropdown-item>
            </b-dropdown>
          </b-input-group-prepend>

          <b-form-input
            v-model="campoPesquisa"
            placeholder="Pesquisa..."
          />
          <b-input-group-append>
            <b-button
              variant="outline-primary"
              class="btn-icon"
              @click="pesquisa"
            >
              <feather-icon icon="SearchIcon" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>

    </b-row>

    <b-table
      hover
      :fields="fields"
      :items="items"
      responsive
      show-empty
      empty-text="Nenhuma turma foi encontrada"
    >

      <!-- A custom formatted column -->
      <!-- <template #cell(name)="data"> -->
      <!-- </template> -->

      <template #cell(data_inicio)="data">
        {{ moment(data.item.data_inicio).format('DD/M/YYYY') }}
      </template>

      <template #cell(professor_id)="data">
        {{ data.item.professor.nome }}
      </template>

      <template #cell(curso_id)="data">
        {{ data.item.curso.nome }}
      </template>

      <!-- A custom formatted column -->
      <!-- <template #cell(Popularity)="data">
                <b-progress
                  :value="data.value.value"
                  max="100"
                  :variant="data.value.variant"
                  striped
                />
              </template> -->

      <template #cell(status)="data">
        <b-badge
          pill
          variant="success"
        >
          {{ data.item.status }}
        </b-badge>
      </template>

      <!-- A virtual composite column -->
      <!-- <template #cell(price)="data">
                {{ '$'+data.value }}
              </template> -->

      <!-- Optional default data cell scoped slot -->
      <!-- <template #cell()="data">
                {{ data.value }}
              </template> -->
    </b-table>

  </b-card>
</template>

<script>
import {
  BTable,
  BProgress,
  BBadge,
  BCard,
  BCardBody,
  BCol,
  BFormInput,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BDropdown,
  BDropdownItem,
  BDropdownDivider,
  BRow,

} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BProgress,
    BBadge,
    BCard,
    BCardBody,
    BCol,
    BFormInput,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    BRow,
  },

  data() {
    return {
      fields: [
        { key: 'id', thClass: 'd-none', tdClass: 'd-none' },
        { key: 'nome', label: 'Nome', thClass: 'ml-4 mr-2' },
        { key: 'turno', label: 'Turno' },
        { key: 'data_inicio', label: 'Data de início' },
        { key: 'professor_id', label: 'Professor' },
        { key: 'curso_id', label: 'Curso' },
        { key: 'horario_entrada', label: 'Horário entrada' },
        { key: 'horario_saida', label: 'Horário saída' },
        { key: 'qt_max_alunos', label: 'Qt. máx. alunos' },
        { key: 'status', label: 'Status' },
      ],
      items: [],
      campoPesquisa: '',
    }
  },

  created() {
    this.$http.get('turmas/curso/professor')
      .then(response => {
        this.items = response.data.data
        // console.log(this.$refs.nome.$attrs.id)
        // console.log(this.$refs.turno.$attrs.id)
      })
  },

  methods: {
    pesquisa() {
      if (this.$refs.nome.$attrs.id === 'nome') {
        console.log(this.$refs.nome.$attrs.id)
        // this.pesquisaNome()
      } else {
        this.pesquisaTurno()
      }
    },
    pesquisaTurno() {
      this.$http.get(`turmas/pesquisar/turno/${this.campoPesquisa}`)
        .then(response => {
          this.items = response.data.data
        })
    },

    pesquisaNome() {
      this.$http.get(`turmas/pesquisar/nome/${this.campoPesquisa}`)
        .then(response => {
          this.items = response.data.data
        })
    },

  },

}
</script>
