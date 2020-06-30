<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/icon_home_off.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/icon_home_on.png">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/hot" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/icon_hot_off.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/icon_hot_on.png">
        <div slot="item-text">热门</div>
      </tab-bar-item>
      <tab-bar-item path="/msg" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/icon_msg_off.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/icon_msg_on.png">
        <div slot="item-text">消息</div>
      </tab-bar-item>
      <tab-bar-item path="/user" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/icon_user_off.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/icon_user_on.png">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }

}
</script>

<style>

</style>