<template>
  <div id="soda" class="soda-home">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      list: { name: 'john' },
    };
  },
};
</script>

<style></style>
