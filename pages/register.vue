<template>
  <div>
    <app-sign-in :isSignUpPage="true"></app-sign-in>
  </div>
</template>
<script>
import appSignIn from '../components/appSignIn';
export default {
  components: {appSignIn},
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
</style>
