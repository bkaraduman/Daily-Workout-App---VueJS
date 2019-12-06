import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import this component
import datePicker from "vue-bootstrap-datetimepicker";
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import { store } from './stores';
import router from './router/router';


import Vuelidate from "vuelidate";

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.use(datePicker);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
