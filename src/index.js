// JS
import './js/'

// SCSS
import './assets/scss/main.scss'

// CSS (example)
// import './assets/css/main.css'

// Vue.js
window.Vue = require('vue')
//vuex
import store from './store'

import Vuelidate from 'vuelidate'

//Plugins
Vue.use(Vuelidate)

// Vue components (for use in html)
Vue.component('example-component', require('./components/Example.vue').default)
//ui
Vue.component('notify-component', require('./components/Notify.vue').default)
//controls
Vue.component('login-button', require('./components/UI/controls/buttons/Login.vue').default)

// Vue init
const app = new Vue({
  data() {
  return {
    modalView: false
  }
  },
  store,
  el: '#app'
})
