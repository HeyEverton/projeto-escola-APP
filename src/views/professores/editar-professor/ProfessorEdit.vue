<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="userData === undefined"
    >
      <h4 class="alert-heading">
        Erro ao pegar dados deste professor
      </h4>
      <div class="alert-body">
        Nenhum professor foi encontrado com esse <strong>id</strong>. Cheque na
        <b-link
          class="alert-link"
          :to="{ name: 'lista-professores'}"
        >
          Lista de professores
        </b-link>
        para encontrar outro professores.
      </div>
    </b-alert>

    <b-tabs
      v-if="userData"
      pills
    >

      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Dados pessoais</span>
        </template>
        <ProfessorEditTabInformacao
          :user-data="userData"
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Information -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="MapPinIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Endereço</span>
        </template>
        <ProfessorEditTabEndereco class="mt-2 pt-75" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon
            icon="DollarSignIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Dados bancários</span>
        </template>
        <DadosBancariosTab class="mt-2 pt-75" />
      </b-tab>

    </b-tabs>
  </component>
</template>

<script>
import {
  BTab,
  BTabs,
  BCard,
  BAlert,
  BLink,

} from 'bootstrap-vue'

import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import userStoreModule from './userStoreModule'
import ProfessorEditTabEndereco from './ProfessorEditTabEndereco.vue'
import ProfessorEditTabInformacao from './ProfessorEditTabInformacao.vue'
import DadosBancariosTab from './DadosBancariosTab.vue'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    DadosBancariosTab,
    ProfessorEditTabInformacao,
    ProfessorEditTabEndereco,
  },

  setup() {
    const userData = ref(null)

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
    return {
      userData,
    }
  },

  // data() {
  //   return {
  //     userData,
  //   }
  // },

  created() {
    this.$http.get(`professores/${router.currentRoute.params.id}`)
      .then(response => {
        if (response.data.length == 0) {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Ops! Algo deu errado.',
              icon: 'AlertCircleIcon',
              variant: 'danger',
              text: 'Os dados deste usuário não foram econtrados!',
            },
          })
          this.$router.replace('/lista-usuarios')
        }
        this.userData = response.data
      })
      // .catch(error => {
      //   if (error.response.status === 404) {
      //     userData.value = undefined
      //   }
      //
  },
}
</script>

<style>

</style>
