<template>
    <div class="info-relative" v-cloak>
        <div class="rl-position">
            <div class="rl-title">
                {{$t('monthlyBill.title')}}
            </div>
            <div class="mb-search">
                <div class="mb-div1">
                    <span class="md-span">{{$t('monthlyBill.span1')}}</span>
                    <input class="sin-input" type="text" id="start">
                    <span class="md-middle-line"></span>
                    <span class="md-span">{{$t('monthlyBill.span2')}}</span>
                    <select class="form-control md-select" v-model="appName">
                        <option value="">{{$t('monthlyBill.option')}}</option>
                        <option v-for="app in appArry" :value="app.name">{{app.name}}</option>
                    </select>
                </div>
                <button class="btn blue-btn md-btn" @click="getSinList">{{$t('monthlyBill.btn1')}}</button>
            </div>
            <div class="table-div">
                <div class="table-header-fix">
                    <table class="gray-header-table " cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th style="width: 241px;padding-left:51px">{{$t('monthlyBill.table.th1')}}</th>
                            <th style="width: 280px">{{$t('monthlyBill.table.th2')}}</th>
                            <th style="width: 236px">{{$t('monthlyBill.table.th3')}}</th>
                            <th style="width: 232px">{{$t('monthlyBill.table.th4')}}</th>
                            <!--<th style="width: 186px">{{$t('monthlyBill.table.th5')}}</th>-->
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body"  >
                    <table  class="gray-body-table"  cellpadding="0" cellspacing="0" >
                        <tbody>
                        <tr v-for=" bill in billArry">
                            <td style="width: 241px;padding-left:51px" >{{bill.index}}</td>
                            <td style="width: 280px">{{bill.appName}}</td>
                            <td style="width: 236px">{{bill.totalCustomerFee}}</td>
                            <td style="width: 219px">{{bill.totalSize}}{{$t('monthlyBill.timeUint')}}</td>
                          <!--  <td style="width: 172px">{{bill.index}}{{$t('monthlyBill.moneyUint')}}</td>-->
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <span class="md-down-position" @click="downMonthly">
               {{$t('monthlyBill.down')}}
            </span>
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
                appArry:{},
                billArry:{},
                urlApi:'/api/console/ConsoleReportSRV?method=',
                urlApi2:'/api/console/SmsSendingSRV?method=',
                appName:'',

            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            _self.$parent.setActive(1,'monthly_bill');
            $('#start').datepicker(common.monthPickerConfig);
            $('#start').val(common.todyMonth);
            _self.getApp();
            _self.getSinList();

        },
        methods: {
            downMonthly:function () {
                let _self=this;
                common.consoleDownFile(_self,_self.urlApi+'downloadMonthBill',{});
            },
            getSinList:function () {
                let _self=this;
                let getYear=$('#start').val().split('-')[0];
                let getMonth=$('#start').val().split('-')[1];
                let params={
                    year:getYear,
                    month:getMonth,
                    appName:_self.appName,
                };
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                _self.$http.post(_self.urlApi+'getMonthBill',params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.billArry=response.data.info;
                            for(var i=0;i<_self.billArry.length;i++){
                                _self.billArry[i].index=i+1;
                            }
                        }else{
                            _self.billArry="";
                        }

                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },
            getApp:function () {
                let _self=this;
                _self.$http.post(_self.urlApi2+'getApplication',{customerId:common.getStoreData('userinfo').customer_id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.appArry=response.data.info;
                        }else{
                            _self.appArry="";
                        }

                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },


        },
        filters: {
            priceFormat:function (value,type) {
                if(!isNaN(value)){
                    let price=common.priceFormat(value);
                    return price
                }else{
                    return ""
                }

            },
        }
    }
</script>

<style>
    .bk-img{
        position: absolute;
        width: 1106px;
        height:578px;
        top:79px;
        left:216px;

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
    .mb-search{
        width: 100%;
        height: 90px;
    }
    .md-select {
        border: solid 1px #808080;
        height: 20px;
        display: inline-block;
        width: 146px;
        color:#333333;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("/static/images/img/consloe/administration/blue-drop.png") no-repeat scroll right center transparent;
        line-height: 14px;
        padding: 0 14px 0 13px ;
    }
    .md-select::-ms-expand { display: none; }
    .md-span,.md-span2{
        display: inline-block;
        min-width: 92px;
        padding:0 0 0 21px;
        line-height: 13px;
    }
    .rl-span2{
        padding:0 0 0 46px;
        width: 116px;
    }
    .mb-div1{
        padding:2px 0 0 0;
        height: 40px;
    }
    .mb-div1 input{
        border: solid 1px #808080;
        height: 20px;
        display: inline-block;
        width: 146px;
        color:#333333;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("/static/images/img/consloe/administration/blue-drop.png") no-repeat scroll right center transparent;
        line-height: 14px;
        padding: 0 14px 0 13px ;
    }
    .md-middle-line{
        display: inline-block;
        width: 19px;
        height: 6px;
        color: #333333;
        margin:0 2px;

    }
    .mb-search .md-btn{
        margin: 1px 0 0 20px;
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
    .md-down-position{
        display: inline-block;
        color: #41b0e3;
        height: 20px;
        min-width: 92px;
        font-size: 15px;
        border-bottom: 1px solid #41b0e3;
        margin: 20px 0 0  7px;
        cursor: pointer;
    }


</style>
