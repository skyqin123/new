
<template>

<!-- // App.vue 文件是一个根组件，日后所以的单组件文件都要引入这里 -->

  <div id="app">
    <!-- <h1>这是根组件</h1> -->
    <router-view></router-view>
    <!-- <login></login> -->

  </div>

</template>

<script>
// import login from '@/pages/login.vue' //已经用路由跳转了，不用组件显示了
export default {
  components: {
    // login
  }

}
</script>

<style>
/* 引入字体图标，用浏览器的方式来引入，减轻项目体积，但是需要连网 */
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css')
</style>
