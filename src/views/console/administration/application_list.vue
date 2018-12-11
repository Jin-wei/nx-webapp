<template>
    <div class="info-relative" v-cloak>
        <div class="signature-position">
            <div class="signature-title">
                <div class="pull-left">
                    {{$t('appList.title')}}
                </div>
                <div class="pull-right">
                    <button class="btn blue-btn" @click="LinkTo('/console/new_application/:null')">{{$t('appList.new')}}</button>
                </div>
            </div>
            <div class="table-div">
                <div class="table-header-fix">
                    <table class="gray-header-table " cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th style="width: 206px;padding-left:36px"> {{$t('appList.table.th1')}}</th>
                            <th style="width: 176px">{{$t('appList.table.th2')}}</th>
                            <th style="width: 177px">{{$t('appList.table.th3')}}</th>
                            <th style="width: 149px">{{$t('appList.table.th4')}}</th>
                            <th style="width: 282px">{{$t('appList.table.th5')}}</th>

                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body">
                    <table  class="gray-body-table"  cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr v-for="data in appArry">
                            <td style="width: 206px;padding-left:36px">{{data.name}}</td>
                            <td style="width: 176px">{{data.app_key}}</td>
                            <td style="width: 177px">{{data.serviceArr | service}}</td>
                            <td style="width: 149px;">
                                <img class="applic-green-icon" src="/static/images/img/consloe/administration/green-icon.png" alt="">{{data.status | appStatus($t('filters.appStatus'+data.status))}}</td>
                            <td style="width: 267px">
                                <a :class="{'lookBtn':language=='zh_cn','lookBtn2':language=='en'}" @click="LinkTo('/console/new_application/:'+data.id)">{{$t('appList.table.td_a1')}}</a>
                                <a :class="{'changeBtn':language=='zh_cn','changeBtn2':language=='en'}" @click="showDetail(data.id)">{{$t('appList.table.td_a2')}}</a>
                               <!-- <a :class="{'changeBtn':language=='zh_cn','changeBtn2':language=='en'}">{{$t('appList.table.td_a3')}}</a>-->
                               <!-- <a :class="{'changeBtn':language=='zh_cn','changeBtn2':language=='en'}" @click="LinkTo2('/console/chart_statistics/:2',data.id)">{{$t('appList.table.td_a4')}}</a>-->
                                <a :class="{'deleteBtn':language=='zh_cn','deleteBtn2':language=='en'}" @click="deleteApp(data.id)">{{$t('appList.table.td_a5')}}</a>
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
                <div class="pull-left">{{$t('appList.detail.title')}}</div>
            </div>
            <div class="alert-content">
                <div class="alert-text application-alert-text">
                    <div class="col-md-4 alert-text-border alert-text-padding">
                        <span> {{$t('appList.detail.span1')}}{{detailArry.name}}</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('appList.detail.span2')}}{{detailArry.status | appStatus($t('filters.appStatus'+detailArry.status))}}</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('appList.detail.span3')}}{{detailArry.serviceArr | service}}</span>
                    </div>
                    <div class="col-md-8 alert-text-border alert-text-padding">
                        <span>{{$t('appList.detail.span4')}}{{detailArry.app_key}}</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('appList.detail.span5')}}{{detailArry.app_secret}}</span>
                    </div>
                    <div class="col-md-8 alert-text-border alert-text-padding">
                        <span>{{$t('appList.detail.span6')}}{{detailArry.approval_opinion}}</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('appList.detail.span7')}}{{detailArry.approver}}</span>
                    </div>
                </div>
                <div class="console-alert-btn">
                    <button class="btn  dark-grey-btn"  @click="sinDetailHidden=true">{{$t('appList.detail.returnBtn')}}</button>
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
                detailArry:{
                    status:0,
                },
                appArry:'',
                urlApi:'/api/console/ApplicationListSRV?method=',
                language:common.getStoreData('language')
            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            _self.$parent.setActive(0,"application_list");
            _self.httpPost('getApplicationService',{},0);
        },
        methods: {
            LinkTo:function (url) {
                let _self=this;
                _self.$router.push({path:url});
            },
            LinkTo2:function (url,id) {
                let _self=this;
                _self.$router.push({path:url,query: {id: id}});
            },
            httpPost:function (method,params,type) {
                //0 获得列表, 1删除，2获得详情
                let _self=this;
                _self.$http.post(_self.urlApi+method,params).then((response)=>{
                    if(response.data.errno==0){
                            if(response.data.info.length>0) {
                                if (type == 0) {
                                    _self.appArry=response.data.info;

                                } else if (type == 2) {
                                    _self.detailArry=response.data.info[0];
                                }
                            }
                                if(type==1){
                                    common.WarningBox(_self, 'DELETE_SUCESS');
                                    _self.httpPost('getApplicationService',{},0);
                                }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },
            deleteApp:function (id) {
                let _self=this;
                let params={
                    id:id
                };
                common.dealConfrimCommon('确认要删除此应用吗？', function() {
                    _self.httpPost('deleteApplication',params,1);
                })
            },
            showDetail:function (id) {
                let _self=this;
                let params={
                    id:id
                };
                _self.sinDetailHidden=false;
                _self.httpPost('getApplicationService',params,2);

            },

        },
        filters: {
            appStatus:function (value,type) {
                if(!isNaN(value)){
                    return type;
                }else{
                    return ""
                }

            },
            service:function (value) {
                if (!value) return ''
                let arry='';
                if(value.length==1){
                    arry=arry+value[0].name
                }else if(value.length>1){
                    arry=arry+value[0].name
                    for(var i=1;i<value.length;i++){
                        arry=arry+' ,'+value[i].name
                    }

                }

                return arry
            },

        }
    }
</script>

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
        min-height: 600px;
        height:auto!important;
        height:500px;
        top:50px;
        left:40px;
        /*padding:50px 0 0 40px;*/
        font-weight: 500;
    }

    .signature-btn-position{
        padding: 20px 0 0 20px;
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
    .deleteBtn{
        font-size: 14px;
        color: #e34242;
        margin-left: 14px;
        cursor: pointer;
    }
    .lookBtn2{
        font-size: 12px;
        color: #41b0e3;
        cursor: pointer;
    }
    .changeBtn2{
        font-size: 12px;
        color: #41b0e3;
        margin-left: 10px;
        cursor: pointer;
    }
    .deleteBtn2{
        font-size: 12px;
        color: #e34242;
        margin-left: 10px;
        cursor: pointer;
    }
    .gray-body-table .lookBtn:hover,.gray-body-table .changeBtn:hover,.gray-body-table .lookBtn2:hover,.gray-body-table .changeBtn2:hover{
        color: #41b0e3;
        border-bottom: 1px solid #41b0e3;
    }

    .gray-body-table .deleteBtn:hover, .gray-body-table .deleteBtn2:hover{
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
       /* width: 12px;
        height: 12px;
        margin:0 1px 0 2px;*/
    }


</style>
