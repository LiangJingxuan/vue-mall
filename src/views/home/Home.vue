<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="nav-center">购物街</div>
        </nav-bar>
        <tab-control 
            @tabClick="tabClick" 
            class="tab-control" 
            :titles="['流行','新款','精选']" 
            ref="tabControl1"
            v-show="isTabFixed"
        />
        <scroll class="content" ref="scroll" 
            :probe-type="3" 
            :pull-up-load="true" 
            @scroll="contentScroll"
            @pullingUp="loadMore"
        >
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
            <recommend-view :recommends="recommends" />
            <feature-view />
            <tab-control 
                @tabClick="tabClick" 
                class="tab-control" 
                :titles="['流行','新款','精选']" 
                ref="tabControl2"
            />
            <goods-list :goods="showGoods" />
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabConrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'

export default {
    name: 'Home',
    components: {
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                pop: {page: 0, list: []},
                new: {page: 0, list: []},
                sell: {page: 0, list: []}
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
        }
    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    created() {
        // 轮播图与分类数据请求
        this.getHomeMultidata()

        // 商品列表数据请求
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        // 监听item中图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh, 500)
        this.$bus.$on('itemImageLoad', () => {
            refresh()
        })
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
        /**
            事件监听相关的方法
         */
        // 商品列表分类查询
        tabClick(index){
            switch(index){
                case 0 :
                    this.currentType = 'pop'
                    break
                case 1 :
                    this.currentType = 'new'
                    break
                case 2 :
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        },
        // 返回顶部
        backClick(){
            this.$refs.scroll.scrollTo(0, 0)
        },
        // 返回顶部显示隐藏
        contentScroll(position){
            // 判断backtop是否显示
            this.isShowBackTop =  (-position.y) > 1000
            
            // 决定tabcontrol是否吸顶
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        // 加载更多
        loadMore(){
            this.getHomeGoods(this.currentType)
        },
        // 分类吸顶
        swiperImageLoad(){
            // 分类吸顶获取tabControl的offsetTop
            // $el 获取组件中的元素
            // console.log(this.$refs.tabControl.$el.offsetTop)

            // 
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },

        /**
            网络请求相关的方法
         */
        // 轮播图与分类数据请求
        getHomeMultidata(){
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        },
        // 商品列表数据请求
        getHomeGoods(type){
            const page = this.goods[type].page+1
            getHomeGoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page+=1

                // 完成上拉加载更多
                this.$refs.scroll.finishPullUp()
            })
        }
    },
}
</script>

<style scoped>
    #home{
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-text);
        color: #ffffff;
        /*position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;*/
    }
    .tab-control{
        position: relative;
        z-index: 9;
    }
    .content{
        /*height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px;*/

        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>