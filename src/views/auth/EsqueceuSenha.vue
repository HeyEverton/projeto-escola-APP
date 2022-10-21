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
            alt="Forgot password V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Forgot password-->
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
            Esqueceu sua senha?
          </b-card-title>
          <b-card-text class="mb-2">
            Insira seu e-mail e enviaremos instruções de como recuperar sua senha.
          </b-card-text>

          <!-- form -->
          <validation-observer ref="regraEsqueceuSenha">
            <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="esqueceuSenha"
            >
              <b-form-group
                label="Email"
                label-for="forgot-password-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="forgot-password-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="forgot-password-email"
                    placeholder="Insira seu e-mail"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-overlay
                :show="show"
                spinner-variant="primary"
                spinner-small
              >
                <b-button
                  type="submit"
                  variant="primary"
                  block
                >
                  Enviar link para mudar senha
                </b-button>
              </b-overlay>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link :to="{name:'login'}">
              <feather-icon icon="ChevronLeftIcon" /> Voltar para login
            </b-link>
          </p>
        </b-col>
      </b-col>
      <!-- /Forgot password-->
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
  BCardTitle,
  BCardText,
  BImg,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BOverlay,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    VuexyLogo,
    BRow,
    BCol,
    BLink,
    BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,
    ValidationProvider,
    ValidationObserver,
    BOverlay,
  },
  data() {
    return {
      userEmail: '',
      show: false,
      sideImg: require('@/assets/images/pages/forgot-password-v2.svg'),
      // validation
      required,
      email,
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/forgot-password-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    esqueceuSenha() {
      this.show = true
      this.$refs.regraEsqueceuSenha.validate().then(success => {
        if (success) {
          const payload = { email: this.userEmail }
          this.$http.post('esqueceu-a-senha', payload)
            .then(() => {
              this.show = false
              this.$swal({
                icon: 'success',
                title: 'Link enviado!',
                text: 'Enviamos um link para recuperar sua senha.',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            })
        } else {
          this.show = false
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
