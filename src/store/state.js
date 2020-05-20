//包含多个状态数据的对象
export default {
  //经度
  longitude: '116.36867',
  //纬度
  latitude: '40.10038',
  //地址信息
  address: {},
  //食品分类信息
  categorys: [],    
  //商铺列表信息
  shops: [],

  //用户信息
  user: {},
  //token信息--》本身储存的是字符串
  token: localStorage.getItem('token_key'),

  //点餐的信息
  goods: [],
  //评价的信息
  ratings: [],
  //商家信息
  info: {},
  //用来储存购物车中的食物的数组
  cartFood:[]
}