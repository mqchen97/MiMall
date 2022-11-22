<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <div class="nav-menu">
                    <ul class="menu-wrap">
                        <li class="menu-item">
                            <a href="javascript:;">手机 电话卡</a>
                            <div class="children">
                                <ul v-for="(item,i) in menuList" :key="i">
                                    <li v-for="(sub,j) in item" :key="j">
                                        <a :href="sub?'/#/product/'+sub.id:''"><img v-lazy="sub ? sub.img : '/imgs/item-box-1.png'" alt=""> {{sub?sub.name:'小米9'}} </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电视 盒子</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">笔记本 平板</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">家电 插线板</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">出行 穿戴</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">智能 路由器</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电源 配件</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">生活 箱包</a>
                        </li>
                    </ul>
                </div>
                <swiper
                :options="swiperOption">
                    <swiper-slide v-for="(item,index) in sliceList" :key="index">
                        <a :href="'/#/product/'+item.id"><img :src="item.img" alt=""></a>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <div class="ads">
                <a href="'/#/product/' + item.id" v-for="(item,index) in adsList" :key="index">
                <img v-lazy="item.img" alt=""></a>
            </div>
            <div class="banner">
                <a href="/#/product/30">
                    <img v-lazy="'/imgs/banner-1.png'" alt="">
                </a>
            </div>   
        </div>
        <div class="product-box">
                <div class="container">
                    <h2>手机</h2>
                    <div class="wrapper">
                        <div class="banner-left">
                            <a href="/#/product/30">
                                <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
                            </a>
                        </div>
                        <div class="list-box">
                            <div class="list" v-for="(arr,i) in phoneList" :key="i">
                                <div class="item" v-for="(item,j) in arr" :key="j">
                                    <span :class="{'new-pro':j%2===0}">新品</span>
                                    <div class="item-img">
                                        <img v-lazy="item.mainImage" alt="">
                                    </div>
                                    <div class="item-info">
                                        <h3>{{item.name}}</h3>
                                        <p>{{item.subtitle}}</p>
                                        <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>               
            </div>
        <service-bar></service-bar>
        <modal 
            modalType="middle" 
            title="提示" 
            sureText="查看购物车" 
            btnType="1"
            :showModal="showModal"
            @submit="goToCart"
            @cancel="showModal = false"
            >
            <template v-slot:body>
                <p>商品添加成功！</p>
            </template>
        </modal>
    </div>
</template>

<script>
import ServiceBar from '@/components/ServiceBar.vue';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import instance from '@/util/request';
import Modal from '@/components/Modal.vue';
export default {
    name: 'index',
    data(){
        return {
            swiperOption:{
                autoplay: true,
                loop: true,
                effect: 'cube',
                cubeEffect: {
                    // slideShadows:false,
                    shadow:false,
                    shadowOffset: 100,
                    shadowScale: 0.6
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            },
            sliceList:[
                {
                    id:'42',
                    img:'/imgs/slider/slide-1.jpg'
                },
                {
                    id:'45',
                    img:'/imgs/slider/slide-2.jpg'
                },
                {
                    id:'46',
                    img:'/imgs/slider/slide-3.jpg'
                },
                {
                    id:'',
                    img:'/imgs/slider/slide-4.jpg'
                },
                {
                    id:'',
                    img:'/imgs/slider/slide-5.jpg'
                }
            ],
            menuList:[
                [
                    {
                        id:30,
                        img:'/imgs/item-box-1.png',
                        name:'小米CC9'
                    },
                    {
                        id:31,
                        img:'/imgs/item-box-2.png',
                        name:'小米8青春版'
                    },
                    {
                        id:32,
                        img:'/imgs/item-box-3.jpg',
                        name:'Redmi K20 Pro'
                    },
                    {
                        id:33,
                        img:'/imgs/item-box-4.jpg',
                        name:'移动4G专区'
                    },
                ],
                [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
            ],
            adsList:[
                {
                    id:33,
                    img:'imgs/ads/ads-1.png'
                },
                {
                    id:48,
                    img:'imgs/ads/ads-2.jpg'
                },
                {
                    id:45,
                    img:'imgs/ads/ads-3.png'
                },
                {
                    id:47,
                    img:'imgs/ads/ads-4.jpg'
                },
            ],
            phoneList:[],
            showModal:false
        }
    },
    methods:{
        init(){
            instance.get('/products',{
                params:{
                    categoryId:100012,
                    pageSize:14
                }
            }).then(res=>{
                res.list = res.list.slice(6,14)
                this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)]
            })
        },
        addCart(id){
            instance.post('/carts',{
                productId: id,
                selected: true
            }).then(data=>{
                this.showModal = true
                this.$store.dispatch('saveCartCount',data.cartTotalQuantity)
            }).catch(()=>{
                this.showModal = true
            })
        },
        goToCart(){
            this.$router.push('/cart')
        }
    },
    mounted(){
        this.init()
    },
    components:{ ServiceBar, Swiper, SwiperSlide, Modal },
    directives: {
        swiper: directive
    }
}
</script>

