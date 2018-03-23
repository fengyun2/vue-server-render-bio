<template>
  <div>
    <van-list :loading="loading" @load="onLoad" :finished="finished">
      <van-cell v-for="(topic, index) in topics" :key="index" :title="topic.title"></van-cell>
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
  data() {
    return {
      finished: false,
      tab: 'share',
      pageInfo: {
        page: 1,
        limit: 10
      }
    };
  },
  asyncData({ store, route }) {
    // 触发 action 后, 会返回 Promise
    return store.dispatch('getTopics');
  },
  computed: {
    // 从 store 的 state 对象中获取 topics
    topics() {
      return this.$store.state.topics;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  mounted() {
    // console.log('topics: ', this.topics);
  },
  methods: {
    onLoad() {
      console.log('我被触发了');
      this.pageInfo.page++;

      const { page, limit } = this.pageInfo;
      this.$store.dispatch('getTopics', { tab: this.tab, page, limit });
    }
  }
};
</script>

<style>

</style>
