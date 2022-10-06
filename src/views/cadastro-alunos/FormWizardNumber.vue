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
      @on-complete="formSubmitted"
    >

      <!--tab informacoes pessiais -->
      <tab-content
        title="Dados do aluno"
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
                Insira as informações do aluno
              </small>
            </b-col>

            <b-col md="12">
              <b-media class="mb-2">
                <template #aside>
                  <b-avatar
                    ref="previewEl"
                    :src="aluno_foto"
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
                    >
                    <span class="d-none d-sm-inline">Escolha a foto do aluno</span>
                    <feather-icon
                      icon="EditIcon"
                      class="d-inline d-sm-none"
                    />
                  </b-button>
                  <!-- <b-button variant="outline-secondary" class="ml-1">
                    <span class="d-none d-sm-inline">Remove</span>
                    <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
                  </b-button> -->
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
                    placeholder="Insira o nome do aluno"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group
                label="CPF"
                label-for="cpf_aluno"
              >
                <validation-provider
                  #default="{ errors }"
                  name="CPF"
                  rules="required"
                >
                  <b-form-input
                    id="cpf_aluno"
                    v-model="cpf_aluno"
                    type="text"
                    maxlength="14"
                    placeholder="Insira o CPF do aluno"
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
                    placeholder="Selecione a nacionalidade do aluno"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Data de nascimento"
                label-for="data_nascimento"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Data de nascimento"
                  rules="required"
                >
                  <cleave
                    id="date"
                    v-model="data_nascimento"
                    class="form-control"
                    :raw="false"
                    :options="options.date"
                    placeholder="DD/MM/AA"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Sexo"
                label-for="nacionalidade"
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
                    placeholder="Selecione o sexo do aluno"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Whatsapp"
                label-for="whatsapp"
              >
                <b-form-input
                  id="whatsapp"
                  v-model="whatsapp"
                  type="number"
                  placeholder="Insira o whatsapp do aluno"
                />

              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Telefone para contato"
                label-for="telefone_contato"
              >

                <validation-provider
                  #default="{ errors }"
                  name="Telefone para contato"
                  rules="required|integer"
                >

                  <b-form-input
                    id="tel_contato"
                    v-model="telefone_contato"
                    type="number"
                    placeholder="Insira o telefone de contato do aluno"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Escolaridade"
                label-for="escolaridade"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Escolaridade"
                  rules="required"
                >
                  <v-select
                    v-model="escolaridade"
                    label="nome"
                    :options="escolaridades"
                    placeholder="Selecione a escolaridade do aluno"
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
                Endereço do aluno
              </h5>
              <small class="text-muted">Insira as informações de endereço do aluno.</small>

            </b-col>
            <b-col md="12">
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
                    placeholder="Insira CEP do aluno"
                    :state="errors.length > 0 ? false:null"
                    @input="handleInput"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
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
                    placeholder="Insira o nome da rua do aluno"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
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
                    placeholder="Insira o número da residência do aluno"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
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
                    placeholder="Insira a cidade do aluno"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="6">
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
                    placeholder="Selecione estado do aluno"
                  />

                </b-form-group>
              </validation-provider>
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
                  rows="5"
                  placeholder="Tem alguma observação sobre o aluno?"
                />
              </b-form-group>
            </b-col>

          </b-row>
        </validation-observer>
      </tab-content>

      <!-- address  -->
      <tab-content
        title="Fazer matrícla"
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
                Matrícula
              </h5>
              <small class="text-muted">Fazer matrícula do aluno.</small>
            </b-col>
            <b-col md="12">
              <b-form-group
                label="Selecione o aluno"
                label-for="selecione-aluno"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Aluno"
                  rules="required"
                >
                  <v-select
                    v-model="aluno_id"
                    label="nome"
                    :options="alunos"
                    :value="alunos.nome"
                    :reduce="alunos=> alunos.id"
                    placeholder="Selecione o aluno para ser matriculado"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
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
                    placeholder="Selecione o aluno para ser matriculado"
                    @input="selectTurma"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- social link -->
      <tab-content
        title="Forma de pagamento"
        :before-change="validationFormSocial"
      >
        <validation-observer
          ref="socialRules"
          tag="form"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Forma de pagamento
              </h5>
              <small class="text-muted">Informe como o aluno vai pagar o curso</small>
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
                    id="twitter"
                    v-model="valor_curso"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o valor do curso"
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
                  id="facebook"
                  v-model="desconto_curso"
                  placeholder="O curso tem desconto?"
                />

              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Valor total do curso"
                label-for="valor_curso"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Valor total do"
                  rules="required"
                >
                  <b-form-input
                    id="google-plus"
                    v-model="valor_curso"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o valor total do curso"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
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
                  <cleave
                    id="data_vencimento"
                    v-model="data_vencimento"
                    class="form-control"
                    :raw="false"
                    :options="vencimento.dateV"
                    placeholder="DD/MM"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
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
      cpf_aluno: '',
      data_nascimento: '',
      sexo: '',
      nacionalidade: '',
      aluno_foto: '',
      aluno_cpf: '',
      whatsapp: '',
      telefone_contato: '',
      escolaridade: '',

      // ENDERECO
      cep: '',
      nome_rua: '',
      cidade: '',
      estado: '',
      numero_residencia: '',
      observacao: '',

      // MATRICULA
      turmas: [],
      alunos: [],
      aluno_id: '',
      turma_id: '',
      valor_curso: '',
      desconto_curso: '',
      data_vencimento: '',
      valor_total: '',

      landMark: '',
      pincode: '',
      twitterUrl: '',
      facebookUrl: '',
      googleUrl: '',
      linkedinUrl: '',
      city: '',
      required,
      email,
      codeIcon,
      axios,
      // useInputImageRenderer,
      // InputImageRenderer,
      avatarText,
      form: {
        cardNumber: null,
        date: null,
        phone: null,
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

      escolaridades: [
        { code: 'MC', nome: 'Ensino médio completo' },
        { code: 'MI', nome: 'Ensino médio incompleto' },
        { code: 'FC', nome: 'Fundamental completo' },
        { code: 'FI', nome: 'Fundamental incompleto' },
        { code: 'S', nome: 'Cursando superior' },
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

  created() {
    this.$http.get('alunos')
      .then(response => this.alunos = response.data.data)
    this.$http.get('turmas')
      .then(response => this.turmas = response.data.data)
  },
  methods: {

    InputImageRenderer(event) {
      console.log(event)
    },
    selectTurma() {
      // console.log(this.turmas[0].id)
      this.$http.get(`turma/curso/${this.turmas[0].id}`)
        .then(response => {
          // console.log(response.data.data.curso)
          this.valor_curso = response.data.data.curso.preco
          // this.desconto_curso = response.data.data.curso.desconto
          this.desconto = response.data.data.curso.preco
        })
    },

    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
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
