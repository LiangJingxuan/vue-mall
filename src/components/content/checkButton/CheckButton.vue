<template>
  <div class="icon-selector" :class="{check: isChecked}">
    <img src="~/assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .icon-selector{
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
  .check{
    border-color: red;
    background-color: red;
  }
</style>