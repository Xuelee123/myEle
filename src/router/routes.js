import Login from '../pages/Login/Login.vue'

// import MSite from '../pages/MSite/MSite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// import Search from '../pages/Search/Search.vue'

const MSite = () => import('../pages/MSite/MSite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Search = () => import('../pages/Search/Search.vue')

import Shop from '../pages/Shop/Shop.vue'
import goods from '../pages/Shop/Goods/Goods'
import rating from '../pages/Shop/Rating/Rating'
import info from '../pages/Shop/Info/Info'



export default [
  {
    path: '/', redirect:'/Profile' 
  },
  {
    path: '/Login', component: Login
  },
  {
    path: '/MSite', component: MSite ,meta:{isShowFooter:true}
  },
  {
    path: '/Order', component: Order ,meta:{isShowFooter:true}
  },
  {
    path: '/Profile', component: Profile ,meta:{isShowFooter:true}
  },
  {
    path: '/Search', component: Search ,meta:{isShowFooter:true}
  },
  {
    path: '/Shop', component: Shop ,
    children:[
     { path: '/Shop/goods',component: goods},
     { path: '/Shop/rating',component: rating},
     { path: '/Shop/info',component: info},
     {path:'/Shop', redirect:'/Shop/info'},
    ]
  }

]