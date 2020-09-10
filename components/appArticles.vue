<template>
  <ul>
    <li v-for="article of articles" :key="article.slug">
      <div class="article-meta">
        <img :src="article.author.image" />
        <div class="info">
          <nuxt-link :to="'@' + article.author.username">{{article.author.username}}</nuxt-link>
          <br/>
          <span class="lightly">{{article.updatedAt}}</span>
        </div>
      </div>
      <nuxt-link :to="'/articles/' + article.slug">
        <h1>{{article.title}}</h1>
        <p class="lightly">{{article.description}}</p>
        <p class="lightly">Read more...</p>
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    articles: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="less">
ul {
  margin: 0;
  padding: 0;
  .lightly {
    font-size: 13px;
    color: #bbb;
  }
  li {
    list-style: none;
    padding: 16px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    h1 {
      margin: 0 0 3px 0;
      font-weight: 600;
      font-size: 20px;
    }
    h1 + p {
      margin: 0;
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
    .info {
      display: inline-block;
      vertical-align:middle;
      line-height: 16px;
      margin-left: 5px;
      a {
        color: #5CB85C;
      }
    }
  }
}
</style>