<template>
  <div class="content-width">
     <form @submit.prevent="onSubmit">
      <p class="err-msg" v-for="(value, key) in errors" :key="key">
        {{key}}<span v-for="msg in value" :key="msg">&nbsp;{{msg}}</span> 
      </p>
      <div class="form-item">
        <input placeholder="Article Title" :disabled="submitting" v-model="article.title" />
      </div>
      <div class="form-item">
        <input placeholder="What's this article about?" :disabled="submitting" v-model="article.description" />
      </div>
      <div class="form-item">
        <textarea
          placeholder="Write your article (in markdown)"
          :disabled="submitting"
          v-model="article.body"></textarea>
      </div>
      <div class="form-item footer">
        <button type="submit" :disabled="submitting">Publish Article</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      article: {
        body: '',
        description: '',
        tagList: [],
        title: ''
      },
      submitting: false,
      errors: {},
    }
  },
  computed: {
    ...mapGetters('user', ['isLogined'])
  },
  methods: {
    onSubmit() {
      if (!this.isLogined) {
        this.$router.push('/register');
        return;
      }
      this.submitting = true;
      const payload = {article: this.article};

      const action = this.article.slug ? this.$articles.putArticle(this.article.slug, payload) :
       this.$articles.postArticle(payload);
      action.then((res) => {
        this.$router.push(`/article/${res.article.slug}`);
      }, (data) => {
        this.errors = data.errors;
      }).finally(() => {
        this.submitting = false;
      });
    }
  },
  mounted() {
  },
  asyncData({params,app}) {
    if (!params.slug) {
      return;
    }
    return app.$articles.getArticle(params.slug);
  },
}
</script>

<style scope lang="less">
  form {
    .err-msg {
      text-align: left;
      font-size: 14px;
      color: #b85c5c;
      font-weight: bold;
      margin: 0px 0 5px 20px;
    }
  }

  .form-item {
    margin-bottom: 20px;

    input {
      height: 50px;
      padding: 10px 20px;
    }
    textarea {
      min-height: 200px;
      padding: 10px 20px;
      resize: vertical;
    }
    button[type="submit"] {
      padding: 10px;
      border-radius: 4px;
      font-size: 18px;
      color: #fff;
      background: #5cb85c;

      &:hover,
      &:focus {
        background: #449d44;
      }
    }
  }
</style>