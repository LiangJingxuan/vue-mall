<template>
  <div class="cart-list">
    <scroll class="content" ref="srcoll">
      <cart-list-item v-for="(item) in cartList" :key="item.iid" :product="item" />
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'

export default {
  name: 'CartList',
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  activated() {
    this.$refs.srcoll.refresh()
  },
}
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>