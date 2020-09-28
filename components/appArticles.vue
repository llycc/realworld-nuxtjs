<template>
  <ul class="article-list">
    <p v-if="articles.length === 0 && !loading">No articles are here... yet.</p>
    <p v-if="loading">Loading articles...</p>
    <li v-for="article of articles" :key="article.slug">
      <div class="article-meta">
        <img :src="article.author.image" />
        <div class="article-info">
          <nuxt-link :to="'@' + article.author.username">{{article.author.username}}</nuxt-link>
          <br/>
          <span class="lightly">{{article.updatedAt}}</span>
        </div>
        <div class="favorite" :class="{favorited: article.favorited}" @click="onFavorite(article)">
          <i class="iconfont icon-favorite"></i>
          <span>{{article.favoritesCount}}</span>
        </div>
      </div>
      <nuxt-link :to="'/article/' + article.slug">
        <h1>{{article.title}}</h1>
        <p class="lightly">{{article.description}}</p>
        <span class="lightly">Read more...</span>
        <ul class="tag-list">
          <li v-for="(tag, index) in article.tagList" :key="index">{{tag}}</li>
        </ul>
      </nuxt-link>
      
    </li>
  </ul>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  props: {
    articles: {
      type: Array,
      default: [],
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isLogined'])
  },
  methods: {
    onFavorite(article) {
      this.$emit('favorite', article);
    }
  },
};
</script>
<style scoped lang="less">
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.article-list {
  .lightly {
    font-size: 13px;
    color: #bbb;
  }
  & > li {
    padding: 16px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    h1 {
      margin: 0 0 3px 0;
      font-weight: 600;
      font-size: 20px;
    }
    h1 + p {
      margin: 0 0 10px 0;
    }
    .tag-list {
      float: right;
      width: 40%;
      text-align:right;
      li {
        display: inline-block;
        font-size: 12px;
        font-weight: 300;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 2px 8px;
        margin:0 4px 4px 0;
      }
    }
  }
  .article-meta {
    margin-bottom: 16px;
    img {
      width:32px;
      height: 32px;
      border-radius:30px;
      vertical-align: middle;
    }
    .article-info {
      display: inline-block;
      vertical-align:middle;
      line-height: 16px;
      margin-left: 5px;
      a {
        color: #5CB85C;
      }
    }
    .favorite {
      float: right;
      color: #5cb85c;
      padding: 0px 4px;
      border: 1px solid #5cb85c;
      border-radius: 4px;
      cursor: pointer;
      i {
        font-size: 18px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        font-size: 14px;
        margin-left: -4px;
      }
      &:hover, favorited {
        background: #5cb85c;
        color: #fff;
      }
    }
  }
}
</style>