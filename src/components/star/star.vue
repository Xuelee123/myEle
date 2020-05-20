<template>
  <div class="star" :class="`star-`+size">
    <span class="star-item" :class="cls" v-for="(cls,index) in classArr" :key="index"></span>
   
  </div>
</template> 

<script>
export default {
  name: 'star',
  data() {
    return {};
  },
  props: {
    //设置size的类型
    size: String,
    //设置score的类型
    score: Number
  },
  //根据分类，计算类名字整数：on，超过0.5half，其余的:off,计算一个数组，数组中储存的
  //classArr=['on','on','on','half','off','off']
  computed: {
    classArr() {
      //定义数组，用来存储类样式的名字
      const clsArr = []
      //先获取score
      const {score} = this
      //计算on的个数
      let scoreInt = Math.floor(score)
      for(let i = 0; i<scoreInt;i++){
        clsArr.push('on')
      }
      //计算half的个数
      let scoreLeft = score - scoreInt
      if(scoreLeft*10>=5){
        clsArr.push('half')
      }

      //计算没有星的个数
      while(clsArr.length<5){
        clsArr.push('off')
      }

      return clsArr
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .star // 2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
                
</style>