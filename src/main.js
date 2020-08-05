import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import cookies from 'vue-cookie'

axios.defaults.baseURL = 'http://localhost:80/'
axios.interceptors.request.use(config => {
  config.headers.authorization = cookies.get('TOKEN')
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$cookies = cookies
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
