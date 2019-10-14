<template>
  <div id="box">
    <input
      :class="{input:true,success:status === 'success',error:status === 'err'}"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="handleinput"
      @blur="handleblur"
    />
  </div>
</template>

<script>
export default {
  props: ['text', 'placeholder', 'value', 'err_msg', 'rules'],
  data () {
    return {
      status: ''
    }
  },
  methods: {
    handleinput (event) {
      let { value } = event.target
      this.$emit('input', value)
      // 实时判断输入的手机号码，通过输入框的底边的颜色的改变来告知用户
      if (this.rules) {
        // console.log(this.rules)
        if (this.rules.test(value)) {
          this.status = 'success'
        } else {
          this.status = 'err'
        }
      }
    },
    handleblur (event) {
      // console.log(event)
      const { value } = event.target
      if (this.rules) {
        if (!this.rules.test(value)) {
          this.$toast(this.err_msg || '输入错误')
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.input {
  width: 100%;
  height: 38 / 360 * 100vw;
  padding: 30px 0;
  box-sizing: border-box;
  background: #fff;
  border: none;
  border-bottom: 2px #666 solid;
  outline: none;
  font-size: 18px;
}

.success {
  border-bottom-color: green;
}

.error {
  border-bottom-color: red;
}
</style>
