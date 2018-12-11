<template>
    <div class="info-relative " v-cloak>
        <div class="recharge-position ">
            <div class="recharge-title">
                {{$t('recharge.top.title')}}
            </div>
            <div class="charge-gray-block">
                    <p v-html="$t('recharge.top.p1')"></p>
            </div>

        </div>

    </div>
</template>

<style>
    .bk-img{
        width: 1077px;
        height:588px;
        position: absolute;
        top:2px;
        left:-10px;

    }
    .recharge-position{
        position: relative;
        width: 1028px;
        height: 151px;
        padding:50px 0 0 40px;
        font-weight: 500;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    .recharge-title{
        font-size: 18px;
        line-height: 18px;
        height: 40px;
        padding:0 0 20px 19px;
        border-bottom:1px solid #dddddd;
        margin-bottom: 20px;
        font-weight: 400;
    }
    .charge-gray-block{
        width: 100%;
        min-height: 109px;
        background:#f7f7f7;
        margin: 0 0 5px 0;
        position: relative;
    }
    .charge-gray-block p{
        display: inline-block;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        padding: 9px 0 0 19px;
    }

</style>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    export default{
        data:function () {
            return{
            }
        },
        name:'rechargeTop',
        mounted:function () {
            let _self=this;

        },
        methods:{

        }

    }
    
</script>