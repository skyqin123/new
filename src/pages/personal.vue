<template>
  <div class="personal">
    <router-link to="/editProfile">
      <div class="profile">
        <img :src="currnetUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{currnetUser.nickname}}
          </div>
          <div class="time">{{currnetUser.date | timeformat}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <div class="list">
      <router-link to="/">
        <mycell title="我的关注" desc="关注的用户"></mycell>
      </router-link>

      <router-link to="/">
        <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
      </router-link>

      <router-link to="/">
        <mycell title="我的收藏" desc="文章/视频"></mycell>
      </router-link>

      <router-link to="/">
        <mycell title="设置"></mycell>
      </router-link>

    </div>
  </div>
</template>

<script>
import mycell from '@/components/mycell.vue'
import { getUserInfo } from '@/api/users.js'
import { timeformat } from '@/utils/myfilter.js'
export default {
  data () {
    return {
      currnetUser: {
        username: '',
        nickname: '',
        head_img: '',
        date: new Date()
      }
    }
  },
  components: {
    mycell
  },
  filters: {
    timeformat
  },

  mounted () {
    const id = localStorage.getItem('id')
    getUserInfo(id) // 通过id获取当前登录的用户的信息
      .then(res => {
        console.log(res)
        this.currnetUser.nickname = res.data.data.nickname
        this.currnetUser.head_img = res.data.data.head_img

        if (this.currnetUser.head_img) {
          // 如果是服务器的图片，就要拼接完成的路径
          this.currnetUser.head_img = localStorage.getItem('baseURL') + this.currnetUser.head_img
        } else { // 如果服务器没有当前用户的图片就默认获取本地的一张图片
          // console.log(123)
          this.currnetUser.head_img = './u11.jpg' // ？
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang = "less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
