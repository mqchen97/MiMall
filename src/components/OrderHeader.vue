<template>
    <div class="order-header">
        <div class="container clearfix">
            <div class="header-logo">
                <a href="/#/index"></a>
            </div>
            <div class="title">
                <h2>{{title}}<slot name="tip"></slot></h2>
            </div>
            <div class="username">
                <a href="javascript:;">{{username}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'order-header',
    computed:{
        ...mapState(['username'])
    },
    props:['title']
}
</script>

<style lang="less">
@import '../assets/less/config.less';
.order-header{
    padding:30px 0;
    border-bottom: 4px solid @colorA;
    .header-logo{
        float: left;
    }
    .title, .username{
        display: inline-block;
        height: 55px;
        line-height: 55px;
    }
    .title{
        float: left;
        h2{
            color: #333;
            margin-left: 54px;
            font-size: 28px;
        }
        span{
            font-size: 14px;
            margin-left: 17px;
            color: #999;
            font-weight: 200;
        }
    }
    .username{
        float: right;
        a{
            color: #666;
            font-size: 16px;
        }
    }
}
</style>