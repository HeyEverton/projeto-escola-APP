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
    BAlert
} from 'bootstrap-vue'

import CursoComponente from './CursoComponente.vue'

import Ripple from 'vue-ripple-directive'

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

    data() {
        return {
            cursos: []
        }
    },

    directives: {
    'b-modal': VBModal,
    Ripple,
    },

    methods: {
        afterDeleting() {
            this.$http.get('cursos')
            .then(response => {
                this.cursos = response.data.data
            })
        }
    },

    created () {
        this.$http.get('cursos')
        .then(response => {
            this.cursos = response.data.data
        })
    },


}
</script>
