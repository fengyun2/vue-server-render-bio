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
$header-bgcolor: #f60;
.header {
  background-color: $header-bgcolor;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;

  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 15px 5px;
  }

  a {
    color: rgba(255, 255, 255, 0.8);
    line-height: 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: 0.075em;
    margin-right: 1.8em;

    &:hover {
      color: #fff;
    }
    &.router-link-active {
      color: #fff;
      font-weight: 400;
    }
  }
}

@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}
@media (max-width: 600px) {
  .header {
    .inner {
      padding: 15px;
    }
    a {
      margin-right: 1em;
    }
  }
}
</style>

