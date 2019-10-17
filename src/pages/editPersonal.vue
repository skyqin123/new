<template>
  <div class="editPersonal">
    <!-- 编辑个人信息页面的头部封装成一个单独的vue单文件组件，方便日后的使用，因为这个头部在其他的地方都用用到 -->
    <!-- 这是编辑个人信息页面 -->
    <myheader title="个人信息修改">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>

    <div class="myimg">
      <img :src="userdata.head_img" alt class="userImg" />
      <van-uploader :before-read="beforeRead" :after-read="afterRead" />
    </div>

    <div class="mycell">
      <mycell title="昵称" :desc="userdata.nickname" @click="nickshow=!nickshow"></mycell>
      <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="upNickName">
        <van-field
          :value="userdata.nickname"
          ref="nickname"
          placeholder="请输入用户名"
          label="昵称"
          required
        />
      </van-dialog>

      <mycell title="密码" type="type" :desc="userdata.password" @click="pwdshow=!pwdshow"></mycell>
      <!-- <van-dialog v-model="pwdshow" title="修改密码" show-cancel-button @confirm = 'updataPwd' :before-close="beforeClose"> -->
      <van-dialog
        v-model="pwdshow"
        title="修改密码"
        show-cancel-button
        @confirm="updataPwd"
        :before-close="beforeClose"
      >
        <van-field type="password" ref="password" placeholder="请输入原密码" label="密码" required />
        <van-field type="password" ref="password2" placeholder="请输入新密码" label="密码" required />
      </van-dialog>

      <mycell title="性别" :desc="userdata.gender===1? '男':'女'" @click="gendershow=!gendershow"></mycell>
      <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="upGender">
        <van-picker :columns="['女','男']" @change="onChange" :default-index="userdata.gender" />
      </van-dialog>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import mycell from '@/components/mycell.vue'
import { getUserInfo, updataUserInfo } from '@/api/users.js'
import { uploadFile } from '@/api/uploadFile.js'
export default {
  data () {
    return {
      nickshow: false,
      pwdshow: false,
      gendershow: false,
      userdata: {
        nickname: '',
        head_img: '',
        gender: '',
        password: ''
      },
      usergender: ''
    }
  },
  components: {
    myheader,
    mycell
  },
  mounted () {
    const id = localStorage.getItem('id')
    // console.log(id)
    getUserInfo(id) // 页面刚加载的时候就要获取用户的基本信息
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.userdata.nickname = res.data.data.nickname
          this.userdata.head_img = res.data.data.head_img
          this.userdata.password = res.data.data.password
          this.userdata.gender = res.data.data.gender
          // 判断用户头像是否存在
          if (this.userdata.head_img) {
            // 如果用户头像存在服务器，就必须拼接完整的路径
            this.userdata.head_img =
              localStorage.getItem('baseURL') + this.userdata.head_img
          } else {
            // 如果不在服务器就读取本地的默认图片
            this.userdata.head_img = './u11.jpg'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // 1.上传图片之前的回调函数,在这个回调函数里面来判断用户是否选择了正确的图片，即判断选择的文件是否是图片
    beforeRead (file) {
      // console.log(file)
      if (file.type.indexOf('image/') === 0) {
        // console.log('return true')
        return true
      } else {
        // console.log('return false')
        return false
      }
    },
    // 读取文件结束后触发afterRead函数，在这里要进行文件上传到服务器，更改页面的图片
    async afterRead (file) {
      // 获取要上传的文件(图片)
      let formdata = new FormData() // 创建form对象
      formdata.append('file', file.file)
      // console.log(formdata)
      // 调用接口上传文件数据
      let res = await uploadFile(formdata)
      // console.log(res)
      if (res.status === 200) {
        // 刷新页面图片
        this.userdata.head_img =
          localStorage.getItem('baseURL') + res.data.data.url

        // 调用接口，更改服务器中的图片
        let res2 = await updataUserInfo(localStorage.getItem('id'), {
          head_img: res.data.data.url
        })
        if (res2.status === 200) {
          console.log(res2)
          this.$toast.success(res2.data.message)
        }
      }
    },

    // 封装修改信息的方法
    async upDatauserInfos (data, callback) {
      let res = await updataUserInfo(localStorage.getItem('id'), data)
      if (res.status === 200) {
        callback && callback(res)
      }
    },
    // 修改昵称
    upNickName () {
      console.log(this.$refs)
      // 调用上面封装好的函数，进行用户信息的修改
      this.upDatauserInfos(
        { nickname: this.$refs.nickname.$refs.input.value },
        res => {
          console.log(res)
          if (res.status === 200) {
            this.$toast.success(res.data.message)
            // 更改页面中的昵称
            this.userdata.nickname = res.data.data.nickname
          }
        }
      )
    },
    // 在点击确认之前，先判断输入的原密码是否正确
    beforeClose (action, done) {
      // console.log(action)
      // console.log(done)
      // 判断原密码是否相同
      if (
        action === 'confirm' &&
        this.$refs.password.$refs.input.value !== this.userdata.password
      ) {
        console.log(this.userdata.password)
        console.log(this.$refs.password.$refs.input.value)
        this.$toast('原密码不正确')
        done(false)
      } else {
        console.log('原密码')
        console.log(this.userdata.password)
        console.log(this.$refs.password.$refs.input.value)
        done()
      }
    },
    updataPwd () {
      // 获取到要更改的密码，更新数据库，并更新显示的密码
      // 获取到新的密码
      let password = this.$refs.password2.$refs.input.value
      console.log(password)
      this.upDatauserInfos({ password }, res => {
        this.$toast.success(res.message)
        // 改变当前页面的密码，虽然看不见，也要进行修改
        this.userdata.password = password
      })
    },
    onChange (picker, value, index) {
      console.log(picker)
      console.log(value)
      console.log(index)
      this.usergender = index
    },
    upGender () {
      this.upDatauserInfos({ gender: this.usergender }, res => {
        this.$toast.success(res.message)
        this.userdata.gender = this.usergender
      })
    }
  }
}
</script>

<style lang="less" scoped>
// scoped是说明当前样式是局部样式，Scoped中添加的样式不能影响组件的样式
.myimg {
  position: relative;
  .userImg {
    display: block;
    width: 120/360 * 100vw;
    height: 120/360 * 100vw;
    border-radius: 50%;
    margin: 50px auto;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    opacity: 0;
  }
  // deep:可以影响子组件的样式
  /deep/.van-uploader__upload {
    width: 120/360 * 100vw;
    height: 120/360 * 100vw;
  }
}
</style>
