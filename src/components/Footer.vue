<template>
	<div @mouseenter="isShowTool=true" @mouseleave="isShowTool=false" id="footer-component">
		<div class="footer-left"/>
		<div class="footer-classic">
			<span class="classic-content">

			</span>
			<span class="classic-author">

			</span>
		</div>
		<div class="footer-tool" v-show="isShowTool">
			<span class="classic-add">
				<el-link>
					添加
				</el-link>
			</span>
			<span class="classic-fix">
				<el-link>
					纠错
				</el-link>
			</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'footer-component',
		data() {
			return {
				isShowTool: false,
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
	#footer-component {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.01),
			rgba(255, 255, 255, 0.05),
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0.16),
			rgba(255, 255, 255, 0.23),
			rgba(255, 255, 255, 0.31),
			rgba(255, 255, 255, 0.4),
			rgba(255, 255, 255, 0.5)
		);
	}

	#footer-component .footer-left {
		flex: 0 0 200px;
	}

	#footer-component .footer-classic {
		flex: 1;

	}

	#footer-component .footer-tool {
		flex: 0 0 200px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#footer-component .footer-tool .classic-add {
		padding-right: 30px;
	}

	#footer-component .footer-tool .classic-fix {
		padding-right: 30px;

	}

	#footer-component .el-link.el-link--default {
		color: #000;
	}

	#footer-component .el-link.el-link--default:hover {
		color: #f31919;
	}
</style>
