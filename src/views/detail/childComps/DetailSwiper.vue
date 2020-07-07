<template>
  <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages" :key="item">
          <a :href="item.link">
              <img :src="item">
          </a>
      </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<style>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>>