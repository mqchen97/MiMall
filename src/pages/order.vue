<template>
  <div>
    <order-header :title="title">
      <template v-slot:tip>
        <span>{{ tip }}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import ServiceBar from "@/components/ServiceBar.vue";
export default {
  name: "order",
  data() {
    return {
      title: "",
      tip: "",
    };
  },
  // mounted() {
  //   if (this.$route.name === "order-confirm") {
  //     this.title = "订单确认";
  //     this.tip = "请认真填写、确认收货地址";
  //   } else if (this.$route.name === "order-list") {
  //     this.title = "订单列表";
  //     this.tip = "";
  //   } else if (this.$route.name === "order-pay") {
  //     this.title = "订单支付";
  //     this.tip = "请谨防钓鱼链接和电话诈骗，了解更多>";
  //   } else {
  //     this.title = "支付宝支付";
  //     this.tip = "请谨防钓鱼链接和电话诈骗，了解更多>";
  //   }
  // },
  components: { OrderHeader, NavFooter, ServiceBar },
  watch: {
    //监听路由
    "$route.name": {
      immediate: true,
      handler(newValue) {
        if (newValue === "order-confirm") {
          this.title = "订单确认";
          this.tip = "请认真填写、确认收货地址";
        } else if (newValue === "order-list") {
          this.title = "订单列表";
          this.tip = "";
        } else if (newValue === "order-pay") {
          this.title = "订单支付";
          this.tip = "请谨防钓鱼链接和电话诈骗，了解更多>";
        }
      },
    },
  },
};
</script>

<style>
</style>