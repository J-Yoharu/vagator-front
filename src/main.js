import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/tailwind.css'
import axios from 'axios'
axios.defaults.withCredentials = true

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
