<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button" />
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    // 总计价格
    totalPrice(){
      return '￥' + this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((preValue, item) => preValue + item.price * item.count, 0)
        .toFixed(2)
    },
    // 总数
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    // 全选
    isSelectAll(){
      // return !this.$store.state.cartList.filter(item => !item.checked).length
      return this.$store.state.cartList.length ? !this.$store.state.cartList.find(item => !item.checked) : false
    }
  },
  methods: {
    checkClick(){
      // 全选中
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked=false)
      }else{
        this.$store.state.cartList.forEach(item => item.checked=true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择要购买的商品')
      }
    }
  },
}
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background: #eee;
    font-size: 14px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 30px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>