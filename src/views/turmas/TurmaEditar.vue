<template>
  <b-card>

    <b-card-header class="pb-50 d-flex justify-content-start">
      <h3>
        Editar dados da turma
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
            <b-col md="12">
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
                    placeholder="Insira o nome da turma"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Selecione o curso"
                label-for="curso_id"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Curso"
                >

                  <v-select
                    v-model="curso_id"
                    :options="cursos"
                    :reduce="cursos => cursos.id"
                    label="nome"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Selecione o turno"
                label-for="turno"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Turno"
                >

                  <v-select
                    v-model="turno"
                    :options="turnos"
                    :reduce="turnos => turnos.code"
                    label="nome"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Data de início"
                label-for="data_inicio"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Data de início"
                >
                  <b-form-input
                    id="data_inicio"
                    v-model="data_inicio"
                    type="date"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira a data de início "
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Data de término"
                label-for="data_termino"
              >
                <validation-provider
                  #default="{ errors }"
                  rules=""
                  name="Data de término"
                >
                  <cleave
                    id="date"
                    v-model="data_termino"
                    class="form-control"
                    :raw="false"
                    placeholder="DD/MM/AA"
                    type="date"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Quantidade máxima de alunos"
                label-for="qt_maxA"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Quantidade máx alunos"
                >
                  <b-form-input
                    id="qt_maxA"
                    v-model="qt_maxA"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira a quantidade máxima de alunos"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Quantidade atual de alunos"
                label-for="qt_maxA"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Quantidade máx alunos"
                >
                  <b-form-input
                    id="qt_atualA"
                    v-model="qt_atualA"
                    type="number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira a quantidade atual de alunos"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Selecione o professor"
                label-for="professor_id"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Professor"
                >

                  <v-select
                    v-model="professor_id"
                    :options="professores"
                    :reduce="professores => professores.id"
                    label="nome"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Horário de entrada"
                label-for="horario_entrada"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Horário de entrada"
                >
                  <b-form-input
                    id="horario_entrada"
                    v-model="horario_entrada"
                    type="text"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira o horário de entrada da turma"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group
                label="Horário de saída"
                label-for="horario_saida"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Horário de saída"
                >
                  <b-form-input
                    id="horario_saida"
                    v-model="horario_saida"
                    type="text"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Insira o horário de saída da turma"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Selecione a modalidade"
                label-for="modalidade"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Modalidade"
                >

                  <v-select
                    v-model="modalidade"
                    :options="modalidades"
                    :reduce="modalidades => modalidades.code"
                    label="nome"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <b-form-group
                label="Selecione o status da turma"
                label-for="turno"
              >
                <validation-provider
                  #default="{ errors }"
                  rules="required"
                  name="Turno"
                >

                  <v-select
                    v-model="status"
                    :options="statusTurma"
                    :reduce="statusTurma => statusTurma.code"
                    label="nome"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col
              cols="12"
              class="d-flex  mt-2"
            >
              <b-button
                size="md"
                type="submit"
                variant="primary"
                class="mr-1"
                @click="editarTurma"
              >
                Salvar
                <feather-icon
                  size="18"
                  icon="SendIcon"
                  class="d-inline d-sm-none"
                />

              </b-button>
              <b-button

                size="md"
                type="reset"
                variant="outline-secondary"
                :to="{name: 'lista-turma' }"
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
import Cleave from 'vue-cleave-component'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import router from '@/router'

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
    Cleave,
  },

  data() {
    return {
      nome: '',
      curso_id: '',
      professor_id: '',
      turno: '',
      qt_maxA: '',
      qt_atualA: '0',
      data_inicio: '',
      data_termino: '',
      horario_entrada: '',
      horario_saida: '',
      modalidade: '',
      status: '',
      // V-SELECT_PROFESSRO_CURSO
      cursos: [],
      professores: [],

      options: {
        date: {
          date: true,
          delimiter: '/',
          datePattern: ['DD', 'MM', 'YYYYY'],
        },
      },

      // V-SELECT_TURMA
      turnos: [
        { code: 'M', nome: 'Manhã' },
        { code: 'T', nome: 'Tarde' },
        { code: 'N', nome: 'Noite' },
      ],
      statusTurma: [
        { code: 'A', nome: 'Em aberto' },
        { code: 'AN', nome: 'Em andamento' },
        { code: 'F', nome: 'Fechada' },
      ],
      modalidades: [
        { code: 1, nome: 'Online' },
        { code: 2, nome: 'Presencial' },
      ],
      required,
    }
  },

  created() {
    this.$http.get('cursos')
      .then(response => {
        this.cursos = response.data.data
      })
    this.$http.get('professores')
      .then(response => {
        this.professores = response.data.data
      })
    this.$http.get(`turmas/${router.currentRoute.params.id}`)
      .then(response => {
        this.nome = response.data.data.nome
        this.curso_id = response.data.data.curso_id
        this.professor_id = response.data.data.professor_id
        this.turno = response.data.data.turno
        this.data_inicio = response.data.data.data_inicio
        this.data_termino = response.data.data.data_termino
        this.qt_maxA = response.data.data.qt_max_alunos
        this.qt_atualA = response.data.data.qt_atual_alunos
        this.modalidade = response.data.data.modalidade
        this.status = response.data.data.status
        this.horario_entrada = response.data.data.horario_entrada
        this.horario_saida = response.data.data.horario_saida
      })
  },

  methods: {
    editarTurma() {
      this.$refs.form.validate().then(success => {
        if (success) {
          const payload = {
            nome: this.nome,
            curso_id: this.curso_id,
            professor_id: this.professor_id,
            data_inicio: this.data_inicio,
            data_termino: this.data_termino,
            turno: this.turno,
            qt_max_alunos: this.qt_maxA,
            qt_atual_alunos: this.qt_atualA,
            horario_entrada: this.horario_entrada,
            horario_saida: this.horario_saida,
            modalidade: this.modalidade,
            status: this.status,
          }

          this.$http.put(`turmas/${router.currentRoute.params.id}`, payload)
            .then(response => {
              this.$swal({
                icon: 'success',
                title: 'Editada',
                text: 'A turma foi editada com sucesso!',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            })
          this.$router.replace('/lista-turma')
        }
      })
    },
  },

}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
