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
            <li class="info" @click="onEditArticle(article)">Edit article</li>
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
    <section class="content-width footer-wrap">
      <div class="post-comment">
        <textarea v-model="comment.body" placeholder="Write a comment"></textarea>
        <button class="comment-btu" @click="onPostComment">Post Comment</button>
      </div>
      <ul class="comment-list">
        <li v-for="(item, index) in commentList" :key="item.id">
          <p>{{item.body}}</p>
          <p class="comment-meta">
            <img @click="onUser(item.author)" :src="item.author.image" />
            <span @click="onUser(item.author)" class="username">{{item.author.username}}</span>
            <span class="lightly">{{item.updatedAt}}</span>
            <span v-if="curUserInfo.username === item.author.username" @click="onDeleteComment(item, index)" class="delete">删除</span>
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      article: {author: {}},
      comment: {
        body: ''
      },
      commentList: []
    }
  },
  computed: {
    ...mapGetters('user', ['isLogined', 'curUserInfo'])
  },
  methods: {
    onEditArticle(article) {
      this.$router.push(`/editor/${article.slug}`);
    },
    onDelete() {
      this.$articles.deleteArticle(this.article.slug).then((res) => {
        this.$router.push('/');
      });
    },
    onUser(author) {
      this.$router.push(`/@${author.username}`);
    },
    onPostComment() {
      if (!this.isLogined) {
        this.$router.push('/register');
        return;
      }
      this.$articles.postArticleComments(this.article.slug, {comment: this.comment}).then((res)=> {
        this.commentList.push(res.comment);
        this.comment.body = '';
      });
    },
    onDeleteComment(comment,index) {
      this.$articles.deleteArticleComments(this.article.slug, comment.id).then(res => {
        this.commentList.splice(index, 1);
      });
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
    getComments() {
      this.$articles.getArticleComments(this.$route.params.slug).then((res) => {
        this.commentList = res.comments;
      });
    },
  },
  asyncData(ctx) {
    return ctx.app.$articles.getArticle(ctx.params.slug);
  },
  created() {
    this.getComments();
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
  border-bottom: 1px solid #ccc;
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
.footer-wrap {
  margin-top: 20px;
  padding-bottom: 20px;
  .post-comment {
    textarea {
      resize: vertical;
      min-height: 50px;
      padding: 10px;
    }
    .comment-btu {
      background: #5CB85C;
      color: #fff;
      padding: 4px 6px;
      border-radius: 4px;
      font-size: 16px;
      margin: 10px 0;
    }
    .comment-btu:hover {
      background: #449d44
    }
  }
  .comment-list {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      margin-top : 10px;
      & > p:first-child {
        padding: 10px;
      }
      & > p {
        margin: 0;
      }
    }
    .comment-meta {
      background: #f5f5f5;
      padding: 10px;
      font-size: 14px;
      vertical-align: middle;
      & img:first-child {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: middle;
        cursor: pointer;
      }
      span {
        margin-left: 4px;
      }
      .username {
        cursor: pointer;
        color: #3d8b3d;
      }
      .delete {
        float: right;
        cursor: pointer;
        color: #3d8b3d;
      }
    }
  }
}
</style>