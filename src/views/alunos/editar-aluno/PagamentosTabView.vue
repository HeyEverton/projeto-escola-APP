<template>
  <div>

    <b-col
      cols="12"
      class="mb-2"
    >
      <h5 class="mb-2">
        Suas mensalidades
      </h5>

      <b-sidebar
        id="sidebar-right"
        bg-variant="white"
        right
        backdrop
        shadow
      >
        <sidebar-pagamento :parcela="parcela" @informar-pagamento="informarPagamento"/>

      </b-sidebar>

      <b-sidebar
        id="sidebar-detalhes"
        bg-variant="white"
        right
        backdrop
        shadow
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
                    <b-form-input placeholder="Insira o valor pago pelo aluno" 
                    readonly
                    v-model="userData.valor_pago" />
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
                  disbled

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

              <div class="d-flex justify-content-between mt-2">  
                <b-button
                  variant="danger"
                  class="mb-1 mb-sm-0 mr-0"
                  :block="$store.getters['app/currentBreakPoint'] === 'xs'"
                >
                  Voltar
                </b-button>  
              </div>
            </b-col>
  
          </b-row>
        </b-form>
       
      </b-sidebar>

      <b-table
        small
        :fields="fields"
        :items="mensalidades"
        bordered
        responsive
        show-empty
        empty-text="Este aluno não possui nenhuma mensalidade"
      >

        
        <template #cell(parcelas)="data">
          {{ data.item.num_parcela }}
        </template>
       
        <template #cell(data_vencimento)="data">
          {{ moment(data.item.data_vencimento).format('DD/MM/YYYY') }}
        </template>

        <template #cell(matricula)="data">
         {{ data.item.matricula.id}}
        </template>

        <template #cell(data_pagamento)="data" >
          <span v-if="data.item.data_pagamento" class="text-primary">{{ moment(data.item.data_pagamento).format('DD/MM/YYYY') }} </span>
        </template>

        <template #cell(valor_parcela)="data">
          <span class="text-primary">R$</span> {{ data.item.valor_parcela }} 
        </template>

        <template #cell(status)="data">
          <b-badge
            pill
            :variant="status(data.item.status)"
          >
          {{data.item.status}}
          {{changeStatus}}
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
            v-b-tooltip.hover
            v-b-toggle.sidebar-right
            variant="outline-primary"
            class="btn-icon"
            title="Informar pagamento"
            @click="toggle(data.item.id)"
            v-if="data.item.status == 'Em aberto' || data.item.status == 'Atrasado'"
          >
          
            <feather-icon icon="DollarSignIcon"  />
          </b-button>

          <span v-else class="text-success">
            <feather-icon icon="CheckSquareIcon" size="35"  v-b-tooltip.hover title="Mensalidade paga" />
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


} from 'bootstrap-vue'

import vSelect from 'vue-select'
import router from '@/router'
import Ripple from 'vue-ripple-directive'
import SidebarPagamento from './SidebarPagamento.vue'
import SidebarDetalhes from './SidebarDetalhes.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { kFormatter } from '@core/utils/filter'

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
    SidebarDetalhes,
    BListGroup,
    BListGroupItem,
    BCardText,
    BFormInvalidFeedback,
    BFormTextarea,
    BInputGroupAppend,
    vSelect,
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

  disabled: {
	type: Boolean,
	default: true
  },

  data() {
    return {
      userData: {},
      mensalidades: [],
      pagamentos: [],
      parcela_id: '',
      matricula_id: '',
      payload: {},

      colunas: [
        {key: 'id', thClass:'d-none', tdClass:'d-none'},
        { key: 'parcelas', label: 'Nº Parcela' },
        { key: 'valor_parcela', label: 'Valor' },
        { key: 'matricula', label: 'Nº da matrícula' },
        { key: 'data_vencimento', label: 'Data de vencimento' },
        { key: 'valor_curso', label: 'Valor do curso' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Ações' },
      ],
      fields: [
        {key: 'id', thClass:'d-none', tdClass:'d-none'},
        { key: 'parcelas', label: 'Parcela' },
        { key: 'valor_parcela', label: 'Valor' },
        { key: 'matricula', label: 'Nº da matrícula' },
        { key: 'data_vencimento', label: 'Data de vencimento' },
        { key: 'data_pagamento', label: 'Data de pagamento' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Ações' },
      ],
      
      statusPagamento: [
        { code: 1, nome: 'Em aberto' },
        { code: 2, nome: 'Pago com atraso' },
        { code: 3, nome: 'Pago' },
        { code: 4, nome: 'Atrasado' },
      ],
      pagStatus: '',
      alunoNome: '',
      recebeu: '',
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
          parcela.status = 'Atrasado'
          return 
        }
      });
    }
  },

  props: {
    parcela: {
      type: Object,
      default: () => ({})
    },
  },

  methods: {
    kFormatter,
    status(status) {
      if( status === 'Em aberto') return 'light-info' 
      if( status === 'Pago com atraso') return 'light-warning'
      if( status === 'Pago') return 'light-success'
      if( status === 'Atrasado') return 'light-danger'
    },

    toggle(parcela_id) {
      this.parcela_id = parcela_id;   
      let id = this.parcela_id
      this.$http.get(`parcelas/${id}`)
      .then(response => {
        this.userData = response.data
        this.pagStatus = response.data.status
        this.alunoNome = response.data.aluno.nome
        this.recebeu = response.data.usuario.name
      })
    },

    informarPagamento(payload) { 
      let id = this.parcela_id
      this.$http.post(`pagamento/${id}`, payload)
      .then(response => {
        this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Sucesso!',
              text: 'O pagamento desta parcela foi informado com sucesso.',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        console.log(response)
      })
    },
  },

  created() {
    this.$http.get(`dados-aluno/${router.currentRoute.params.id}`)
      .then(response => {
        this.mensalidades = response.data.data
      })
  },
}
</script>

<style>

</style>
