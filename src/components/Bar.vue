<template>
  <div>
    <h2>Hello, I'm Bar!</h2>
    <van-list>
      <van-cell v-for="topic in topics" :key="topic.id" :title="topic.title"></van-cell>
    </van-list>
  </div>
</template>

<script>
import List from 'vant/lib/list';
import Cell from 'vant/lib/cell';
import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/list.css';
import 'vant/lib/vant-css/cell.css';
export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
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
