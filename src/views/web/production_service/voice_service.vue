<template>
    <div class="all-min-width">
        <div class="img-banner1">
            <h3 class="banner-title" v-html="$t('voice.banner.cnTitle')"></h3>
            <p class="banner-en" v-html="$t('voice.banner.enTitle')"></p>
            <p class="banner-p" v-html="$t('voice.banner.p')"></p>
        </div>
        <service-header :index="1"></service-header>

        <div class="business-character">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class="">{{$t('voice.business.title')}}</p>
                </div>
                <div class="row business-content">
                    <div class="col-xs-4" v-for="li in $t('voice.business.li')">
                        <img :src=li.imgHref>
                        <p class="p1">{{li.p1}}</p>
                        <p class="p1">{{li.p2}}</p>
                        <div class="h-line"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="prouduct-character">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class=""></p>
                </div>
                <div id="myCarousel" class="carousel slide" style="margin-top: 50px">
                    <!-- 轮播（Carousel）项目 -->
                    <div class="carousel-inner">
                        <div class="item active" >
                            <div class="row">
                                <div :class="{'col-xs-offset-1':(index+1)%2==1,'col-xs-5':true,'margin-top-25':index+1>2}" v-for="(p,index) in $t('voice.produce.prodCharacterArr')" style="position: relative;">
                                    <div class="left-div">
                                        <p style="font-size: 18px"><strong style="color: #009be3;font-size: 16px">●</strong>{{p.title}}</p>
                                        <p style="width: 65%;height: 100px;font-size:14px;word-break:break-all; word-wrap:break-word;">{{p.description}}</p>
                                    </div>
                                    <img class="float-img" :src="p.img" alt="">
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- 轮播（Carousel）导航 -->
                    <a class="carousel-control left" href="#myCarousel"
                       data-slide="prev" style="background:none;margin-top:190px;margin-left: -40px">
                        <img src="/static/images/img/54.png" alt="">
                    </a>
                    <a class="carousel-control right" href="#myCarousel"
                       data-slide="next" style="background:none;margin-top:190px">
                        <img src="/static/images/img/53.png" alt="">
                    </a>
                </div>
            </div>
        </div>
        <div class="product-example">
            <div class="container all-min-width">
                <div class="row business-titile">
                    <p class="">{{$t('voice.actual.title')}}</p>
                </div>
            </div>
            <div class="container all-min-width" style="margin-top: 50px">
                <div class="col-xs-4 d1" v-for="li in $t('voice.actual.li')">
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
<script src="../../../controller/voice_service_controller.js"></script>
<style src="../../../css/product_service.css"></style>
