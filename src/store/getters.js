export default{
  totalAmount(state){
   return state.cartFood.reduce((pre, currFood)=>{
     return pre+currFood.count
    },0)
  },
  totalPrice(state){
   return state.cartFood.reduce((pre, currFood)=>{
      return pre+currFood.count*currFood.price
     },0)
  }
}