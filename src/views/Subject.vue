<template>
  <div id="subject-view">
    <div class="subject-left">
      <doubanBaseComponent :bases="this.doubanBases" />
    </div>
    <div class="subject-right">
      <rateComponent :rateList="this.rateList" v-if="this.rateList.length!==0" />
    </div>
  </div>
</template>
<script>
import doubanBaseComponent from '../components/movie/DoubanBase'
import rateComponent from '../components/movie/Rate'
import domain from '../request/domain'
export default {
  name: 'subject-view',
  components: {
    doubanBaseComponent,
    rateComponent
  },
  data() {
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
      doubanApiDetails: null,
      // ---------
      // 组件prop数据
      doubanBases: null,
      rateList: []
    }
  },
  created() {},
  methods: {
    // 数据初始化
    init() {
      this.movieId = this.$route.params.movieId
      if (this.movieId) {
        this.$api.subject.movieDetails({ id: this.movieId }).then(res => {
          this.movieDetails = res
          this.parseDoubanMovieBases(this.movieDetails.douban)
          this.parseRate(this.movieDetails.douban.rate, 'douban')
          this.parseRate(this.movieDetails.imdb.rate, 'imdbs')
        })
        // this.$api.subject.sceneBases({ id: this.movieId }).then(res => {
        this.$api.subject.sceneBases({ id: 26728669 }).then(res => {
          this.sceneBases = res
        })
        this.$api.subject.zhihuBases({ id: this.movieId }).then(res => {
          this.zhihuBases = res
          this.parseRate(this.zhihuBases.topic, 'zhihus')
        })
        this.$api.subject.resourceBases({ id: this.movieId }).then(res => {
          this.resourceBases = res
        })
        // this.$api.subject.doubanApiDetails(this.movieId).then(res => {
        //   this.doubanApiDetails = res
        // })
      }
    },
    // 解析豆瓣电影基础信息
    parseDoubanMovieBases(bases) {
      this.doubanBases = {
        base: bases.base,
        aliasList: bases.aliasList,
        typeList: bases.typeList,
        tagList: bases.tagList,
        celebrityList: bases.celebrityList
      }
    },
    // 解析评分
    parseRate(rate, type) {
      if (rate) {
        switch (type) {
          case 'douban':
            if (rate.score !== 0) {
              this.rateList.push({
                type: '豆瓣',
                score: rate.score,
                vote: rate.vote,
                // color: '#ffac2d',
                color: '#d68509',
                url:
                  domain.doubanMovie +
                  '/subject/' +
                  this.movieId +
                  '/collections',
                des: `国内目前最大的影迷聚集地`
              })
            }
            break
          case 'imdbs':
            if (rate.imdbScore !== 0) {
              this.rateList.push({
                type: 'IMDB',
                score: rate.imdbScore,
                vote: rate.imdbVote,
                color: '#00a2e8',
                url: domain.imdb + '/title/' + this.movieDetails.imdb.id + '/',
                des: `更全面的互联网电影数据库`
              })
            }
            if (rate.tomatoScore !== 0) {
              // this.rateList.push({
              //   type: '烂番茄',
              //   score: rate.tomatoScore,
              //   vote: 0,
              //   color: '#fa3008',
              //   url:
              //     domain.tomato +
              //     '/m/' +
              //     this.movieDetails.imdb.base.nameEn.replace(/\s/, '_'),
              // des: `烂番茄的新鲜度来源于认证影评人的评价,若好评超过60%,则认为新鲜,否则为腐烂`
              // })
            }
            this.rateList.push({
              type: '烂番茄',
              score: 9.7,
              vote: 0,
              color: '#fa3008',
              url:
                domain.tomato +
                '/m/' +
                this.movieDetails.imdb.base.nameEn.replace(/\s/, '_'),
              des: `新鲜度来自认证影评人评价`
            })
            if (rate.mtcScore !== 0) {
              // this.rateList.push({
              //   type: 'MTC',
              //   score: rate.mtcScore,
              //   vote: 0,
              //   color: '#22b14c',
              //   url:
              //     domain.tomato +
              //     '/movie/' +
              //     this.movieDetails.imdb.base.nameEn.replace(/\s/, '-'),
              // des:`Metacritic以专业影评人的评价为主`
              // })
            }
            this.rateList.push({
              type: 'MTC',
              score: 9.6,
              vote: 0,
              color: '#6c3',
              url:
                domain.tomato +
                '/movie/' +
                this.movieDetails.imdb.base.nameEn.replace(/\s/, '-'),
              des: `主要收集专业影评人的评价`
            })
            break
          case 'zhihus':
            // 解析评分
            if (rate.zhihuScore !== 0) {
              this.rateList.push({
                type: '知乎',
                score: rate.zhihuScore,
                vote: rate.zhihuVote,
                color: '#0084ff',
                url: domain.zhihu + '/topic/' + rate.id,
                des: `知乎电影话题的知友推荐度`
              })
            }
            if (rate.maoyanScore !== 0) {
              this.rateList.push({
                type: '猫眼',
                score: rate.maoyanScore,
                vote: 0,
                color: '#e53329',
                url: domain.maoyan + '/query?kw=' + rate.nameZh,
                des: `普通观众买票观影后的评价`
              })
            }
            break
          default:
            break
        }
      }
    }
  },
  computed: {},
  filters: {},
  mounted() {
    this.init()
  }
}
</script>
<style>
#subject-view {
  display: flex;
  width: 100%;
  height: 100%;
}
/* subject 左 右 */
.subject-left {
  display: flex;
  flex: 0 0 70%;
}
.subject-right {
  display: flex;
  flex: 0 0 30%;
}
</style>
