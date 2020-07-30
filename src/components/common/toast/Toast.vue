<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    name: 'Toast',
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='操作成功！', duration=1500){
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    },
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    color: #fff;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 5px;
    z-index: 10;
  }
</style>