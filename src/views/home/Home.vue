<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="nav-center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control @tabClick="tabClick" class="tab-control" :titles="['流行','新款','精选']" />
        <goods-list :goods="showGoods" />
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabConrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
    name: 'Home',
    components: {
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList
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
            currentType: 'pop'
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
            })
        }
    },
}
</script>

<style scoped>
    #home{
        padding-top: 44px;
    }
    .home-nav{
        background-color: var(--color-text);
        color: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
    .tab-control{
        position: sticky;
        top: 44px;
    }
</style>