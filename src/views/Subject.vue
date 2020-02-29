<template>
  <div id="subject">
    {{this.$route.params.id}}
    正在开发中...敬请期待...
  </div>
</template>
<script>
export default {
  name: 'subject',
  data () {
    return {
      id: null,
      details: null,
      doubanSubject: null
    }
  },
  created () {
  },
  methods: {
    // 数据初始化
    init () {
      this.id = this.$route.params.id
      if (this.id) {
        // this.details = this.$api.movie.details({ id: this.id })
        // this.doubanSubject = this.$api.movie.doubanSubject(this.id)
      }
    }
  },
  computed: {
  },
  filters: {},
  mounted () {
    this.init()
  }
}
</script>
<style></style>
