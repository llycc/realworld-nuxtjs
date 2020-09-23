<template>
  <div class="container">
    <section class="banner">
      <div class="title-wrap">
        <h1>conduit</h1>
         <p>A place to share your knowledge</p>
      </div>
    </section>
    <section class="content-wrap content-width">
      <div class="right">
        
        <div class="tag-list">
          <p>Popular Tags</p>
          <span v-for="(tag, index) in tags" :key="index" @click="onTagListItem(tag)">{{tag}}</span>
        </div>
      </div>
      <div class="left">
        <nav>
          <div v-for="(tab, index) in tabs" :key="tab.title" @click="onTab(tab, index)"
           :class="{active: index === selectedTab}">{{tab.title}}</div>
        </nav>
        <app-articles :articles="articles" :loading="loading" @favorite="onToggleFavorite"></app-articles>
        <ul class="pagination">
          <li v-for="(item, index) in pages" :key="index"
           @click="pageChange(index)" :class="{avtivePage: index === query.offset}">{{index + 1}}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import appArticles from '../components/appArticles';
import {} from '../api/articles';
export default {
  components: {appArticles},
  data() {
    return {
      articles: [],
      loading: false,
      tags: [],
      articlesCount: 0,
      query: {
        limit: 20,
        offset: 0
      },
      tabs: [],
      selectedTab: 0,
      pages: []
    };
  },
  computed: {
    ...mapGetters('user', ['isLogined'])
  },
  methods: {
    initTabs() {
      this.tabs = [];
      if (this.isLogined) {
        this.tabs.push({title: 'Your Feed',tag: ''});
      }
      this.tabs.push({title: 'Global Feed', tag: ''});
    },
    pageChange(offset) {
      this.query.offset = offset;
      this.queryArticles();
    },
    queryArticles(actionFun = this.$articles.getArticles) {
      this.loading = true;
      this.articles = [];
      this.articlesCount = 0;
      actionFun(this.query).then(data => {
        this.articles = data.articles;
        this.articles.forEach((item, index) => {
          item.index = this.query.limit * this.query.offset + index;
        });
        this.articlesCount = data.articlesCount;
        this.pages = new Array(Math.ceil(this.articlesCount / this.query.limit));
      }).finally(() => {
        this.loading = false;
      });
    },
    getTags() {
      this.$tags.getTags().then(data => {
        this.tags = data.tags || [];
      });
    },
    onTab(tab, index) {
      const initTabCount = this.isLogined ? 2 : 1;
      this.selectedTab = index;
      if (index >= initTabCount) {
        this.tabs = this.tabs.slice(0, initTabCount);
      }
      this.query.tag = this.tabs[index].tag;
      if (this.isLogined && index === 0) {
        this.queryArticles(this.$articles.getFeedArticles);
      } else {
        this.queryArticles();
      }
    },
    onTagListItem(tag) {
      this.query.tag = tag;
      if (this.tabs.length > 1) {
        this.tabs.pop();
      }
      this.tabs.push({
        title: '#' +tag,
        tag: tag
      });
      this.queryArticles();
    },
    onToggleFavorite(article) {
      if (!this.isLogined) {
        this.$router.push('/register');
        return;
      }
      const action = article.favorited ? this.$articles.disfavorAritcle : this.$articles.favoriteArticle;
      action(article.slug).then((res) => {
        const index = this.articles.findIndex(item => item.slug);
        this.articles.splice(index, 1, res.article);
      });
    }
  },
  mounted() {
    this.getTags();
    this.initTabs();
    if (this.isLogined) {
      this.queryArticles(this.$articles.getFeedArticles);
    } else {
      this.queryArticles();
    }
  },
  asyncData(data) {},
};
</script>

<style scoped lang="less">
.banner {
  height: 170px;
  background: #5CB85C;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center;

  .title-wrap {
    color: #fff;
    h1 {
      font-size: 46px;
      margin: 0 0 10px 0;
    }
    p {
      font-size: 22px;
      margin: 0;
      font-weight: 300;
    }
  }
}
.content-wrap {
  padding: 40px 10px 0 10px;
  & > div {
    padding: 10px 20px;
  }
  .right {
    float: right;
    width: 25%;
    .tag-list {
      padding: 10px;
      background: #f3f3f3;
      border-radius: 5px;
      & > p:first-child {
        color: #373a3c;
        margin: 0 0 6px 0;
        font-size: 14px;
      }
      & > span {
        display: inline-block;
        padding: 3px 8px;
        background: #818a91;
        cursor: pointer;
        margin: 0 5px 5px 0;
        border-radius: 10px;
        font-size: 12px;
        color: #fff;
      }
    }
  }
  .left {
    margin-right: 27%;
    nav > div {
      font-size: 14px;
      padding: 10px 10px;
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
    }
    nav div.active {
      color: #5CB85C;
      border-bottom: 2px solid #5CB85C;
    }
    .pagination {
      li {
        display: inline-block;
        padding: 10px;
        border: 1px solid #ddd;
        margin-left: -1px;
        color: #5CB85C;
        cursor: pointer;
        font-size: 14px;
      }
      .avtivePage {
        background: #5cb85c;
        color: #fff;
      }
    }
  }
}
</style>
