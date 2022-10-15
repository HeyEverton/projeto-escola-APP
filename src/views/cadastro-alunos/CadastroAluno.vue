<template>
  <b-row>
    <b-col cols="12">
      <CadastroComponente />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import CadastroComponente from './CadastroComponente.vue'

export default {
  components: {
    BRow,
    BCol,
    CadastroComponente,
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
