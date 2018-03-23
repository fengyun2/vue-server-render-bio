<template>
  <div>
    <h2>Hello, I'm Tom!</h2>
    <p>I been see: {{count}}</p>
  </div>
</template>

<script>
// 在这里导入模块，而不是在 `store/index.js` 中
import tomStoreModule from '@/store/modules/tom';
export default {
  asyncData({ store }) {
    store.registerModule('tom', tomStoreModule);
    return store.dispatch('tom/inc');
  },
  // 重要信息：当多次访问路由时，
  // 避免在客户端重复注册模块
  destroyed() {
    this.$store.unregisterModule('tom');
  },
  computed: {
    count() {
      return this.$store.state.tom.count;
    }
  }
};
</script>

<style>

</style>
