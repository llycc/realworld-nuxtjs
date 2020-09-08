<template>
    <div class="login-wrap">
        <h1>
            Sign in
            <p class="sub-title">
                <nuxt-link to="register">Need an account</nuxt-link>
            </p>
        </h1>
        <form @submit.prevent="onSubmit">
            <p class="err-msg">
                {{errMsg}}
            </p>
            <div class="form-item">
                <input placeholder="Email" type="email" :disabled="submitting" v-model="user.email"/>
            </div>
            <div class="form-item">
                <input placeholder="Password" :disabled="submitting" type="password" v-model="user.password"/>
            </div>
            <div class="form-item footer">
                <button type="submit" :disabled="submitting">Sign in</button>
            </div>
        </form>
    </div>
</template>
<script>
  import {login} from '../services/user';
  import {setToken} from '../services/http';
  import {mapMutations} from 'vuex';
  export default {
    data() {
      return {
        submitting: false,
        errMsg: '',
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapMutations('user', ['setLogined', 'setUserInfo']),
      onSubmit() {
        this.submitting = true;

        login({user: this.user}).then(({user}) => {
          this.errMsg = '';
          this.setLogined(true);
          this.setUserInfo(user);
          setToken(user.token);
          this.$router.push('/register');
        }, () => {
          this.errMsg = 'email or password is error!';
          this.submitting = false;
        });
      },
    },
    created() {
    }
  }
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
                color: #5CB85C;
            }
        }

        form {
            .err-msg {
                text-align: left;
                font-size: 14px;
                color: #B85C5C;
                font-weight: bold;
                margin: 0px 0 5px 20px;
                height: 20px;
            }
        }

        .form-item {
            margin-bottom: 20px;

            input {
                width: 100%;
                height: 50px;
                box-sizing: border-box;
                font-size: 18px;
                border-radius: 4px;
                padding: 10px 20px;
                border: 1px solid rgba(0, 0, 0, 0.15);

                &:focus {
                    border-color: #66afe9;
                    outline: none;
                }
            }

            button[type=submit] {
                height: 50px;
                width: 100px;
                border-radius: 4px;
                font-size: 18px;
                color: #fff;
                background: #5CB85C;
                border: 0;
                cursor: pointer;

                &:hover, &:focus {
                    background: #449d44;
                    border: 0;
                    outline: 0;
                }
            }
        }

        .form-item.footer {
            text-align: right;
        }
    }
</style>
