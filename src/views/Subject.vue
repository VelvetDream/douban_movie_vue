<template>
	<div :element-loading-text="randomMovieLine"
			 element-loading-background="rgba(0, 0, 0, 0)"
			 id="subject-view"
			 v-loading.fullscreen.lock="isLoading">
		<div :style="isDetailsOk?'border-bottom: 2px solid rgba(255, 255, 255, 0.2);':''" class="detail">
			<div class="left" v-show="isDetailsOk">
				<movie-base-component :bases="bases"/>
			</div>
			<div class="right" v-show="isDetailsOk">
				<movie-rate-component :rate-list="rateList" v-show="rateList.length!==0"/>
			</div>
		</div>
		<div :style="isDetailsOk?'border-bottom: 2px solid rgba(255, 255, 255, 0.2);':''" class="celebrity-list">
			<movie-celebrity-component :celebrity-list="celebrityList" v-show="isDetailsOk"/>
		</div>
		<div class="zhihu-base" v-if="zhihuBases && zhihuBases.questionList && zhihuBases.questionList.length!==0">
			<movie-zhihu-component :zhihu-bases="zhihuBases"/>
		</div>
		<div class="resource-list" v-if="movieId">
			<movie-resource-component :movie-id="parseInt(movieId)"/>
		</div>
		<div class="netease-music" v-if="movieDetails">
			<movie-music-component :keyword="movieDetails.douban.base.nameZh"/>
		</div>
	</div>
</template>
<script>
	import movieBaseComponent from '../components/movie/Base'
	import movieRateComponent from '../components/movie/Rate'
	import movieCelebrityComponent from '../components/movie/Celebrity'
	import movieMusicComponent from '../components/movie/Music'
	import movieResourceComponent from '../components/movie/Resource'
	import movieZhihuComponent from '../components/movie/Zhihu'
	import domain from '../request/domain'
	import {mapActions, mapState} from 'vuex'

	export default {
		name: 'subject-view',
		components: {
			movieBaseComponent,
			movieRateComponent,
			movieCelebrityComponent,
			movieResourceComponent,
			movieMusicComponent,
			movieZhihuComponent
		},
		data() {
			return {
				isDetailsOk: false,
				isZhihuOk: false,
				// 电影ID
				movieId: null,
				// 电影详情
				movieDetails: null,
				// 场景基础
				sceneBases: null,
				// 知乎基础
				zhihuBases: null,
				// 豆瓣电影API详情
				doubanApiDetails: null,
				// ---------
				// 组件prop数据
				bases: null,
				rateList: [],
				celebrityList: [],
			}
		},
		created() {
		},
		computed: {
			isLoading() {
				if (this.isDetailsOk && this.isZhihuOk) {
					// 模糊背景
					this.update({key: 'isBgClear', value: false})
					return false
				}
				return true
			},
			...mapState({
				// 随机电影台词
				randomMovieLine: state => {
					return state.movieLines[Math.floor(Math.random() * state.movieLines.length)]
				}
			})
		},
		methods: {
			// 数据初始化
			init() {
				this.movieId = this.$route.params.movieId
				if (this.movieId) {
					this.$api.movie.movieDetails({id: this.movieId}).then(res => {
						this.movieDetails = res
						this.parseDoubanMovieBases(this.movieDetails)
						this.parseDoubanCelebrityList(this.movieDetails)
						this.parseRate(this.movieDetails.douban.rate, 'douban')
						this.parseRate(this.movieDetails.imdb.rate, 'imdbs')
						// this.isDetailsOk = true
						setTimeout(() => {
							this.isDetailsOk = true
						}, 5000)
					})
					this.$api.movie.zhihuBases({id: this.movieId}).then(res => {
						this.zhihuBases = res
						this.parseRate(this.zhihuBases.topic, 'zhihus')
						this.isZhihuOk = true
					}).catch(error => {
						this.isZhihuOk = true
					})
					// this.$api.movie.sceneBases({ id: this.movieId }).then(res => {
					this.$api.scene.sceneBases({id: 26728669}).then(res => {
						this.sceneBases = res
					})
					// this.$api.movie.doubanApiDetails(this.movieId).then(res => {
					//   this.doubanApiDetails = res
					// })
				}
			},
			// 解析电影基础信息
			parseDoubanMovieBases(movieDetails) {
				this.bases = {
					douban: {
						base: movieDetails.douban.base,
						aliasList: movieDetails.douban.aliasList,
						typeList: movieDetails.douban.typeList,
						tagList: movieDetails.douban.tagList,
						celebrityList: movieDetails.douban.celebrityList
					},
					imdb: movieDetails.imdb
				}
			},
			// 解析豆瓣影人列表信息
			parseDoubanCelebrityList(movieDetails) {
				this.celebrityList = movieDetails.douban.celebrityList
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
								// color: rate.tomatoScore > 6 ? '#fa3008' : '#09c754',
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
								//             color:
								// rate.mtcScore >= 8
								//   ? '#6c3'
								//   : rate.mtcScore > 4
								//   ? '#fc3'
								//   : '#f00',
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
			},
			...mapActions(['update'])
		},
		filters: {},
		mounted() {
			this.init()
		}
	}
</script>
<style>
	#subject-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* subject */
	#subject-view .detail {
		flex: 0 0 300px;
		display: flex;
		flex-direction: row;
		padding-bottom: 10px;
	}

	#subject-view .celebrity-list {
		flex: 0 0 150px;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 12px;
	}

	#subject-view .resource-list {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 5px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .zhihu-base {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .netease-music {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
	}

	/* detail */
	#subject-view .detail .left {
		flex: 1 0 714px;
		padding-right: 10px;
		border-right: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .detail .right {
		flex: 0 0 300px;
		padding-left: 10px;
	}
</style>
