<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import instance from './util/request';
export default {
  name: 'App',
  data(){
    return {
    }
  },
  mounted(){
    this.getUser()
    this.getCartCount()
  },
  methods:{
    getUser(){
      instance.get('/user').then(data=>{
        this.$store.dispatch('saveUserName',data.username)
      })
    },
    getCartCount(){
      instance.get('/carts/products/sum').then(data=>{
        this.$store.dispatch('saveCartCount',data)
      })
    }
  }
}
</script>

<style lang="less">
@import './assets/less/reset.less';
@import './assets/less/base.less';
@import './assets/less/mixin.less';
@import './assets/less/button.less';
</style>
