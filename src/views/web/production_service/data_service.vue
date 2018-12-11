<template>
    <div class="all-min-width">
        <div class="img-banner4">
            <h3 class="banner-title">{{$t('data.banner.cnTitle')}}</h3>
            <p class="banner-en" v-html="$t('data.banner.enTitle')"></p>
            <p class="banner-p" v-html="$t('data.banner.p')"></p>
        </div>
        <service-header :index="3"></service-header>

        <div class="business-character">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class="">{{$t('voice.business.title')}}</p>
                </div>
                <div class="row business-content">
                    <div class="col-xs-4" v-for="li in $t('data.business.li')" :class="{'col-xs-offset-2':li.offset}">
                        <img :src=li.imgHref >
                        <p class="p1">{{li.p1}}</p>
                        <p class="p1">{{li.p2}}</p>
                        <p class="p1">{{li.p3}}</p>
                        <p class="p1">{{li.p4}}</p>
                        <div class="h-line"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="prouduct-character">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class="">{{$t('voice.produce.title')}}</p>
                </div>
                <div class="row product-content">
                    <div class="col-xs-offset-1 col-xs-5">
                        <div class="prod-img-home">
                        </div>
                        <div class="right-div"></div>
                        <div class="bottom-div"></div>
                    </div>
                    <div class="col-xs-5 prod-description">
                        <h3>{{$t('data.produce.rightTitle')}}</h3>
                        <p>{{$t('data.produce.content')}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-example">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class="">{{$t('data.actual.title')}}</p>
                </div>
            </div>
            <div class="container all-min-width" style="margin-top: 50px">
                <div class="col-xs-4 d1" v-for="li in $t('data.actual.li')">
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
<script src="../../../controller/data_service_controller.js"></script>
<style src="../../../css/product_service.css"></style>
