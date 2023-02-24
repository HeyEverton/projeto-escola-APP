<template>
  <div>

    <b-col
      cols="12"
      class="mb-2"
    >
      <h5 class="mb-2">
        Mensalidades de {{ alunoData.nome }}
      </h5>

      <b-sidebar
        id="sidebar-right"
        bg-variant="white"
        right
        backdrop
        shadow
      >
        <sidebar-pagamento
          :parcela="parcela"
          @informar-pagamento="informarPagamento"
        />

      </b-sidebar>

      <b-sidebar
        id="sidebar-detalhes"
        bg-variant="white"
        right
        backdrop
        shadow
        no-header
      >
        <!-- <sidebar-detalhes :parcela="parcela" /> -->
        <div class="text-center">
          <b-card-text class="mt-2 h4 color-inherit text-reset">
            Detalhes do pagamento
          </b-card-text>
        </div>

        <b-form class="d-flex px-1 mt-3">
          <b-row>

            <b-col md="12">
              <b-form-group
                label="Aluno"
                label-for="aluno"
              >
                <b-form-input
                  id="aluno"
                  v-model="alunoNome"
                  readonly
                  placeholder="Insira o nome do aluno"
                />
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Quem recebeu o pagamento"
                label-for="recebeu"
              >
                <b-form-input
                  id="aluno"
                  v-model="recebeu"
                  readonly
                  placeholder="Insira o nome do aluno"
                />
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Valor pago"
                label-for="valor_pago"
              >
                <b-input-group
                  append="R$"
                  readonly
                >
                  <b-form-input
                    v-model="userData.valor_pago"
                    placeholder="Insira o valor pago pelo aluno"
                    readonly
                  />
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Data de pagamento"
                label-for="data_pagamento"
              >
                <b-form-input
                  id="data_pagamento"
                  v-model="userData.data_pagamento"
                  placeholder="Insira o e-mail do aluno"
                  type="date"
                  readonly
                />
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Status"
                label-for="status"
              >
                <v-select
                  v-model="pagStatus"
                  label="nome"
                  :options="statusPagamento"
                  :reduce="statusPagamento => statusPagamento.code"
                  placeholder="Selecione o status de pagamento"
                  disabled
                />
              </b-form-group>
            </b-col>

            <b-col
              md="12"
            >
              <b-form-group
                label="Observação"
                label-for="observacao"
              >
                <b-form-textarea
                  id="observacao"
                  v-model="userData.observacao"
                  rows="4"
                  placeholder="Tem alguma observação sobre?"
                  readonly
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-sidebar>

      <div class="d-flex">
        <b-input-group class="mb-2 ">
          <!-- <b-input-group-prepend> -->
          <b-dropdown
            text="Listar todas as parcelas..."
            variant="outline-primary"
          >
            <b-dropdown-item
              @click="parcelasAbertas"
            >
              <span class="text-info">
                <feather-icon icon="DollarSignIcon" />
                Abertas</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="parcelasPagas"
            >
              <span class="text-success">
                <feather-icon icon="CheckSquareIcon" />
                Pagas</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="parcelaPagaComAtraso"
            >
              <span class="text-warning">
                <feather-icon icon="AlertCircleIcon" />
                Pagas com atraso</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="parcelasAtrasadas"
            >
              <span class="text-danger">
                <feather-icon icon="AlertTriangleIcon" />
                Atrasadas</span>
            </b-dropdown-item>

            <b-dropdown-divider />

            <b-dropdown-item
              @click="todasParcelas"
            >
              <span class="text-primary">

                Listar todas</span>
            </b-dropdown-item>
          </b-dropdown>
        </b-input-group>
      </div>

      <b-table
        small
        :fields="fields"
        :items="mensalidades"
        bordered
        responsive
        show-empty
        empty-text="Nenhuma parcela foi encontrada"
      >

        <template #cell(parcelas)="data">
          {{ data.item.num_parcela }}
        </template>

        <template #cell(data_vencimento)="data">
          {{ moment(data.item.data_vencimento).format('DD/MM/YYYY') }}
        </template>

        <!-- eslint-disable-next-line -->
        <template #cell(matricula)="data">
          {{ changeNomeTurma }}
        </template>

        <template #cell(data_pagamento)="data">
          <span
            v-if="data.item.data_pagamento"
            class="text-primary"
          >{{ moment(data.item.data_pagamento).format('DD/MM/YYYY') }} </span>
        </template>

        <template #cell(valor_parcela)="data">
          <span class="text-primary">R$</span> {{ data.item.valor_parcela | truncate(6, 'ㅤ') }}
        </template>

        <template #cell(status)="data">
          <b-badge
            pill
            :variant="status(data.item.status)"
          >
            {{ data.item.status }}
            {{ changeStatus }}
          </b-badge>
        </template>
        <template #cell(actions)="data">

          <b-button
            v-b-tooltip.hover
            v-b-toggle.sidebar-detalhes
            variant="outline-info"
            class="btn-icon mr-1"
            title="Ver detalhes"
            @click="toggle(data.item.id)"
          >
            <feather-icon icon="SearchIcon" />
          </b-button>

          <b-button
            v-if="data.item.status == 'Em aberto' || data.item.status == 'Atrasada'"
            v-b-tooltip.hover
            v-b-toggle.sidebar-right
            variant="outline-primary"
            class="btn-icon"
            title="Informar pagamento"
            @click="toggle(data.item.id)"
          >
            <feather-icon icon="DollarSignIcon" />
          </b-button>

          <span
            v-else
            class="text-success"
          >
            <feather-icon
              v-b-tooltip.hover
              icon="CheckSquareIcon"
              size="35"
              title="Mensalidade paga"
            />
          </span>

        </template>

      </b-table>
    </b-col>
  </div>
