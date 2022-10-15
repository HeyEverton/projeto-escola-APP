<template>
  <div>

    <b-col
      cols="12"
      class="mb-2"
    >
      <h5 class="mb-2">
        Suas parcelas
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
        <sidebar-detalhes />
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
            variant="info"
            class="btn-icon mr-1"
            title="Ver detalhes"
            >
            <feather-icon icon="SearchIcon" />
          </b-button>

          <b-button
            v-b-tooltip.hover
            v-b-toggle.sidebar-right
            variant="primary"
            class="btn-icon "
            title="Informar pagamento"
            @click="toggle(data.item.id)"
            v-if="data.item.status == 'Em aberto'"
          >
          
            <feather-icon icon="DollarSignIcon"  />
          </b-button>

          <span v-else class="text-success" >
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

} from 'bootstrap-vue'

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
    SidebarDetalhes
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

  data() {
    return {
      // userData: {},
      mensalidades: [],
      pagamentos: [],
      parcela_id: '',
      matricula_id: '',
      payload: {},

      colunas: [
        {key: 'id', thClass:'d-none', tdClass:'d-none'},
        { key: 'parcelas', label: 'Parcela' },
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
    }
  },

  computed: {
    changeStatus(status) {
      // console.log(status.mensalidades)
      // let parcelas = this.mensalidades
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
