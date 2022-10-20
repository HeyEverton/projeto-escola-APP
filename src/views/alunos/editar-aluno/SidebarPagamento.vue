<template>
  <div>
    <div class="text-center">

      <!-- Name -->
      <b-card-text class="mt-2 h4 color-inherit text-reset">
        Informar pagamento
      </b-card-text>
    </div>

    <validation-observer
      ref="pagamentoRules"
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
                rules=""
              >

                <b-form-input
                  id="aluno"
                  v-model="userData.nome"
                  readonly
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
                rules=""
              >
                <b-input-group
                  append="R$"
                >
                  <b-form-input
                    v-model="valor_pago"
                    placeholder="Insira o valor pago pelo aluno"
                    :state="errors.length > 0 ? false:null"
                  />
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
                rules=""
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
                rules=""
              >
                <v-select
                  v-model="status"
                  label="nome"
                  :options="statusPagamento"
                  :reduce="statusPagamento => statusPagamento.code"
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
                @click="informarPagamento()"
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
  BForm,
  BFormInvalidFeedback,
  BButton,
  BMedia,
  BFormTextarea,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,

} from 'bootstrap-vue'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
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
    ValidationProvider,
    ValidationObserver,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    vSelect,
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

      user_id: '',
      aluno_id: '',

      data_pagamento: '',
      valor_pago: '',
      status: '',
      observacao: '',

      statusPagamento: [
        { code: 3, nome: 'Pago' },
        { code: 2, nome: 'Pago com atraso' },
        { code: 4, nome: 'Atrasado' },
      ],
      // parcela_id: '',

      required,
    }
  },

  created() {
    this.$http
      .get(`alunos/${router.currentRoute.params.id}`)
      .then(response => {
        this.userData = response.data.data
        // console.log(this.userData)
      })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })
  },

  methods: {
    async informarPagamento() {
      const validator = await this.$refs.pagamentoRules.validate()
      if (!validator) return

      const dados = {
        user_id: localStorage.getItem('user_id'),
        data_pagamento: this.data_pagamento,
        valor_pago: this.valor_pago,
        status: this.status,
        observacao: this.observacao,
      }
      const payload = dados

      this.$emit('informar-pagamento', payload)
    },
  },
}
</script>
