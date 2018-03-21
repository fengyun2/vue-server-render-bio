<template>
  <div id="app">
    <h1>Hello World!</h1>
    <foo></foo>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import Foo from './components/Foo.vue';
export default {
  components: {
    Foo
  }
};
</script>

<style lang="css" scoped>
.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

