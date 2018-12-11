<template>
    <div class="all-min-width">
        <div class="img-banner-seq"></div>
        <div class="container margin-top-50 all-min-width">
            <div class="col-xs-3 padding-0">
                <div class="nav-title">{{$t('problem.nav_cn_title')}}/<strong style="font-size: 14px">{{$t('problem.nav_en_title')}}</strong></div>
                <ul class="left-nav-list padding-0">
                    <!--<li class="active" value="1"><a href="/system/seq/seq_sub">接入与认证</a></li>-->
                    <!--<li value="2"><a href="">XXXX</a></li>-->
                    <!--<li value="3"><a href="">XXXX</a></li>-->
                    <!--<li value="4"><a href="">XXXX</a></li>-->
                    <li v-for="li in $t('problem.left_nav_lis')" :class="{'active':li.value==1}" value="li.value"  :href=li.href>{{li.title}}</li>
                </ul>
                <div class="col-xs-12 padding-0 margin-bottom-70 margin-top-10">
                    <img src="/static/images/img/seq/seq-1.png" style="width: 100%" alt="">
                </div>
            </div>
            <div class="col-xs-9" style="padding-left: 40px">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<style src="../../../css/seq.css"></style>

<script src="../../../controller/seq_controller.js"></script>
