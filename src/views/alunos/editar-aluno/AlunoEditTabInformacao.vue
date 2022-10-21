<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="userData.aluno_foto"
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
            @input="catchEvent"
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
            md="12"
          >
            <b-form-group
              label="CPF"
              label-for="full-name"
            >

              <validation-provider
                #default="{ errors }"
                name="Nacionalidade"
                rules="required"
              >
                <cleave
                  id="cpf_aluno"
                  v-model="userData.cpf_aluno"
                  class="form-control"
                  :raw="false"
                  :options="optionsCPF.customDelimiter"
                  placeholder="Insira o CPF do aluno"
                  type="text"
                  maxlength="14"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Email -->
          <b-col
            cols="12"
            md="12"
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
                  v-model="userData.data_nasc"
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

          <b-col md="6">
            <b-form-group
              label="Whatsapp"
              label-for="whatsapp"
            >
              <b-form-input
                id="whatsapp"
                v-model="userData.whatsapp"
                type="text"
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
                  v-model="userData.escolaridade"
                  label="nome"
                  :options="escolaridades"
                  :reduce="escolaridades => escolaridades.code"
                  placeholder="Selecione a escolaridade do aluno"
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
                v-model="userData.observacao"
                rows="5"
                placeholder="Tem alguma observação sobre o aluno?"
              />
            </b-form-group>
          </b-col>

        </b-row>
      </validation-observer>
    </b-form>

    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="updateProfile"
    >
      Salvar
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :to="{name: 'lista-alunos'}"
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

      escolaridades: [
        { code: 'MC', nome: 'Ensino médio completo' },
        { code: 'MI', nome: 'Ensino médio incompleto' },
        { code: 'FC', nome: 'Fundamental completo' },
        { code: 'FI', nome: 'Fundamental incompleto' },
        { code: 'S', nome: 'Cursando superior' },
      ],

    }
  },

  created() {
    this.$http
      .get(`alunos/${router.currentRoute.params.id}`)
      .then(response => {
        // console.log(response.data.data)
        this.userData = response.data.data
      })
      .catch(error => {
        if (error.response.status === 404) {
          userData.value = undefined
        }
      })
  },

  methods: {
    catchEvent(event) {
      this.profile_photo_path = event.target.files[0]
    },

    updateProfile() {
      let payload = ''
      payload = new FormData()
      payload.append('aluno_foto', this.userData.aluno_foto)
      payload.append('nome', this.userData.nome)
      payload.append('cpf_aluno', this.userData.cpf_aluno)
      payload.append('email', this.userData.email)
      payload.append('nacionalidade', this.userData.nacionalidade)
      payload.append('data_nasc', this.userData.data_nasc)
      payload.append('sexo', this.userData.sexo)
      payload.append('whatsapp', this.userData.whatsapp)
      payload.append('tel_contato', this.userData.tel_contato)
      payload.append('escolaridade', this.userData.escolaridade)
      payload.append('observacao', this.userData.observacao)
      payload.append('nome_rua', this.userData.nome_rua)
      payload.append('cep', this.userData.cep)
      payload.append('bairro', this.userData.bairro)
      payload.append('cidade', this.userData.cidade)
      payload.append('estado', this.userData.estado)
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
