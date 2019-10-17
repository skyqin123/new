// 在这里封装路由

import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/pages/login.vue'
import Register from '@/pages/register.vue'
import Personal from '@/pages/personal.vue'
import EditPersonal from '@/pages/editPersonal.vue'
import Index from '@/pages/index.vue'
// import updataUserInfo from '@/pages/editPersonal.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'Login',
    path: '/login',
    component: Login // 路由映射组件
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'Personal',
    path: '/personal',
    component: Personal
  },
  {
    name: 'EditPersonal',
    path: '/editProfile',
    component: EditPersonal
  },
  {
    name: 'Index',
    path: '/',
    component: Index
  }

  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 如果是访问后台的页面，就需要先登录，在这用导航守卫来实现
  if (to.path === '/personal') {
    const token = localStorage.getItem('usertoken')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router // **记得一定要暴露
