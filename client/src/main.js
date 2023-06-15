import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faPlus, faStar, faSave, faTrash, faTimes, faUsers, faHome, faTasks } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vSelect from 'vue-select'

import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-select/dist/vue-select.css';

library.add(faEdit, faPlus, faStar, faSave, faTrash, faTimes, faUsers, faHome, faTasks)

axios.defaults.baseURL = '/api';

Vue.component('v-select', vSelect)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