</template>

<script>

import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BTable,
  BProgress,
  BBadge,
  BSidebar,
  VBToggle,
  VBTooltip,
  BListGroup,
  BListGroupItem,
  BCardText,
  BFormInvalidFeedback,
  BFormTextarea,
  BInputGroupAppend,
  BDropdown,
  BDropdownItem,
  BDropdownDivider,

} from 'bootstrap-vue'

import vSelect from 'vue-select'
import router from '@/router'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { kFormatter } from '@core/utils/filter'
import SidebarPagamento from './SidebarPagamento.vue'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BTable,
    BProgress,
    BBadge,
    SidebarPagamento,
    BSidebar,
    BListGroup,
    BListGroupItem,
    BCardText,
    BFormInvalidFeedback,
    BFormTextarea,
    BInputGroupAppend,
    vSelect,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
  },

  directives: {
    'b-toggle': VBToggle,
    'b-tooltip': VBTooltip,
  },

  setup() {
    const userDataSocial = {
      twitter: ' ',
      facebook: '',
      instagram: '',
      github: '',
      codepen: '',
      slack: '',
    }

    // const transformData = computed(() =>{
    //   return

    // })

    // ? dataField is field name of `userDataSocial` object
    const socialInputs = [
      {
        icon: 'TwitterIcon',
        dataField: 'twitter',
        label: 'Twitter',
      },
      {
        icon: 'FacebookIcon',
        dataField: 'facebook',
        label: 'facebook',
      },
      {
        icon: 'InstagramIcon',
        dataField: 'instagram',
        label: 'instagram',
      },
      {
        icon: 'GithubIcon',
        dataField: 'github',
        label: 'github',
      },
      {
        icon: 'CodepenIcon',
        dataField: 'codepen',
        label: 'codepen',
      },
      {
        icon: 'SlackIcon',
        dataField: 'slack',
        label: 'slack',
      },
    ]

    return {
      userDataSocial,
      socialInputs,
    }
  },

  props: {
    parcela: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      userData: {},
      mensalidades: [],
      pagamentos: [],
      parcela_id: '',
      matricula_id: '',
      payload: {},
      alunoData: {},

      fields: [
        { key: 'id', thClass: 'd-none', tdClass: 'd-none' },
        { key: 'parcelas', label: 'Parcela' },
        { key: 'valor_parcela', label: 'Valor' },
        { key: 'matricula', label: 'Nome da turma' },
        { key: 'data_vencimento', label: 'Data de vencimento' },
        { key: 'data_pagamento', label: 'Data de pagamento' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Ações' },
      ],

      statusPagamento: [
        { code: 1, nome: 'Em aberto' },
        { code: 2, nome: 'Pago com atraso' },
        { code: 3, nome: 'Pago' },
        { code: 4, nome: 'Atrasada' },
      ],
      pagStatus: '',
      alunoNome: '',
      recebeu: '',

      parcelasMatricula: [],
      nomeTurma: '',
    }
  },

  computed: {
    changeStatus(status) {
      status.mensalidades.forEach(parcela => {
        if (parcela.status === 1) {
          parcela.status = 'Em aberto'
          return
        }
        if (parcela.status === 2) {
          parcela.status = 'Pago com atraso'
          return
        }
        if (parcela.status === 3) {
          parcela.status = 'Pago'
          return
        }

        if (parcela.status === 4) {
          parcela.status = 'Atrasada'
        }
      })
    },

    changeNomeTurma() {
      return this.nomeTurma
    },

  },

  created() {
    this.$http.get(`dados-aluno/${router.currentRoute.params.id}`)
      .then(response => {
        this.mensalidades = response.data.data
      })

    this.$http.get(`parcelas/matricula/turmas/${router.currentRoute.params.id}`)
      .then(response => {
        this.parcelasMatricula = response.data.data
        this.nomeTurma = this.parcelasMatricula[0].turma.nome
      })
    this.$http.get(`alunos/${router.currentRoute.params.id}`)
      .then(response => {
        // console.log(response.data.data)
        this.alunoData = response.data.data
      })
  },

  methods: {
    kFormatter,
    status(status) {
      if (status === 'Em aberto') return 'light-info'
      if (status === 'Pago com atraso') return 'light-warning'
      if (status === 'Pago') return 'light-success'
      if (status === 'Atrasada') return 'light-danger'
    },

    toggle(parcela_id) {
      this.parcela_id = parcela_id
      const id = this.parcela_id
      this.$http.get(`parcelas/${id}`)
        .then(response => {
          this.userData = response.data
          this.pagStatus = response.data.status
          this.alunoNome = response.data.aluno.nome
          this.recebeu = response.data.usuario.name
        })
    },

    informarPagamento(payload) {
      const id = this.parcela_id
      this.$http.post(`pagamento/${id}`, payload)
        .then(response => {
          this.$swal({
            icon: 'success',
            title: 'Sucesso!',
            text: 'O pagamento desta parcela foi informado com sucesso',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          payload = ''
        })
        .then(() => {
          this.$http.get(`dados-aluno/${router.currentRoute.params.id}`)
            .then(response => {
              this.mensalidades = response.data.data
            })
        })
    },

    parcelasAbertas() {
      this.$http.get(`parcelas/abertas/${router.currentRoute.params.id}`)
        .then(response => {
          this.mensalidades = response.data
        })
    },
    parcelasPagas() {
      this.$http.get(`parcelas/pagas/${router.currentRoute.params.id}`)
        .then(response => {
          this.mensalidades = response.data
        })
    },

    parcelaPagaComAtraso() {
      this.$http.get(`parcelas/pagas-atraso/${router.currentRoute.params.id}`)
        .then(response => {
          this.mensalidades = response.data
        })
    },

    parcelasAtrasadas() {
      this.$http.get(`parcelas/atrasadas/${router.currentRoute.params.id}`)
        .then(response => {
          this.mensalidades = response.data
        })
    },

    todasParcelas() {
      this.$http.get(`dados-aluno/${router.currentRoute.params.id}`)
        .then(response => {
          this.mensalidades = response.data.data
        })
    },
  },
}
</script>

<style>

</style>