<style lang="less" scoped>  
@import './../assets/less/mixin.less';
@import './../assets/less/config.less';
.index{
    .swiper-box{
        .nav-menu{
            position: absolute;
            box-sizing: border-box;
            width: 264px;
            height: 451px;
            z-index: 9;
            padding: 26px 0;
            background-color: #55585A7A;
            .menu-wrap{
                .menu-item{
                    line-height: 50px;
                    height: 50px;
                    a{  
                        display: block;
                        position: relative;
                        font-size: 16px;
                        color: #fff;
                        padding-left: 30px;
                        &:after{
                            content: '';
                            position: absolute;
                            right: 30px;
                            top: 17.5px;
                            .bgImg(10px, 15px, '../imgs/icon-arrow.png')
                        }
                    }
                    &:hover{
                        background-color:@colorA;
                        .children{
                            display: block;
                        }
                    }
                    .children{
                        display: none;
                        width: 962px;
                        height: 451px;
                        background-color: #fff;
                        position: absolute;
                        top: 0;
                        left: 264px;
                        border: 1px solid @colorH;
                        box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                        ul{
                            display: flex;
                            justify-content: space-between;
                            height: 75px;
                            li{
                                height: 75px;
                                line-height: 75px;
                                flex: 1;
                                padding-left: 23px;
                            }
                            a{
                                color: @colorB;
                                font-size: 16px;
                            }
                            img{
                                width: 42px;
                                height: 35px;
                                vertical-align: middle;
                                margin-right: 15px;
                            }
                        }
                    }
                }
            }
           
        }
        .swiper-container{
            height: 451px;
            .swiper-button-prev{
                left:274px;
            }
            img{
                height: 100%;
                width: 100%;
            }
        }
    }
    .ads{
        .flex();
        margin-top: 14px;
        margin-bottom: 31px;
        a{
            height: 167px;
            width: 296px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .banner{
        margin-bottom: 50px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .product-box{
        background-color: @colorJ;
        padding: 30px 0 50px;
        h2{
            font-size: 22px;
            height: 21px;
            line-height:21px;
            color:@colorB;
            margin-bottom:20px;
        }
        .wrapper{
            display: flex;
            .banner-left{
                margin-right: 16px;
                img{
                    width: 224px;
                    height: 619px;
                }
            }
            .list-box{
                .list{
                    .flex();
                    width: 986px;
                    margin-bottom: 14px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    .item{
                        width: 236px;
                        height: 302px;
                        background-color: #fff;
                        text-align: center;
                        span{
                            display: inline-block;
                            width: 67px;
                            height: 24px;
                            font-size: 14px;
                            line-height: 24px;
                            color: #fff;
                            &.new-pro{
                                background-color: #7ECF68;
                            }
                            &.kill-pro{
                                background-color: #E82626;
                            }
                        }
                        .item-img{
                            text-align: center;
                            img{
                                height: 195px;
                                width: auto;
                                margin: 0 -100%;
                            }
                        }
                        .item-info{
                            h3{
                                font-size: 14px;
                                color: @colorB;
                                line-height: 14px;
                                font-weight: bold;
                            }
                            p{
                                color: @colorD;
                                line-height: 13px;
                                margin: 6px auto 13px;
                            }
                            .price{
                                color: #F20A0A;
                                font-style: @fontJ;
                                font-weight: bold;
                                cursor: pointer;
                                &:after{
                                    content: '';
                                    .bgImg(22px,22px,'../imgs/icon-cart-hover.png');
                                    margin-left: 5px;
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>