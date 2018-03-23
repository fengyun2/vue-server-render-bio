/* import store from './store'
import Table from './components/table'

export default {
  render (h) {
    return (
      <div id="app">
        <p>
          Rendering a {store.state.rows} x {store.state.cols} table,
          with 25 spans in every cell.
          You can render with different row/column counts with URL query, e.g. ?r=30&c=10
        </p>
        <pre>Store state: {JSON.stringify(store.state, null, 2)}</pre>
        <button on-click={() => alert('clicked!')}>Click me</button>
        {" <--"} Just to show that client-side hydration works
        <Table/>
      </div>
    )
  },
  methods: {
    fetchServerData (url) {
      // in real apps you'd call an action that fetches data into
      // the store and returns a Promise
      return new Promise(resolve => {
        setTimeout(() => {
          store.dispatch('navigate', url)
          resolve()
        }, 0)
      })
    }
  }
}
 */

//  导出一个工厂函数，用于创建新的应用程序、router和store实例
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

import titleMixin from './mixins/title'
// mixin for handling title
Vue.mixin(titleMixin)

export function createApp() {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()

  // 同步路由撞他(route state) 到 store
  sync(store, router)

  const app = new Vue({
    // 注入 router 和 store 到根 Vue 实例
    router,
    store,
    // 根实例简单的渲染应用程序组件
    render: h => h(App)
  })

  // 返回 app , router 和 store
  return { app, router, store }
}
