<template>
  <div class="register">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <myinput placeholder="请输入手机号" text="text" v-model="userdata.username" err_msg="请输入合法的手机号"
    :rules="/^1\d{10}$/"></myinput>

    <myinput placeholder="请输入昵称" v-model="userdata.nickanme"></myinput>

    <myinput placeholder="请输入密码" :rules="/^\w{6,16}$/" v-model="userdata.password" err_msg="请输入6~16位的任意字符的合法密码"></myinput>

    <p class="tips">
      <a href="#/login">去登录</a>
    </p>

    <mybutton text="注册" color="greenyellow" @click="register">
    </mybutton>
  </div>
</template>

<script>
import myinput from '@/components/myinput.vue'
import mybutton from '@/components/mybutton.vue'
import { register } from '@/api/users.js'
export default {
  data () {
    return {
      userdata: {
        username: '',
        nickname: '',
        password: '123456'
      }
    }
  },
  components: {
    myinput,
    mybutton
  },
  methods: {
    register () {
      console.log(this.userdata)
      register(this.userdata) // 调用register 实现注册
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.$toast(res.data.message)
          }
        })
        .catch(err => { // 因为很多业务的错误信息都差不多，所以这里的catch可以添加到想要拦截
          console.log(err)
        })
    }
  }
}
</script>

<style lang='less' scoped>
.register {
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
  padding: 10px 0;
  text-align: right;
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
</style>
