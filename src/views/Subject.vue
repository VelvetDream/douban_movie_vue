<template>
	<div :element-loading-text="randomMovieLineLong"
			 element-loading-background="rgba(0, 0, 0, 0)"
			 id="subject-view"
			 v-loading.fullscreen.lock="isLoading">
		<div :style="skeleton(isDetailsOk,300)" class="detail">
			<div class="left" v-show="isDetailsOk">
				<movie-base-component :bases="bases"/>
			</div>
			<div class="right" v-show="isDetailsOk">
				<movie-rate-component
					:award-list="movieDetails && movieDetails.douban && movieDetails.douban.awardList.length!==0?movieDetails.douban.awardList:[]"
					:rate-list="rateList"
					v-show="rateList.length!==0"/>
			</div>
		</div>
		<div :style="skeleton(isDetailsOk,150)"
				 class="celebrity-list">
			<movie-celebrity-component
				:celebrity-list="celebrityList"
				v-if="isDetailsOk"/>
		</div>
		<div :style="skeleton(isDetailsOk,300)"
				 class="douban-disscuss">
			<movie-disscuss-component
				:comment-list="movieDetails.douban.commentList"
				:review-list="movieDetails.douban.reviewList"
				v-if="movieDetails && movieDetails.douban && (movieDetails.douban.commentList.length!==0 || movieDetails.douban.reviewList.length!==0)"/>
		</div>
		<div :style="skeleton(isDetailsOk,100)"
				 class="zhihu-base">
			<movie-zhihu-component :update-is-nm-ok="updateIsNmOk"
														 :zhihu-bases="zhihuBases"
														 class="animated zoomIn"
														 v-if="zhihuBases && zhihuBases.questionList && zhihuBases.questionList.length!==0"/>
		</div>
		<vue-lazy-component>
			<div :element-loading-text="randomMovieLineShort()"
					 :style="skeleton(isResourceOk,300)"
					 class="resource-list"
					 element-loading-background="rgba(0, 0, 0, 0)"
					 v-if="!isResourceNone"
					 v-loading="!isResourceOk">
				<movie-resource-component :movie-id="parseInt(movieId)"
																	@updateIsResourceNone="updateIsResourceNone"
																	@updateIsResourceOk="updateIsResourceOk"
																	class="animated zoomIn"
																	v-if="movieId"/>
			</div>
		</vue-lazy-component>
		<vue-lazy-component>
			<div :element-loading-text="randomMovieLineShort()"
					 :style="skeleton(isSceneOk,300)"
					 class="scene-base"
					 element-loading-background="rgba(0, 0, 0, 0)"
					 v-if="!isSceneNone"
					 v-loading="!isSceneOk">
				<movie-scene-component :movie-id="parseInt(movieId)"
															 @updateIsSceneNone="updateIsSceneNone"
															 @updateIsSceneOk="updateIsSceneOk"
															 class="animated zoomIn"
															 v-if="movieId"/>
			</div>
		</vue-lazy-component>
		<vue-lazy-component>
			<div :style="skeleton(isNmOk,830)"
					 class="netease-music">
				<movie-music-component :keyword="movieDetails.douban.base.nameZh"
															 @updateIsNmOk="updateIsNmOk"
															 v-if="movieDetails"/>
			</div>
		</vue-lazy-component>
	</div>
</template>
<script>
	import movieBaseComponent from '../components/movie/Base'
	import movieRateComponent from '../components/movie/Rate'
	import movieCelebrityComponent from '../components/movie/Celebrity'
	import movieMusicComponent from '../components/movie/Music'
	import movieResourceComponent from '../components/movie/Resource'
	import movieZhihuComponent from '../components/movie/Zhihu'
	import movieDisscussComponent from '../components/movie/Disscuss'
	import movieSceneComponent from '../components/movie/Scene'
	import domain from '../request/domain'
	import {mapActions, mapState} from 'vuex'
	import {component as vueLazyComponent} from '@xunlei/vue-lazy-component'

	export default {
		name: 'subject-view',
		components: {
			movieBaseComponent,
			movieRateComponent,
			movieCelebrityComponent,
			movieResourceComponent,
			movieMusicComponent,
			movieZhihuComponent,
			vueLazyComponent,
			movieDisscussComponent,
			movieSceneComponent
		},
		data() {
			return {
				// 子组件状态
				isDetailsOk: false,
				isZhihuOk: false,
				isResourceOk: false,
				isResourceNone: false,
				isNmOk: false,
				isSceneOk: false,
				isSceneNone: false,
				// 电影ID
				movieId: null,
				// 电影详情
				movieDetails: null,
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
					movieLinesShort: 'movieLinesShort',
					randomMovieLineLong: state => {
						return state.movieLinesLong[Math.floor(Math.random() * state.movieLinesLong.length)]
					}
				}
			)
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
						}, 3000)
					})
					this.$api.movie.zhihuBases({id: this.movieId}).then(res => {
						this.zhihuBases = res
						this.parseRate(this.zhihuBases.topic, 'zhihus')
						this.isZhihuOk = true
					}).catch(error => {
						this.isZhihuOk = true
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
			// 子组件骨架
			skeleton(isOk, minHeight) {
				return isOk ? 'border-bottom: 2px solid rgba(255, 255, 255, 0.2);' : 'min-height:' + minHeight + 'px;'
			},
			updateIsResourceOk(isResourceOk) {
				this.isResourceOk = isResourceOk
			},
			updateIsResourceNone(isResourceNone) {
				this.isResourceNone = isResourceNone
			},
			updateIsSceneOk(isSceneOk) {
				this.isSceneOk = isSceneOk
			},
			updateIsSceneNone(isSceneNone) {
				this.isSceneNone = isSceneNone
			},
			updateIsNmOk(isNmOk) {
				this.isNmOk = isNmOk
			},
			// 随机电影台词
			randomMovieLineShort() {
				return this.movieLinesShort[Math.floor(Math.random() * this.movieLinesShort.length)]
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
		min-height: 500px;
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

	#subject-view .douban-disscuss {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	#subject-view .zhihu-base {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 10px;
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}

	#subject-view .resource-list {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		padding-top: 10px;
		padding-bottom: 5px;
	}

	#subject-view .scene-base {
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-bottom: 10px;
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

	/*其他*/
	.el-loading-mask.is-fullscreen .el-loading-spinner .circular {
		height: 100px;
		width: 100px;
	}

	.el-loading-spinner .path {
		stroke-width: 3;
		stroke: #054ebd;
	}

	.is-fullscreen .el-loading-spinner .el-loading-text {
		color: #054ebd;
		margin: 10px auto;
		font-size: 18px;
		font-weight: 500;
		width: max-content;
		background-color: rgba(255, 255, 255, 0.4);
		border-radius: 8px;
		padding: 5px 10px;
	}
</style>
