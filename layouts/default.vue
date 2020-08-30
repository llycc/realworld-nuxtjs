<template>
  <div class="default-wrap">
    <header></header>
    <Nuxt />
    <footer>
      <a>Link</a>
    </footer>
  </div>
</template>

<style scoped lang="less">
  @import "../styles/variable";

  .default-wrap {
    margin-bottom: @footer-height;
  }
  footer {
    background: linear-gradient(#485563, #29323c);
    height: @footer-height;
    line-height: @footer-height;
    font-size: 1.5rem;
    text-align: center;
    color: #fff;
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
