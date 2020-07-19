import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import store from './store'

import App from './App'
import ClientsPage from './components/pages/ClientsPage'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', routes: [
    { path: '/', component: ClientsPage },
  ],
})

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App),
    components: { App, ClientsPage },
  })
})