
// 入口文件

import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router/index.js'
// 引入vant 中的toast
// import { Toast } from 'vant'

// 引入全局样式
import '@/styles/reset.less'

// 全局引入vant,如果使用了全局，就不能在Babel里设置，要注意
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
// Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
