/* import Vue from 'vue'
import App from './app'

var s = Date.now()
new Vue(App).$mount('#app')
console.log(`client render took ${(Date.now() - s)}ms`)
 */

// 客户端入口，客户端只需创建应用程序，并且将其挂载到DOM中
import { createApp } from './app';
const { app } = createApp();
// 这里假定 App.vue 模板根元素具有 id="app"
app.$mount('#app');
