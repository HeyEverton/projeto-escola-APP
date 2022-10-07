<template lang="">
  <div class="d-flex flex-wrap">
    <b-col
      v-for="cursoItem in cursos"
      :key="cursoItem.id"
      md="6"
      lg="4"
    >
      <CursoComponente
        :id="cursoItem.id"
        :curso="cursoItem"
        :nome="cursoItem.nome"
        :descricao="cursoItem.descricao"
        :preco="cursoItem.preco"
        :carga_horaria="cursoItem.carga_horaria"
        :desconto="cursoItem.desconto"
        :created_at="cursoItem.created_at"
        @afterDeleting="afterDeleting"
      />
    </b-col>
  </div>
</template>
<script>
import {
  BCard,
  BCardText,
  BButton,
  BRow,
  BCol,
  BModal,
  VBModal,
  BAlert,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'
import CursoComponente from './CursoComponente.vue'

export default {
  components: {
    BCard,
    BButton,
    BCardText,
    BRow,
    BCol,
    CursoComponente,
    BModal,
    VBModal,
    BAlert,
  },

  directives: {
    'b-modal': VBModal,
    Ripple,
  },

  data() {
    return {
      cursos: [],
    }
  },

  created() {
    this.$http.get('cursos')
      .then(response => {
        this.cursos = response.data.data
      })
  },

  methods: {
    afterDeleting() {
      this.$http.get('cursos')
        .then(response => {
          this.cursos = response.data.data
        })
    },
  },

}
</script>
