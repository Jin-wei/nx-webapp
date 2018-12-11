<template>
    <div class="all-min-width bk-color">
        <div class="img-banner">
            <h3 class="banner-title">{{$t('application.banner.cnTittle')}}</h3>
            <p class="banner-English" v-html="$t('application.banner.enTittle')"></p>
            <p class="banner-small">{{$t('application.banner.p')}}</p>
        </div>

        <div class="application-bk-detail">
           <div class="left-margin">
               <div class="app-img">
                   <img src="/static/images/img/appliaction/shop.png" alt="">
               </div>
               <div class="left-content">
                   <h4 class="app-title">{{$t('application.content1.title')}}</h4>
                   <ul class="app-text">
                       <li v-html="$t('application.content1.p1')"></li>
                       <li>{{$t('application.content1.p2')}}</li>
                       <li>{{$t('application.content1.p3')}}</li>
                   </ul>
               </div>
           </div>
            <div class="clear"></div>

            <div class="right-margin">
                <div class="right-content">
                    <h4 class="app-title">{{$t('application.content2.title')}}</h4>
                    <ul class="app-text">
                        <li v-html="$t('application.content2.p1')"></li>
                    </ul>
                </div>
                <div class="app-img">
                    <img src="/static/images/img/appliaction/service.png" alt="">
                </div>
            </div>

            <div class="clear"></div>

            <div class="left-margin2">
                <div class="app-img">
                    <img src="/static/images/img/appliaction/app.png" alt="">
                </div>
                <div class="left-content2">
                    <h4 class="app-title">{{$t('application.content3.title')}}</h4>
                    <ul class="app-text">
                        <li>{{$t('application.content3.p1')}}</li>
                        <li>{{$t('application.content3.p2')}}</li>
                    </ul>
                </div>
            </div>

            <div class="clear"></div>

            <div class="right-margin2">
                <div class="right-content2">
                    <h4 class="app-title">{{$t('application.content4.title')}}</h4>
                    <ul class="app-text">
                        <li v-html="$t('application.content4.p1')"></li>
                        <li v-html="$t('application.content4.p2')"></li>
                        <li v-html="$t('application.content4.p3')"></li>
                        <li v-html="$t('application.content4.p4')"></li>
                    </ul>
                </div>
                <div class="app-img">
                    <img src="/static/images/img/appliaction/international.png" alt="">
                </div>
            </div>

        </div>
    </div>
</template>
<style src="../../../css/application.css"></style>
<script>
    import $ from 'jquery'
    import common from 'commonFunc'

    export default {
        data: function () {
            return {
            }
        },
        methods:function () {
            this.$store.commit('changeHeaderActive',{firstMenu:"",secondMenu:""});
        },
        mounted:function () {
            let _self=this;
        }
    }

</script>