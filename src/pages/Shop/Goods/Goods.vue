<template>
  <div>
  <div class="goods">
    <div class="menu-wrapper">
      <ul ref="leftUI">
        <li class="menu-item" :class="{current: currentIndex===index}" 
        v-for="(good, index) in goods" 
        :key="index"
        @click = "clickItem(index)"
        >
          <span class="text bottom-border-1px">
            <img
              class="icon"
              :src=good.icon
              v-if="good.icon"
            />
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul ref="rightUI">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul >
            <li class="food-item bottom-border-1px" 
            v-for="(food, index) in good.foods" 
            :key="index"
            @click="foodShow(food)"
            >
              <div class="icon">
                <img
                  width="57"
                  height="57"
                  :src= food.icon
                />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper"> <cartControl :food="food" /></div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <shopCart />
  </div>
  <food :food="food" ref="food"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//引入BScroll
import BScroll from 'better-scroll'
import shopCart from './shopCart'
import food from './food'
export default {
  name: 'Goods',
  components: {
    food,
    shopCart
  },
   data(){
    return {
      scrollY: 0, //滑动的距离值
      tops: [], //右侧列表高度的范围数组
      food: {}
    }
  },
  computed: {
    ...mapState({
      goods: state=>state.goods
    }),
    //计算属性--计算的是索引
    //这里是根据scrollY的值
    currentIndex() {
      const {scrollY, tops} = this
      const index = tops.findIndex(
        (top, index) => scrollY>= top && scrollY < tops[index + 1] 
      )
      if(this.leftscroll){
        
        const li = this.$refs.leftUI.children[index]
        this.leftscroll.scrollToElement(li, 300)
      }
      return index
    }
  },
  async mounted () {
    await this.$store.dispatch('getGoods')
    //初始化滑动对象
     this._innitBScroll()
     this._initTops()
     console.log(this.goods);
  },
 
  methods: {
    //实例化滑动对象
    _innitBScroll(){
      //实例化左侧滑动BScroll对象
      this.leftscroll = new BScroll('.menu-wrapper', {
        click: true
      })
      //实例化右侧滑动BScroll对象
      this.rightscroll = new BScroll('.foods-wrapper',{
        click: true,
        //1非实时 2实时 3实时的 惯性
        probeType: 1

      })
      //右侧纵向滑动的时候获取y滑动的值
      this.rightscroll.on('scroll', ({x, y})=>{
        this.scrollY = Math.abs(y)
      })
      //右侧纵向滑动的停止的时候获取y滑动的值
      this.rightscroll.on('scrollEnd', ({x, y})=>{
        this.scrollY = Math.abs(y)
      })

    },
    _initTops() {
      const tops = []
      let top = 0
      tops.push(top)
      //获取右侧ul中所有的li
      const list = this.$refs.rightUI.children
      Array.prototype.slice.call(list).forEach(
        li=> {
          top += li.clientHeight
          tops.push(top)
        }
      )
      this.tops = tops
    },
    clickItem(index) {
      //获取上下滑动的值
      const scrollY = this.tops[index]
      this.scrollY = scrollY
      this.rightscroll.scrollTo(0, -scrollY, 300)

    },
    foodShow(food) {
     this.food = food
     this.$refs.food.toggleFood()
    },

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  
  @import '../../../common/stylus/mixins.styl'
  .goods
    display flex
    position absolute
    top 225px
    bottom 46px
    width 100%
    background #fff
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          color $green
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
        .text
          display table-cell
          width 56px
          vertical-align middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px

</style>

