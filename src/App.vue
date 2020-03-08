<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
    <loginComponent/>
    <registerComponent/>
  </div>
</template>

<script>
import loginComponent from './components/Login'
import registerComponent from './components/Register'
export default {
  name: 'App',
  components: {
    loginComponent, registerComponent
  },
  provide () {
    return {
      // reject引入执行,重载当前路由
      reload: this.reload
    }
  },
  data () {
    return {
      // 当前路由是否显示
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新当前路由
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>

</style>
