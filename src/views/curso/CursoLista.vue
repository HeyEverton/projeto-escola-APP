<template lang="">
    <div class="d-flex flex-wrap">
        <b-col
        md="6"
        lg="4"      
        v-for="cursoItem in cursos"
        :key="cursoItem.id"            
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
    BCol
} from 'bootstrap-vue'

import CursoComponente from './CursoComponente.vue'

export default {
    components: {
        BCard,
        BButton,
        BCardText,
        BRow,
        BCol,
        CursoComponente,
    },

    data() {
        return {
            cursos: []
        }
    },

    created () {
        this.$http.get('cursos')
        .then(response => {
            console.log(response)
            this.cursos = response.data.data
        })
    },


}
</script>
