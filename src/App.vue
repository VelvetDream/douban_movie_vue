<template>
  <div id="app">
    <loginComponent />
    <registerComponent />
    <div class="header">
      <navComponent />
    </div>
    <div class="main">
      <div class="center">
        <div class="left" />
        <div class="content">
          <router-view />
        </div>
        <div class="right" />
      </div>
      <div class="footer" />
    </div>
  </div>
</template>

<script>
import loginComponent from "./components/Login";
import registerComponent from "./components/Register";
import navComponent from "./components/Nav";
export default {
  name: "App",
  components: {
    loginComponent,
    registerComponent,
    navComponent
  },
  provide() {
    return {
      // reject引入执行,重载当前路由
      reload: this.reload
    };
  },
  data() {
    return {
      // 当前路由是否显示
      isRouterAlive: true
    };
  },
  methods: {
    // 刷新当前路由
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
html,
body {
  margin: 0 0;
  padding: 0 0;
  width: 100%;
  height: 100%;
  /*  */
  min-height: 1000px;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* app 上 下 */
.header {
  flex: 0 0 80px;
  background: #f39322;
  display: flex;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
/* main 上 下 */
.center {
  flex: 1;
  background: #bce5e5;
  display: flex;
}
.footer {
  flex: 0 0 100px;
  background: #c7262f;
  display: flex;
}
/* center 左 中 右 */
.left {
  flex: 0 0 160px;
  background: #02a899;
}
.content {
  flex: 1;
  background: #fee064;
  display: flex;
}
.right {
  flex: 0 0 160px;
  background: #02a899;
}
</style>
