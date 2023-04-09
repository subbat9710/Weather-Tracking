import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_REMOTE_API;

library.add(faHatWizard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
