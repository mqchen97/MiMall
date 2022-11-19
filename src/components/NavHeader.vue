<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username">我的订单</a>
                    <a href="javascript:;"  v-if="!username">注册</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item,index) in phoneList" :key="index">
                                    <a :href="`/#/product/${item.id}`" target="_blank">
                                        <div class="pro-img">
                                            <img :src="item.mainImage" :alt="item.name">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price | currency}}元</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMi红米</span>
                        <!-- <div class="children"></div> -->
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                <a href="" target="_blank">
                                    <div class="pro-img">
                                    <img src="/imgs/nav-img/nav-3-1.jpg" alt="">
                                    </div>
                                    <div class="pro-name">小米壁画电视 65英寸</div>
                                    <div class="pro-price">6999元</div>
                                </a>
                                </li>
                                <li class="product">
                                <a href="" target="_blank">
                                    <div class="pro-img">
                                    <img src="/imgs/nav-img/nav-3-2.jpg" alt="">
                                    </div>
                                    <div class="pro-name">小米全面屏电视E55A</div>
                                    <div class="pro-price">1999元</div>
                                </a>
                                </li>
                                <li class="product">
                                <a href="" target="_blank">
                                    <div class="pro-img">
                                    <img src="/imgs/nav-img/nav-3-3.png" alt="">
                                    </div>
                                    <div class="pro-name">小米电视4A 32英寸</div>
                                    <div class="pro-price">699元</div>
                                </a>
                                </li>
                                <li class="product">
                                <a href="" target="_blank">
                                    <div class="pro-img">
                                    <img src="/imgs/nav-img/nav-3-4.jpg" alt="">
                                    </div>
                                    <div class="pro-name">小米电视4A 55英寸</div>
                                    <div class="pro-price">1799元</div>
                                </a>
                                </li>
                                <li class="product">
                                <a href="" target="_blank">
                                    <div class="pro-img">
                                    <img src="/imgs/nav-img/nav-3-5.jpg" alt="">
                                    </div>
                                    <div class="pro-name">小米电视4A 65英寸</div>
                                    <div class="pro-price">2699元</div>
                                </a>
                                </li>
                                <li class="product">
                                <a href="" target="_blank">
                                    <div class="pro-img">
                                    <img src="/imgs/nav-img/nav-3-6.png" alt="">
                                    </div>
                                    <div class="pro-name">查看全部</div>
                                    <div class="pro-price">查看全部</div>
                                </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" name="keyword" placeholder="请输入商品信息">
                        <a href="javascript:;"></a>
                    </div>
        
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import instance from '@/util/request';
export default {
    name:'nav-header',
    data(){
        return {
            username: '',
            phoneList: []
        }
    },
    filters:{
        currency(val){
            if(!val) return '0.00'
            return '￥'+val.toFixed(2)+'元'
        }
    },
    methods: {
        login(){
            this.$router.push('/login')
        },
        goToCart(){
            this.$router.push('/cart')
        },
        getProductList(){
            instance.get('/products',{
                params:{
                    categoryId:'100012',
                    pageSize:6
                }
            }).then(res=>{
                this.phoneList = res.list;
            })
        }
    },
    mounted(){
        this.getProductList();
    }
}
</script>

<style lang="less" scoped>
@import './../assets/less/mixin.less';
@import '../assets/less/config.less';
.nav-topbar{
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #B0B0B0;
    .container{
        .flex();
        a{
            display: inline-block;
            color: #B0B0B0;
            margin-right: 17px;
        }
        .my-cart{
            width: 110px;
            background-color: #FF6600;
            text-align: center;
            color: #fff;
            .icon-cart{
                .bgImg(16px,12px,'../icon-cart-checked.png');
                // display: inline-block;
                // width: 16px;
                // height: 12px;
                // background: url('../assets/icon-cart-checked.png') no-repeat center;
                // background-size: contain;
                margin-right: 4px;
            }
        }
    }
}
.nav-header{
    .container{
        position: relative;
        height: 112px;
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        .flex();
        .header-logo{
            display: inline-block;
            width: 55px;
            height: 55px;
            background-color: #FF6600;
            a{
                display: inline-block;
                width: 110px;
                height: 55px;
                &:before{
                    content: '';
                    .bgImg(55px,55px,'../mi-logo.png');
                    // display: inline-block;
                    // height: 55px;
                    // width: 55px;
                    // background: url('../assets/mi-logo.png') no-repeat center;
                    background-size: contain;
                    transition: margin .2s;
                }
                &:after{
                    content: '';
                    .bgImg(55px,55px,'../mi-home.png');
                    // display: inline-block;
                    // height: 55px;
                    // width: 55px;
                    // background: url('../assets/mi-home.png') no-repeat center;
                    // background-size: contain;
                }
                &:hover:before{
                    margin-left: -55px;
                    transition: margin .2s;
                }
            }
        }
        .header-menu{
            display: inline-block;
            width: 643px;
            padding-left: 209px;
            .item-menu{
                display: inline-block;
                color: #333;
                font-weight: bold;
                font-size: 16px;
                line-height: 112px;
                margin-right: 20px;
                span{
                    cursor: pointer;
                }
            
                &:hover{
                    color: @colorA;
                    .children{
                        height: 220px;
                        opacity: 1;
                    }
                }
                .children{
                    position: absolute;
                    top: 112px;
                    left: 0;
                    width: 1226px;
                    height: 0px;
                    opacity: 0;
                    overflow: hidden;
                    border-top: 1px solid @colorH;
                    box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                    z-index: 10;
                    transition: all 0.5s;
                    background-color: #fff;
                    .product{
                        position: relative;
                        float: left;
                        width: 16.6%;
                        height: 220px;
                        line-height: 12px;
                        font-size: 12px;
                        text-align: center;
                        a{
                            display: inline-block;
                        }
                        img{
                            width: auto;
                            height: 111px;
                            margin-top: 26px;
                        }
                        .pro-img{
                            height: 137px;
                        }
                        .pro-name{
                            font-weight: bold;
                            margin-top: 19px;
                            margin-bottom: 8px;
                            color: @colorB;
                        }
                        .pro-price{
                            color: @colorA;

                        }
                        &:before{
                            position: absolute;
                            content: "";
                            top: 28px;
                            right: 0;
                            border-left: 1px solid @colorF;
                            height: 100px;
                            width: 1px;
                        }
                        &:last-child:before{
                            display: none;
                        }
                    }
                }
            }
        }
        .header-search{
            width: 319px;
            .wrapper{
                height: 50px;
                border: 1px solid #E0E0E0;
                display: flex;
                align-items: center;
                input{
                    box-sizing: border-box;
                    border: none;
                    border-right: 1px solid #E0E0E0;
                    width: 264px;
                    height: 50px;
                    padding-left: 14px;
                }
                a{
                    .bgImg(18px,18px,'../imgs/icon-search.png');
                    // width: 18px;
                    // height: 18px;
                    // background: url('../assets/icon-search.png') no-repeat center;
                    // background-size: contain;
                    margin-left: 17px;
                }
            }
        }
    }
}
</style>