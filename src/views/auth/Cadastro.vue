<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />

        <h2 class="brand-text text-primary ml-1">
          HTech
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Register V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            Cadastre-se na HTech
          </b-card-title>
          <b-card-text class="mb-2">
            Crie sua conta, e gerencie seus cursos de forma rápida e organziada
          </b-card-text>

          <!-- form -->
          <validation-observer ref="registerForm">
            <b-form class="auth-register-form mt-2">
              <!-- username -->
              <b-form-group
                label="Nome"
                label-for="register-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nome"
                  rules="required"
                >
                  <b-form-input
                    id="register-username"
                    v-model="name"
                    name="Nome"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira seu nome e sobrenome"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group
                label="Email"
                label-for="register-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="E-mail"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="email"
                    name="register-email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Insira seu e-mail"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Por favor, envie sua foto de perfil"
                label-for="profile_photo"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Foto"
                  rules="required|image"
                >
                  <b-form-file
                    id="photo"
                    v-model="foto"
                    accept="image/jpeg, image/png, image/jpg"
                    placeholder="Escolha sua foto de perfil"
                    @change="newFile"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Selecione o seu cargo"
                label-for="role"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Cargo"
                  rules="required"
                >
                  <v-select
                    v-model="cargo"
                    label="nome"
                    :options="cargos"
                    :reduce="cargos => cargos.code"
                    placeholder="Selecione seu cargo"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="password"
                label="Senha"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Senha"
                  rules="required|min:8"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="password"
                      v-model="senha"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      name="Senha"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                  Concordo com
                  <b-link>as políticas & termos de privacidade</b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-overlay
                :show="show"
                spinner-variant="primary"
                spinner-small
              >
                <b-button
                  variant="primary"
                  block
                  type="submit"
                  @click.prevent="registrar"
                >
                  Criar conta
                </b-button>
              </b-overlay>

            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Já tem uma conta?</span>
            <b-link :to="{name:'login'}">
              <span>&nbsp;Faça login!</span>
            </b-link>
          </p>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">
              ou
            </div>
          </div>

          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="facebook"
              href="javascript:void(0)"
            >
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button
              variant="twitter"
              href="javascript:void(0)"
            >
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button
              variant="google"
              href="javascript:void(0)"
            >
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button
              variant="github"
              href="javascript:void(0)"
            >
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
    <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
  BFormFile,
  BOverlay,

} from 'bootstrap-vue'

import {
  required, email, regex, min,
} from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
    BFormFile,
    BOverlay,
    vSelect,

  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      name: '',
      email: '',
      foto: '',
      senha: '',
      cargo: '',
      show: false,
      sideImg: require('@/assets/images/pages/register-v2.svg'),
      // validation
      required,
      email,
      regex,
      min,
      cargos: [
        { code: 'Aluno', nome: 'Aluno(a)' },
        { code: 'Professor', nome: 'Professor(a)' },
        { code: 'Secretaria', nome: 'Secretário(a)' },
      ],
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {

    newFile(event) {
      this.foto = event.target.files[0]
    },
    async registrar() {
      const validator = await this.$refs.registerForm.validate()
      if (!validator) return

      this.show = true
      let payload = ''
      payload = new FormData()
      payload.append('profile_photo', this.foto)
      payload.append('name', this.name)
      payload.append('email', this.email)
      payload.append('password', this.senha)
      payload.append('role', this.cargo)

      this.$http
        .post('cadastro', payload)
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Cadastro efetuado com sucesso!',
              icon: 'CheckIcon',
              variant: 'success',
              text: 'Faça login para continuar!',
            },
          })
          this.show = false
          this.$router.replace('/login')
        })
        .catch(e => {
          this.show = false
          if (e?.response?.data?.error === 'EmailHasBeenTaken') {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Oops!',
                icon: 'AlertTriangleIcon',
                variant: 'danger',
                text: 'Este e-mail já existe!',
              },
            })
          }
        })
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/pages/page-auth.scss';
</style>
