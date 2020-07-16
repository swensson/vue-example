import Vue from "vue/dist/vue.js"

import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
  })
})