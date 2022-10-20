<template>
  <div>
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      shape="square"
      finish-button-text="Finalizar"
      back-button-text="Anterior"
      next-button-text="Próximo"
      class="mb-3"
      @on-complete="finalizar"      
    >

      <!--tab informacoes pessoais -->
      <tab-content
        title="Dados do aluno"
        :before-change="validarDados"        
      >
        <validation-observer
          ref="regraDados"
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
                    :img-src="aluno_foto"
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
                      @change="catchEvent"
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
                    :state="errors.length > 0 ? false:null"
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
                  <cleave
                    id="cpf_aluno"
                    v-model="cpf_aluno"
                    class="form-control"
                    :raw="false"
                    :options="optionsCPF.customDelimiter"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o CPF do aluno"
                    type="text"
                    maxlength="14"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
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
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o e-mail do aluno"
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
                  <b-form-input
                    id="email"
                    v-model="data_nascimento"
                    :state="errors.length > 0 ? false:null"
                    type="date"
                    placeholder="Insira a data de nascimento do aluno"
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
                    :reduce="sexos => sexos.code"
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
                <!-- <b-form-input
                  id="whatsapp"
                  v-model="whatsapp"
                  type="number"
                  maxlength="9"
                  placeholder="Insira o whatsapp do aluno"
                /> -->

                <cleave
                  id="tel_contato"
                  v-model="whatsapp"
                  class="form-control"
                  :raw="false"
                  :options="options.whatsapp"
                  placeholder="Insira o whatsapp do aluno"
                  type="text"
                  maxlength="10"
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
                  rules="required"
                >
                  <cleave
                    id="tel_contato"
                    v-model="telefone_contato"
                    class="form-control"
                    :raw="false"
                    :options="options.prefix"
                    placeholder="Insira o telefone de contato do aluno"
                    type="text"
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
                    :reduce="escolaridades => escolaridades.code"
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
        :before-change="validarEndereco"
      >
        <validation-observer
          ref="regraEndereco"
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
                    placeholder="Insira o CEP do aluno"
                    :state="errors.length > 0 ? false:null"
                    type="number"
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
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
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
              <b-form-group
                label="Bairro"
                label-for="bairro"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Bairro"
                  rules="required"
                >
                  <b-form-input
                    id="bairro"
                    v-model="bairro"
                    placeholder="Insira o Bairro do aluno"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
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

      <!-- tab matricula  -->
      <tab-content
        title="Matrícula"
        :before-change="validarMatricula"
      >
        <validation-observer
          ref="regraMatricula"
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
                  <b-form-input
                    id="aluno_id"
                    v-model="aluno_nome"
                    readonly
                    placeholder="Insira o aluno"
                    :state="errors.length > 0 ? false:null"
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

      <!-- pagamento -->
      <tab-content
        title="Pagamento"
        :before-change="validarPagamento"
      >
        <validation-observer
          ref="regraPagamento"
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
                    id="valor_curso"
                    v-model="valor_curso"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira o valor do curso"
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
                    readonly
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

          </b-row>
        </validation-observer>
      </tab-content>

      <tab-content
        title="Impressão"
        :before-change="validationFormCongrats"
      >
        <validation-observer
          ref="impressaoRules"
          tag="form"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0 text-success">
                Sucesso!
              </h5>
              <small class="text-muted">A matrícula foi feita com sucesso, escolha como você quer receber o comprovante.</small>
            </b-col>

            <b-col md="6">
              <h6 class="mb-1">
                <b-link @click="viaEmail">
                  Enviar via e-mail
                </b-link>
              </h6>
            </b-col>

            <b-col md="6">
              <h6>
                <b-link @click="imprimir">
                  Imprimir
                </b-link>
              </h6>
            </b-col>

            <b-col md="6">
              <h6 class="mb-1">
                <b-link @click="viaSMS">
                  Via SMS
                </b-link>
              </h6>
            </b-col>

            <b-col md="6">
              <h6>
                <b-link @click="viaWhatsapp">
                  Via Whatsapp
                </b-link>
              </h6>
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
  BLink,
  BTable,

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
    BLink,
    BTable,
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
      aluno_nome: '',
      // ENDERECO
      cep: '',
      nome_rua: '',
      cidade: '',
      estado: '',
      numero_residencia: '',
      bairro: '',
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
      forma_pagamento: '',
      qtd_parcelas: '',

      num_parcela: '',
      n_parcela: '',
      valor_parcela: '',
      colunas: [
        { key: 'num_parcela', label: 'Nº da parcela' },
        { key: 'valor_parcela', label: 'Valor da parcela' },
        { key: 'data_vencimento', label: 'Data de vencimento' },
      ],
      Tableparcelas: [],
      
      // COMPONENTES
      required,
      email,
      codeIcon,
      axios,
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
          datePattern: ['DD', 'MM', 'YYYYY'],
        },
        prefix: {
          prefix: '+55',
          blocks: [3, 5, 4],
          uppercase: true,
        },
        whatsapp: {
          prefix: '9',
          blocks: [1, 8],
          uppercase: true,
        },
      },

      vencimento: {
        dateV: {
          date: true,
          delimiter: '/',
          datePattern: ['DD', 'MM'],
        },
      },

      optionsCPF: {
        customDelimiter: {
          delimiters: ['.', '.', '-'],
          blocks: [3, 3, 3, 2],
          uppercase: true,
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
    }
  },

  created() {
    this.$http.get('turmas')
      .then(response => this.turmas = response.data.data)
  },
  methods: {

    selectTurma() {
      // console.log(this.turmas_id)
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

    handleInput: debounce(function () {
      if (this.cep.length == 8) {
        this.pesquisaCEP()
      }
    }, 1500),

    viaEmail() {
      alert('via email')
    },
    
    imprimir() {
      window.print()
    },

    viaWhatsapp() {
      alert('via whatsapp')
    },

    viaSMS() {
      alert('via SMS')
    },

    pesquisaCEP() {
      axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
        .then(response => {
          this.nome_rua = response.data.logradouro
          this.cidade = response.data.localidade
          this.estado = response.data.uf
          this.bairro = response.data.bairro
        })
    },

    catchEvent(event) {
      this.aluno_foto = event.target.files[0]
    },

    cadastrarAluno() {
      const payload = new FormData()
      payload.append('aluno_foto', this.aluno_foto)
      payload.append('nome', this.nome)
      payload.append('cpf_aluno', this.cpf_aluno)
      payload.append('email', this.email)
      payload.append('sexo', this.sexo)
      payload.append('observacao', this.observacao)
      payload.append('nacionalidade', this.nacionalidade)
      payload.append('tel_contato', this.telefone_contato)
      payload.append('data_nasc', this.data_nascimento)
      payload.append('whatsapp', this.whatsapp)
      payload.append('escolaridade', this.escolaridade)
      payload.append('nome_rua', this.nome_rua)
      payload.append('cep', this.cep)
      payload.append('numero_residencia', this.numero_residencia)
      payload.append('bairro', this.bairro)
      payload.append('cidade', this.cidade)
      payload.append('estado', this.estado)

      this.$http.post('alunos', payload)
        .then(response => {
          localStorage.setItem('aluno_id', response.data.data.id)
          localStorage.setItem('aluno_nome', response.data.data.nome)
          this.aluno_nome = localStorage.getItem('aluno_nome')


          // this.$http.get('alunos')
          //   .then(response => {
          //     this.alunos = response.data.data
          //   })
        })

        .catch(e => {
          if (e?.response?.data?.message == 'O campo aluno foto é obrigatório.') {

            this.$swal({
              icon: 'error',
              title: 'Erro!',
              text: 'Por favor, insira a foto do aluno.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            // this.$toast({
            //   component: ToastificationContent,
            //   props: {
            //     title: 'Erro!',
            //     text: 'Por favor, insira a foto do aluno.',
            //     icon: 'AlertOctagonIcon',
            //     variant: 'danger',
            //   },
            // })
          }
          if (e?.response?.data?.error == 'EmailHasBeenTaken') {

            this.$swal({
              icon: 'error',
              title: 'Erro!',
              text: 'Este e-mail já existe.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            // this.$toast({
            //   component: ToastificationContent,
            //   props: {
            //     title: 'Erro!',
            //     text: 'Este e-mail já existe.',
            //     icon: 'AlertOctagonIcon',
            //     variant: 'danger',
            //   },
            // })
          }
          if (e?.response?.data?.error == 'InvalidCpf') {

            this.$swal({
              icon: 'error',
              title: 'Erro!',
              text: 'Já existe um aluno cadastrado com esse CPF.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })

          }
        })
    },

    finalizar() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Sucesso!',
          text: 'O aluno foi matriculado com sucesso.',
          icon: 'CheckSquareIcon',
          variant: 'success',
        },
      })

    },

    validarDados() {
      return new Promise((resolve, reject) => {
        this.$refs.regraDados.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },

    validarEndereco() {
      return new Promise((resolve, reject) => {
        this.$refs.regraEndereco.validate().then(success => {
          if (success) {
            this.cadastrarAluno()
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },

    validarMatricula() {
      return new Promise((resolve, reject) => {
        this.$refs.regraMatricula.validate().then(success => {
          if (success) {
            resolve(true)
          }
          else {
            reject()
          }
        })
      })
    },

    validarPagamento() {
      return new Promise((resolve, reject) => {
        this.$refs.regraPagamento.validate().then(success => {
          if (success) {
            const payload = {
              aluno_id: localStorage.getItem('aluno_id'),
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
                  aluno_id:localStorage.getItem('aluno_id'),
                  matricula_id: localStorage.getItem('matricula_id'),
                }
                this.$http.post('parcelas/matricular', payloadParcela)
                  .then(() => {
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
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },

    validationFormCongrats() {
      return new Promise((resolve, reject) => {
        this.$refs.impressaoRules.validate().then(success => {
          if (success) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Sucesso!',
                text: 'A matricula do aluno foi feita com sucesso.',
                icon: 'CheckSquareIcon',
                variant: 'success',
              },
            })
            this.$router.replace('/lista-alunos')
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
