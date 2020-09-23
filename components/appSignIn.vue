<template>
  <div class="login-wrap">
    <h1>
      {{title}}
      <p class="sub-title">
        <nuxt-link v-if="isSignUpPage"  to="login">Have an account?</nuxt-link>
        <nuxt-link v-else to="register" >Need an account</nuxt-link>
      </p>
    </h1>
    <form @submit.prevent="onSubmit">
      <p class="err-msg" v-for="(value, key) in errors" :key="key">
        {{key}}<span v-for="msg in value" :key="msg">&nbsp;{{msg}}</span> 
      </p>
      <div class="form-item" v-if="isSignUpPage">
        <input placeholder="Username" :disabled="submitting" v-model="user.username" />
      </div>
      <div class="form-item">
        <input placeholder="Email" type="email" :disabled="submitting" v-model="user.email" />
      </div>
      <div class="form-item">
        <input
          placeholder="Password"
          :disabled="submitting"
          type="password"
          v-model="user.password"
        />
      </div>
      <div class="form-item footer">
        <button type="submit" :disabled="submitting">
          {{title}}
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import {ConstKey} from '../config';
export default {
  props: {
    isSignUpPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '',
      submitting: false,
      errors: {},
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapMutations('user', ['setLogined', 'setUserInfo']),
    onSubmit() {
      this.submitting = true;
      const signReq = this.isSignUpPage ? this.$users.signUp : this.$users.signIn;

      signReq({user: this.user}).then(({user}) => {
        this.errors = {};
        this.setLogined(true);
        this.setUserInfo(user);
      
        this.$cookies.set(ConstKey.TokenCookieName, user.token, {sameSite: 'Lax'});
        this.$router.push('/');
      }, (data) => {
        this.errors = data.errors;
        this.submitting = false;
      });
    },
  },
  mounted() {
    this.title = this.isSignUpPage ? 'Sign up': 'Sign in';
  },
};
</script>
<style scoped lang="less">
.login-wrap {
  width: 40%;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 20px;

    .sub-title a {
      font-size: 16px;
      color: #5cb85c;
    }
  }

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

    button[type="submit"] {
      height: 50px;
      width: 100px;
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

  .form-item.footer {
    text-align: right;
  }
}
</style>
