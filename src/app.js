import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueResource from 'vue-resource'
import appEntry from './main'
import common from 'commonFunc'
import { mapGetters, mapActions } from 'vuex'
import router from './routes';
import store from './store'
import messages from './assets/js/i18n'

router.beforeEach(function(to, from, next) {
  const toPath = to.path
  const fromPath = from.path
  var token = common.getStoreData('token')
  next()
})

// router.afterEach(route => {
//   console.log(`成功浏览到: ${route.path}`)
// })

// Resource
Vue.use(VueResource)
Vue.use(VueI18n)

Vue.http.options.root = '/root'
Vue.http.headers.common['Content-Type'] = 'application/json'
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true
Vue.http.options.withCredentials=true
Vue.http.options.crossDomain=true

Vue.http.interceptors.push((request, next) => {
  $('.btn').addClass('disabled')
  var token = common.getStoreData('token')
  if (typeof (token) === 'string') {
    Vue.http.headers.common['authorization'] = token
  }

  // continue to next interceptor
  next((response) => {
    $('.btn').removeClass('disabled')
  })
})

var eventHub = new Vue()
window.eventHub = eventHub


// inject a handler for `myOption` custom option
Vue.mixin({
  methods: mapActions([
    'setError'
  ])
})
if(common.getStoreData('language')==undefined){
    common.setStoreData('language', 'zh_cn');
}

const i18n = new VueI18n({
    // locale:  'zh_cn', // set locale
    locale:  common.getStoreData('language'), // set locale
  messages
})

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(appEntry)
}).$mount('#app')

// Hot updates
// if (module.hot) {
//     module.hot.accept(['./zh_cn', './zh_en'], function () {
//         i18n.setLocaleMessage('zh_cn', require('./assets/js/zh_CN').default)
//         i18n.setLocaleMessage('zh_en', require('./assets/js/zh_EN').default)
//         // Or the following hot updates via $i18n property
//         // app.$i18n.setLocaleMessage('en', require('./en').default)
//         // app.$i18n.setLocaleMessage('ja', require('./ja').default)
//     })
// }
