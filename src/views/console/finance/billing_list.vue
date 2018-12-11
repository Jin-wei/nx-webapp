<template>
    <div class="info-relative" v-cloak>
        <div class="signature-position">
            <div class="signature-title">
                {{$t('billList.title')}}
            </div>
            <div class="table-div">
                <div class="table-header-fix">
                    <table class="gray-header-table " cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th style="width: 212px;padding-left:30px">{{$t('billList.table.th1')}}</th>
                            <th style="width: 143px">{{$t('billList.table.th2')}}</th>
                            <th style="width: 128px">{{$t('billList.table.th3')}}</th>
                            <th style="width: 92px">{{$t('billList.table.th4')}}</th>
                            <th style="width: 137px">{{$t('billList.table.th5')}}</th>
                            <th style="width: 145px">{{$t('billList.table.th6')}}</th>
                            <th style="width: 133px">{{$t('billList.table.th7')}}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div :class="{'table-body':language=='zh_cn','table-en-body':language=='en'}">
                    <table  class="gray-body-table"  cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr v-for="data in billingArry">
                            <!--<td style="width: 212px;padding-left:30px">{{data.c_time | timeFormat}}</td>-->
                            <td style="width: 212px;padding-left:30px">{{data.c_time}}</td>
                            <td style="width: 143px">{{data.amount}}</td>
                            <td style="width: 128px;">{{data.type | invType($t('billList.type'+data.type))}}</td>
                            <td style="width: 92px">{{data.status | invStatus($t('billList.status'+data.status))}}</td>
                            <td style="width: 137px;min-height: 35px">{{data.postal}}</td>
                            <td style="width: 145px">{{data.taxpayer_no}}</td>
                            <td style="width: 118px">
                                <a class="lookBtn" @click="LinkTo('invoice_request/:'+data.id+'/:0')">{{$t('billList.table.td_a1')}}</a>
                                <a class="changeBtn" v-if="data.status!=1 && data.status!=3" @click="LinkTo('invoice_request/:'+data.id+'/:1')">{{$t('billList.table.td_a2')}}</a>
                                <a class="changeBtn" v-if="data.status==1 || data.status==3" style="cursor: not-allowed">{{$t('billList.table.td_a2')}}</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="console-alert-warp" :class="{'hidden':sinDetailHidden}"  @click="sinDetailHidden=true"></div>
        <div class="console-alert-content application-alert-detail" :class="{'hidden':sinDetailHidden}">
            <div class="alert-narrow-title">
                <button type="button" class="close close-margin"  @click="sinDetailHidden=true">×</button>
                <div class="pull-left">{{$t('billList.detail.title')}}</div>

            </div>
            <div class="alert-content">
                <div class="alert-text application-alert-text">
                    <div class="col-md-4 alert-text-border alert-text-padding">
                        <span>{{$t('billList.detail.span1')}}：0001</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('billList.detail.span2')}}：牛信科技</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('billList.detail.span3')}}：已审核</span>
                    </div>
                    <div class="col-md-8 alert-text-border alert-text-padding">
                        <span>{{$t('billList.detail.span4')}}：2017/04/01</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('billList.detail.span5')}}：123123</span>
                    </div>
                    <div class="col-md-8 alert-text-border alert-text-padding">
                        <span>{{$t('billList.detail.span6')}}：审批通过</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('billList.detail.span7')}}：23243242</span>
                    </div>
                </div>
                <div class="console-alert-btn">
                    <button class="btn  dark-grey-btn"  @click="sinDetailHidden=true">{{$t('billList.detail.returnBtn')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .signature-title{
        font-size: 18px;
        line-height: 18px;
        padding:0 0 21px 20px;
        border-bottom:1px solid #dddddd;
        margin-bottom: 20px;
        font-weight: 400;
    }
    .signature-position{
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
    .application-alert-detail{
        width: 680px;
        height:249px;
        top:231px;
        left:446px;
    }
    .application-alert-text{
        width: 623px;
        height:145px;
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


</style>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')

    export default {
        data: function () {
            return {
                sinDetailHidden:true,
                billingArry:{},
                billingDetailArry:{},
                urlApi:'/api/console/InvoiceRequestSRV?method=',
                courierArry:'',
                language:common.getStoreData('language'),
            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            _self.$parent.setActive(1,'billing_list');
            _self.getCourier();

        },
        methods: {
            LinkTo:function (url) {
                let _self=this;
                _self.$router.push({path:url});
            },
            getSinList:function (params) {
                let _self=this;
                _self.$http.post(_self.urlApi+'getInvoice',params).then((response)=>{
                    if(response.data.errno==0){
                            if(response.data.info.length>0){
                                _self.billingArry=response.data.info;
                                for(var j=0;j<_self.billingArry.length;j++){
                                    for(var k=0;k<_self.courierArry.length;k++){
                                        if(_self.billingArry[j].postal==_self.courierArry[k].type){
                                            _self.billingArry[j].postal=_self.courierArry[k].name;
                                        }
                                    }

                                }

                        }else{
                                _self.billingArry="";
                        }

                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },
            showDetail:function (id) {
                let _self=this
                let params={
                        id:id
                    };
                _self.sinDetailHidden=false;
                _self.getSinList(params,1);
            },
            getCourier:function () {
                let _self=this;
                _self.$http.post(_self.urlApi+'getCourier').then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.courierArry=response.data.info;
                            _self.getSinList({});
                        }else{
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