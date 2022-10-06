<template>
    <div>
        <b-card img-top :title="nome">
            <b-card-text class="blog-content-truncate">
                <p>{{descricao}}</p>
            </b-card-text>
            
            <b-card-text class="text-danger d-flex justify-content-between">
                 <h5>{{preco}} R$</h5>
                 <h6>{{carga_horaria}} horas</h6>
                 {{desconto}}
            </b-card-text>

            

            
            <b-card-text class="text-muted">
                Criado em {{moment(created_at).format('Do MMM YYYY')}}
            </b-card-text>
            <b-row class="match-height d-flex justify-content-between">
                <!-- <b-col md="12" lg="6" sm="12">
                    <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                     variant="primary" class="mt-1" v-b-modal.modal-center>
                        Ver mais
                    </b-button>

                </b-col> -->

                <b-col md="6" lg="4" sm="4">
                    <b-button variant="outline-primary" class=" btn-icon mt-1 mb-1"
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'">
                        <router-link :to="{name: 'editar-curso', params: { id:id } }">
                            <feather-icon icon="EditIcon" />
                        </router-link>

                    </b-button>
                </b-col>

                <b-col md="6" lg="4" sm="6">
                    <b-button variant="outline-danger" class=" btn-icon mt-1 "
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'" @click="apagarCurso(id)">
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
    BCol

} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'


export default {
    components: {
        BCard,
        BButton,
        BCardText,
        BRow,
        BCol
    },

    directives: {
        Ripple,
    },

    data() {
        return {
            // curso: '',
            mainProps: {
                height: 200,
            }
        }
    },

    props: [
        'id',
        'nome',
        'descricao',
        'carga_horaria',
        'preco',
        'desconto',
        'created_at'
    ],


    methods: {
        apagarCurso(id) {
            this.$swal({
                title: 'Você tem certeza?',
                text: "Você não será capaz de desfazer isso.",
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
                    this.$http.delete("cursos/" + id)
                        .then(
                            this.$emit('afterDeleting')
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


        }
    }

}
</script>

<style>

</style>