import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import store from './store'

import App from './App'
import ClientsPage from './components/pages/ClientsPage'

Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: ClientsPage },
]

const router = new VueRouter({ mode: 'history', routes })

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    router,
    el: '#app',
    components: { App, ClientsPage },
    render: h => h(App),
    store: store,
  })
})