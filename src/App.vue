<template>
  <div id="app">
    <div id="bg-color" />
    <transition name="fade">
      <div id="bg" v-show="nowBgList.length!==0 && !changingBg">
        <img :src="nowBgList[nowBgId]" />
      </div>
    </transition>
    <loginComponent />
    <registerComponent />
    <div class="header">
      <navComponent />
    </div>
    <div class="main">
      <div class="center">
        <div class="content">
          <router-view />
        </div>
      </div>
      <div class="footer" />
    </div>
  </div>
</template>

<script>
import loginComponent from './components/Login'
import registerComponent from './components/Register'
import navComponent from './components/Nav'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    loginComponent,
    registerComponent,
    navComponent
  },
  provide() {
    return {
      // reject引入执行,重载当前路由
      reload: this.reload
    }
  },
  data() {
    return {
      // 当前路由是否显示
      isRouterAlive: true,
      // 当前背景图id
      nowBgId: 0,
      // 背景切换时间间隔 /s 第一次以后减去2s
      turnBgSecond: 8,
      changingBg: false
    }
  },
  methods: {
    // 刷新当前路由
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    // 轮流切换背景
    turnBg() {
      if (this.nowBgList.length !== 0) {
        this.changingBg = true
        setTimeout(() => {
          // nowId++
          this.nowBgId + 1 >= this.nowBgList.length
            ? (this.nowBgId = 0)
            : this.nowBgId++
          this.changingBg = false
        }, 1000)
      }
    },
    ...mapActions(['update'])
  },
  mounted() {
    // 更新defaultBgList
    let defaultBgList = [
      'https://img3.doubanio.com/view/photo/l/public/p1700166130.webp',
      'https://img3.doubanio.com/view/photo/l/public/p2562775911.webp',
      'https://img3.doubanio.com/view/photo/l/public/p2564789601.webp',
      'https://img9.doubanio.com/view/photo/l/public/p2563777035.webp'
    ]
    this.update({ key: 'defaultBgList', value: defaultBgList })
    setInterval(this.turnBg, 1000 * this.turnBgSecond)
  },
  computed: {
    ...mapState({
      // 当前页面背景列表
      nowBgList: state => {
        // 优先采用特定页面背景列表
        if (state.specialBgList.length !== 0) {
          return state.specialBgList
        } else {
          return state.defaultBgList
        }
      }
    })
  }
}
</script>

<style>
html,
body {
  margin: 0 0;
  padding: 0 0;
  width: 100%;
  height: 100%;
  min-height: 2000px;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* app 上 下 */
.header {
  flex: 0 0 100px;
  display: flex;
  border-radius: 8px;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
/* main 上 下 */
.center {
  flex: 1;
  display: flex;
}
.footer {
  flex: 0 0 15%;
  background: #d17eca;
  display: flex;
}
/* center 左 中 右 */
.content {
  flex: 1;
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
}
/* 背景图 */
#bg {
  position: absolute;
  z-index: -2;
}
#bg img {
  position: fixed;
  width: 100%;
  opacity: 1;
  object-fit: cover;
}
/* 淡入淡出 */

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
/* 最底层颜色 */
#bg-color {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  z-index: -3;
  object-fit: cover;
  background-color: lightblue;
}
</style>
