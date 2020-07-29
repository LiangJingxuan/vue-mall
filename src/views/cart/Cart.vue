<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="nav-center">购物车({{cartLength}})</div>
        </nav-bar>
        <!-- 列表 -->
        <cart-list />
        <!-- 底部汇总 -->
        <cart-bottom-bar />
    </div>
</template>

<script>
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import NavBar from 'components/common/navbar/NavBar'

import {mapGetters} from 'vuex'

export default {
    name: 'Cart',
    components: {
        CartList,
        CartBottomBar,
        NavBar,
    },
    computed: {
        ...mapGetters([
           'cartLength'
        ])
    },
}
</script>

<style scoped>
    .cart{
        height: 100vh;
    }
    .nav-bar{
        background-color: var(--color-text);
        color: #fff;
    }
</style>