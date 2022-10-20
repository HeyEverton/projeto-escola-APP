<template>
  <b-card>

    <b-card-header class="pb-50 d-flex justify-content-start">
      <h3>
        Editar curso
      </h3>
    </b-card-header>

    <b-card-body>
      <validation-observer ref="form">

        <b-form
          id="form"
          class="mt-2"
          @submit.prevent
        >
          <b-row>
            <b-col md="6">
              <b-form-group
                label="Nome"
                label-for="nome"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Nome"
                >

                  <b-form-input
                    v-model="nome"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira o nome do curso"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Carga horária"
                label-for="carga_horaria"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Carga horária"
                >

                  <b-form-input
                    v-model="carga_horaria"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira a carga horária do curso"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Descrição"
                label-for="descricao"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Descrição"
                >
                  <b-form-textarea
                    id="observacao"
                    v-model="descricao"
                    rows="3"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Escreva um pouco sobre o curso"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Status"
                label-for="status"
              >
                <validation-provider
                  #default="{ errors }"
                  rules=""
                  name="Status"
                >
                  <v-select
                    v-model="ativo"
                    :options="status"
                    :reduce="status => status.code"
                    label="nome"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Preço"
                label-for="preco"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Descrição"
                >
                  <b-form-input
                    id="preco"
                    v-model="preco"
                    type="number"
                    step="0.01"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira o preço do curso"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- <b-col md="6">
              <b-form-group
                label="Aplicar desconto"
                label-for="preco"
              >
                <validation-provider
                  #default="{ errors }"
                  rules=""
                  name="Desconto"
                >
                  <b-form-input
                    id="desconto"
                    v-model="desconto"
                    type="text"
                    :state="errors.length > 0 ? false : null"
                    placeholder="O curso vai ter algum desconto?"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col> -->

            <!-- submit and reset -->
            <b-col
              cols="12"
              class="d-flex  mt-2"
            >
              <b-button

                type="submit"
                variant="primary"
                class="mr-1"
                :block="$store.getters['app/currentBreakPoint'] === 'xs'"
                @click="editarCurso"
              >
                Salvar
                <feather-icon
                  size="18"
                  icon="SendIcon"
                  class="d-inline d-sm-none"
                />

              </b-button>
              <b-button

                variant="outline-secondary"
                :to="{name: 'lista-cursos'}"
                :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              >
                Cancelar
                <feather-icon
                  size="18"
                  icon="XIcon"
                  class="d-inline d-sm-none"
                />

              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BCard,
  BCardBody,
  BCardHeader,
  BFormTextarea,
} from 'bootstrap-vue'
import router from '@/router'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCard,
    BCardBody,
    BCardHeader,
    ValidationProvider,
    ValidationObserver,
    BFormTextarea,
    vSelect,

  },

  data() {
    return {
      nome: '',
      descricao: '',
      carga_horaria: '',
      preco: '',
      ativo: '',
      desconto: '',
      required,
      status: [
        { code: '1', nome: 'Ativo' },
        { code: '0', nome: 'Inativo' },
      ],
    }
  },

  created() {
    this.$http.get(`cursos/${router.currentRoute.params.id}`)
      .then(response => {
        this.nome = response.data.data.nome
        this.descricao = response.data.data.descricao
        this.carga_horaria = response.data.data.carga_horaria
        this.preco = response.data.data.preco
        this.desconto = response.data.data.desconto
        this.ativo = response.data.data.ativo
      })
  },

  methods: {
    editarCurso() {
      this.$refs.form.validate().then(success => {
        if (success) {
          const payload = {
            nome: this.nome,
            descricao: this.descricao,
            carga_horaria: this.carga_horaria,
            preco: this.preco,
            ativo: this.ativo,
            desconto: this.desconto,
          }

          this.$http.put(`cursos/${router.currentRoute.params.id}`, payload)
            .then(response => {
              this.$swal({
                icon: 'success',
                title: 'Editado',
                text: 'Este curso foi editado com sucesso',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            })
            .then(() => {
              this.$router.replace('/lista-cursos')
            })
        }
      })
    },
  },

}
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
