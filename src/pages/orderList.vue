<template>
  <div class="order-list">
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          
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
          <el-pagination
            class="pagination"
            v-if="paginationShow"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            @current-change="handleChange"
            :total="total">
          </el-pagination>
          <div class="load-more"
            v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-if="!busy">
          </div>
        </div>
        <no-data v-if="loading === false && list.length === 0"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "@/util/request";
import Loading from "@/components/Loading.vue";
import NoData from "@/components/NoData.vue";
import { Pagination } from "element-ui";
export default {
  name: "order-list",
  data() {
    return {
      list: [], //订单列表
      loading: true,
      pageSize: 10, //使用分页器时每页订单数
      pageNum: 1, //使用分页器时当前页码
      total: 0, //总订单数
      paginationShow:false, //是否使用分页器
      busy: true, //控制滚动加载
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    //获取订单列表
    getOrderList() {
      instance.get("/orders",{
        params:{
          pageSize: this.pageSize,
          pageNum : this.pageNum
        }
      })
      .then((res) => {
        //this.list = res.list; //分页器时加载每页订单
        //this.total = res.total //使用分页器时有知道所有订单数的需求，计算总页数
        this.list = this.list.concat(res.list) //滚动加载时在后面增加订单
        if(res.hasNextPage === true){
          this.busy = false
        }else{
          this.busy = true
        }
        this.loading = false
      })
      .catch(()=>{
        this.loading = false
        this.$message.warning('订单列表加载失败')
      })
    },
    //从未支付前往支付页面
    goPay(orderId) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo: orderId,
        },
      });
    },
    //使用分页器时，点击页码跳转
    handleChange(pageNum){
      this.pageNum = pageNum
      this.getOrderList()
    },
    loadMore(){
      this.busy = true
      this.pageNum++
      this.getOrderList()
    }
  },
  components:{
    Loading,
    NoData,
    [Pagination.name] : Pagination
  }
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
      .load-more {
        text-align: center;
      }
    }
  }
}
</style>