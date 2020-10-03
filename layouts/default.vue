<template>
  <div class="default-wrap">
    <header class="content-width">
      <span class="left">
        <span>Conduit</span>
      </span>
      <span class="right">
        <nuxt-link to="/">Home</nuxt-link>
        <template v-if="!isLogined">
          <nuxt-link to="/login">Sign in</nuxt-link>
          <nuxt-link to="/register">Sign Up</nuxt-link>
        </template>
        <template v-else>
          <nuxt-link to="/editor">New Article</nuxt-link>
          <nuxt-link to="/settings">Setting</nuxt-link>
          <nuxt-link :to="`@${curUserInfo.username}`">{{curUserInfo.username}}</nuxt-link>
        </template>
      </span>
    </header>
    <Nuxt />
    <footer>
      <a href="https://github.com/llycc/realworld-nuxtjs" target="_blank">Real World Nuxt Js</a>
    </footer>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex';
  export default {
    data(){
      return {
        showContent: false,
      }
    },
    computed: {
      ...mapGetters('user',['isLogined', 'curUserInfo'])
    },
    methods: {
      ...mapMutations('user', ['setLogined', 'setUserInfo']),
    },
    created() {
    }
  }
</script>
<style scoped lang="less">
  @import "../styles/variable";

  .default-wrap {
    margin-bottom: @footer-height;
  }
  header {
    height: 60px;
    line-height: 60px;
    font-size: 1rem;

    .left span:first-child {
      color: #5CB85C;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .right {
      float: right;
      a {
        margin-left: 5px;
        color: rgba(0, 0, 0, 0.3);
        &.nuxt-link-active,&:hover {
          color: rgba(0, 0, 0, 0.6);
        }
      }

    }
  }
  footer {
    background: linear-gradient(#485563, #29323c);
    height: @footer-height;
    line-height: @footer-height;
    font-size: 1.5rem;
    text-align: center;
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    a {
      color: #fff;
    }
  }
</style>
