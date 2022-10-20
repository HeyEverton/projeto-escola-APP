<template>
  <div>

    <b-col
      cols="12"
      class="mb-2"
    >
      <h4 class="mb-2">
        Matricular o aluno em outro curso
      </h4>

      <validation-observer
        ref="addressRules"
        tag="form"
      >
        <b-row>

          <b-col md="12">
            <b-form-group
              label="Aluno"
              label-for="selecione-aluno"
            >
              <validation-provider
                #default="{ errors }"
                name="Aluno"
                rules="required"
              >
                <b-form-input
                  id="aluno"
                  v-model="nome"
                  placeholder="Insira o nome do aluno"
                  :state="errors.length > 0 ? false:null"
                  readonly
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Selecione a turma"
              label-for="selecione-turma"
            >
              <validation-provider
                #default="{ errors }"
                name="Turma"
                rules="required"
              >
                <v-select
                  v-model="turma_id"
                  label="nome"
                  :options="turmas"
                  :value="turmas.nome"
                  :reduce="turmas => turmas.id"
                  placeholder="Selecione a turma para o aluno ser matriculado"
                  @input="selectTurma"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Valor do curso"
              label-for="valor_curso"
            >
              <validation-provider
                #default="{ errors }"
                name="Valor do curso"
                rules="required"
              >
                <b-form-input
                  id="valor_curso"
                  v-model="valor_curso"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Valor do curso"
                  readonly
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Desconto"
              label-for="desconto"
            >
              <b-form-input
                id="desconto_curso"
                v-model="desconto_curso"
                placeholder="A matrícula terá desconto?"
              />

            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Data de vencimento"
              label-for="data_vencimento"
            >
              <validation-provider
                #default="{ errors }"
                name="Data de vencimento"
                rules="required"
              >
                <b-form-input
                  id="data_vencimento"
                  v-model="data_vencimento"
                  :state="errors.length > 0 ? false:null"
                  type="date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Forma de pagamento"
              label-for="nacionalidade"
            >
              <validation-provider
                #default="{ errors }"
                name="Forma de pagamento"
                rules="required"
              >
                <v-select
                  v-model="forma_pagamento"
                  label="nome"
                  :options="pagamentos"
                  :reduce="pagamentos => pagamentos.code"
                  placeholder="Selecione a forma de pagamento"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Quantas parcelas"
              label-for="qtd_parcelas"
            >
              <v-select
                ref="parcela"
                v-model="qtd_parcelas"
                label="nome"
                :options="parcelas"
                placeholder="Selecione a quantas parcelas terá"
                @input="catchEventParcela"
              />
            </b-form-group>
            <b-button
              variant="warning"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="gerarParcelas"
            >
              Gerar parcelas
            </b-button>
          </b-col>

          <b-col
            md="12"
            class="mt-2 mb-2"
          >

            <b-table
              small
              :fields="colunas"
              :items="Tableparcelas"
              bordered
              responsive
              show-empty
              empty-text="Nenhuma parcela foi feita."
            >
              <template #cell(data_vencimento)="data">
                {{ moment(data.item.data_vencimento).format('DD/MM/YYYY') }}
              </template>

              <template #cell(valor_parcela)="data">
                {{ data.item.valor_parcela }} R$
              </template>

              <template #cell(num_parcela)="data">
                {{ data.item.num_parcela }}
              </template>
            </b-table>
          </b-col>

          <b-col md="12">
            <b-button
              variant="primary"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1 d-flex jusitfy-content-end"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="matricular"
            >
              Matricular
            </b-button>
          </b-col>

        </b-row>
      </validation-observer>

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

