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
              Endereço
            </h5>

          </b-col>
          <!-- Field: ENDERECO -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Endereço"
              label-for="nome_rua"
            >
              <b-form-input
                id="full-name"
                v-model="userData.nome_rua"
              />
            </b-form-group>
          </b-col>

          <!-- CEP -->
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
                  v-model="userData.cep"
                  placeholder="Insira o CEP do aluno"
                  :state="errors.length > 0 ? false:null"
                  @input="handleInput"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Nº RESIDENCIA -->
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
                  v-model="userData.numero_residencia"
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
              >
                <b-form-input
                  id="cidade"
                  v-model="userData.cidade"
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
                  v-model="userData.bairro"
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
                  v-model="userData.estado"
                  label="estado"
                  :reduce="estados => estados.code"
                  :options="estados"
                  placeholder="Selecione estado do aluno"
                />

              </b-form-group>
            </validation-provider>
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
  BFormRadioGroup,
  BFormCheckboxGroup,
  BButton,
  BFormTextarea,
  BCard,

} from 'bootstrap-vue'

import flatPickr from 'vue-flatpickr-component'
import { ref } from '@vue/composition-api'
import vSelect from 'vue-select'
import router from '@/router'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { debounce } from 'lodash'
import axios from 'axios'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    flatPickr,
    BFormInput,
    vSelect,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BButton,
    BFormTextarea,
    BCard,
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      userData: {},
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
    this.$http
      .get(`professores/${router.currentRoute.params.id}`)
      .then(response => {
        this.userData = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })
    // this.$http.get(`aluno/matricula/${router.currentRoute.params.id}`)
    //   .then(response => {
    //     this.userData = response.data.data
    //   })
    //   .catch(error => {
    //     if (error.response.status === 404) {
    //       userData.value = undefined
    //     }
    //   })
  },

  methods: {
    inputImageRenderer(event) {
      this.foto_capa = event.target.files[0]
    },

    handleInput: debounce(function () {
      this.pesquisaCEP()
    }, 1500),

    pesquisaCEP() {
      axios.get(`https://viacep.com.br/ws/${this.userData.cep}/json/`)
        .then(response => {
          this.userData[0].nome_rua = response.data.logradouro
          this.userData[0].cidade = response.data.localidade
          this.userData[0].estado = response.data.uf
          this.userData[0].bairro = response.data.bairro
        })
    },

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
            text: 'Ops! parece que houve um erro ao editar os dados!',
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
