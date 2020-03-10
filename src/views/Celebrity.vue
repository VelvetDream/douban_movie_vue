<template>
  <div celebrityId="celebrity-view">
    {{this.$route.params.celebrityId}}
  </div>
</template>
<script>
export default {
  name: 'celebrity-view',
  data () {
    return {
      // 影人ID
      celebrityId: null,
      // 影人详情
      celebrityDetails: null,
      // 场景基础
      sceneBases: null,
      // 豆瓣电影API详情
      doubanApiDetails: null
    }
  },
  created () {
  },
  methods: {
    // 数据初始化
    init () {
      this.celebrityId = this.$route.params.celebrityId
      if (this.celebrityId) {
        this.$api.celebrity.celebrityDetails({ id: this.celebrityId }).then(res => {
          this.celebrityDetails = res
        })
        // this.$api.celebrity.sceneBases({ id: this.celebrityId }).then(res => {
        //   this.sceneBases = res
        // })
        this.$api.celebrity.doubanApiDetails(this.celebrityId).then(res => {
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
