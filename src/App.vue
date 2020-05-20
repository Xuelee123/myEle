<template>
<div>
 <router-view></router-view>
 <FooterGuide v-show="$route.meta.isShowFooter" />
</div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import {reqAutoLogin, reqCategorys} from './api'
export default {
  components:{
    FooterGuide
  },

   mounted(){
      this.$store.dispatch('autoLogin')
  }
   
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 
</style>