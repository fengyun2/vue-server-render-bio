// router.js
/* 类似于createApp, 我们也需要给每个请求一个新的router实例，所以文件导出一个createRouter函数 */
import Vue from 'vue';
import Router from 'vue-router';

// import Bar from '../components/Bar.vue';
// import Tom from '../components/Tom.vue';

const Bar = () => import('../components/Bar.vue');
const Tom = () => import('../components/Tom.vue');

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/bar',
        name: 'bar',
        component: Bar
      },
      {
        path: '/tom',
        name: 'tom',
        component: Tom
      }
    ]
  });
}
