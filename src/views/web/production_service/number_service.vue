<template>
    <div class="all-min-width">
        <div class="img-banner2">
            <h3 class="banner-title">{{$t('number.banner.cnTitle')}}</h3>
            <p class="banner-en" v-html="$t('number.banner.enTitle')"></p>
            <p class="banner-p" v-html="$t('number.banner.p')"></p>
        </div>
        <service-header :index="4"></service-header>

        <div class="business-character">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class="">{{$t('number.business.title')}}</p>
                </div>
                <div class="row business-content">
                    <div class="col-xs-4" v-for="li in $t('number.business.li')">
                        <img :src=li.imgHref>
                        <p class="p1">{{li.p}}</p>
                        <div class="h-line"></div>
                    </div>

                </div>
            </div>
        </div>
        <div class="prouduct-character">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class="">{{$t('number.produce.title')}}</p>
                </div>
                <div class="row product-content">
                    <div class="col-xs-offset-1 col-xs-5">
                        <div class="prod-num-home">
                        </div>
                        <div class="right-div"></div>
                        <div class="bottom-div"></div>
                    </div>
                    <div class="col-xs-5 prod-description">
                        <h3>{{$t('number.produce.rightTitle')}}</h3>
                        <p>{{$t('number.produce.content')}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-example">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class="">{{$t('number.actual.title')}}</p>
                </div>
            </div>
            <div class="container all-min-width" style="margin-top: 50px">
                <div class="col-xs-4 d1" v-for="li in $t('number.actual.li')">
                    <div class="d2">
                        <img class="example-img" :src=li.imgHref alt="">
                        <p class="p-t">{{li.p1}}</p>
                        <p class="p-a">{{li.p2}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../../../controller/number_service_controller.js"></script>
<style src="../../../css/product_service.css"></style>
