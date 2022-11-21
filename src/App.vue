<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
    }
  },
}
</script>

<style lang="less">
@import './assets/less/reset.less';
@import './assets/less/base.less';
@import './assets/less/mixin.less';
@import './assets/less/button.less';
</style>
