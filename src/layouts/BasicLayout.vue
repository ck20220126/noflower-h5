<template>
  <div class="basic-layout">
    <div class="basic-layout-content">
      <router-view></router-view>
    </div>
    <div class="basic-layout-footer">
      <van-tabbar v-model="tabActive" :fixed="false" safe-area-inset-bottom>
        <van-tabbar-item
          v-for="item in tabBarData"
          :key="`tab_${item.name}`"
          :name="item.name"
          :icon="item.icon"
        >
          {{ item.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicLayout',
  data() {
    return {
      tabActive: 'home',
      tabBarData: [
        {
          name: 'home',
          icon: 'home-o',
          title: '首页',
          routerName: 'home',
        },
        {
          name: 'interact',
          icon: 'eye-o',
          title: '发现',
          routerName: 'interact',
        },
        {
          name: 'about',
          icon: 'manager-o',
          title: '寄几',
          routerPath: 'about',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.basic-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-content {
    flex: 1;
    overflow-y: auto;
  }
  &-footer {
    .van-tabbar {
      height: 60px;
      &::after {
        border-top-left-radius: 60px;
        border-top-right-radius: 60px;
      }
    }
  }
}
</style>
