/* import Vue from 'vue'
import App from './app'

var s = Date.now()
new Vue(App).$mount('#app')
console.log(`client render took ${(Date.now() - s)}ms`)
 */

// 客户端入口，客户端只需创建应用程序，并且将其挂载到DOM中
import Vue from 'vue'
import { createApp } from './app'
const { app, router, store } = createApp()

// 当路由组件重用时，也应该调用 `asynData` 函数
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  /* 1. 在路由导航之前解析数据： */
  // 添加路由钩子函数，用于处理 asyncData.
  // 初始化路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已由的数据
  // 使用 `router.beforeResolve()`, 以便确保所有一部组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们, 找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      // eslint-disable-next-line
      return diffed || (diffed = prevMatched[i] !== c)
    })
    if (!activated.length) {
      return next
    }
    // 这里如果有加载指示器(loading indicator), 就触发
    Promise.all(
      activated.map(c => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to })
        }
      })
    )
      .then(() => {
        // 停止加载指示器(loading indicator)
        next()
      })
      .catch(next)
  })

  // 这里假定 App.vue 模板根元素具有 id="app"
  app.$mount('#app')
})
