<template>
    <div class="info-relative" >
        <div class="info-position">
            <div class="info-title">
                {{$t('conPrice.title')}}
            </div>
            <div class="price-middlle">
                <input  id="countryInput" class="price-short-input"  v-model="searchString" type="text" :placeholder="$t('conPrice.inputP')" v-on:keyup="getNation">
                <button class="btn console-blue-btn" @click="searchData(searchString,1)"> {{$t('conPrice.searchBtn')}}</button>
            </div>
            <div class="price-table">
                <div>
                    <table class="table header-table">
                        <tr>
                           <!-- <th class="small-width"></th>-->
                            <th class="country-name-witdh"> {{$t('conPrice.table.th1')}}</th>
                            <th class="country-number-witdh">{{$t('conPrice.table.th2')}}</th>
                            <th class="country-price-witdh">{{$t('conPrice.table.th3')}}</th>
                        </tr>
                    </table>
                </div>
                <div class="table-scroll">
                    <div v-for="(price, index) in priceGetArr">
                        <table class="table header-table">
                            <tr>
                              <!--  <td class="small-width"><span class="blue-add" @click="toggleOperator(price.id)">+</span></td>-->
                                <td class="country-name-witdh">{{price.chinese+' ('+price.name+') '}}</td>
                                <td class="country-number-witdh">{{price.code}}</td>
                                <td class="country-price-witdh">{{price.maxPrice}}</td>
                            </tr>
                        </table>
                        <table class="table header-table2" :id="price.id">
                            <tr>
                                <td class="operate-name-witdh remove-top-border">{{$t('conPrice.table.td1')}}</td>
                                <td class="operate-number-witdh remove-top-border">{{$t('conPrice.table.td2')}}</td>
                                <td class="operate-price-witdh remove-top-border">{{$t('conPrice.table.td3')}}</td>
                            </tr>
                            <tr v-for="data in price.operatorArr">
                                <td class="operate-name-witdh">{{data.operatorName}}</td>
                                <td class="operate-number-witdh">{{data.operatorNumber}}</td>
                                <td class="operate-price-witdh">{{data.nowPrice}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="../../../css/console_price.css"></style>
<script src="../../../controller/consoel_price_search_controller.js"></script>
