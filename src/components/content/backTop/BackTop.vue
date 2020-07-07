<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" >
  </div>
</template>

<script>
export default {
  name: 'BackTop',
}
</script>

<style>
  .back-top{
    position: fixed;
    z-index: 3;
    right: 10px;
    bottom: 80px;;
  }
  .back-top img{
    width: 43px;
  }
</style>