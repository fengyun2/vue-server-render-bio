<template>
  <div>
    <h2>Hello, I'm Bar!</h2>
  </div>
</template>

<script>
export default {
  title() {
    return '我是Bar页面';
  },
  asyncData({ store, route }) {
    // 触发 action 后, 会返回 Promise
    return store.dispatch('getTopics');
  },
  computed: {
    // 从 store 的 state 对象中获取 topics
    topics() {
      return this.$store.state.topics;
    }
  },
  mounted() {
    console.log('topics: ', this.topics);
  }
};
</script>

<style>

</style>
