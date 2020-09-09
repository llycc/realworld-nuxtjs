<template>
  <div>
    <sign-in :isSignUpPage="true"></sign-in>
  </div>
</template>
<script>
import signIn from '../components/signIn';
export default {
  components: {signIn},
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
</style>
