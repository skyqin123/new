<template>
  <div class="articaldetail_37">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span
        :class="{active:artical.has_follow}"
        @click="followUser"
      >{{artical.has_follow?'已关注':'关注'}}</span>
    </div>
    <!-- 文章详情 -->
    <div class="detail">
      <div class="title">{{artical.title}}</div>
      <div class="desc">
        <span>{{artical.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div id="content" class="articalcontent" v-html="artical.content" v-if="artical.type === 1"></div>
      <div class="video" v-if="artical.type === 2">
        <video
          src="https://video.pearvideo.com/mp4/adshort/20191018/cont-1613484-14496802_adpkg-ad_hd.mp4"
          controls
          :poster="artical.cover[0].url"
        ></video>
      </div>
      <div class="opt">
        <span :class="{like:true,active:artical.has_like}" @click="likethisartical">
          <van-icon name="good-job-o" />
          {{artical.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps" v-if="artical.comment_length > 0">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <div style="height:50px;width:100%"></div>
    <!-- 添加评论区域 -->
    <commentfooter :post="artical"></commentfooter>
  </div>
</template>

<script>
import { getArticalDetailById, likeThis } from '@/api/getArticalList.js'
import commentfooter from '@/components/commentfooter.vue'
import { setMyFocu, cancleMyFocu } from '@/api/users.js'
export default {
  data () {
    return {
      artical: {
        user: {}
      }
    }
  },
  components: {
    commentfooter
  },
  methods: {
    // 点击关注(用户)和取消关注，要更新服务器里的数据，因为日后要生成用户关注栏目
    followUser () {
      console.log('关注')
      this.artical.has_follow = !this.artical.has_follow
      if (this.artical.has_follow) {
        setMyFocu(this.artical.user.id).then(res => {
          if (res.status === 200) {
            // console.log(123)
            console.log(res)
            this.$toast.success(res.data.message)
          }
        })
      } else {
        console.log(456)
        cancleMyFocu(this.artical.user.id).then(res => {
          if (res.status === 200) {
            console.log(res)
            this.$toast.success(res.data.message)
          }
        })
      }
    },
    async likethisartical () {
      console.log('点赞')
      let res = await likeThis(this.artical.id)
      console.log(res)
      if (res.data.message === '点赞成功') {
        ++this.artical.like_length
        this.artical.has_like = true
      } else {
        --this.artical.like_length
        this.artical.has_like = false
      }
    }
  },
  // 文章详情页面刚挂在到页面的 时候就立马向服务器发送请求文章详情的请求，并把数据带回
  mounted () {
    // 先获取当前文章的id
    let id = this.$route.params.id
    console.log(id)
    // 根据文章id 获取当前点击的文章的详细的内容
    getArticalDetailById(id).then(res => {
      console.log(res)
      if (res.status === 200) {
        console.log(res.data.data)
        this.artical = res.data.data
      }
      console.log(this.artical)
    })
  }
}
</script>

<style lang="less" scoped>
.articaldetail_37 {
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  // 如果想要修改服务器返回页面结构中的元素的样式，则不要添加scoped标识，否则无法修改元素的样式
  .header {
    padding: 0px 10px;
    box-sizing: border-box;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > .left {
      height: 100%;
      vertical-align: middle;
      position: relative;
      .van-icon {
        position: absolute;
        top: 15px;
        left: 0;
      }
      > span {
        margin-left: 22px;
        font-size: 50px;
      }
    }
    // css:cascading style sheet
    // span.active{
    //    background-color: #f00;
    //     color: #fff;
    //     border: 1px solid #f00;
    // }
    > span {
      padding: 5px 15px;
      text-align: center;
      border-radius: 15px;
      font-size: 13px;
      border: 1px solid #ccc;
      &.active {
        background-color: #f00;
        color: #fff;
        border: 1px solid #f00;
      }
    }
  }
  .detail {
    padding: 15px;
    box-sizing: border-box;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
    }
    .desc {
      line-height: 30px;
      color: #999;
      font-size: 13px;
    }
    .articalcontent {
      text-indent: 2em;
      line-height: 24px;
      font-size: 15px;
      padding-bottom: 30px;
      width: 100%;
      /deep/img {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  }
  .opt {
    display: flex;
    justify-content: space-around;
    .like,
    .chat {
      height: 25px;
      padding: 0 15px;
      font-size: 14px;
      line-height: 25px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
    }
    .like {
      &.active {
        color: red;
      }
    }
    .w {
      color: rgb(84, 163, 5);
    }
  }
  .keeps {
    border-top: 5px solid #ddd;
    padding: 0 15px;
    box-sizing: border-box;
    > h2 {
      line-height: 50px;
      text-align: center;
    }
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 50/360 * 100vw;
          height: 50/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 13px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
    .more {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      margin: 20px auto;
      font-size: 13px;
    }
  }
}
</style>
