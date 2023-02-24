<template>
  <div>
    <b-form>
      <validation-observer
        ref="infoRules"
        tag="form"
      >
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Dados bancários
            </h5>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Número da conta"
              label-for="numero_conta"
            >
              <b-form-input
                id="full-name"
                v-model="userData.numero_conta"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Agência"
              label-for="agencia"
            >

              <validation-provider
                #default="{ errors }"
                name="Agência"
                rules="required"
              >
                <b-form-input
                  id="agencia"
                  v-model="userData.agencia"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <validation-provider
              #default="{ errors }"
              name="Banco"
              rules="required"
            >
              <b-form-group
                label="Banco"
                label-for="estado"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  v-model="userData.banco"
                  label="nome"
                  :reduce="bancos => bancos.code"
                  :options="bancos"
                  placeholder="Selecione banco"
                />
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col md="6">
            <validation-provider
              #default="{ errors }"
              name="Forma de pagamento"
              rules="required"
            >
              <b-form-group
                label="Forma de pagamento"
                label-for="estado"
                :state="errors.length > 0 ? false:null"
              >
                <v-select
                  v-model="forma_pagamento"
                  label="nome"
                  :reduce="bancos => bancos.code"
                  :options="forma_pagamentos"
                  placeholder="Selecione a forma de pagamento"
                />
              </b-form-group>
            </validation-provider>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Valor do salário"
              label-for="valor_salario"
            >
              <b-form-input
                id="valor_salario"
                v-model="valor_salario"
              />

            </b-form-group>
          </b-col>

        </b-row>
      </validation-observer>
    </b-form>

    <b-row class="mt-2">
      <b-col>
        <b-button
          variant="primary"
          class="mb-1 mb-sm-0 mr-0 mr-sm-1"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
          @click="updateProfessor"
        >

          Salvar
        </b-button>
        <b-button
          :to="{name: 'lista-professores'}"
          variant="outline-secondary"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
        >
          Cancelar
        </b-button>
      </b-col>
    </b-row>

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

} from 'bootstrap-vue'

import router from '@/router'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import vSelect from 'vue-select'

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
    ValidationObserver,
    ValidationProvider,
    vSelect,

  },
  // setup() {
  //   const userDataSocial = {
  //     twitter: ' ',
  //     facebook: '',
  //     instagram: '',
  //     github: '',
  //     codepen: '',
  //     slack: '',
  //   }
  //   // const userDataRedes = {
  //   //   twitter: 'userData[0].twitter_empresa'
  //   // }

  //   // ? dataField is field name of `userDataSocial` object
  //   const socialInputs = [
  //     {
  //       icon: 'TwitterIcon',
  //       dataField: 'twitter',
  //       label: 'Twitter',
  //     },
  //     {
  //       icon: 'FacebookIcon',
  //       dataField: 'facebook',
  //       label: 'facebook',
  //     },
  //     {
  //       icon: 'InstagramIcon',
  //       dataField: 'instagram',
  //       label: 'instagram',
  //     },
  //     {
  //       icon: 'GithubIcon',
  //       dataField: 'github',
  //       label: 'github',
  //     },
  //     {
  //       icon: 'CodepenIcon',
  //       dataField: 'codepen',
  //       label: 'codepen',
  //     },
  //     {
  //       icon: 'SlackIcon',
  //       dataField: 'slack',
  //       label: 'slack',
  //     },
  //   ]

  //   return {
  //     userDataSocial,
  //     socialInputs,
  //     // userDataRedes,
  //   }
  // },

  data() {
    return {
      userData: {},
      bancos: [
        { code: 'BBR', nome: 'Banco do Brasil' },
        { code: 'S', nome: 'Santander' },
        { code: 'BR', nome: 'Bradesco' },
        { code: 'N', nome: 'Neon' },
        { code: 'P', nome: 'PicPay' },
        { code: 'NB', nome: 'Nubank' },
        { code: 'CE', nome: 'Caixa Econômica' },
        { code: 'I', nome: 'Itaú' },
        { code: 'BP', nome: 'Banco Pan' },
      ],

      forma_pagamentos: [
        { code: 'D', nome: 'Transferência DOC' },
        { code: 'T', nome: 'Transferência TED' },
        { code: 'P', nome: 'Pix' },
      ],

    }
  },

  created() {
    this.$http.get(`professores/${router.currentRoute.params.id}`)
      .then(response => { this.userData = response.data.data })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })
  },

  methods: {
    updateProfessor() {
      let payload = ''
      payload = new FormData()
      payload.append('professor_foto', this.userData.professor_foto)
      payload.append('nome', this.userData.nome)
      payload.append('email', this.userData.email)
      payload.append('professor_cpf', this.userData.professor_cpf)
      payload.append('professor_rg', this.userData.professor_rg)
      payload.append('estado_civil', this.userData.estado_civil)
      payload.append('sexo', this.userData.sexo)
      payload.append('formacao', this.userData.formacao)
      payload.append('nacionalidade', this.userData.nacionalidade)
      payload.append('tel_contato', this.userData.tel_contato)
      payload.append('nome_rua', this.userData.nome_rua)
      payload.append('numero_residencia', this.userData.numero_residencia)
      payload.append('cep', this.userData.cep)
      payload.append('cidade', this.userData.cidade)
      payload.append('estado', this.userData.estado)
      payload.append('bairro', this.userData.bairro)
      payload.append('banco', this.userData.banco)
      payload.append('numero_conta', this.userData.numero_conta)
      payload.append('agencia', this.userData.agencia)
      payload.append('_method', 'put')

      this.$http
        .post(`professores/${router.currentRoute.params.id}`, payload)
        .then(response => {
          if (response.status == 200) {
            this.$swal({
              icon: 'success',
              title: 'Editado com sucesso',
              text: 'Sucesso ao editar os dados!',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          }
          this.$router.replace('/lista-professores')
        })
        .catch(error => {
          this.$swal({
            title: 'Falha ao editar!',
            text: 'Ops! parece que houve um erro ao editar seus dados!',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
  },
}
</script>

<style>

</style>
