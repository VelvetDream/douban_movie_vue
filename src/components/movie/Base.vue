<template>
  <div id="base-component" v-if="bases">
    <div id="douban" v-show="isDoubanView">
      <div class="title">
        <span class="name-zh">{{bases.douban.base.nameZh}}</span>
        <span
          class="name-origin"
          v-if="bases.douban.base.nameOrigin"
        >{{bases.douban.base.nameOrigin}}</span>
        <span
          class="year"
          v-if="bases.douban.base.startYear!==0"
        >{{"("+bases.douban.base.startYear+")"}}</span>
      </div>
      <div class="base">
        <img :src="bases.douban.base.urlPoster" fit="cover" />
        <div class="base-msgbox">
          <div v-if="doubanCelebrityList.director.length!==0">
            <span class="head">导演</span>
            <span class="msg">
              <span :key="index" v-for="(item, index) in doubanCelebrityList.director">
                <el-link :href="item.urlCelebrityDouban" target="_black">{{item.nameZh}}</el-link>
                {{index+1===doubanCelebrityList.director.length?'':'/'}}
              </span>
            </span>
          </div>
          <div v-if="doubanCelebrityList.writer.length!==0">
            <span class="head">编剧</span>
            <span class="msg">
              <span :key="index" v-for="(item, index) in doubanCelebrityList.writer">
                <el-link :href="item.urlCelebrityDouban" target="_black">{{item.nameZh}}</el-link>
                {{index+1===doubanCelebrityList.writer.length?'':'/'}}
              </span>
            </span>
          </div>
          <div v-if="doubanCelebrityList.actor.length!==0">
            <span class="head">演员</span>
            <span class="msg">
              <span :key="index" v-for="(item, index) in doubanCelebrityList.actor">
                <el-link :href="item.urlCelebrityDouban" target="_black">{{item.nameZh}}</el-link>
                {{index+1===doubanCelebrityList.actor.length?'':'/'}}
              </span>
            </span>
          </div>
          <div v-if="bases.douban.typeList.length!==0">
            <span class="head">类型</span>
            <span class="msg">
              <span :key="index" v-for="(item, index) in bases.douban.typeList">
                <el-link :href="'/tag/#/?tags='+item" target="_black">{{item}}</el-link>
                {{index+1===bases.douban.typeList.length?'':'/'}}
              </span>
            </span>
          </div>
          <div v-if="bases.douban.tagList.length!==0">
            <span class="head">标签</span>
            <span class="msg">
              <span :key="index" v-for="(item, index) in bases.douban.tagList">
                <el-link :href="'/tag/#/?tags='+item" target="_black">{{item}}</el-link>
                {{index+1===bases.douban.tagList.length?'':'/'}}
              </span>
            </span>
          </div>
          <div v-if="bases.douban.aliasList.length!==0">
            <span class="head">别名</span>
            <span class="msg">
              <span :key="index" v-for="(item, index) in bases.douban.aliasList">
                {{item}}
                {{index+1===bases.douban.aliasList.length?'':'/'}}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div id="imdb" v-show="!isDoubanView"></div>
  </div>
</template>
<script>
export default {
  name: 'base-component',
  props: ['bases'],
  data() {
    return {
      // 默认显示豆瓣板块
      isDoubanView: true,
      // 豆瓣影人分类列表
      doubanCelebrityList: {
        director: [],
        writer: [],
        actor: []
      }
    }
  },
  mounted() {
    if (this.bases) {
      this.parseDoubanCelebrityList(this.bases.douban.celebrityList)
    }
  },
  methods: {
    // 解析豆瓣电影影人列表
    parseDoubanCelebrityList(celebrityList) {
      if (celebrityList.length !== 0) {
        celebrityList.forEach(celebrity => {
          celebrity.relationList.forEach(relation => {
            switch (relation.idProfession) {
              case 4:
                this.doubanCelebrityList.actor.push(celebrity)
                break
              case 3:
                this.doubanCelebrityList.writer.push(celebrity)
                break
              case 2:
                this.doubanCelebrityList.director.push(celebrity)
                break
              default:
                break
            }
          })
        })
      }
    }
  },
  computed: {},
  watch: {
    bases() {
      if (this.bases) {
        this.parseDoubanCelebrityList(this.bases.douban.celebrityList)
      }
    }
  }
}
</script>
<style>
#base-component {
  width: 100%;
  height: 300px;
}
/* base-component切换 */
#base-component #douban,
#imdb {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* base-component */
.title {
  flex: 0 0 50px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: wrap;
  padding-bottom: 6.67px;
}
.base {
  flex: 0 0 240px;
  display: flex;
  flex-direction: row;
  max-width: 700px;
}
/* title */
.title .name-zh {
  font-size: 36px;
  font-weight: 600;
  padding-right: 10px;
}
.title .name-origin {
  font-size: 30px;
  font-weight: 500;
  color: #2b2727;
  padding-right: 10px;
}
.title .year {
  font-size: 30px;
  font-weight: 500;
  color: #2b2727;
}
/* base 左 右 */
.base img {
  height: 240px;
  flex: 0 0 165px;
}
.base-msgbox {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  max-width: 500px;
}
/* msgbox 上下 */
.base-msgbox div {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
}
/* msgbox div 左右 */
.base-msgbox div .head {
  flex: 0 0 auto;
  padding-right: 5px;
  align-items: flex-end;
  font-size: 18px;
  font-weight: 700;
  color: #000;
}
.base-msgbox div .msg {
  flex: 0 0 auto;
  display: flex;
  max-width: 480px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
}
/* msg 左右可换行 */
.base-msgbox div .msg span {
  font-size: 14px;
  font-weight: 600;
  color: #2b2727;
}
</style>
