import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from 'vue-svgicon'
import './registerServiceWorker'

import '@/icons/components'
import '@/style/element-variables.scss'

Vue.config.productionTip = false

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
