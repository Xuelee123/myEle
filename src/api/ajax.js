////引入axios
import axios from 'axios'
//引入qs 将对象数据转urlEncoding
import qs from 'qs'
//引入store
import store from '../store'
import {Toast} from 'mint-ui'
//引入router
import router from '../router'
//添加请求拦截器
axios.interceptors.request.use(config => {
  //这里默认是将请求当做get请求来获取config对象的
  const {method, data} = config
  //如果是POST请求
  if(method.toUpperCase() === 'POST' && data instanceof Object){
    config.data = qs.stringify(data)
  }
  //判断当前的接口是否需要携带token
  if(config.headers.needToken) {
    //若此时需要token，取出token
    const token = store.user.token
   
    //判断token是否存在
    if(!token) {
      const error = new Error('没有获取到token，请重新登录')
      //设置错误码
      error.status = 401
      //抛出一个错误信息
      throw error 
    } else {
      //有token，把token添加到请求头中去
      config.headers.authorization = token
    }
  }

  return config
})

//添加响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error =>{
  //判断当前的错误信息是请求还是响应
  if(!error.response) {
    //请求的错误
    //401代表未授权，登录失败
    if(error.status === 401){
      //跳转到/login登录页面==》先判断是不是login界面
      //currentRoute当前的路由组件
      if(router.currentRoute.path !== '/login'){
        //提示错误信息
        Toast(error.message)
        //同时跳转到登录页面
        router.replace('/login')
      }
    }

  } else {
    //错误信息是响应的错误
    //首先获取响应时候的错误码
    const status = error.response.status
    if(status === 401){
      //如果token过期了；提示错误信息
      Toast(error.response.data.message)
      //同时初始化token信息
      store.dispatch('resetLogin')
      //跳转到登录页面
      router.replace('/login')
    }else if (status === 404) {
      //找不到资源
      Toast ('没有资源')
    } else {
      Toast ('请求错误：'+error.message)
    }
  }
  //中断当前的错误信息，继续的响应
  return new Promise(()=>{})
})

//暴露axios

export default axios