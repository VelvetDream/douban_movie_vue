<template>
	<div id="movie-music-component">
		<div class="music-item">
			<div class="comment">
			</div>
			<div class="player">
				<!--				<aPlayer autoplay/>-->
			</div>
		</div>
	</div>
</template>
<script>
	import aPlayer from 'vue-aplayer'
	import domain from "../../request/domain";

	aPlayer.disableVersionBadge = true

	export default {
		name: 'movie-music-component',
		components: {aPlayer},
		props: {
			keyword: String
		},
		data() {
			return {
				// 网易云音乐 限制数
				nmSongsLimit: 5,
				nmPlaylistLimit: 1,
				nmAlbumLimit: 1,
				nmPlaylistSongsLimit: 5,
				nmAlbumSongsLimit: 5,
				nmHotCommentLimit: 20,
				// 网易云音乐 搜索结果
				nmResult: {
					// 相关歌曲 'id':{details:{},hotcomments:[]}
					song: {},
					// 相关专辑 同上
					album: {},
					// 相关歌单 同上
					playlist: {},
				},
				// 当前播放歌曲ID,默认第一个
				playerSongIdNow: null,
			}
		},
		mounted() {
			this.initNeteaseMusic(this.keyword)
		},
		methods: {
			// 初始化数据
			initNeteaseMusic(keyword) {
				if (keyword !== '') {
					// 搜索请求参数列表
					let paramsList = [
						{
							keywords: keyword,
							offset: 0,
							limit: this.nmSongsLimit,
							type: 1
						},
						{
							keywords: keyword,
							offset: 0,
							limit: this.nmAlbumLimit,
							type: 10
						},
						{
							keywords: keyword,
							offset: 0,
							limit: this.nmPlaylistLimit,
							type: 1000
						}
					]
					paramsList.forEach(params => {
						this.$api.music.neteaseMusicTips(params).then(res => {
							// 获取热门评论的请求参数
							let commentParams = {
								id: null,
								type: null,
								offset: 0,
								limit: this.nmHotCommentLimit
							}
							switch (params.type) {
								case 1:
									if (res.result.songCount !== 0 && res.result.songs.length !== 0) {
										res.result.songs.forEach(song => {
											// 相关歌曲列表
											this.nmResult.song[song.id] = {
												details: song,
												hotComments: null
											}
										})
									}
									break
								case 10:
									if (res.result.albumCount !== 0 && res.result.albums.length !== 0) {
										res.result.albums.forEach(album => {
											this.$api.music.neteaseMusicAlbum({id: album.id}).then(res2 => {
												if (res2.code === 200) {
													// 专辑详情
													this.nmResult.album[album.id] = {
														details: res2,
														hotComments: null
													}
													commentParams['id'] = album.id
													commentParams['type'] = 3
													this.$api.music.neteaseMusicHotComment(commentParams).then(res2 => {
														if (res2.code === 200 && res2.total !== 0) {
															// 专辑热评
															this.nmResult.album[album.id].hotComments = res2.hotComments
														}
													})
												}
											})
										})
									}
									break
								case 1000:
									if (res.result.playlistCount !== 0 && res.result.playlists.length !== 0) {
										res.result.playlists.forEach(playlist => {
											this.$api.music.neteaseMusicPlaylistDetails({id: playlist.id}).then(res2 => {
												if (res2.code === 200) {
													// 歌单详情
													this.nmResult.playlist[playlist.id] = {
														details: res2,
														hotComments: null
													}
													commentParams['id'] = playlist.id
													commentParams['type'] = 2
													this.$api.music.neteaseMusicHotComment(commentParams).then(res2 => {
														if (res2.code === 200 && res2.total !== 0) {
															// 歌单热评
															this.nmResult.playlist[playlist.id].hotComments = res2.hotComments
														}
													})
												}
											})
										})
									}
									break
								default:
									break
							}
						})
					})
				}
			},
			// 获取歌曲的热门评论列表
			getHotCommentOfSong(id) {
				// 已收录当前歌曲且未获取评论
				if (this.nmResult.song[id] && !this.nmResult.song[id].hotComments) {
					this.$api.music.neteaseMusicHotComment({
						id: id,
						type: 0,
						offset: 0,
						limit: this.nmHotCommentLimit
					}).then(res => {
						if (res.code === 200 && res.total !== 0) {
							// 当前ID歌曲热门评论
							this.nmResult.song[id].hotComments = res.hotComments
						}
					})
				}
			},
			// 初始化player歌曲
			initPlayer(id, title, artist, pic, lrc, theme) {
				return {
					src: domain.neteaseMusic + '/song/media/outer/url?id=' + id + '.mp3',
					title: title,
					artist: artist,
					pic: pic,
					lrc: lrc,
					theme: theme
				}
			},
		},
		computed: {},
		watch: {
			// 实时获取当前播放歌曲的热门评论
			playerSongIdNow() {
				if (this.playerSongIdNow) {
					this.getHotCommentOfSong(this.playerSongIdNow())
				}
			},
		}
	}
</script>
<style>
	#movie-music-component {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	#movie-music-component .music-item {
		flex: 0 0 200px;
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	#movie-music-component .music-item .comment {
		flex: 1;
		padding-right: 10px;
		border-right: 2px solid rgba(255, 255, 255, 0.2);
	}

	#movie-music-component .music-item .player {
		flex: 0 0 300px;
	}
</style>
