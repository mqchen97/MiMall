<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import storage from './storage';
export default {
  name: 'App',
  mounted(){
    console.log(storage.getStorage());
    storage.clear("b", "user")
  }
}
</script>

<style>
</style>
