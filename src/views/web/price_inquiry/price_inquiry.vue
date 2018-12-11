<template>
    <div class="all-min-width">
        <div class="img-banner-price">
            <h3 class="banner-title-price">{{$t('searchPrice.search.title')}}</h3>
            <div class="search-price">
                <input id="countryInput" class="search-input" v-model="searchString" :placeholder="$t('searchPrice.search.inputPlaceholder')" v-on:keyup="getNation"/>
                <button class="search-btn" @click="searchData(searchString)">{{$t('searchPrice.search.searchBtn')}}</button>
            </div>
        </div>
        <div class="content-price">
            <div class="container all-min-width">
                <div class="search-result">
                    <span class="result-span">{{$t('searchPrice.search.resultSpan')}} ({{searchprice.chinese+' '+searchprice.name}})</span>
                    <div class="price-unit">
                        <img id="btn-1" class="unit-btn" @click="clickPrice(1)" src="/static/images/img/price_inquiry/icon-write-1.png" alt="">
                        <img id="btn-2" class="unit-btn" @click="clickPrice(2)"  src="/static/images/img/price_inquiry/icon-write-2.png" alt="">
                        <img id="btn-3" class="unit-btn" @click="clickPrice(3)" src="/static/images/img/price_inquiry/icon-write-3.png" alt="">
                    </div>
                    <span class="result-span" style="float: right;margin-right: 40px">{{symbol}} <strong style="color: #ff0000">{{turnPrice}}</strong> /{{$t('searchPrice.search.strip')}}</span>
                </div>
                <div class="price-list">
                    <div class="row">
                        <div class="list-line" v-for="data in priceArry">
                            <div class="col-xs-3 padding-0">
                                <img class="flag"  :src=imgUrl+data.name+endUrl alt="">
                            </div>
                            <div class="col-xs-2 padding-0 display-table price-col"><p class="display-table-cell price-list-p">{{data.code}}</p></div>
                            <div class="col-xs-4 padding-0 display-table price-col" ><p class="display-table-cell price-list-p">{{data.chinese+'  '+data.name}}</p></div>
                            <div class="col-xs-3 padding-0 display-table price-col" ><p class="display-table-cell price-list-p">{{data.nowPrice}} / {{$t('searchPrice.search.strip')}}</p></div>
                        </div>
                    </div>
                </div>
                <div class="download-all">
                    <!--<a class="underline" @click="downTable">{{$t('searchPrice.downTitle')}}</a>-->
                </div>
                <div class="reminder">
                    <h3 class="reminder-title">{{$t('searchPrice.reminder.title')}}</h3>
                    <p>{{$t('searchPrice.reminder.p1')}}</p>
                    <p>{{$t('searchPrice.reminder.p2')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../../../controller/price_inquiry_controller.js"></script>
<style src="../../../css/price_inquiry.css"></style>

