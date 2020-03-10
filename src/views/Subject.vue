<template>
  <div movieId="subject-view">
    {{this.$route.params.movieId}}
  </div>
</template>
<script>
export default {
  name: 'subject-view',
  data () {
    return {
      // 电影ID
      movieId: null,
      // 电影详情
      movieDetails: null,
      // 场景基础
      sceneBases: null,
      // 知乎基础
      zhihuBases: null,
      // 资源基础
      resourceBases: null,
      // 豆瓣电影API详情
      doubanApiDetails: null
    }
  },
  created () {
  },
  methods: {
    // 数据初始化
    init () {
      this.movieId = this.$route.params.movieId
      if (this.movieId) {
        this.$api.subject.movieDetails({ id: this.movieId }).then(res => {
          this.movieDetails = res
        })
        // this.$api.subject.sceneBases({ id: this.movieId }).then(res => {
        this.$api.subject.sceneBases({ id: 26728669 }).then(res => {
          this.sceneBases = res
        })
        this.$api.subject.zhihuBases({ id: this.movieId }).then(res => {
          this.zhihuBases = res
        })
        this.$api.subject.resourceBases({ id: this.movieId }).then(res => {
          this.resourceBases = res
        })
        this.$api.subject.doubanApiDetails(this.movieId).then(res => {
          this.doubanApiDetails = res
        })
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
