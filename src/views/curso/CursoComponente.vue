<template>
  <div>
    <b-card
      img-top
      :title="nome | truncate(17,'...')"
      style="width: 300px;"
    >
      <b-card-text class="blog-content-truncate">
        <p>{{ descricao | truncate(30,'...') }}</p>
      </b-card-text>

      <b-card-text class="text-danger d-flex justify-content-between">
        <h5>{{ preco }} R$</h5>
        <h6>{{ carga_horaria }} horas</h6>
        {{ desconto }}
      </b-card-text>

      <b-card-text class="text-muted">
        Criado em {{ moment(created_at).format('Do MMM YYYY') }}
      </b-card-text>
      <b-row class="match-height d-flex justify-content-between">
        <b-col
          md="6"
          lg="4"
          sm="4"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-primary"
            class=" btn-icon mt-1 mb-1"
            :to="{name: 'editar-curso', params: { id:id } }"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
        </b-col>

        <b-col
          md="6"
          lg="4"
          sm="6"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-danger"
            class=" btn-icon mt-1 "
            @click="apagarCurso(id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardText,
  BButton,
  BRow,
  BCol,

} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BButton,
    BCardText,
    BRow,
    BCol,
  },

  directives: {
    Ripple,
  },

  props: [
    'id',
    'nome',
    'descricao',
    'carga_horaria',
    'preco',
    'desconto',
    'created_at',
  ],

  data() {
    return {
      // curso: '',
      mainProps: {
        height: 200,
      },
    }
  },

  methods: {
    apagarCurso(id) {
      this.$swal({
        title: 'Você tem certeza?',
        text: 'Você não será capaz de desfazer isso.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir.',
        cancelButtonText: 'Não, cancelar.',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$http.delete(`cursos/${id}`)
            .then(
              this.$emit('afterDeleting'),
            )
          this.$swal({
            icon: 'success',
            title: 'Excluido!',
            text: 'O curso foi excluído com sucesso',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      })
    },
  },

}
</script>

<style>

</style>
