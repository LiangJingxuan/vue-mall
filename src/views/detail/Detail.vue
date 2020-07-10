<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />   
    </scroll>
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

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, GoodsInfo, Shop, GoodsParam } from 'network/detail'

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
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
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
      })
  },
  methods: {
    imgLoad(){
      this.$refs.scroll.refresh()
    }
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
  height: calc(100% - 44px);
}
</style>