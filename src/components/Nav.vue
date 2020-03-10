<template>
  <div id="nav-component">
    <div class="nav-left" />
    <div class="bar">
      <div class="bar-left" />
      <el-image class="logo" src="/image/logo.png" />
      <div class="bar-center">
        <el-autocomplete
          :fetch-suggestions="searchTipsAsync"
          @select="handSelect"
          class="search-tips"
          placeholder="请输入电影名、影人名"
          v-model="keyword"
        >
          <el-select></el-select>
          <template slot-scope="{ item }">
            <div>
              <img :src="item.base.urlPoster" />
              <span>{{ item.base.id }}</span>
              <span>{{ item.base.nameZh }}</span>
            </div>
          </template>
        </el-autocomplete>
        <div class="router">
          <el-link
            :href="item.url"
            :key="index"
            :underline="false"
            class="nav-item"
            target="_blank"
            type="primary"
            v-for="(item, index) in navItems"
          >{{item.name}}</el-link>
          <el-link
            :href="'/people/'+personalCenter"
            :underline="false"
            class="nav-item"
            target="_blank"
            type="primary"
            v-if="this.userInfo"
          >个人中心</el-link>
          <el-link
            :underline="false"
            @click="login"
            class="nav-item"
            target="_blank"
            type="primary"
            v-if="!this.userInfo"
          >登录/注册</el-link>
        </div>
      </div>
      <div class="bar-right" />
    </div>
    <div class="github"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'nav-component',
  data() {
    return {
      offset: 0,
      limit: 10,
      // 搜索框关键字
      keyword: '',
      // 搜索提示列表
      tips: [],
      // 导航栏
      navItems: [
        {
          name: '首页',
          url: '/'
        },
        {
          name: '排行榜',
          url: '/chart'
        },
        {
          name: '分类',
          url: '/tag'
        },
        {
          name: '网易云音乐',
          url: '/netease'
        },
        {
          name: '场景',
          url: '/scene'
        }
      ]
    }
  },
  methods: {
    // 异步搜索提示
    searchTipsAsync(keyword, callback) {
      if (keyword.trim() !== '') {
        this.$api.search
          .doubanTips({
            keyword: keyword,
            offset: this.offset,
            limit: this.limit
          })
          .then(res => {
            callback(res.movieList)
          })
      }
    },
    handSelect(item) {
      console.log(item)
    },
    login() {
      this.updatePopups({ key: 'isLogining', value: true })
    },
    ...mapActions(['update', 'updatePopups'])
  },
  computed: {
    // 个人中心
    personalCenter: function() {
      if (this.userInfo) {
        return this.userInfo.userId
      } else {
        return '登录/注册'
      }
    },
    ...mapState({
      userInfo: state => state.userInfo
    })
  }
}
</script>
<style>
#nav-component {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
/* nav-component 左 中 右 */
.nav-left {
  flex: 0 0 80px;
  background-color: mediumspringgreen;
}
.bar {
  flex: 1;
  background-color: goldenrod;
  flex-direction: row;
  display: flex;
  margin-top: 8px;
}
.github {
  flex: 0 0 80px;
  background-color: mediumspringgreen;
}
/* bar 左 中 右 */
.bar-left {
  flex: 0 0 80px;
  background-color: darkgoldenrod;
}
.logo {
  flex: 0 0 300px;
  margin: 10px 10px 10px 10px;
}
.bar-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: gainsboro;
  align-items: center;
  justify-content: center;
}
.bar-right {
  flex: 0 0 80px;
  background-color: darkgoldenrod;
}
/* bar-center 上 下 */
.search-tips {
  flex: 1;
  width: 100%;
  margin: 10px 0 0 0;
}
.router {
  flex: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* search-tips 排列 */

/* router 排列 */
.nav-item {
  flex: auto;
}
</style>
