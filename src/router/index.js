import Vue from 'vue'

//引入路由
import VueRouter from 'vue-router'

import routes from './routes'
//声明使用路由
Vue.use(VueRouter)
//默认暴露路由对象
export default new VueRouter(
  {
  mode: 'history',
  routes: routes
})

