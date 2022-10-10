<template>
  <div>
    <h2 class="mx-auto mb-2">Hoje nós temos</h2>
    <b-row class="match-height">
        <b-col  
          lg="3"
          sm="6"
        
        >
         <b-link :to="{name: 'lista-alunos'}">
          <statistic-card-with-area-chart
          v-if="contagemAlunos"
          icon="UsersIcon"
          :statistic="kFormatter(contagemAlunos.contagem_alunos)"
          statistic-title="Alunos matriculados"
          :chart-data="contagemAlunos.contagem_alunos"
        />
         </b-link>
        </b-col>

        <b-col
          lg="3"
          sm="6"
        
        >          
        <b-link :to="{name: 'lista-professores'}" class="text-primary">
          <statistic-card-with-area-chart
            v-if="contagemProfessores"
            color="warning"
            icon="UsersIcon"
            :statistic="contagemProfessores.contagem_professores"
            statistic-title="Professores Dando Aulas"
            :chart-data="contagemProfessores.contagem_professores"
          />
        </b-link>
        </b-col>

        <b-col
          lg="3"
          sm="6"
        >          
        <b-link :to="{name: 'lista-cursos'}" class="text-primary">
          <statistic-card-with-area-chart
            v-if="contagemCursos"
            color="info"
            icon="BookOpenIcon"
            :statistic="contagemCursos.contagem_cursos"
            statistic-title="Cursos em nosso sistema"
            :chart-data="teste.id"
          />
        </b-link>
        </b-col>
        
        
      </b-row>
  </div>
</template>

<script>
import { 
    BCard,
    BCardText,
    BLink,
    BRow,
    BCol,

  } from 'bootstrap-vue'

import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'  
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    StatisticCardWithAreaChart,
    BRow,
    BCol,

  },

  data() {
    return {
      contagemAlunos: {},
      contagemProfessores: {},
      contagemCursos: {},
      teste: [],
    }
  },

  created () {
    this.$http.get('todos-alunos')
    .then(response => {
      this.contagemAlunos = response.data
    })

    this.$http.get('todos-professores')
    .then(response => {
      this.contagemProfessores = response.data
    })

    this.$http.get('todos-cursos')
    .then(response => {
      this.contagemCursos = response.data
    })
    this.$http.get('todos-cursos/hoje')
    .then(response => {
      // console.log(response.data)
      this.teste = response.data
    })
  },

  methods: {
    kFormatter      
  },
}
</script>

<style>

</style>
