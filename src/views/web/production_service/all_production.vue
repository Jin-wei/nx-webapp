<template>
    <div>
        <div class="produce-banner">
            <div class="produce-title-margin">
                <p class="produce-title-large">{{$t('all_produce.banner.title')}}</p>
                <p class="produce-title-small" v-html="$t('all_produce.banner.content')"></p>
            </div>
        </div>
        <div class="min-width">
            <div class="produce-message" v-for="message in $t('all_produce.messageVoice')">
                <div class="ul-title">
                    <div class="ul-title-top">
                        <hr class="title-line">
                        <span v-html="message.title"></span>
                        <hr class="title-line">
                    </div>
                    <div class="ul-title-bottom">
                        <span v-html="message.small"></span>
                    </div>
                </div>
                <div>
                    <ul class="produce-ul">
                        <li class="produce-li" v-for="message in message.ul">
                            <img class="produce-li-img" :src='"/static/images/img/produce/"+message.icon' alt="">
                            <p class="produce-li-title" v-html="message.title"></p>
                            <p class="produce-li-small" v-html="message.small"></p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="produce-data">
                <div class="data-title">
                    <div class="ul-title-top">
                        <hr class="title-line">
                        <span>{{$t('all_produce.number.title')}}</span>
                        <hr class="title-line">
                    </div>
                    <div class="ul-title-bottom">
                        <span v-html="$t('all_produce.number.small')"></span>
                    </div>
                </div>
                <div class="ul-text">
                    <img class="left-quotes" src="/static/images/img/produce/left-quotes.png" alt="">
                    <p  class="ul-text-p" v-html="$t('all_produce.number.text')"></p>
                    <img  class="right-quotes" src="/static/images/img/produce/right-quotes.png" alt="">
                </div>
                <div class="numberSlider">
                    <div class="slide" v-for="data in $t('all_produce.number.ul')">
                        <div class="numb-slider-div">
                                <img :src='"/static/images/img/produce/"+data.icon' alt="">
                                <p class="numb-slider-large">{{data.title}}</p>
                                <p class="data-slider-small" v-html="data.small"></p>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clear"></div>
                <div class="produce-data produce-bottom">
                    <div class="data-title2">
                        <div class="ul-title-top">
                            <hr class="title-line">
                            <span>{{$t('all_produce.data.title')}}</span>
                            <hr class="title-line">
                        </div>
                        <div class="ul-title-bottom">
                            <span v-html="$t('all_produce.data.small')"></span>
                        </div>
                    </div>
                    <div class="ul-text">
                        <img class="left-quotes" src="/static/images/img/produce/left-quotes.png" alt="">
                        <p  class="ul-text-p" v-html="$t('all_produce.data.text')"></p>
                        <img  class="right-quotes" src="/static/images/img/produce/right-quotes.png" alt="">
                    </div>
                    <div class="dataSlider">
                        <div class="slide" v-for="data in $t('all_produce.data.ul')">
                            <div class="data-slider-div">
                                <div class="border-shaw">
                                    <img :src='"/static/images/img/produce/"+data.icon' alt="">
                                    <p class="data-slider-large">{{data.title}}</p>
                                    <p class="data-slider-small" v-html="data.small"></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


    </div>
</template>
<script>
    const common = require('commonFunc')
    import $ from 'jquery'
    export default {
        name: 'home',
        data: function() {
            return {
                scroll:common.getUrlParams('scroll'),
            }
        },
        mounted:function(){
            let _self=this;
            $(document).ready(function(){
                $('.dataSlider').bxSlider({
                    slideWidth: 383,
                    minSlides: 3,
                    maxSlides: 3,
                    moveSlides: 1,
                    slideMargin: 30
                });
                window.setTimeout(function () {
                    $(document).scrollTop(Number(_self.scroll));
                },100);

            });

        },
        methods:{
            linkTo: function (url) {
                this.$router.push(url)
            },
        },
        watch:{
            '$route': function () {
                let _self = this;
                _self.scroll=common.getUrlParams('scroll');
                window.setTimeout(function () {
                    $(document).scrollTop(Number(_self.scroll));
                },100);

            },
        },
        created () {
            this.$store.commit('changeHeaderActive',{firstMenu:"product"});
        }
    }

