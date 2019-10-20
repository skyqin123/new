<template>
  <div class="index">
    <!--头部 -->
    <div class="header">
      <div class="logo iconfont iconnew logo"></div>
      <div class="search">
        <van-icon name="search" />&nbsp;
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="$router.push('/personal')">
        <van-icon name="user-o" />
      </div>
    </div>
    <!-- 新闻列表的展示 -->
    <!-- 无论是滑动好是点击都要让当前的栏目的索引发生改变 -->
    <van-tabs v-model="active" swipeable sticky>
      <!-- 生成栏目标签栏 -->
      <van-tab v-for="item in categoryList" :key="item.id" :title="item.name">
        <van-list :immediate-check="false" v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad" :offset="10">
          <!-- 下拉刷新 -->
          <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
            <articalblock v-for="(subitem, index) in item.articalList" :key="index" :post="subitem"></articalblock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/getCategoryList.js'
import { getArticalList } from '@/api/getArticalList.js'
import articalblock from '@/components/articalblock.vue'
export default {
  data () {
    return {
      // active 当前的栏目的标号（唯一值）
      active: localStorage.getItem('id') ? 1 : 0, // 如果用户登录了就显示关注了的页面
      categoryList: [] // 分类列表
    }
  },
  components: {
    articalblock
  },

  // 因为无论是点击还是滑动都或改变当前栏目的文章列表，所以只能使用监听来监听 active 值的改变 去实现
  // 因为计算属性要主动调用，所以要用watch
  watch: {
    active (newv, oldv) {
      // console.log('------------------')
      // console.log(newv)
      // console.log(oldv)

      // 得到当前的active后就去获取当前栏目的文章列表

      // 进行栏目切换的时候，只需要切换后的栏目的文章列表进行加载，原来的栏目文章并不需要加载
      if (this.categoryList[newv].articalList.length === 0) {
        this.init()
      }
    }
  },

  methods: {
    onRefresh () {
      console.log('下拉刷新')
      this.categoryList[this.active].articalList.length = 0
      this.categoryList[this.active].pageIndex = 1
      this.init()
    },

    // 当组件滚动到底部时，会触发load事件，会加载更多,如果此时已经没有数据加载了，就把loading设置为false，finished为true
    onLoad () {
      console.log('滑动到底部')
      this.categoryList[this.active].pageIndex++
      this.init()
    },
    init () {
      console.log('调用api接口获取当前栏目的文章列表')
      getArticalList({
        category: this.categoryList[this.active].id,
        pageIndex: this.categoryList[this.active].pageIndex,
        pageSize: this.categoryList[this.active].pageSize
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          // 把当前栏目的文章列表存储起来
          this.categoryList[this.active].articalList.push(...res.data.data)
          this.categoryList[this.active].isLoading = false
          this.categoryList[this.active].loading = false
          // 判断当前栏目的文章列表里的文章数量，如果少于规定的单页文章数量，则不用继续加载了
          console.log(res.data.data.length, this.categoryList[this.active].pageSize)
          if (res.data.data.length < this.categoryList[this.active].pageSize) {
            console.log(123)
            this.categoryList[this.active].finished = true
          }
        }
        // console.log(this.categoryList[this.active].articalList) // 当前栏目的文章列表
        // console.log(this.categoryList)
      })
    }
  },

  // 栏目列表获取完毕后就要获取栏目列表里的文章文章列表，引用vant框架进行页面的渲染

  // 1.新闻首页的组件刚挂载就要向服务器发送获取栏目列表的数据,mounted(){}--->是钩子函数
  mounted () {
    console.log(this.active)
    getCategoryList().then(res => {
      // console.log(res)
      // console.log(res.data.data) // res.data.data 就是栏目列表数据（是一个数组）
      // 把栏目列表的数据保存在一个数组里面： categoryList  为了以后的业务需要，还有在这个数组了添加一些数据
      if (res.status === 200) {
        // 在 categoryList里面存放 articalList 文章列表和一些其他的参数
        this.categoryList = res.data.data.map(value => {
          return {
            ...value,
            articalList: [], // 当前显示的栏目的文章列表
            pageIndex: 1, // 当前栏目的当前页码
            pageSize: 5, // 当前栏目的每页所显示的文章数量
            isLoading: false, // 下拉刷新的标识
            loading: false, // 当前栏目上拉标识
            finished: false // 当前栏目上拉加载数据完毕标识
          }
        })
        // console.log('-----------------')
        console.log(this.categoryList)
        // 调用函数 init() 获取当前栏目的文章列表
        this.init()
      }
    })
  }
}
</script>

<style lang="less" scoped>
.index {
  .header {
    width: 100%;
    height: 54/360 * 100vw;
    background-color: #e92322;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    color: #fff;
    .logo {
      width: 54/360 * 100vw;
      height: 54/360 * 100vw;
      font-size: 50px;
    }
    .search {
      flex: 1;
      height: 34/360 * 100vw;
      border-radius: 17px;
      background-color: rgba(255, 255, 255, 0.3);
      line-height: 34/360 * 100vw;
      text-align: center;
      color: #fff;
    }
    .user {
      width: 54/360 * 100vw;
      font-size: 26px;
      text-align: center;
    }
  }
}
</style>
