<template>
    <div class="info-relative" v-cloak>
        <div class="rl-position">
            <div class="rl-title">
                {{$t('dayMessage.title')}}
            </div>
            <div class="rl-search">
                <div class="rl-div1 pull-left">
                    <span class="rl-span">{{$t('dayMessage.span1')}}</span>
                    <input id="appNameId" type="text" hidden>
                    <input v-model="searchData.appName" class="rech-input" id="appName" type="text" v-on:keyup="getAppName">

                </div>
                <div class="rl-div2 pull-left">

                    <span class="rl-span">{{$t('dayMessage.span3')}}</span>
                    <input class="sin-input" type="text" id="start"  name="start">
                    <span class="rl-middle-line"></span>
                    <input class="sin-input" type="text" id="end"  name="end">
                </div>
                <div class="clear"></div>
                <button class="btn blue-btn rl-btn" v-on:click="getSinList(1)">{{$t('dayMessage.btn1')}}</button>
            </div>
            <div class="table-div">
                <div class="table-header-fix">
                    <table class="gray-header-table " cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th style="width: 150px;padding-left:51px">{{$t('dayMessage.table.th1')}}</th>
                            <th style="width: 170px">{{$t('dayMessage.table.th2')}}</th>
                            <th style="width: 170px">{{$t('dayMessage.table.th3')}}</th>
                            <th style="width: 130px">{{$t('dayMessage.table.th4')}}</th>
                            <th style="width: 130px">{{$t('dayMessage.table.th5')}}</th>
                            <th style="width: 120px">{{$t('dayMessage.table.th6')}}</th>
                            <th style="width: 120px">{{$t('dayMessage.table.th7')}}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div   :class="{'table-body':language=='zh_cn','table-en-body':language=='en'}">
                    <table  class="gray-body-table"  cellpadding="0" cellspacing="0" >
                        <tbody>
                        <tr v-for="data in rechargeArry">
                            <td  style="width: 150px;padding-left:51px">{{data.index}}</td>
                            <td style="width: 170px">{{data.appName}}</td>
                            <td style="width: 170px">{{data.DAY | timeFormat}}</td>
                            <td style="width: 130px">{{data.allTotalSize}}</td>
                            <td style="width: 130px">{{data.succTotalSize}}</td>
                            <td  style="width: 120px">{{data.failTotalSize}}</td>
                            <td style=" width: 105px">{{data.totalCustomerFee | priceFormat}}</td>
                        </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')

    export default {
        data: function () {
            return {
                sinDetailHidden:true,
                searchData:{
                    appName:'',
                    cTimeBegin:"",
                    cTimeEnd:"",
                },
                rechargeArry:{},
                reDetailArry:{
                    status:"0",
                    pay_chanel:"0",
                },
                phone:common.getStoreData('userinfo').name,
                urlApi:'/api/console/ConsoleReportSRV?method=',
                language:common.getStoreData('language'),

            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            _self.$parent.setActive(2,'day_message');
            common.initStartDatepicker($('#start'),$('#end'));
            common.initEndDatepicker($('#end'),$('#start'));
            $('#start').datepicker('setDate','-7d');
            $('#end').datepicker('setDate',new Date());
            _self.getSinList(0);
           _self.getAppName();

        },
        methods: {
            linkTo:function (id) {
                let _self=this;
                _self.$router.push({path:'/console/recharge_step3/:null/:null/:'+id});
                /*    this.$router.push({path: '/console/recharge_step3/:'+_self.money+"/:"+_self.type+"/:null"});*/
            },
            getSinList:function (type) {
                let _self=this;
                if (type == 0) {

                } else if (type == 1) {
                    if (common.getStoreData('status').status != 1) {
                        common.WarningBox(_self, 'SIN_04');
                        return;
                    }
                }
                let params={
                    appName:$( "#appName" ).val(),
                    dayBegin:$('#start').val(),
                    dayEnd:$('#end').val(),
                    /*customer_id:common.getStoreData('userinfo').customer_id*/
                }

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                _self.$http.post(_self.urlApi+'getDayReportConsole',params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.rechargeArry=response.data.info;
                            for(var i=0;i<_self.rechargeArry.length;i++){
                                _self.rechargeArry[i].index=i+1;
                            }
                        }else{
                            _self.rechargeArry="";
                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },
            getAppName:function () {
                let _self=this;
                let params={
                    customerId:common.getStoreData('userinfo').customer_id,
                    appName:_self.searchData.appName,
                }
                common.fuzzySearch(_self,'appName',_self.urlApi + 'getApplication',params);

            },


        },
        filters: {

            timeFormat:function (value) {
                if (!value) return ''
                let date =value.split('T');
                let time=date[1].slice(0,8);
                return date[0]+' '+time
            },

            priceFormat:function (value,type) {
                if(!isNaN(value)){
                    let price=common.priceFormat(value);
                    return price
                }else{
                    return ""
                }

            },
            startDate:function (dateStr){
            let newTime = new Date();
            let Year = newTime.getFullYear();
            let Month = newTime.getMonth()+1;
            let myDate = newTime.getDate()-7;
            if(myDate<10){
                myDate="0"+myDate;
            }
            if(Month<10){
                Month="0"+Month;
            }
            var time = Year+"-"+Month+"-"+myDate;
            return time;
        }

        }
    }
</script>

<style>
    .bk-img{
        position: absolute;
        width: 1120px;
        height:561px;
        top:79px;
        left:219px;

    }
    .rl-title{
        font-size: 18px;
        line-height: 18px;
        padding:0 0 21px 20px;
        border-bottom:1px solid #dddddd;
        margin-bottom: 20px;
        font-weight: 400;
    }
    .rl-position{
        position: relative;
        width: 990px;
        height: 390px;
        top:50px;
        left:40px;
        /*padding:50px 0 0 40px;*/
        font-weight: 500;
    }


    .lookBtn{
        font-size: 14px;
        color: #41b0e3;
        cursor: pointer;
    }
    .changeBtn{
        font-size: 14px;
        color: #41b0e3;
        margin-left: 13px;
        cursor: pointer;
    }
    .gray-body-table .lookBtn:hover,.gray-body-table .changeBtn:hover{
        color: #41b0e3;
        border-bottom: 1px solid #41b0e3;
    }
    .deleteBtn{
        font-size: 14px;
        color: #e34242;
        margin-left: 13px;
        cursor: pointer;
    }
    .gray-body-table .deleteBtn:hover{
        color: #e34242;
        border-bottom: 1px solid #e34242;
    }
    .signature-title{
        height: 39px;
    }
    .rl-alert-detail{
        width: 680px;
        height:365px;
        top:231px;
        left:446px;
    }
    .rl-alert-text{
        width: 623px;
        height:269px;
        padding: 10px 0 0 0;
    }
    .alert-text-padding{
        padding-left: 19px;
    }
    .applic-green-icon{
        width: 12px;
        height: 12px;
        margin:0 1px 0 2px;
    }
    .rl-search{
        width: 100%;
        height: 129px;
    }
    .rl-select {
        border: solid 1px #808080;
        height: 20px;
        display: inline-block;
        width: 140px;
        color:#333333;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("/static/images/img/consloe/administration/blue-drop.png") no-repeat scroll right center transparent;
        line-height: 14px;
        padding: 0 14px 0 13px ;
    }
    .rl-select::-ms-expand { display: none; }
    .rl-span,.rl-span2{
        display: inline-block;
        min-width: 119px;
        padding:0 0 0 21px;
        line-height: 13px;
    }
    .rl-span2{
        padding:0 0 0 46px;
        min-width: 116px;
    }
    .rl-div1{
        padding:2px 0 0 0;
        height: 40px;
    }
    .rl-div2 input{
        border: solid 1px #808080;
        height: 20px;
        display: inline-block;
        width: 140px;
        color:#333333;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("/static/images/img/consloe/administration/blue-drop.png") no-repeat scroll right center transparent;
        line-height: 14px;
        padding: 0 14px 0 13px ;
    }
    .rl-middle-line{
        display: inline-block;
        width: 39px;
        height: 6px;
        color: #333333;
        border-top:1px solid #333333;
        margin:0 2px;

    }
    .rl-search .rl-btn{
        margin: 19px 0 0 20px;
    }
    .gray-body-table .rl-blue-underline{
        color:#00afe9 ;
        text-decoration: underline;
        cursor: pointer;
    }
    .alert-narrow-title2{
        background:#545d64;
        color: #f7f7f7;
        font-size: 16px;
        height: 40px;
        width: 100%;
        line-height: 39px;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        font-weight:500;
        padding:0 31px;

    }
    .rech-input {
        width: 138px;
        height: 20px;
        background: #ffffff;
        border: 1px solid #808080;
        padding-left: 5px;
        margin-right: 7px;

    }
    .samll-rech-btn{
        min-width: 80px;
        height: 20px;
        font-weight: 600;
        font-size: 13px;
        line-height: 8px;
    }


</style>
