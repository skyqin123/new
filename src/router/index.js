// 在这里封装路由

import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/pages/login.vue'
import Register from '@/pages/register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  }

  ]
})

export default router // **记得一定要暴露
