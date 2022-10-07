<template>
  <div>
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      shape="square"
      finish-button-text="Enviar"
      back-button-text="Anterior"
      next-button-text="Próximo"
      class="mb-3"
      @on-complete="cadastrarProfessor"
    >

      <!--tab informacoes pessiais -->
      <tab-content
        title="Dados do professor"
        :before-change="validationForm"
      >
        <validation-observer
          ref="accountRules"
          tag="form"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Informações pessoais
              </h5>
              <small class="text-muted">
                Insira as informações do professor
              </small>
            </b-col>

            <b-col md="12">
              <b-media class="mb-2">
                <template #aside>
                  <b-avatar
                    ref="previewEl"
                    :src="professor_foto"
                    :text="avatarText(nome)"
                    size="90px"
                    rounded
                  />
                </template>
                <div class="d-flex flex-wrap">
                  <b-button
                    class="mt-4"
                    variant="primary"
                    @click="$refs.refInputEl.click()"
                  >
                    <input
                      ref="refInputEl"
                      type="file"
                      class="d-none"
                      @change="InputImageRenderer"
                    >
                    <span class="d-none d-sm-inline">Escolha a foto do professor</span>
                    <feather-icon
                      icon="EditIcon"
                      class="d-inline d-sm-none"
                    />
                  </b-button>
                </div>
              </b-media>

            </b-col>

            <b-col md="12">
              <b-form-group
                label="Nome"
                label-for="name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nome"
                  rules="required"
                >
                  <b-form-input
                    id="nome"
                    v-model="nome"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o nome do professor"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="CPF"
                label-for="professor_cpf"
              >
                <validation-provider
                  #default="{ errors }"
                  name="CPF"
                  rules="required"
                >
                  <cleave
                    id="professor_cpf"
                    v-model="professor_cpf"
                    class="form-control"
                    :raw="false"
                    :options="optionsCPF.customDelimiter"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o CPF do professor"
                    type="text"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="RG"
                label-for="professor_rg"
              >
                <validation-provider
                  #default="{ errors }"
                  name="CPF"
                  rules="required"
                >

                  <cleave
                    id="professor_rg"
                    v-model="professor_rg"
                    class="form-control"
                    :raw="false"
                    :options="optionsRG.customDelimiterRG"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o CPF do professor"
                    type="text"
                    maxlength="12"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Nacionalidade"
                label-for="nacionalidade"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nacionalidade"
                  rules="required"
                >
                  <v-select
                    v-model="nacionalidade"
                    label="nome"
                    :options="nacionalidades"
                    :reduce="nacionalidades => nacionalidades.code"
                    placeholder="Selecione a nacionalidade do professor"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Estado civil"
                label-for="estado_civil"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Estado civil"
                  rules="required"
                >
                  <v-select
                    v-model="estado_civil"
                    label="nome"
                    :options="estados_civil"
                    :reduce="estados_civil => estados_civil.code"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Selecione o estado civil do professor"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Sexo"
                label-for="sexo"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Sexo"
                  rules="required"
                >
                  <v-select
                    v-model="sexo"
                    label="nome"
                    :options="sexos"
                    :reduce="sexos => sexos.code"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Selecione o sexo do professor"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Formação"
                label-for="formacao"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Formação"
                  rules="required"
                >
                  <b-form-input
                    id="formacao"
                    v-model="formacao"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira a formação do professor"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="E-mail"
                label-for="email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="E-mail"
                  rules="required|email"
                >
                  <b-form-input
                    id="email"
                    v-model="email"
                    type="email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o email do professor"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Telefone para contato"
                label-for="tel_contato"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Telefone"
                  rules="required"
                >
                  <cleave
                    id="tel_contato"
                    v-model="tel_contato"
                    class="form-control"
                    :raw="false"
                    :options="optionsCPF.prefix"
                    placeholder="Insira o telefone de contato do professor"
                    type="text"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

          </b-row>
        </validation-observer>
      </tab-content>

      <!-- tab endereco -->
      <tab-content
        title="Endereço"
        :before-change="validationFormInfo"
      >
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
                Endereço do professor
              </h5>
              <small class="text-muted">Insira as informações de endereço do professor.</small>

            </b-col>
            <b-col md="6">
              <b-form-group
                label="CEP"
                label-for="cep"
              >
                <validation-provider
                  #default="{ errors }"
                  name="CEP"
                  rules="required"
                >
                  <b-form-input
                    id="cep"
                    v-model="cep"
                    placeholder="Insira CEP do professor"
                    :state="errors.length > 0 ? false:null"
                    @input="handleInput"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group
                label="Nome da rua"
                label-for="nome-da-rua"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Logradouro"
                  rules="required"
                >
                  <b-form-input
                    id="nome-rua"
                    v-model="nome_rua"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o nome da rua do professor"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <validation-provider
                #default="{ errors }"
                name="Número da residência"
                rules="required"
              >
                <b-form-group
                  label="Número da residência"
                  label-for="numero_residencia"
                  :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                    id="numero_residencia"
                    v-model="numero_residencia"
                    :state="errors.length > 0 ? false:null"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <validation-provider
                #default="{ errors }"
                name="Bairro"
                rules="required"
              >
                <b-form-group
                  label="Bairro"
                  label-for="cidade"
                  :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                    id="cidade"
                    v-model="bairro"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira a cidade do professor"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4">
              <validation-provider
                #default="{ errors }"
                name="Cidade"
                rules="required"
              >
                <b-form-group
                  label="Cidade"
                  label-for="cidade"
                  :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                    id="cidade"
                    v-model="cidade"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira a cidade do professor"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="2">
              <validation-provider
                #default="{ errors }"
                name="Estado"
                rules="required"
              >
                <b-form-group
                  label="Estado"
                  label-for="estado"
                  :state="errors.length > 0 ? false:null"
                >
                  <v-select
                    v-model="estado"
                    label="estado"
                    :reduce="estados => estados.code"
                    :options="estados"
                    placeholder="Selecione estado do professor"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <tab-content
        title="Dados bancários"
        :before-change="validationFormAddress"
      >
        <validation-observer
          ref="addressRules"
          tag="form"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Dados bancários do professor
              </h5>
              <small class="text-muted">Insira os dados bancários do professor.</small>

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
                    v-model="banco"
                    label="nome"
                    :reduce="bancos => bancos.code"
                    :options="bancos"
                    placeholder="Selecione banco"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Número da conta"
                label-for="numero_conta"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Número da conta"
                  rules="required"
                >
                  <b-form-input
                    id="numero_conta"
                    v-model="numero_conta"
                    maxlength="9"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o número da conta do professor"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <validation-provider
                #default="{ errors }"
                name="Agência"
                rules="required"
              >
                <b-form-group
                  label="Agência"
                  label-for="agencia"
                  :state="errors.length > 0 ? false:null"
                >
                  <b-form-input
                    id="agencia"
                    v-model="agencia"
                    maxlength="4"
                    :state="errors.length > 0 ? false:null"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>

          </b-row>
        </validation-observer>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