import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import router from '@/router'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import SidebarPagamento from './SidebarPagamento.vue'
import SidebarDetalhes from './SidebarDetalhes.vue'

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
    BSidebar,
    SidebarPagamento,
    SidebarDetalhes,
    BListGroup,
    BListGroupItem,
    BCardText,
    BFormInvalidFeedback,
    BFormTextarea,
    BInputGroupAppend,
    vSelect,
    FormWizard,
    TabContent,
    ValidationProvider,
    ValidationObserver,
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
      nome: '',
      turma_id: '',
      turmas: [],

      valor_curso: '',
      desconto_curso: '',
      data_vencimento: '',
      forma_pagamento: '',
      n_parcela: '',
      num_parcela: '',
      valor_parcela: '',
      qtd_parcelas: '',
      pagamentos: [
        { code: 'C', nome: 'Crédito' },
        { code: 'D', nome: 'Débito' },
        { code: 'B', nome: 'Boleto' },
        { code: 'P', nome: 'Pix' },
      ],
      parcelas: [
        '1',
        '2',
        '4',
        '6',
        '8',
        '12',
      ],
      Tableparcelas: [],
      colunas: [
        { key: 'num_parcela', label: 'Nº da parcela' },
        { key: 'valor_parcela', label: 'Valor da parcela' },
        { key: 'data_vencimento', label: 'Data de vencimento' },
      ],

    }
  },

  created() {
    this.$http.get(`alunos/${router.currentRoute.params.id}`)
      .then(response => {
        this.nome = response.data.data.nome
      })

    this.$http.get('turmas')
      .then(response => this.turmas = response.data.data)
  },

  methods: {
    matricular() {
      const payload = {
        aluno_id: router.currentRoute.params.id,
        turma_id: this.turma_id,
        valor_curso: this.valor_curso,
        desconto_curso: this.desconto_curso,
        data_vencimento: this.data_vencimento,
        forma_pagamento: this.forma_pagamento,
        qtd_parcelas: this.qtd_parcelas,
      }

      this.$http.post('matriculas', payload)
        .then(response => {
          if (response.status == 200) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Matriculado',
                text: 'O aluno foi matriculado com sucesso!',
                icon: 'UserPlusIcon',
                variant: 'success',
              },
            })
            localStorage.setItem('matricula_id', response.data.id)
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Ops! Algo deu errado',
                text: 'Não foi possível fazer a matrícula deste aluno.',
                icon: 'AlertOctagonIcon',
                variant: 'danger',
              },
            })
          }
        })
        .then(() => {
          const payloadParcela = {
            data_vencimento: this.data_vencimento,
            qtd_parcelas: this.qtd_parcelas,
            valor_curso: this.valor_curso,
            aluno_id: router.currentRoute.params.id,
            matricula_id: localStorage.getItem('matricula_id'),
          }
          this.$http.post('parcelas/matricular', payloadParcela)
            .then(() => {
              localStorage.removeItem('aluno_id')
              localStorage.removeItem('matricula_id')
            })
        })
        .catch(error => {
          if (error.message == 'Request failed with status code 422') {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Ops! Algo deu errado',
                text: 'Parece que algo deu errado, tente novamente em instantes.',
                icon: 'AlertOctagonIcon',
                variant: 'danger',
              },
            })
          }
        })
    },

    // validationFormAddress() {
    //   return new Promise((resolve, reject) => {
    //     this.$refs.addressRules.validate().then(success => {
    //       if (success) {
    //         resolve(true)
    //       } else {
    //         reject()
    //       }
    //     })
    //   })
    // },

    gerarParcelas() {
      const payload = {
        num_parcela: 1,
        valor_curso: this.valor_curso,
        data_vencimento: this.data_vencimento,
        qtd_parcelas: this.n_parcela,
      }

      this.$http.post('parcelas', payload)
        .then(response => {
          this.Tableparcelas = response.data
        })
    },

    selectTurma() {
      this.$http.get(`turma/curso/${this.turma_id}`)
        .then(response => {
          this.valor_curso = response.data.data.curso.preco
          // this.desconto_curso = response.data.data.curso.desconto
          this.desconto = response.data.data.curso.preco
        })
    },

    catchEventParcela(value) {
      this.n_parcela = value
    },
  },
}
</script>

<style>

</style>
