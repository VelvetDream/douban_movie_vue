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
		movieLinesShort: [
			'May the Force be with you',
			'Stupid is as stupid does',
			'对不起，我是警察',
			'All is well',
			'You got your towl?',
			'大哥大嫂过年好',
			'安红，饿想你!',
			'大哥，你是了解我的',
			'他好像条狗啊',
			'我养你啊',
			'常威，你还说你不会武功!',
			'你怎么了小强？',
			'我读书少，你不要骗我',
			'不要误会，我不是针对你',
			'你这瓜保熟吗？',
			'你抓周树人和我鲁迅有什么关系',
			'吔屎啦，梁非凡',
			'我要打十个！',
			'你知道什么是铛铛铛铛吗?',
			'这种要求我从来没有见过',
			'不上班行不行啊？',
			'我很孤独，英文怎么讲？',
			'我全都要',
		],
		movieLinesLong: [
			'每个人都有一个习惯，我的习惯是在这里等阿may下班',
			'人和妖精都是妈生的，人是人他妈生的，妖是妖它妈生的',
			'就算是一条内裤，一张卫生纸，都有它本身的用处',
			'长夜漫漫，无心睡眠，我以为只有我睡不着觉，没想到晶晶姑娘你也一样',
			'人类可以搭乘太空船到月球，但却没办法看穿每个人心里的宇宙',
			'我就是美貌与智慧并重，英雄与侠义的化身———唐伯虎！',
			'我对你的敬仰有如滔滔江水，连绵不绝，又如黄河泛滥，一发不可收拾',
			"如果你一定要叫我跑龙套的，可不可以不要加一个'死'字在前面",
			'昨晚你睡觉的时候喊白晶晶98次，喊紫霞784次，这个人一定上辈子欠了你很多钱',
			'表面上看这是一个吹风机，实际上它是一个刮胡刀',
			'做人如果没有梦想，那和咸鱼有什么区别',
			"Life was like a box of chocolates, you never know what you're going to get",
			'Do not go gentle into that good night',


		],
	},
	getters,
	mutations,
	actions
})