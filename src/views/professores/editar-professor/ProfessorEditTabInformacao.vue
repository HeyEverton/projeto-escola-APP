<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="userData.professor_foto"
          :text="avatarText(userData.nome)"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ userData.nome }}
      </h4>
      <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$refs.refInputEl.click()"
        >
          <input
            ref="refInputEl"
            type="file"
            class="d-none"
            @input="catchImage"
          >
          <span class="d-none d-sm-inline">Escolher foto</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <!-- <b-button
          variant="outline-secondary"
          class="ml-1"
        >
          <span class="d-none d-sm-inline">Remover</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button> -->
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form>
      <validation-observer
        ref="infoRules"
        tag="form"
      >
        <b-row>

          <!-- Field: Full Name -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Nome"
              label-for="full-name"
            >
              <b-form-input
                id="full-name"
                v-model="userData.nome"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Full Name -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="CPF"
              label-for="cpf"
            >

              <validation-provider
                #default="{ errors }"
                name="Nacionalidade"
                rules="required"
              >
                <cleave
                  id="professor_cpf"
                  v-model="userData.professor_cpf"
                  class="form-control"
                  :raw="false"
                  :options="optionsCPF.customDelimiter"
                  placeholder="Insira o CPF do professor"
                  type="text"
                  maxlength="14"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="RG"
              label-for="professor_rg"
            >

              <validation-provider
                #default="{ errors }"
                name="RG"
                rules="required"
              >
                <cleave
                  id="professor_rg"
                  v-model="userData.professor_rg"
                  class="form-control"
                  :raw="false"
                  :options="optionsCPF.customDelimiter"
                  placeholder="Insira o RG do professor"
                  type="text"
                  maxlength="14"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: nacionalidade -->
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
                  v-model="userData.nacionalidade"
                  label="nome"
                  :options="nacionalidades"
                  :reduce="nacionalidades => nacionalidades.code"
                  placeholder="Selecione a nacionalidade do aluno"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="6"
            cols="12"
          >
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
                  v-model="userData.estado_civil"
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
                  v-model="userData.sexo"
                  label="nome"
                  :options="sexos"
                  :reduce="sexos => sexos.code"
                  placeholder="Selecione o sexo do aluno"
                />

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group
              label="Formação"
              label-for="data_nascimento"
            >
              <validation-provider
                #default="{ errors }"
                name="Formação"
                rules="required"
              >
                <b-form-input
                  id="formacao"
                  v-model="userData.formacao"
                  type="text"
                  placeholder="Insira a formação do professor"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="E-mail"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="userData.email"
                type="email"
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
                  v-model="userData.tel_contato"
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
        </b-row>
      </validation-observer>
    </b-form>

    <!-- PERMISSION TABLE -->
    <!-- <b-card
      no-body
      class="border mt-1"
    >
      <b-card-header class="p-1">
        <b-card-title class="font-medium-2">
          <feather-icon
            icon="LockIcon"
            size="18"
          />
          <span class="align-middle ml-50">Permissões</span>
        </b-card-title>
      </b-card-header>
      <b-table
        striped
        responsive
        class="mb-0"
        :items="permissionsData"
      >
        <template #cell(module)="data">
          {{ data.value }}
        </template>
        <template #cell()="data">
          <b-form-checkbox :checked="data.value" />
        </template>
      </b-table>
    </b-card> -->

    <!-- Action Buttons -->
    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="updateProfessor"
    >
      Salvar
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :to="{name: 'lista-professores'}"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Voltar
    </b-button>
  </div>
</template>

<script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BFormTextarea,

} from 'bootstrap-vue'

import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import router from '@/router'
import Cleave from 'vue-cleave-component'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import useUsersList from './useUsersList'


export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    vSelect,
    Cleave,
    ValidationProvider,
    ValidationObserver,
    BFormTextarea,
  },
  // props: {
  //   userData: {
  //     type: Object,
  //     required: true,
  //   },
  // },

  data() {
    return {
      userData: { },
      // name: '',

      optionsCPF: {
        customDelimiter: {
          delimiters: ['.', '.', '-'],
          blocks: [3, 3, 3, 2],
          uppercase: true,
        },
      },

      options: {
        prefix: {
          // prefix: '+63',
          blocks: [3, 5, 4],
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

      estados_civil: [
        { code: 'S', nome: 'Solteiro(a)' },
        { code: 'C', nome: 'Casado(a)' },
        { code: 'SJ', nome: 'Separado(a) Judicialmente' },
        { code: 'V', nome: 'Viúvo(a)' },
      ],

    }
  },

  created() {
    this.$http
      .get(`professores/${router.currentRoute.params.id}`)
      .then(response => {
        // console.log(response.data.data)
        this.userData = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })
    // this.$http
    //     .get(`aluno/matricula/${router.currentRoute.params.id}`)
    //     .then(response => {
    //       // console.log(response.data.data)
    //       this.userData = response.data.data
    //     })
    //     .catch(error => {
    //       if (error.response.status === 404) {
    //         userData.value = undefined
    //       }
    //     })
  },
  methods: {
    catchImage(event) {
      this.userData.professor_foto = event.target.files[0]
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
              text: 'Sucesso ao editar seus dados!',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            this.$router.replace('/lista-professores')
          } else {
            this.$swal({
              title: 'Falha ao editar!',
              text: 'Ops! parece que houve um erro ao editar seus dados!',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch(error => {
          if (error.message) {
            this.$swal({
              title: 'Acesso negado!',
              text: 'Você não tem autorização para editar os dados deste usuário!',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
          if(error.message == 'EmailHasBeenTaken') {
            alert('email já existe')

          }
        })
    },
  },

  setup(props) {
    const { resolveUserRoleVariant } = useUsersList()

    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Criador', value: 'criador' },
      { label: 'Editor', value: 'editor' },
      { label: 'Moderador', value: 'moderador' },
      { label: 'Inscrito', value: 'inscrito' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    const permissionsData = [
      {
        module: 'Admin',
        read: true,
        write: true,
        create: true,
        delete: true,
      },

      {
        module: 'Staff',
        read: false,
        write: true,
        create: false,
        delete: false,
      },

      {
        module: 'Criador',
        read: true,
        write: false,
        create: true,
        delete: false,
      },

      {
        module: 'Moderador',
        read: false,
        write: false,
        create: false,
        delete: false,
      },

      {
        module: 'User',
        read: false,
        write: false,
        create: false,
        delete: true,
      },
    ]

    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.userData.avatar = base64
    })

    return {
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      statusOptions,
      permissionsData,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
