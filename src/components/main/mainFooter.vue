<template>
<div>
    <div class="footer-wirte-bk" :class="[{ 'footer-top-bk' : firstMenu != 'home'}]">
        <div class="footer-container">
            <div class="footer-top">
                <ul>
                    <li>
                        <div>
                            <h4>{{$t('webFooter.Li1.h4')}}</h4>
                            <p @click="turnProduct(0)">{{$t('webFooter.Li1.p1')}}</p>
                            <p @click="turnProduct(950)">{{$t('webFooter.Li1.p2')}}</p>
                            <p @click="turnProduct(1300)">{{$t('webFooter.Li1.p4')}}</p>
                            <p @click="turnProduct(1800)">{{$t('webFooter.Li1.p3')}}</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h4>{{$t('webFooter.Li2.h4')}}</h4>
                            <p @click="clickTab('develop_doc')">{{$t('webFooter.Li2.p1')}}</p>
                            <!--<p @click="clickTab('seq/seq_sub/:0')">{{$t('webFooter.Li2.p2')}}</p>-->
                        </div>
                    </li>
                    <li>
                        <div>
                            <h4>{{$t('webFooter.Li3.h4')}}</h4>
                            <p class="not-cursor">{{$t('webFooter.Li3.p1')}}</p>
                            <p class="not-cursor">{{$t('webFooter.Li3.p2')}}</p>
                            <p class="not-cursor">{{$t('webFooter.Li3.p3')}}</p>
                            <p @click="clickAbout('contact_us')">{{$t('webFooter.Li3.p4')}}</p>
                        </div>
                    </li>
                </ul>
                <div>
                    <div class="text-right code-margin">
                        <!--<h4>{{$t('webFooter.right.p1')}}</h4>-->
                        <img src="/static/images/img/qr-code.png" alt="">
                        <p>{{$t('webFooter.right.p2')}}</p>
                        <p>{{$t('webFooter.right.nub')}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="clear"></div>

    <div class="container-fluid footer-bottom-write-bk" :class="[{ 'footer-bottom-bk' : firstMenu != 'home'}]">
        <div class="row">
            <div class="footer-bottom col-lg-12 col-md-12">
                <p>{{$t('bottomFooter')}}
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import Vuex from 'vuex'
import common from 'commonFunc'
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data: function() {
        return {}
    },
    mounted: function() {
        let cnzz_s_tag = document.createElement('script');
        cnzz_s_tag.type = 'text/javascript';
        cnzz_s_tag.async = true;
        cnzz_s_tag.charset = 'utf-8';
        cnzz_s_tag.src = 'https://w.cnzz.com/c.php?id=1261510027&async=1';
        let root_s = document.getElementsByTagName('script')[0];
        root_s.parentNode.insertBefore(cnzz_s_tag, root_s);
    },
    computed: mapGetters({
        firstMenu: 'firstMenu',
        secondMenu: 'secondMenu'
    }),
    methods: {
        clickTab: function(url) {
            this.$router.push({
                path: '/system/' + url
            })
        },
        clickAbout: function(url) {
            this.$router.push({
                path: '/system/about_us/' + url
            })
        },
        turnProduct: function(higth) {
            this.$router.push({
                path: '/system/all_production',
                query: {
                    scroll: higth
                }
            })
        },
    }
}
</script>
<style>
.clear {
    clear: both;
}

.footer-wirte-bk {
    background: #ffffff;
    color: #292929;
    min-width: 1166px;
    width: 100%;
}

.footer-top-bk {
    background: #303a42;
    color: #f7f7f7;
    min-width: 1166px;
    width: 100%;
}

.footer-top {
    width: 1024px;
    min-height: 149px;
    margin: 46px auto 43px auto;
}

.footer-wirte-bk .footer-top ul li div h4 {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 20px;
    margin-bottom: 18px;
}

.footer-wirte-bk .code-margin h4 {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 20px;
    margin-bottom: 18px;
}

.footer-wirte-bk .footer-top ul li div p,
.code-margin p {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    color: #999999;
    font-weight: 500;
    cursor: pointer;
    margin: 0 0 5px!important;
}

.footer-wirte-bk .code-margin p {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    color: #1f2326;
    font-weight: 500;
    margin: 0!important;
}

.footer-wirte-bk .footer-top ul li div p:hover {
    color: #999999
}

.footer-bottom-write-bk {
    background: #ffffff;
    color: #292929;
}

.footer-top ul li {
    list-style: none;
    float: left;
    min-width: 182px;
}

.footer-top-bk .footer-top ul li div h4,
.footer-top-bk .code-margin h4 {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 20px;
    margin-bottom: 20px;
}

.footer-top-bk .footer-top ul li div p,
.footer-top-bk .code-margin p {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    color: #ffffff;
    font-weight: 500;
    cursor: pointer;
    margin: 0 0 5px!important;
}

.footer-top-bk .footer-top ul li div p:hover {
    color: #ffffff
}

.footer-bottom-bk {
    background: #1f2326;
    color: #ffffff;
    min-width: 1166px;
    width: 100%;
}

.footer-bottom {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    min-height: 40px;
    line-height: 40px;
}

.footer-bottom p {
    margin: 0;
}

.code-margin {
    text-align: center;
    float: right;
    margin: 10px 56px 0 0;
}

.code-margin h4 {
    margin: 11px 40px 17px 0;
}

.code-margin img {
    margin: 0 0 9px 0;
    width: 99px;
    height: 99px;
}

.code-margin p {
    max-width: 210px;
}

.footer-container {
    width: 1166px;
    overflow-x: auto;
    margin-right: auto;
    margin-left: auto;
    min-height: 230px;
}

.not-cursor {
    cursor: default!important;
}

#cnzz_stat_icon_1261510027 {
    display: inline;
}

#cnzz_stat_icon_1261510027 a img,
#cnzz_stat_icon_1261510027 a {
    display: inline;
}

#cnzz_stat_icon_1259823055 {
    background: #e0e0e0;
    display: inline;
}

#cnzz_stat_icon_1259823055 a img,
#cnzz_stat_icon_1259823055 a {
    display: inline;
}
</style>
