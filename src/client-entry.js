/* import Vue from 'vue'
import App from './app'

var s = Date.now()
new Vue(App).$mount('#app')
console.log(`client render took ${(Date.now() - s)}ms`)
 */

// 客户端入口
import { createApp } from './app';
const { app } = createApp();
app.$mount('#app');
