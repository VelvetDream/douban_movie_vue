<template>
  <div id="app">
    <backgroundComponent />
    <backTopComponent />
    <loginComponent />
    <registerComponent />
    <div class="header">
      <navComponent />
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="enjoy" />
    <div class="footer" />
  </div>
</template>

<script>
import loginComponent from './components/user/Login'
import registerComponent from './components/user/Register'
import navComponent from './components/Nav'
import backgroundComponent from './components/Background'
import backTopComponent from './components/BackTop'
export default {
  name: 'App',
  components: {
    loginComponent,
    registerComponent,
    navComponent,
    backgroundComponent,
    backTopComponent
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
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新当前路由
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  mounted() {},
  computed: {}
}
</script>

<style>
html,
body {
  margin: 0 0;
  padding: 0 0;
  width: 100%;
  height: 100%;
  /* min-height: 1000px; */
}
/* 页面布局--------------- */
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* app */
#app .header {
  flex: 0 0 120px;
  flex-grow: 0;
  display: flex;
}
#app .main {
  flex: 0 0 auto;
  width: 1024px;
  margin: auto;
}
#app .enjoy {
  flex: 0 0 500px;
}
#app .footer {
  flex: 0 0 120px;
  background-color: rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.01),
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.09),
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.21),
    rgba(255, 255, 255, 0.24),
    rgba(255, 255, 255, 0.27),
    rgba(255, 255, 255, 0.29),
    rgba(255, 255, 255, 0.3)
  );
}
/* 其他样式---------------- */
/* 隐藏滚轮 */
body::-webkit-scrollbar {
  display: none;
}
body {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}
</style>
