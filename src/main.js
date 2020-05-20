import Vue from 'vue'

import App from './App'
//引入路由并且挂载到vue上
import router from './router'
import store from './store'
import {Button} from  'mint-ui'
import cartControl from './components/cartControl/cartControl'
import Header from './components/Header/Header'
import star from './components/star/star'
import './vee-validate'
import VueLazyload from 'vue-lazyload'
//执行一次mock-serve
import './mock/mock-server'
import loading from './common/images/loading.gif'
//注册全局组件
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component('cartControl',cartControl)
Vue.component('star',star)

Vue.use(VueLazyload, {
  loading
})
//设置是否显示提示信息
Vue.config.productionTip = false
new Vue (
  { store,
    router,
    render: h => h(App)
  }
).$mount('#app')