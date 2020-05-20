import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_GOODS,CLEAR_CART_FOOD
  ,RECEIVE_TOKEN, RECEIVE_USER, RESET_USER, RESET_TOKEN,RECEIVE_INFO,ADD_FOODCOUNT,REMOVE_FOODCOUNT} from './mutation-types'
  
import Vue from 'vue'

export  default {
  [RECEIVE_ADDRESS](state, address){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
  [RECEIVE_TOKEN](state, token) {
    state.token = token
  },
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  [RESET_USER](state) {
    state.user = {}
  },
  [RESET_TOKEN](state) {
    state.token = ''
  },
  [RECEIVE_GOODS](state, goods) {
    state.goods = goods
  },
  [RECEIVE_INFO](state, info) {
    state.info = info
  },
  [ADD_FOODCOUNT](state, {food}){
    
      if(!food.count){
        Vue.set(food, 'count',1)
        state.cartFood.push(food)
      }else{
        food.count++
      }
      
    
  },
  [REMOVE_FOODCOUNT](state, {food}){
    if(food.count>0){
      food.count--
      if(food.count===0){
        state.cartFood.splice(state.cartFood.indexOf(food),1)
      }
    }
   
  },
  [CLEAR_CART_FOOD](state) {
    state.cartFood.forEach(food=>
      food.count= 0
    )
    state.cartFood=[]
  }
} 