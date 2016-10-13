import Vue from 'vue'
import App from './app'

var s = Date.now()
new Vue(App).$mount('#app')
console.log(`client render took ${(Date.now() - s)}ms`)
