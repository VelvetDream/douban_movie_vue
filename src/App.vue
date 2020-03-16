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
      <div class="center">
        <div class="content">
          <router-view />
        </div>
      </div>
      <div class="bg-enjoy" />
      <div class="footer" />
    </div>
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
html {
  margin: 0 0;
  padding: 0 0;
  overflow: -moz-hidden-unscrollable;
  width: 100%;
  height: 100%;
}
body {
  margin: 0 0;
  padding: 0 0;
  -ms-overflow-style: none;
  width: 100%;
  height: 100%;
  width: calc(100vw + 18px);
  overflow: auto;
}
body::-webkit-scrollbar {
  display: none;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* app 上 下 */
.header {
  flex: 0 0 110px;
  display: flex;
  border-radius: 8px;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
/* main 上 中 下 */
.center {
  flex: 1;
  display: flex;
}
.bg-enjoy {
  flex: 0 0 800px;
  display: flex;
}
.footer {
  flex: 0 0 12%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
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
/* center 左 中 右 */
.content {
  flex: 1;
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
