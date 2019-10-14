<template>
  <div id="box">
    <!-- 这里是登录页面，在这个页面里要实现登录的逻辑，在这里要引入 myinput 和 mybutton 两个单页面组件 -->

    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <myinput
      text="text"
      @input="getname"
      :value="userinfo.username"
      placeholder="用户名"
      :rules='/^1\d{10}$/'
      err_msg='请输入11位手机号~~'
    ></myinput>

    <myinput text="password" v-model="userinfo.password" placeholder="密码"></myinput>

    <p class="tips">
      没注册?
      <a href="#/register">去注册</a>
    </p>

    <mybutton text="登录" color="greenyellow" @click="deal"></mybutton>
  </div>
</template>

<script>
import myinput from '@/components/myinput.vue'
import mybutton from '@/components/mybutton.vue'
import { login } from '@/api/users.js'
export default {
  data () {
    return {
      userinfo: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    myinput,
    mybutton
  },
  methods: {
    deal (event) {
      // console.log('父组件被点击了')
      // console.log(this.userinfo)
      login(this.userinfo) // 调用login 实现登录
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getname (value) {
      // console.log(value)
      this.userinfo.username = value
    }
  }
}
</script>

<style lang='less' scoped>
#box {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.tips {
  padding: 15px 0;
  text-align: right;
  margin-right: 10px;
}
.tips a {
  text-decoration: none;
  color: blue;
  display: inline-block;
  padding: 10px;
}
</style>
