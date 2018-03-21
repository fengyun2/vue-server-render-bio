/* import Vue from 'vue'
import App from './app'
import store from './store'

const app = new Vue(App)

export default context => {
  return app.fetchServerData(context.url).then(() => {
    context.initialState = store.state
    return app
  })
}
 */

// 服务端入口
import { createApp } from './app';
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个Promise, 以便服务器能够等待所有的内容在渲染前,就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    // 设置服务器端 router 位置
    router.push(context.url);
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由, 执行 reject函数,并返回 404
      if (!matchedComponents.length) {
        return reject({
          code: 404
        });
      }
      // Promise 应该 resolve 程序实例, 以便它可以渲染
      resolve(app);
    }, reject);
  });
};