// import Endereco from './Endereco.vue'
import vSelect from 'vue-select'
import { debounce } from 'lodash'

// import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { avatarText } from '@core/utils/filter'
import Cleave from 'vue-cleave-component'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButton,
  BMedia,
  BAvatar,
  BFormTextarea,

} from 'bootstrap-vue'

import { required, email } from '@validations'
import axios from 'axios'
import { codeIcon } from './code'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    BButton,
    BMedia,
    BAvatar,
    Cleave,
    BFormInvalidFeedback,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BFormTextarea,
    // Endereco,
  },
  data() {
    return {
      // DADOS ALUNOS
      nome: '',
      professor_cpf: '',
      professor_rg: '',
      professor_foto: '',
      estado_civil: '',
      sexo: '',
      formacao: '',
      nacionalidade: '',

      tel_contato: '+55',
      escolaridade: '',

      // ENDERECO
      cep: '',
      nome_rua: '',
      cidade: '',
      bairro: '',
      estado: '',
      numero_residencia: '',

      // DADOS BANCARIOS
      banco: '',
      numero_conta: '',
      agencia: '',

      required,
      email,
      codeIcon,
      axios,
      // useInputImageRenderer,
      // InputImageRenderer,
      avatarText,

      optionsCPF: {
        customDelimiter: {
          delimiters: ['.', '.', '-'],
          blocks: [3, 3, 3, 2],
          uppercase: true,
        },
        prefix: {

          blocks: [3, 5, 4],
          uppercase: true,
        },
      },

      optionsRG: {
        customDelimiterRG: {
          delimiters: ['.', '.', '-'],
          blocks: [2, 3, 3, 2],
          uppercase: true,
        },
      },

      options: {
        date: {
          date: true,
          delimiter: '/',
          datePattern: ['DD', 'MM', 'YYYY'],
        },
      },

      vencimento: {
        dateV: {
          date: true,
          delimiter: '/',
          datePattern: ['DD', 'MM'],
        },
      },

      nacionalidades: [
        { code: 'BR', nome: 'Brasileiro' },
        { code: 'ES', nome: 'Estrangeiro' },
      ],

      sexos: [
        { code: 'M', nome: 'Masculino' },
        { code: 'F', nome: 'Feminino' },
        { code: 'N', nome: 'Preferiu não informar' },
      ],
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

      estados_civil: [
        { code: 'S', nome: 'Solteiro(a)' },
        { code: 'C', nome: 'Casado(a)' },
        { code: 'SJ', nome: 'Separado(a) Judicialmente' },
        { code: 'V', nome: 'Viúvo(a)' },
      ],

      estados: [
        { code: 'AC', estado: 'Acre' },
        { code: 'AL', estado: 'Alagoas' },
        { code: 'AP', estado: 'Amapá' },
        { code: 'AM', estado: 'Amazonas' },
        { code: 'BA', estado: 'Bahia' },
        { code: 'CE', estado: 'Ceará' },
        { code: 'ES', estado: 'Espírito Santo' },
        { code: 'GO', estado: 'Goiás' },
        { code: 'MA', estado: 'Maranhão' },
        { code: 'MT', estado: 'Mato Grosso' },
        { code: 'MS', estado: 'Mato Grosso do Sul' },
        { code: 'MG', estado: 'Minas Gerais' },
        { code: 'PA', estado: 'Pará' },
        { code: 'PB', estado: 'Paraíba' },
        { code: 'PR', estado: 'Paraná' },
        { code: 'PE', estado: 'Pernambuco' },
        { code: 'PI', estado: 'Piauí' },
        { code: 'RJ', estado: 'Rio de Janeiro' },
        { code: 'RN', estado: 'Rio Grande do Norte' },
        { code: 'RS', estado: 'Rio Grande do Sul' },
        { code: 'RO', estado: 'Rondônia' },
        { code: 'RR', estado: 'Roraima' },
        { code: 'SC', estado: 'Santa Catarina' },
        { code: 'SP', estado: 'São Paulo' },
        { code: 'SE', estado: 'Sergipe' },
        { code: 'TO', estado: 'Tocantins' },
        { code: 'DF', estado: 'Distrito Federal' },
      ],
    }
  },

  // created() {
  //   this.$http.get('alunos')
  //     .then(response => this.alunos = response.data.data,)
  //   this.$http.get('turmas')
  //     .then(response => this.turmas = response.data.data)
  // },

  methods: {

    InputImageRenderer(event) {
      this.professor_foto = event.target.files[0]
      console.log(event.target.files[0])
    },

    cadastrarProfessor() {
      alert('chegou')
      let payload = ''
      payload = new FormData()
      payload.append('nome', this.nome)
      payload.append('email', this.email)
      payload.append('professor_cpf', this.professor_cpf)
      payload.append('professor_rg', this.professor_rg)
      payload.append('professor_foto', this.professor_foto)
      payload.append('estado_civil', this.estado_civil)
      payload.append('sexo', this.sexo)
      payload.append('formacao', this.formacao)
      payload.append('nacionalidade', this.nacionalidade)
      payload.append('tel_contato', this.tel_contato)
      payload.append('nome_rua', this.nome_rua)
      payload.append('numero_residencia', this.numero_residencia)
      payload.append('cep', this.cep)
      payload.append('estado', this.estado)
      payload.append('bairro', this.bairro)
      payload.append('cidade', this.cidade)
      payload.append('banco', this.banco)
      payload.append('agencia', this.agencia)
      payload.append('numero_conta', this.numero_conta)

      this.$http.post('professores', payload)
        .then(response => {
          console.log(response)
        })

      // this.$toast({
      //   component: ToastificationContent,
      //   props: {
      //     title: 'Form Submitted',
      //     icon: 'EditIcon',
      //     variant: 'success',
      //   },
      // })
    },

    handleInput: debounce(function () {
      this.pesquisaCEP()
    }, 1500),

    pesquisaCEP() {
      axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
        .then(response => {
          this.nome_rua = response.data.logradouro
          this.cidade = response.data.localidade
          this.estado = response.data.uf
          this.bairro = response.data.bairro
        })
    },

    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormAddress() {
      return new Promise((resolve, reject) => {
        this.$refs.addressRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormSocial() {
      return new Promise((resolve, reject) => {
        this.$refs.socialRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
