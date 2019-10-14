<template>
  <div
  :class="{btn:true,skyblue:color ==='skyblue',springgreen:color ==='springgreen',greenyellow:color ==='greenyellow'}"
  @click="handleclick"
  >{{text}}</div>
</template>

<script>
export default {
  props: ['text', 'color'],
  methods: {
    handleclick (event) {
      // console.log('子组件被点击了')
      this.$emit('click', event)
    }
  }

}
</script>

<style lang="less" scoped>
  .btn{
    width: 100%;
    height: 48 / 360 * 100vw;
    background-color: #f00;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .skyblue{
    background-color: skyblue;
  }
  .springgreen{
    background-color: springgreen;
  }
  .greenyellow{
    background: greenyellow;
  }
</style>
