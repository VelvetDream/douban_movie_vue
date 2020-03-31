import Vue from 'vue'
import Vuex from 'vuex'

import actions from './action'
import getters from './getter'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 当前登录用户信息
		userInfo: null,
		// 弹窗状态
		popups: {
			// 是否登录
			isLogining: false,
			// 是否注册
			isRegistering: false
		},
		// 默认页面背景图片列表
		defaultBgList: [],
		// 特定页面背景图片列表
		specialBgList: [],
		// 背景图是否清晰
		isBgClear: true,
		// 电影台词列表
		movieLines: [
			'每个人都有一个习惯, 我的习惯是在这里等阿may下班',
			'May the Force be with you',
			'Stupid is as stupid does',
			'It was Beauty killed the Beast',
			'对不起, 我是警察',
			'All is well',
			'You got your towl ?',
			'大哥大嫂过年好',
			'安红，饿想你!',
			'大哥, 你是了解我的',
			'他好像条狗啊',
			'我养你啊',
			'常威, 还说你不会武功!',
			'小强,你怎么了小强',
			'我读书少，你不要骗我',
			'我不是针对谁',
			'你这瓜保熟吗?',
			'你抓周树人和我鲁迅有什么关系',
			'吔屎啦，梁非凡',
			'我要打十个!',
			'人和妖精都是妈生的',
			'你知道什么是铛铛铛铛吗?'
		]
	},
	getters,
	mutations,
	actions
})