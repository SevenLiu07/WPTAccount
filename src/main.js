import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './vuex'

// 2.0兼容IE, axios在ie中沒有promise对象?
import 'babel-polyfill'
import banner from './components/Banner.vue'
import titles from './components/Titles.vue'
Vue.component('banner', banner)
Vue.component('titles', titles)
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

