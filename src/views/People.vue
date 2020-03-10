<template>
  <div id="people-view">
    用户页面
    {{userInfo}}
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'people-view',
  data () {
    return {
      userId: null,
      // 当前登录用户信息
      userInfo: null
    }
  },
  methods: {
  },
  computed: {
    ...mapState({
      userId: state => state.userInfo.userId,
      userInfo: state => state.userInfo
    })
  }
}
</script>
<style></style>
