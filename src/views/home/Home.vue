<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="nav-center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends" />
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import { getHomeMultidata } from 'network/home'

export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView
    },
    data() {
        return {
            banners: [],
            recommends: []
        }
    },
    created() {
        // 请求多个数据
        getHomeMultidata()
            .then(res => {
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
            .catch(err => {
                 throw err
            })
    },
}
</script>

<style scoped>
    .home-nav{
        background-color: var(--color-text);
        color: #ffffff;
    }
</style>