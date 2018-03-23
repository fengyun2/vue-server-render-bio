<template>
  <header class="header">
    <van-tabs swipeable @click="changeTab">
      <van-tab v-for="(tab, index) in topTabs" :key="index" :title="tab.title" :swipe-threshold="swipeThreshold">
        内容 {{tab.title}}
      </van-tab>
    </van-tabs>
  </header>
</template>

<script>
import Tab from 'vant/lib/tab';
import Tabs from 'vant/lib/tabs';
import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/tab.css';
import 'vant/lib/vant-css/tabbar.css';

import { topTabs } from '@/utils/tabs';
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      topTabs,
      swipeThreshold: 6
    };
  },
  methods: {
    changeTab(index) {
      const tab = this.topTabs[index];
      console.log(tab);
    }
  }
};
</script>

<style lang="css" scoped>

</style>

