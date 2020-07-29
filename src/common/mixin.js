import { debounce } from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

// 商品列表图片监控
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    // 对监听的事件进行保存
    this.itemImgListener = () => {
        refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
}

// 返回顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    // 返回顶部
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  },
}