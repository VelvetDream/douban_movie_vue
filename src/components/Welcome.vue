<template>
	<div id="welcome-component">
			<span class="welcome-title">
				此页面正在开发中...
			</span>
		<div class="welcome-content">
			本站开源，如果你喜欢本站，欢迎来改进它～
		</div>
		<div class="welcome-github">
			<div class="github-tips">
				Github仓库地址
			</div>
			<div class="github-plus">
				<span>
				本站后端(Spring)
				</span>
				<el-link :href="githubPlus" target="_blank">
					{{githubPlus}}
				</el-link>
			</div>
			<div class="github-vue">
				<span>
				本站前端(Vue)
				</span>
				<el-link :href="githubVue" target="_blank">
					{{githubVue}}
				</el-link>
			</div>
		</div>
	</div>
</template>
<script>
	import domain from "../request/domain";

	export default {
		name: 'welcome-component',
		data() {
			return {
				githubVue: domain.github + '/humingk/douban_movie_vue',
				githubPlus: domain.github + '/humingk/douban_movie_plus',
			}
		},
		computed: {},
		watch: {},
		mounted() {
		},
		methods: {},
	}
</script>
<style>
	#welcome-component {
		margin-top: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 10px;
		padding: 10px;
		font-size: 18px;
		font-weight: 500;
	}

	#welcome-component .welcome-title {
		font-size: 30px;
		font-weight: 600;
	}

	#welcome-component .welcome-content {
		padding-top: 30px;
	}

	#welcome-component .welcome-github {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-top: 30px;
	}

	.welcome-github .github-tips {
		align-self: center;
		padding-bottom: 10px;
	}

	.welcome-github .github-plus span {
		padding-right: 10px;
	}

	.welcome-github .github-vue span {
		padding-right: 35px;
	}

	#welcome-component .el-link.el-link--default {
		color: #000;
	}

	#welcome-component .el-link.el-link--default:hover {
		color: #f31919;
	}
</style>
