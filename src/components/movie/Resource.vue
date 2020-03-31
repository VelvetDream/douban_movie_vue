<template>
	<div id="movie-resource-component" v-show="resourceList && resourceList.length!==0">
		<div :key="index" class="classify" v-for="(rList,index) in classify">
			<span :key="index2" :style="'background-color:'+resource.color" class="resource-item hvr-grow"
						v-for="(resource,index2) in rList">
						<span class="type" v-if="resource.typeResource!==''">{{resource.typeResource}}</span>
			<el-link :href="resource.urlResource"
							 class="content"
							 target="_blank">
				<span>{{resource.nameOrigin}}</span>
			</el-link>
			</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'movieResourceComponent',
		props: {movieId: Number},
		data() {
			return {
				resourceList: [],
				// 资源分类
				classify: {
					legalOnlineList: [],
					priacyOnlineList: [],
					piracyList: [],
					unknownList: []
				},
				// 资源背景透明度
				resourceTransparency: 0.8
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				if (this.movieId) {
					this.$api.movie.resourceBases({id: this.movieId}).then(res => {
						this.resourceList = res
					})
				}
			}
		},
		computed: {},
		watch: {
			// 资源分类
			resourceList() {
				if (this.resourceList && this.resourceList.length !== 0) {
					this.resourceList.forEach(resource => {
						// 资源网站颜色分类
						switch (resource.idWebsiteResource) {
							// 爱奇艺
							case 2:
								resource['color'] = 'rgba(0, 190, 6, ' + this.resourceTransparency + ')'
								break
							// 腾讯视频
							case 3:
								resource['color'] = 'rgba(255, 121, 4, ' + this.resourceTransparency + ')'
								break
							// 哔哩哔哩
							case 4:
								resource['color'] = 'rgba(251, 114, 153, ' + this.resourceTransparency + ')'
								break
							// 搜狐视频
							case 5:
								resource['color'] = 'rgba(215, 14, 25, ' + this.resourceTransparency + ')'
								break
							// 优酷视频
							case 6:
								resource['color'] = 'rgba(255, 48, 102, ' + this.resourceTransparency + ')'
								break
							// 1905电影网
							case 7:
								resource['color'] = 'rgba(19, 136, 194, ' + this.resourceTransparency + ')'
								break
							// 芒果TV
							case 8:
								resource['color'] = 'rgba(243, 123, 37, ' + this.resourceTransparency + ')'
								break
							// 电影天堂
							case 101:
								resource['color'] = 'rgba(0, 135, 232, ' + this.resourceTransparency + ')'
								break
							// LOL电影天堂
							case 102:
								resource['color'] = 'rgba(240, 36, 50, ' + this.resourceTransparency + ')'
								break
							// BT电影天堂
							case 103:
								resource['color'] = 'rgba(17, 122, 243, ' + this.resourceTransparency + ')'
								break
							// xl720
							case 104:
								resource['color'] = 'rgba(37, 141, 205, ' + this.resourceTransparency + ')'
								break
							// 6v电影网
							case 105:
								resource['color'] = 'rgba(44, 142, 59, ' + this.resourceTransparency + ')'
								break
							// 狗带TV
							case 106:
								resource['color'] = 'rgba(27, 111, 47, ' + this.resourceTransparency + ')'
								break
							// 在线之家
							case 107:
								resource['color'] = 'rgba(244, 153, 3, ' + this.resourceTransparency + ')'
								break
							// 比特大雄
							case 108:
								resource['color'] = 'rgba(244, 237, 37, ' + this.resourceTransparency + ')'
								break
							// 未知
							default:
								resource['color'] = 'rgba(255, 255, 255, ' + this.resourceTransparency + ')'
								break
						}
						// 资源类型分类
						if (resource.idTypeResource === 0 || resource.idTypeResource === 100) {
							this.classify.unknownList.push(resource)
						} else if (resource.idTypeResource === 101) {
							this.classify.priacyOnlineList.push(resource)
						} else if (resource.idTypeResource > 0 && resource.idTypeResource < 100) {
							this.classify.legalOnlineList.push(resource)
						} else if (resource.idTypeResource > 100) {
							this.classify.piracyList.push(resource)
						}
					})
				}
			},
		}
	}
</script>
<style>
	#movie-resource-component {
		width: 100%;
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	#movie-resource-component .classify {
		width: 100%;
		flex: 0 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
	}

	#movie-resource-component .classify .resource-item {
		margin-right: 5px;
		margin-bottom: 5px;
		border-radius: 6px;
	}

	.resource-item .type {
		background-color: rgba(33, 191, 115, 1);
		border-radius: 6px;
		padding-left: 2px;
		padding-right: 2px;
		font-weight: 500;
		font-size: 16px;
	}

	.resource-item .content {
		padding-left: 3px;
		padding-right: 3px;
		font-size: 14px;
		font-weight: 500;
		color: #000;
	}

	/*其他*/
	.content.el-link.el-link--default:hover {
		color: rgba(255, 255, 255, 1);
	}

	.content.el-link.is-underline:hover:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		height: 0;
		bottom: 0;
		border-bottom: 0 solid white;
	}

	/* Grow */
	.hvr-grow {
		display: inline-block;
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transition-property: transform;
		transition-property: transform;
	}

	.hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
		z-index: 3;
	}
</style>
