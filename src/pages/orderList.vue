<template>
  <div class="order-list">
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ order.createTime }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.orderNo }}
                <span>|</span>
                {{ order.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(good, i) in order.orderItemVoList"
                  :key="i"
                >
                  <div class="good-img">
                    <img :src="good.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ good.productName }}</div>
                    <div class="p-money">{{ good.totalPrice }}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status === 20">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-if="order.status === 10">
                <a href="javascript:;" @click="goPay(order.orderNo)">{{
                  order.statusDesc
                }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "@/util/request";
export default {
  name: "order-list",
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      instance.get("/orders").then((res) => {
        this.list = res.list;
      });
    },
    goPay(orderId) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo: orderId,
        },
      });
    },
  },
};
</script>

<style lang="less">
@import "./../assets/less/config.less";
@import "./../assets/less/mixin.less";
.order-list {
  .wrapper {
    background-color: @colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        .border();
        background-color: @colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          .height(74px);
          background-color: @colorK;
          padding: 0 43px;
          font-size: 16px;
          color: @colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: @colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: @colorB;
              }
            }
          }
          .good-state {
            .height(145px);
            font-size: 20px;
            color: @colorA;
            a {
              color: @colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>