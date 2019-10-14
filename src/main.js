
// 入口文件

import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router/index.js'
// 引入vant 中的toast
import { Toast } from 'vant'

// 引入全局样式
import '@/styles/reset.less'

Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
