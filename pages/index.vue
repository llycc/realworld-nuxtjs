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
        right ----
      </div>
      <div class="left">
        <nav>
          <div v-for="tab of tabs" :key="tab.title">{{tab.title}}</div>
        </nav>
        <app-articles :articles="articles"></app-articles>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {getArticles} from '../services/articles';
import appArticles from '../components/appArticles';
export default {
  components: {appArticles},
  data() {
    return {
      articles: [],
      articlesCount: 0,
      query: {
        limit: 20,
        offset: 0
      },
      tabs: [
        {title: 'Global Feed'}
      ]
    };
  },
  computed: {
    ...mapGetters(['isLogined'])
  },
  methods: {
    queryArticles() {
      getArticles(this.query).then(data => {
        console.log(data);
        this.articles = data.articles;
        this.articles.forEach((item, index) => {
          item.index = this.query.limit * this.query.offset + index;
        });
        this.articlesCount = data.articlesCount;
      });
    }
  },
  mounted() {
    this.queryArticles();
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
  }
  .left {
    margin-right: 25%;
  }
}
</style>
