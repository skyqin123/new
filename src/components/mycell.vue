<template>
  <div class="cell" @click = "handleclick">
    <span>{{title}}</span>
    <div class="info">
      <span>{{type === 'type'? '********': desc}}</span>
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc', 'type'],
  methods: {
    handleclick (event) {
      this.$emit('click', event)
    }
  }

}
</script>

<style lang = 'less' scoped>
.cell {
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .info{
      color:#bbb;
      font-size: 14px;
      >span:nth-of-type(2){
          margin-left: 10px;
      }
  }
}
</style>
