<template>
  <div movieId="view-subject">
    {{this.$route.params.movieId}}
    正在开发中...敬请期待...
  </div>
</template>
<script>
export default {
  name: 'view-subject',
  data () {
    return {
      movieId: null,
      movieDetails: null,
      sceneBases: null,
      zhihuBases: null,
      resourceBases: null,
      doubanApi: null
    }
  },
  created () {
  },
  methods: {
    // 数据初始化
    init () {
      this.movieId = this.$route.params.id
      if (this.movieId) {
        this.$api.movie.movieDetails({ id: this.movieId }).then(res => {
          this.movieDetails = res
        })
        this.$api.movie.sceneBases({ id: this.movieId }).then(res => {
          this.sceneBases = res
        })
        this.$api.movie.zhihuBases({ id: this.movieId }).then(res => {
          this.zhihuBases = res
        })
        this.$api.movie.resourceBases({ id: this.movieId }).then(res => {
          this.resourceBases = res
        })
        this.$api.movie.doubanApi(this.movieId).then(res => {
          this.doubanApi = res
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
