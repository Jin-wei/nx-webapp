<template>
    <div class="all-min-width">
        <div class="img-banner-aboutUs"></div>
        <div class="container margin-top-50 all-min-width">
            <div class="col-xs-3 padding-0">
                <div class="nav-title">{{$t('about.leftNav.cnTitle')}}/<strong style="font-size: 14px">{{$t('about.leftNav.enTitle')}}</strong></div>
                <ul class="left-nav-list padding-0">
                    <li :class="{'active' : nowPath=='/system/about_us/company_info'}" value="1"><a href="/system/about_us/company_info">{{$t('about.leftNav.about')}}</a></li>
                    <li value="2" :class="{'active' : nowPath=='/system/about_us/contact_us'}"><a href="/system/about_us/contact_us">{{$t('about.leftNav.content')}}</a></li>
                </ul>
                <div class="col-xs-12 padding-0 margin-bottom-70 margin-top-10">
                    <img src="/static/images/img/about_us/about-us-7.png" style="width: 100%" alt="">
                </div>
            </div>
            <div class="col-xs-9" style="padding-left: 40px">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script src="../../../controller/about_us_controller.js"></script>
<style src="../../../css/about_us.css"></style>