</script>
<style>
    body{
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    .min-width{
        width: 1160px;
        margin: 0 auto;
    }
    .produce-banner{
        width: 100%;
        height: 580px;
        background: url('/static/images/img/produce/produce-banner.png') 50% 0 no-repeat;
        background-size: cover;
        background-position: center 0;
        padding-top: 253px;
    }
    .produce-title-margin{
        text-align: center;
        color: #ffffff;
    }
    .produce-title-large{
        font-size: 36px;
        font-weight: 600;
        letter-spacing: 1px;
    }
    .produce-title-small{
        font-size: 22px;
        margin-top: 18px;
    }
    .ul-title{
        color: #333333;
        min-width: 395px;
        max-width: 550px;
        margin: 0 auto;
        padding: 70px 0 33px 0;
    }
    .data-title{
        color: #333333;
        min-width: 395px;
        max-width: 550px;
        margin: 0 auto;
        padding: 72px 0 24px 0;
    }
    .data-title2{
        color: #333333;
        min-width: 395px;
        max-width: 550px;
        margin: 0 auto;
        padding: 42px 0 24px 0;
    }
    .ul-title-top{
        text-align: center;
        min-width: 149px;
        margin: 0 auto;
    }
    .title-line{
        display: inline-block;
        width: 80px;
        margin-top: 16px;
        margin-bottom: 8px;
        border: 0;
        border-top: 2px solid #292929;
    }
    .ul-title-top span{
        color: #292929;
        font-size: 36px;
        line-height: 36px;
        font-weight: 600;
        margin: 0 20px;
        letter-spacing: 1px;
    }
    .ul-title-bottom{
        font-size: 18px;
        color: #292929;
        font-weight: 500;
        text-align: center;
        margin-top: 12px;
    }
    .produce-ul{
        list-style: none;
        min-height: 175px;
        background: #ffffff;
        margin: 35px 0 20px 0;
        padding: 0 0 0 20px;
    }
    .produce-ul li{
        width: 282px;
        padding: 0 13px;
        text-align: center;
        float: left;
    }
    .produce-li-title{
        font-size: 22px;
        color:#292929;
        margin: 26px 0 4px 0;
    }
    .produce-li-small{
        font-size: 18px;
        line-height: 20px;
        color: #999999;
    }
    .ul-text{
        width: 1025px;
        margin: 0 auto;
        text-align: center;
        position: relative;
    }
    .ul-text-p{
        width: 928px;
        font-size: 18px;
        margin: 0 0 0 48px;
    }
    .left-quotes{
        position: absolute;
        top:-8px;
        left:0;
    }
    .right-quotes{
        position: absolute;
        top:43px;
        right:0;
    }
    .data-slider-div{
        width: 383px;
        padding: 0 70px 0 0;
        text-align: center;
        float: left;
        margin-top: 50px;

    }
    .numb-slider-div{
        min-width: 275px;
        width:275px;
        padding: 0 50px 0 0;
        text-align: center;
        float: left;
        margin-top: 50px;
    }
    .data-slider-div img{
        width: 80px;
        display: inline-block!important;
        padding-top: 18px;
    }
    .data-slider-large{
        font-size: 22px;
        color:#292929;
        margin: 4px 0 4px 0;
    }
    .numb-slider-large{
        font-size: 22px;
        color:#292929;
        margin: 11px 0 4px 0;
    }
    .data-slider-small{
        font-size: 18px;
        line-height: 20px;
        color: #999999;
        padding-bottom: 20px;
    }

    .produce-data .bx-prev{
        width:12px;
        height:26px;
        background:none!important;
        text-indent: -999999px;
        z-index: 100!important;;
        position: absolute;
        float:left;
        left:455px;
        top:110px;
        left:-49px!important;
    }
    .produce-data .bx-prev:hover{
        background:none!important;
    }
    .produce-data .bx-next{
        width:12px;
        height:26px;
        background: none!important;
        text-indent: -999999px;
        z-index: 100!important;;
        position: absolute;
        top:110px;
        right: -49px!important;
    }
    .produce-data .bx-prev:hover{
        background:none!important;
    }
    .produce-data .bx-wrapper{
        -webkit-box-shadow: none!important;
        box-shadow:none!important;
        border: none!important;
        background: none!important;
        margin-left: 41px;
    }
    .border-shaw{
        box-shadow:2px 2px 5px #d9d9d9;
        -moz-box-shadow:2px 2px 5px #d9d9d9;
        -webkit-box-shadow:2px 2px 5px #d9d9d9;
    }
    .produce-data .bx-wrapper .bx-pager.bx-default-pager a.active, .data-slider-div .bx-pager.bx-default-pager a:focus, .data-slider-div .bx-pager.bx-default-pager a:hover{
        background: #009ce2!important;

    }
     .produce-data .bx-wrapper .bx-pager.bx-default-pager a{
        height: 20px!important;
        width: 20px!important;
        background: #dcdcdc!important;
        margin: 0 15px;
        border-radius:20px!important;
    }
    .produce-data .bx-wrapper .bx-controls-auto, .bx-wrapper .bx-pager{
        bottom: -45px!important;
        margin-left: -20px;
    }
    .numberSlider{
        min-height: 260px;
        width: 825px;
        margin: 0 0 0 193px;
        background: #ffffff;
    }
    .produce-bottom{
        min-height: 500px;
    }


</style>