<template>
  <div>
    <section class="banner">
      <div class="banner-main">
        <div class="info-wrap">
          <p class="head-icon"><img :src='profile.image' /></p>
          <h3>{{profile.username}}</h3>
          <p class='bio'>{{profile.bio}}</p>
        </div>
        <div class="setting-btu" v-if="isLogined && curUserInfo.username === profile.username" @click = "onEditProfile">Edit Profile Settings</div>
        <div class="setting-btu" v-else @click="onToggleFollow">
          <template v-if="profile.following">Unfollow</template>
          <template v-else>Follow</template> 
          {{profile.username}}
        </div>
      </div>
    </section>
    <section>
    <section class="content-wrap content-width">
      <div class="articles">
        <nav>
          <div v-for="(tab, index) in tabs" :key="tab.title" @click="onTab(tab, index)"
           :class="{active: index === selectedTab}">{{tab.title}}</div>
        </nav>
        <app-articles :articles="articles" :loading="loading" @favorite="onToggleFavorite"></app-articles>
      </div>
    </section>
    </section>
  </div>
</template>
<script>
import appArticles from '../components/appArticles';
import {mapGetters} from 'vuex';
export default {
  validate({params}) {
    return params.user.startsWith('@');
  },
  component: {appArticles},
  data() {
    return {
      profile: {
        username: '',
        bio: '',
        image: '',
        following: false
      },
      tabs: [],
      articles: [],
      articlesCount: 0,
      selectedTab: 0,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('user', ['isLogined', 'curUserInfo'])
  },
  methods: {
    onEditProfile() {
      this.$router.push('/settings');
    },
    onToggleFollow() {
      if (!this.isLogined) {
        this.$router.push('/register');
        return;
      }
      const action = this.profile.following ? this.$profiles.unFollowUser : this.$profiles.followUser;
      action(this.profile.username).then((res) => {
        this.profile = res.profile;
      });
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
    },
    onTab(tab, index) {
      this.selectedTab = index;
      this.queryArticles(tab.query);
    },
    queryArticles(query) {
      console.log('11111', query);
      this.loading = true;
      this.articles = [];
      this.articlesCount = 0;
      this.$articles.getArticles(query).then(data => {
        this.articles = data.articles;
        this.articlesCount = data.articlesCount;
      }).finally(() => {
        this.loading = false;
      });
    },
  },
  created() {
    this.tabs = [
      {title: 'My Articles', query: {author: this.profile.username, limit: 5, offset: 0}},
      {title: 'Favorite Aricles',query: {favorited: this.profile.username, limit: 5, offset: 0}},
    ]
    this.queryArticles(this.tabs[0].query);
  },
  asyncData(ctx) {
    return ctx.app.$profiles.getUserProfile(ctx.params.user.slice(1));
  }
};
</script>

<style scoped lang="less">
.banner {
  height: 200px;
  background: #f3f3f3;
  padding: 20px 0;
}
.banner-main {
  width: 70%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  text-align: center;
  .info-wrap {
    .head-icon {
      margin: 0;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    h3 {
      margin: 8px 0;
    }
    .bio {
      margin: 0;
    }
  }
   .setting-btu {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 5px;
      border: 1px solid #999;
      border-radius: 5px;
      font-size: 14px;
      color: #999;
      cursor: pointer;
      &:hover {
        background: #ccc;
      }
    }

}
.content-wrap {
  width: 70%;
  margin: 0 auto;
}
.articles {
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
}
</style>
