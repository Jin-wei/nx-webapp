<template>
    <div class="onlineServiceDiv">
        <div class="online-1" :class="{'online-1-en':language=='en'}" @click="clickTab(1)">
            <span>{{$t('rightFix.span1')}}</span>
        </div>
        <!--<div class="online-2" @click="clickTab(2)">
            <span>{{$t('rightFix.span2')}}</span>
        </div>
        <div class="online-3" @click="clickTab(3)">
            <span>{{$t('rightFix.span3')}}</span>
        </div>-->
        <div class="online-4" @click="clickTab(4)">
            <span>{{$t('rightFix.span4')}}</span>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'

    var common = require('commonFunc')
    export default {
        data: function () {
            return {
                language:common.getStoreData('language')
            }
        },
        name: 'onlineService',
        mounted: function () {

        },
        methods: {
            clickTab:function (index) {
                if(index == 1){
                    window.open("http://wpa.qq.com/msgrd?v=3&uin=1930381177&site=qq&menu=yes");
                    /* target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1581433372&site=qq&menu=yes"*/
                }else if(index == 2){

                }else if(index == 3){

                }else{
                    window.scrollTo(0,0);
                }
            }
        }
    }
</script>
<style src="../../css/product_service.css"></style>