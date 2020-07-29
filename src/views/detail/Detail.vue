<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommend } from 'network/detail'
import { itemListenerMixin, backTopMixin } from 'common/mixin'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [ itemListenerMixin, backTopMixin ],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
    }
  },
  created() {
    // 保存id
    this.iid = this.$route.params.id
    // 通过id查询详情数据
    getDetail(this.iid)
      .then(res => {
        // console.log(res)
        const data = res.result

        // 获取顶部轮播图片数据
        this.topImages = data.itemInfo.topImages

        // 获取商品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品详情数据
        this.detailInfo = data.detailInfo

        // 获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论信息
        this.commentInfo = data.rate.cRate ? data.rate.list[0] : {}

        // 数据渲染完之后执行的函数
        this.$nextTick(() => {
          
        })
      })

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    // 图片加载监听
    imgLoad(){
      this.$refs.scroll.refresh()
      // 点击导航跳转对应位置
      this.themeTopYs = [];
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)
    },
    // 点击导航跳转对应位置
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    // 滚动内容显示对应标题
    contentScroll(position){
      // console.log(position)
      // 获取y值
      const positionY = -position.y
      // y值和主题中的值进行对比
      let length = this.themeTopYs.length
      for(let i=0; i<length; i++){
        if( this.currentIndex!==i && 
          ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) || 
          (i === length-1 && positionY>=this.themeTopYs[i])) ){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 判断backtop是否显示
      this.isShowBackTop =  (-position.y) > 1000
    },
    // 加入购物车
    addToCart(){
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      
      // 2. 将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)

    }
  },
  mounted() {
    
  },
  updated() {
    
  },
  destroyed() {
      // 取消全局事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background: #ffffff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background: #ffffff;
}
.content{
  height: calc(100% - 44px - 49px);
}
</style>