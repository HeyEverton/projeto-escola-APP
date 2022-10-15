<template>
  <div>
    

  </div>
</template>

<script>
import {
  BListGroup,
  BListGroupItem,
  BCardText,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BFormInvalidFeedback,
  BButton,
  BMedia,
  BFormTextarea,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,

} from 'bootstrap-vue'


import vSelect from 'vue-select'
import router from '@/router'

export default {
  components: {
    BListGroup,
    BListGroupItem,
    BCardText,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BButton,
    BMedia,
    BFormTextarea,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    vSelect,
  },

  data() {
    return {
      userData: {},

      user_id: '',
      aluno_id: '',

      data_pagamento: '',
      valor_pago: '',
      status: '',
      observacao: '',

      statusPagamento: [
        { code: 1, nome: 'Em aberto' },
        { code: 2, nome: 'Pago com atraso' },
        { code: 3, nome: 'Pago' },
        { code: 4, nome: 'Atrasado' },
      ],
    }
  },

  // created() {
  //   this.$http
  //     .get(`parcelas/${router.currentRoute.params.id}`)
  //     .then(response => {
  //       this.userData = response.data.data
  //     })
  //     .catch(error => {
  //       if (error.response.status === 404) {
  //         userData.value = undefined
  //       }
  //     })
  // },


  methods: {
    teste() {
      alert('oi chegou')
      // console.log(id)
    },
    testando() {
      this.teste()
    }
   
  },
}
</script>
