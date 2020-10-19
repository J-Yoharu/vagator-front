import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/tailwind.css'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

axios.defaults.withCredentials = true

Vue.prototype.$axios = axios

Vue.directive('userLogged',{
  /*eslint-disable */
  update(el, binding, vnode) {
    console.log("ATUALIZOUUU A PORRA DO MENU")
  },
  bind(el){
    if (localStorage.user == null) {
      console.log(el.style.display="none")
      console.log("NÃO VAI RENDERIZAR O USER")
    }
    else {console.log("VAI RENDERIZAR O USER")
      JSON.parse(localStorage.user);
    }
  }
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

