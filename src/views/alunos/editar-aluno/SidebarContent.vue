<template>
    <div>
      <div class="text-center">

        <!-- Name -->
        <b-card-text class="mt-2 h4 color-inherit text-reset">
        Informar pagamento
        </b-card-text>
      </div>

      <validation-observer
      ref="accountRules"
      tag="form"
    >
     <b-form class="d-flex px-1 mt-3">

        <b-row>
            <b-col md="12">
              <b-form-group
                label="Aluno"
                label-for="aluno"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Aluno"
                  rules="required"
                >

                  <b-form-input
                    id="aluno"
                    readonly
                    v-model="userData.nome"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o nome do aluno"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Valor pago"
                label-for="valor_pago"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Valor pago"
                  rules="required"
                >   
                <b-input-group
                append="R$"
                v-model="valor_pago"
                :state="errors.length > 0 ? false:null"
                >
                <b-form-input placeholder="Insira o valor pago pelo aluno" />
                </b-input-group>


                  <!-- <b-form-input
                    id="valor_pago"
                    v-model="valor_pago"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o valor pago pelo aluno"
                  /> -->
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
    
            <b-col md="12">
              <b-form-group
                label="Data de pagamento"
                label-for="data_pagamento"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Data de pagamento"
                  rules="required"
                >
                  <b-form-input
                    id="data_pagamento"
                    v-model="data_pagamento"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o e-mail do aluno"
                    type="date"
                    />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col> 
    
            <b-col md="12">
              <b-form-group
                label="Status"
                label-for="status"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Status de pagamento"
                  rules="required"
                  >
                  <v-select
                  v-model="status"
                  label="nome"
                  :options="statusPagamento"
                  placeholder="Selecione o status de pagamento"
                
              />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
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
                  v-model="observacao"
                  rows="4"
                  placeholder="Tem alguma observação sobre?"
                />
              </b-form-group>
              <div class="d-flex justify-content-between mt-2">

              <b-button
              variant="success"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="informarPagamento"
              >
              Confirmar
              </b-button>

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
    </validation-observer>

      
  
      
        
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
    BFormInvalidFeedback,
    BButton,
    BMedia,
    BFormTextarea,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,

  } from 'bootstrap-vue'

  import { ValidationProvider, ValidationObserver } from 'vee-validate'
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
        BFormInvalidFeedback,
        BButton,
        BMedia,
        BFormTextarea,
        ValidationProvider,
        ValidationObserver,
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
            {code: 1, nome: 'Em aberto'},
            {code: 2, nome: 'Pago com atraso'},
            {code: 3, nome: 'Pago'},
            {code: 4, nome: 'Atrasado'},
        ],
      }
    },

    methods: {
        informarPagamento() {
            const payload = {
                aluno_id: router.currentRoute.params.id,
                user_id: localStorage.getItem('user_id'),
                data_pagamento: this.data_pagamento,
                valor_pago: this.valor_pago.target._value,
            }
            // console.log(payload)
            this.$http.post('pagamentos', payload)
            .then(response => {
                console.log(response)
            })
        }
    },

    created () {
        this.$http
      .get(`alunos/${router.currentRoute.params.id}`)
      .then(response => {
        // console.log('========SIDEBAR============')
        // console.log(response.data.data)
        this.userData = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })
    },
  }
  </script>
  