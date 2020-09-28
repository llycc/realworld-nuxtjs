<template>
  <div>
    <section class="head-wrap">
      <div class="banner content-width">
        <h1>{{article.title}}</h1>
        <ul class="info-list">
          <li class="article-meta">
            <img :src="article.author.image" />
            <div class="article-info">
              <nuxt-link :to="'@' + article.author.username">{{article.author.username}}</nuxt-link>
              <br/>
              <span class="lightly">{{article.updatedAt}}</span>
            </div>
          </li>
          <template v-if='article.author.username === curUserInfo.username'>
            <li class="info">Edit article</li>
            <li @click="onDelete" class="danger">Delete Article</li>
          </template>
          <template v-else>
            <li @click="onToggleFollow" class="info">
              <template v-if="article.author.following">Unfollow {{article.author.username}}</template>
              <template v-else>Follow {{article.author.username}}</template>
            </li>
            <li @click="onToggleFavorite" class="success">
              <template v-if="article.favorited">Unfavorite Article</template>
              <template v-else>Favorite Article</template>
            </li>
          </template>
        </ul>
      </div>
    </section>
    <section class="content-width content-wrap">
      {{article.body}}
      <ul class="tag-list">
        <li v-for="tag in article.tagList" :key="tag">{{tag}}</li>
      </ul>
    </section>
    <section class="content-width footer-wrap"></section>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      article: {author: {}}
    }
  },
  computed: {
    ...mapGetters('user', ['isLogined', 'curUserInfo'])
  },
  methods: {
    onDelete() {

    },
    onToggleFollow() {
      if (!this.isLogined) {
        this.$router.push('/register');
        return;
      }
      const action = this.article.author.following ? this.$profiles.unFollowUser : this.$profiles.followUser;
      action(this.article.author.username).then((res) => {
        this.article.author = res.profile;
      });
    },
    onToggleFavorite() {
      if (!this.isLogined) {
        this.$router.push('/register');
        return;
      }
      const action = this.article.favorited ? this.$articles.disfavorAritcle : this.$articles.favoriteArticle;
      action(this.article.slug).then((res) => {
        this.article = res.article;
      });
    },
  },
  asyncData(ctx) {
    return ctx.app.$articles.getArticle(ctx.params.slug);
  },
  created() {
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/variable";
  .lightly {
    font-size: 13px;
    color: #bbb;
  }
.head-wrap {
  height: @home-banner-height;
  background: #333;
  color: #fff;
  padding: 32px 0;
  box-sizing: border-box;
  h1 {
    margin: 0;
    font-size:30px;
  }
  .info-list {
    margin: 30px 0 0 0;
    padding: 0;
    li {
      list-style: none;
      display: inline-block;
    }
    .article-meta {
      margin-right: 30px;
      img {
        width: 32px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .article-info {
        vertical-align: middle;
        display: inline-block;
        a {
          color: #fff;
        }
      }
    }
    & > li:not(:first-child) {
      border-radius: 4px;
      padding: 3px 10px;
      font-size: 14px;
      vertical-align: bottom;
      cursor: pointer; 
    }
  }
}
.content-wrap {
  padding: 20px 0;
  .tag-list {
    margin: 40px 0 0 0;
    padding: 0;
    li {
      list-style: none;
      font-size: 12px;
      color: #aaa;
      border-radius: 10px;;
      border: 1px solid #aaa;
      padding: 2px 6px;
      display: inline-block;
      margin-right: 4px;
    }
  }
}
</style>