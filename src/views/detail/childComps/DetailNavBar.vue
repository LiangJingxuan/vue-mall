<template>
  <nav-bar>
    <div slot="nav-left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="nav-center" class="title">
      <div 
        class="title-item"
        v-for="(item, index) in titles" 
        :key="item"  
        :class="{active: index===currentIndex}"
        @click="titleClick(index)"
      >
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DatailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick(){
      this.$router.back()
    }
  },
}
</script>

<style>
.title{
  display: flex;
}
.title-item{
  flex: 1;
}
.active{
  color: red;
}
.back img{
  margin-top: 10px;
}
</style>