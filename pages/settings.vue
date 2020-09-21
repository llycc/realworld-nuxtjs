<template>
  <div>
    <h1>Your Settings</h1>
    <form @submit.prevent="onSubmit">
      <p class="err-msg" v-for="(value, key) in errors" :key="key">
        {{key}}<span v-for="msg in value" :key="msg">&nbsp;{{msg}}</span> 
      </p>
      <div>
        <input name="image" :disabled="submitting" v-model="user.image" placeholder="URL of profile picture" />
      </div>
      <div>
        <input name="username" :disabled="submitting" v-model="user.username" placeholder="Username" />
      </div>
      <div>
        <textarea name="bio" :disabled="submitting" v-model="user.bio" placeholder="Short bio about you" rows="3"></textarea>
      </div>
      <div>
        <input name="email" :disabled="submitting" v-model="user.email" placeholder="Email" />
      </div>
      <div>
        <input name="password" :disabled="submitting" v-model="user.password" placeholder="New Password" />
      </div>
      <div class="submit-btu-wrap">
        <button type="submit" :disabled="submitting">Update Setting</button>
      </div>
      <div class="logout" @click="onLogout">
        Or click here to logout.   
      </div>
    </form>
   
  </div>
</template>
<script>
import {updateUserInfo} from '../services/user';
import {mapMutations, mapGetters} from 'vuex';
export default {
  data() {
    return {
      errors: {},
      user: {
        image: null,
        username: null,
        bio: null,
        email: null,
        password: null
      },
      submitting: false,
    }
  },
  computed: {
    ...mapGetters('user', ['curUserInfo'])
  },
  methods: {
    ...mapMutations('user', ['setUserInfo', 'setLogined']),
    onSubmit() {
      this.submitting = true;
      updateUserInfo({user: this.user}).then((res) => {
        this.setUserInfo(res.user);
        this.$router.push(`@${res.user.username}`);
      }).finally(() => {
        this.submitting = false;
      });
    },
    onLogout() {
      this.setLogined(false);
      this.setUserInfo(null);
    }
  },
  mounted() {
    Object.assign(this.user, this.curUserInfo);
  }
}
</script>
<style scoped lang="less">
  h1 {
    text-align: center;
  }
  form {
    width: 500px;
    margin: 0 auto;
     .err-msg {
      text-align: left;
      font-size: 14px;
      color: #b85c5c;
      font-weight: bold;
      margin: 0px 0 5px 20px;
    }
    & > div {
      margin-bottom: 20px;
    }
    input {
      height: 40px;
      padding: 10px 20px;
    }
    textarea {
      padding: 10px 20px;
      resize: vertical;
    }
    @btu-width: 190px;
    .submit-btu-wrap {
      text-align: right;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      padding-bottom: 20px;
      button {
        width: @btu-width;
        height: 50px;
        line-height: 50px;
        background: #5CB85C;
        font-size: 18px;
        border-radius: 4px;
        color: #fff;
        &:hover,&:focus {
           background: #449d44;
        }
      }
    }
    .logout {
      border: 1px solid #B85C5C;
      color: #B85C5C;
      border-radius: 5px;
      width: @btu-width;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #B85C5C;
      }
    }
  }
</style>