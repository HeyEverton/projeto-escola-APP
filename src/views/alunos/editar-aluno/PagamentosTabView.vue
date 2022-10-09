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
        <sidebar-content />
    </b-sidebar>

    
    <b-table
      small
      :fields="colunas"
      :items="parcelas"
      bordered
      responsive
    >

      <!-- A custom formatted column -->
      <template #cell(parcelas)="data">
        {{ data.item.num_parcela }}
      </template>

      <!-- A custom formatted column -->
      <template #cell(data_vencimento)="data">
        {{moment(data.item.data_vencimento).format('DD/MM')}}
      </template>

      <template #cell(matricula)="data">
        {{ data.item.matricula.id}}
      </template>

      <template #cell(valor_curso)="data">
        {{ data.item.matricula.valor_curso}} R$
      </template>
      
      <!-- <template #cell(status)="data">
        {{ data.item.matricula.valor_curso}} R$
      </template> -->
      
      <template #cell(status)="data">
        <b-badge
        pill
          variant="success"
          >
          Pago
          <!-- {{data.item.pagamento.status}} -->
        </b-badge>
      </template>
      
      <template #cell(actions)="data">

        <b-button
        v-b-tooltip.hover
        
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
        >
        <feather-icon icon="DollarSignIcon" />
      </b-button>
        
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
import SidebarContent from './SidebarContent.vue'
import Ripple from 'vue-ripple-directive'

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
    SidebarContent,
    BSidebar, 



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
    // const userDataRedes = {
    //   twitter: 'userData[0].twitter_empresa'
    // }

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
      // userDataRedes,
    }
  },

  data() {
    return {
      // userData: {},
      parcelas: [],
      pagamentos: [],

      colunas: [
        {key: 'parcelas', label: 'Parcela'},
        {key: 'valor_parcela', label: 'Valor'},
        {key: 'data_vencimento', label: 'Data de vencimento'},
        {key: 'matricula', label: 'Nº da matrícula'},
        {key: 'valor_curso', label: 'Valor do curso'},
        {key: 'status', label: 'Status do pagamento'},
        {key: 'actions', label: 'Ações'},
      ],
    }
  },

  created() {
    this.$http.get(`dados-aluno/${router.currentRoute.params.id}`)
      .then(response => {
        console.log('============DADOS========================')
        this.parcelas = response.data.data
        // console.log(this.parcelas)
      })
      // this.$http.get(`pagamentos/alunos/${router.currentRoute.params.id}`)
      // .then(response => {
      //      console.log('============PAGAMENTOS========================')
      //     this.parcelas = response.data
      //     console.log(this.parcelas)
      //    })
      
  },
}
</script>

<style>

</style>
