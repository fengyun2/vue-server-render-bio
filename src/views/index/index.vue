<template>
  <div class="container">
    <header class="header">
      <van-tabs :offset="10" swipeable sticky @click="changeTab">
        <van-tab v-for="(tab, index) in topTabs" :key="index" :title="tab.title" :swipe-threshold="swipeThreshold" :disabled="loading">
        </van-tab>
      </van-tabs>
    </header>
    <div class="list">
      <van-list :loading="loading" @load="onLoad" :finished="finished">
        <van-cell v-for="(topic, index) in topics" :key="index" :title="topic.title"></van-cell>
      </van-list>
    </div>

    <van-loading color="black" />
  </div>

</template>

<script>
import Tab from 'vant/lib/tab';
import Tabs from 'vant/lib/tabs';
import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/tab.css';
import 'vant/lib/vant-css/tabbar.css';

import List from 'vant/lib/list';
import Cell from 'vant/lib/cell';
// import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/list.css';
import 'vant/lib/vant-css/cell.css';

import Loading from 'vant/lib/loading';
import 'vant/lib/vant-css/loading.css';

import { topTabs } from '@/utils/tabs';
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [Loading.name]: Loading
  },
  data() {
    return {
      topTabs,
      swipeThreshold: 6,
      finished: false
      // pageInfo: {
      //   page: 1,
      //   limit: 12
      // }
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
    },
    tab() {
      return this.$store.state.tab;
    }
    // active() {
    //   // 将tab放在store后，获取active会有bug,不停切换回到第一个tab
    //   // return this.topTabs.findIndex(item => item.tab === this.tab);
    // },
    // pageInfo() {
    //   return this.$store.state.pageInfo;
    // }
  },
  methods: {
    changeTab(index) {
      const tab = this.topTabs[index].tab;
      if (tab === this.tab) {
        return;
      }
      const params = { tab };
      this.fetchTopics(params);
    },
    onLoad() {
      const params = { tab: this.tab };
      this.fetchTopics(params);
    },
    fetchTopics(params = {}) {
      if (this.loading) {
        return;
      }
      this.$store.dispatch('getTopics', params);
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  position: relative;
  .header {
    position: fixed;
    z-index: 999;
    height: 44px;
    top: 0;
    left: 0;
    right: 0;
  }
  .list {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

<style>
.container .header .van-tab--disabled {
  color: #333;
}
.container .header .van-tab.van-tab--active {
  color: #f44;
}
</style>


