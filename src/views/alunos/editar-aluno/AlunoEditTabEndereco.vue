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
          @click="updateProfile"
        >

          Salvar
        </b-button>
        <b-button
          :to="{name: 'lista-alunos'}"
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
      .get(`alunos/${router.currentRoute.params.id}`)
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
      axios.get(`https://viacep.com.br/ws/${this.userData.aluno.cep}/json/`)
        .then(response => {
          this.userData[0].nome_rua = response.data.logradouro
          this.userData[0].cidade = response.data.localidade
          this.userData[0].estado = response.data.uf
          this.userData[0].bairro = response.data.bairro
        })
    },

    updateProfile() {
      let payload = ''
      payload = new FormData()
      payload.append('aluno_foto', this.userData.aluno.aluno_foto)
      payload.append('nome', this.userData.aluno.nome)
      payload.append('cpf_aluno', this.userData.aluno.cpf_aluno)
      payload.append('email', this.userData.aluno.email)
      payload.append('nacionalidade', this.userData.aluno.nacionalidade)
      payload.append('data_nasc', this.userData.aluno.data_nasc)
      payload.append('sexo', this.userData.aluno.sexo)
      payload.append('whatsapp', this.userData.aluno.whatsapp)
      payload.append('tel_contato', this.userData.aluno.tel_contato)
      payload.append('escolaridade', this.userData.aluno.escolaridade)
      payload.append('observacao', this.userData.aluno.observacao)
      payload.append('nome_rua', this.userData.aluno.nome_rua)
      payload.append('cep', this.userData.aluno.cep)
      payload.append('bairro', this.userData.aluno.bairro)
      payload.append('cidade', this.userData.aluno.cidade)
      payload.append('estado', this.userData.aluno.estado)
      payload.append('_method', 'put')
      this.$http
        .post(`alunos/${router.currentRoute.params.id}`, payload)
        .then(response => {
          if (response.status == 200) {
            this.$swal({
              icon: 'success',
              title: 'Editado com sucesso',
              text: 'Sucesso ao editar seus dados!',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          }
          this.$http
            .get(`aluno/matricula/${router.currentRoute.params.id}`)
            .then(response => {
              this.userData = response.data
            })
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
