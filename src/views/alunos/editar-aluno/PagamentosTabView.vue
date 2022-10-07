<template>
  <div>
    <b-table
      small
      :fields="colunas"
      :items="parcelas"
      
      bordered
      responsive
    >
      <!-- A virtual column -->
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

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

    </b-table>
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
  BBadge

} from 'bootstrap-vue'

import router from '@/router'

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
      ],
    }
  },

  created() {
    this.$http.get(`dados-aluno/${router.currentRoute.params.id}`)
      .then(response => {
        console.log(response)
         this.parcelas = response.data.data
         })
      
  },
}
</script>

<style>

</style>
