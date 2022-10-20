<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="userData === undefined"
    >
      <h4 class="alert-heading">
        Erro ao pegar dados deste aluno
      </h4>
      <div class="alert-body">
        Nenhum aluno foi encontrado com esse <strong>id</strong>. Cheque na
        <b-link
          class="alert-link"
          :to="{ name: 'lista-alunos'}"
        >
          Lista de alunos.
        </b-link>

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
        <AlunoEditTabInformacao
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
        <AlunoEditTabEndereco class="mt-2 pt-75" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon
            icon="DollarSignIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Mensalidades</span>
        </template>
        <PagamentosTabView class="mt-2 pt-75" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon
            icon="BookOpenIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Matricular</span>
        </template>
        <MatricularAluno class="mt-2 pt-75" />
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
import AlunoEditTabInformacao from './AlunoEditTabInformacao.vue'
import AlunoEditTabEndereco from './AlunoEditTabEndereco.vue'
import PagamentosTabView from './PagamentosTabView.vue'
import MatricularAluno from './MatricularAluno.vue'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    AlunoEditTabInformacao,
    AlunoEditTabEndereco,
    PagamentosTabView,
    MatricularAluno,
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
    this.$http.get(`aluno/matricula/${router.currentRoute.params.id}`)
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
