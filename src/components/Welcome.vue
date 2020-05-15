<template>
	<div id="welcome-component">
			<span class="welcome-title">
				使用方式
			</span>
		<span class="welcome-title way">
				★ 豆瓣电影<span style="color: red">douban</span>后加一个<span style="color: red;font-weight: 800">S</span>
		</span>
		<span class="welcome-title arrow">
				☟
		</span>
		<div class="welcome-content example">
			<el-link href="/subject/1291561/" target="_blank">https://movie.douban<span
				style="color:red;font-weight: 800;font-size: 20px">s</span>.com/subject/1291561/
			</el-link>
		</div>
		<span class="welcome-title way">
				★ 调用本项目API服务你的应用
		</span>
		<span class="welcome-title arrow">
				☟
		</span>
		<div class="welcome-content example">
			<el-link href="https://api.doubans.com" style="color:red;" target="_blank">API文档
			</el-link>
		</div>
		<div class="welcome-content">
			本站开源，如果你喜欢，欢迎来改进它～
		</div>
		<div class="welcome-github">
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
		margin-top: 40px;
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
		padding-bottom: 10px;
	}

	#welcome-component .way {
		font-size: 22px;
		padding-bottom: 0;
	}

	#welcome-component .arrow {
		padding-bottom: 0;
	}

	#welcome-component .welcome-content {
		padding-top: 5px;
		font-weight: 600;
	}

	#welcome-component .welcome-content.example {
		font-size: 18px;
		font-weight: 600;
		padding-top: 0;
		padding-bottom: 10px;
	}


	#welcome-component .welcome-github {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-top: 10px;
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
