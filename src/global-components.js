import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import moment from 'moment'

Vue.prototype.moment = moment
moment.locale('pt-br')

Vue.component(FeatherIcon.name, FeatherIcon)
