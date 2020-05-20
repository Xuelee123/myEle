import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS,RECEIVE_USER, RECEIVE_TOKEN, RESET_USER, RESET_TOKEN
  , RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO,ADD_FOODCOUNT,REMOVE_FOODCOUNT,CLEAR_CART_FOOD} from './mutation-types'

  import {reqCategorys, reqAddress, reqShops, reqAutoLogin, reqGoods,reqInfo} from '../api'
  //发送异步请求

  export default {
    async getAddress({state, commit}) {
      const {longitude, latitude} = state
      const result = await reqAddress({longitude, latitude}) 
      if(result.code == 0) {
        const address = result.data
        commit(RECEIVE_ADDRESS,address)
      }
    },
    async getCategorys({commit}) {
      const result = await reqCategorys()
      if(result.code==0){
        const categorys = result.data
        commit(RECEIVE_CATEGORYS, categorys)
      }
     
    },

    async getShops({state, commit}) {
      const {longitude, latitude} = state
      const  result = await reqShops({longitude, latitude})
      if(result.code === 0){
        const shops = result.data
        commit(RECEIVE_SHOPS, shops)
      }
    },
     saveUser({commit}, user) {
      const token = user.token
      commit(RECEIVE_TOKEN, token)
      localStorage.setItem('token_key', token) 
      delete user.token
      commit(RECEIVE_USER, user)
    },
    resetLogin({commit}) {
      //重置user
      commit(RESET_USER)

      //重置token
      commit(RESET_TOKEN)
      //删除localStorage中的token
      localStorage.removeItem('token_key')

    },
  //     //自动登录操作
  // async autoLogin ({commit,state}) {
  //   //发送请求
  //   if(state.token) {
  //     const result = await reqAutoLogin()
  //     if(result.code === 0) {
  //       const user = result.data
  //       commit(RECEIVE_USER, user)
  //     }
  //   }
  // },
  //获取商品列表
  async getGoods({commit, state}) {
    const result = await reqGoods()
    if(result.code  === 0){
      const goods =result.data
      commit(RECEIVE_GOODS,goods)
    }
  },
  async getInfo({commit, state}) {
    const result = await reqInfo()
    if(result.code  === 0){
      const info =result.data
      commit(RECEIVE_INFO,info)
    }
  },
  //改变count的数量
  changeCount({commit}, {isAdd,food}){
    if(isAdd){
      commit(ADD_FOODCOUNT, {food})
    } else {
      commit(REMOVE_FOODCOUNT, {food})
    }
    
  },
  //清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART_FOOD)
  }
    
  }
  