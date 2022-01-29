<template>
  <div class="page-container home">
    <div class="header">
      <div class="header-logo">
        <img :src="logo" />
      </div>
      <div class="header-search"></div>
    </div>
    <div class="container">
      憨包儿。
      <p>测试Gitee Webhooks(第六次)</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      logo: require('@/assets/home-logo.png'),
    };
  },
};
</script>

<style lang="less">
.home {
  height: 2000px;
  .header {
    padding: 10px 24px;
    display: flex;
    justify-content: space-between;
    &-logo {
      width: 150px;
      img {
        width: 150px;
        height: 34px;
      }
    }
  }
}
</style>
