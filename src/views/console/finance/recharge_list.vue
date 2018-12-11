<template>
    <div class="info-relative" v-cloak>
        <div class="rl-position">
            <div class="rl-title">
                {{$t('rechList.title')}}
            </div>
            <div class="rl-search">
                <div class="rl-div1">
                    <span class="rl-span">{{$t('rechList.span1')}}</span>
                    <input v-model="searchData.amount" class="rech-input" type="text"  >
                    <span class="rl-span2">{{$t('rechList.span2')}}</span>
                    <select class="form-control rl-select" v-model="searchData.payChanel">
                        <option value="">{{$t('rechList.type_option')}}</option>
                        <option value="0">{{$t('rechList.type0')}}</option>
                        <option value="1">{{$t('rechList.type1')}}</option>
                        <option value="2">{{$t('rechList.type2')}}</option>
                        <option value="8">{{$t('rechList.type8')}}</option>
                        <option value="9">{{$t('rechList.type9')}}</option>
                    </select>
                </div>
                <div class="rl-div2">
                    <span class="rl-span">{{$t('rechList.span3')}}</span>
                    <input class="sin-input" type="text" id="start"  name="start">
                    <span class="rl-middle-line"></span>
                    <input class="sin-input" type="text" id="end"  name="end">
                </div>
                <button class="btn blue-btn rl-btn" v-on:click="getSinList(1)">{{$t('rechList.btn1')}}</button>
            </div>
            <div class="table-div">
                <div class="table-header-fix">
                    <table class="gray-header-table " cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th style="width: 261px;padding-left:51px">{{$t('rechList.table.th1')}}</th>
                            <th style="width: 216px">{{$t('rechList.table.th2')}}</th>
                            <th style="width: 176px">{{$t('rechList.table.th3')}}</th>
                            <th style="width: 172px">{{$t('rechList.table.th4')}}</th>
                            <th style="width: 166px">{{$t('rechList.table.th5')}}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body recharge-table-body" >
                    <table  class="gray-body-table"  cellpadding="0" cellspacing="0" >
                        <tbody>
                        <tr v-for="data in rechargeArry">
                            <td class="rl-blue-underline" style="width: 261px;padding-left:51px" @click="showDetail(data.pay_id)">{{data.pay_id}}</td>
                            <!--<td style="width: 216px">{{data.c_time | timeFormat}}</td>-->
                            <td style="width: 216px">{{data.c_time}}</td>
                            <td style="width: 176px">{{data.pay_chanel | invStatus($t('recharge.bottom.step3.type'+data.pay_chanel))}}</td>
                            <td style="width: 172px">{{data.amount}}</td>
                            <td v-if="data.status==1" style="width: 150px">{{data.status | invStatus($t('recharge.bottom.step3.status'+data.status))}}</td>
                            <td v-if="data.status==0" style="width: 150px">
                                <button class="btn blue-btn samll-rech-btn" v-on:click="linkTo(data.pay_id)">{{data.status | invStatus($t('recharge.bottom.step3.status'+data.status))}}</button></td>
                        </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="console-alert-warp" :class="{'hidden':sinDetailHidden}"  @click="sinDetailHidden=true"></div>
        <div class="console-alert-content rl-alert-detail" :class="{'hidden':sinDetailHidden}">
            <div class="alert-narrow-title2">
                <button type="button" class="close close-margin"  @click="sinDetailHidden=true">×</button>
                <div class="pull-right"> {{$t('rechList.detail.date')}}:{{reDetailArry.c_time | timeFormat}}</div>
                <div class="pull-left"> {{$t('rechList.detail.title')}}</div>
            </div>
            <div class="alert-content">
                <div class="alert-text rl-alert-text">
                    <div class="col-md-12 alert-text-border alert-text-padding">
                       <div class="col-md-6" style="padding: 0">
                           <span>{{$t('rechList.detail.span1')}}： {{reDetailArry.pay_chanel| invStatus($t('recharge.bottom.step3.type'+reDetailArry.pay_chanel))}}</span>
                       </div>
                        <div class="col-md-3">
                            <span>{{reDetailArry.amount}}</span>
                        </div>
                        <div class="col-md-3">
                            <span>{{reDetailArry.status  | invStatus($t('recharge.bottom.step3.status'+reDetailArry.status))}}</span>
                        </div>
                    </div>
                    <div class="col-md-12 alert-text-border  alert-text-padding">
                        <span>{{$t('rechList.detail.span2')}}：{{reDetailArry.pay_id}}</span>
                    </div>
                    <div class="col-md-12 alert-text-border  alert-text-padding">
                        <span>{{$t('rechList.detail.span3')}}：{{phone}}</span>
                    </div>
                    <div class="col-md-12 alert-text-border alert-text-padding">
                        <div class="col-md-6" style="padding: 0">
                            <span>{{$t('rechList.detail.span4')}}：{{reDetailArry.amount}}</span>
                        </div>
                    </div>
                    <div class="col-md-12 alert-text-border  alert-text-padding">
                        <span>{{$t('rechList.detail.span5')}}：{{reDetailArry.pay_chanel | invStatus($t('recharge.bottom.step3.type'+reDetailArry.pay_chanel))}}</span>
                    </div>
                    <div class="col-md-12 alert-text-border alert-text-padding">
                        <span>{{$t('rechList.detail.span6')}}：{{reDetailArry.status  | invStatus($t('recharge.bottom.step3.status'+reDetailArry.status))}}</span>
                    </div>
                </div>
                <div class="console-alert-btn">
                    <button class="btn  dark-grey-btn"  @click="sinDetailHidden=true">{{$t('billList.detail.returnBtn')}}</button>
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
                    amount:'',
                    payChanel:'',
                    cTimeBegin:"",
                    cTimeEnd:"",
                },
                rechargeArry:{},
                reDetailArry:{
                    status:"0",
                    pay_chanel:"0",
                },
                phone:common.getStoreData('userinfo').name,
                urlApi:'/api/console/RechargeListSRV?method='

            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            _self.$parent.setActive(1,'recharge_list');
            common.initStartDatepicker($('#start'),$('#end'));
            common.initEndDatepicker($('#end'),$('#start'));
            _self.getSinList(0);

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
                    amount:_self.searchData.amount,
                    payChanel:_self.searchData.payChanel,
                    cTimeBegin:$('#start').val(),
                    cTimeEnd:$('#end').val(),
                    customer_id:common.getStoreData('userinfo').customer_id
                }

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                _self.$http.post(_self.urlApi+'getRecharge',params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.rechargeArry=response.data.info;
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
            getSinDetail:function (id) {
                let _self=this;
                _self.$http.post(_self.urlApi+'getRecharge',{payId:id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.reDetailArry=response.data.info[0];
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
            showDetail:function (id) {
                let _self=this;
                _self.sinDetailHidden=false;
                _self.getSinDetail(id);
            },

        },
        filters: {
            invType:function (value,type) {
                if(!isNaN(value)){
                    return type;
                }else{
                    return ""
                }

            },
            timeFormat:function (value) {
                if (!value) return ''
                let date =value.split('T');
                let time=date[1].slice(0,8);
                return date[0]+' '+time
            },
            dateFormat:function (value) {
                if (!value) return ''
                let date =value.split('T');
                return date[0]
            },
            invStatus:function (value,type) {
                if(!isNaN(value)){
                    return type;
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
        margin-left: 0;
    }
    .recharge-table-body{
        max-height: 420px;
        min-height: 80px;
        width: 990px;
        position: relative;
    }


</style>
