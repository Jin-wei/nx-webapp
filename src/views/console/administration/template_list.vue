<template>
    <div class="info-relative" v-cloak>
        <div class="signature-position">
            <div class="signature-title">
                <div class="pull-left">
                    {{$t('templateList.title')}}
                </div>
               <div class="pull-right">
                   <button class="btn blue-btn" @click="linkTo(null)">  {{$t('templateList.new')}}</button>
               </div>
            </div>
            <div class="table-div">
                <div class="table-header-fix">
                    <table class="gray-header-table " cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th style="width: 128px;padding-left:32px"> {{$t('templateList.table.th1')}}</th>
                            <th style="width: 117px">{{$t('templateList.table.th2')}}</th>
                            <th style="width: 145px">{{$t('templateList.table.th3')}}</th>
                            <th style="width: 164px">{{$t('templateList.table.th4')}}</th>
                            <th style="width: 139px">{{$t('templateList.table.th5')}}</th>
                            <th style="width: 118px">{{$t('templateList.table.th6')}}</th>
                            <th style="width: 179px">{{$t('templateList.table.th7')}}</th>

                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body">
                    <table  class="gray-body-table"  cellpadding="0" cellspacing="0" style="table-layout:fixed;">
                        <tbody>
                        <tr v-for=" data in temArry">
                            <td style="width: 128px;padding-left:32px">{{data.id}}</td>
                            <td style="width: 117px;">{{data.type}}</td>
                            <td class="textEllipsis" style="width: 145px;">{{data.name}}</td>
                            <td class="textEllipsis" style="width: 164px;">{{data.content}}</td>
                            <!--<td style="width: 139px">{{data.c_time | dateFormat}}</td>-->
                            <td style="width: 139px">{{data.c_time}}</td>
                            <td style="width: 118px">{{data.status | appStatus($t('filters.appStatus'+data.status))}}</td>
                            <td style="width: 164px">
                                <a :class="{'lookBtn':language=='zh_cn','lookBtn2':language=='en'}" @click="showDetail(data.id)">{{$t('templateList.table.td_a1')}}</a>
                                <a :class="{'changeBtn':language=='zh_cn','changeBtn2':language=='en'}" @click="linkTo(data.id)">{{$t('templateList.table.td_a2')}}</a>
                                <a :class="{'deleteBtn':language=='zh_cn','deleteBtn2':language=='en'}" @click="deleteTem(data.id)">{{$t('templateList.table.td_a3')}}</a>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="console-alert-warp" :class="{'hidden':temDetailHidden}"  @click="temDetailHidden=true"></div>
        <div class="console-alert-content" :class="{'hidden':temDetailHidden,'template-alert-detail':language=='zh_cn','template-alert-detail2':language=='en'}">
            <div class="alert-narrow-title">
                <button type="button" class="close close-margin"  @click="temDetailHidden=true">×</button>
                <div class="pull-left">{{$t('templateList.detail.title')}}</div>
            </div>
            <div class="alert-content">
                <div class="alert-text " :class="{'template-alert-text':language=='zh_cn','template-alert-text2':language=='en'}">
                    <div class="col-md-6 alert-text-border alert-text-padding">
                        <span> {{$t('templateList.detail.span1')}}：{{temDetailArry.type | appStatus($t('templateList.type'+temDetailArry.type))}}</span>
                    </div>
                    <div class="col-md-6 alert-text-border">
                        <span>{{$t('templateList.detail.span2')}}：{{temDetailArry.name}}</span>
                    </div>

                    <div class="col-md-12 alert-content-border ">
                        <span>{{$t('templateList.detail.span4')}}：{{temDetailArry.content}}</span>
                    </div>
                    <div class="col-md-12 alert-text-border alert-text-padding">
                        <span>{{$t('templateList.detail.span9')}}：{{temDetailArry.comments}}</span>
                    </div>
                    <div class="col-md-6 alert-text-border alert-text-padding">
                        <span>{{$t('templateList.detail.span5')}}：{{temDetailArry.approverName}}</span>
                    </div>
                    <div class="col-md-6 alert-text-border">
                        <span>{{$t('templateList.detail.span3')}}：{{temDetailArry.status | appStatus($t('filters.appStatus'+temDetailArry.status))}}</span>
                    </div>
                    <div class="col-md-4 alert-text-border alert-text-padding">
                        <span>{{$t('templateList.detail.span6')}}：{{temDetailArry.c_time | dateFormat}}</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('templateList.detail.span7')}}：{{temDetailArry.approver_time | dateFormat}}</span>
                    </div>
                    <div class="col-md-4 alert-text-border">
                        <span>{{$t('templateList.detail.span8')}}：{{temDetailArry.approval_opinion}}</span>
                    </div>

                    <div class="console-alert-btn">
                        <button class="btn  dark-grey-btn"  @click="temDetailHidden=true">{{$t('templateList.detail.returnBtn')}}</button>
                    </div>
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
                temDetailHidden:true,
                temArry:{},
                temDetailArry:{
                    status:0
                },
                urlApi:'/api/console/TemplateListSRV?method=',
                language:common.getStoreData('language')

            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            _self.$parent.setActive(0,'template_list');
            _self.getTemList({},1);
        },
        methods: {
            linkTo:function (id) {
                let _self=this;
                _self.$router.push({path:'/console/new_template/:'+id});
            },
            getTemList:function (params ,type) {
                let _self=this;
                _self.$http.post(_self.urlApi+'getTemplate',params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            if(type==1){
                                _self.temArry=response.data.info;
                                _self.getTemType();
                            }else if(type==2){
                                _self.temDetailArry=response.data.info[0];
                                _self.getTemType();
                            }
                        }else{
                            if(type==1){
                                _self.temArry='';
                            }else if(type==2){
                                _self.temDetailArry={
                                    status:0
                                };
                            }
                        }

                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },
            deleteTem:function (id) {
                let _self=this;
                let params={
                    id:id
                }
                common.dealConfrimCommon('确认要删除此应用吗？', function() {
                    _self.$http.post(_self.urlApi+'deleteTemplate',params).then((response)=>{
                        if(response.data.errno==0){
                            common.WarningBox(_self, 'DELETE_SUCESS');
                            _self.getTemList({},1);
                        }else{
                            common.dealConsolError(_self,response);
                        }
                    },(response)=>{
                        common.dealConsolError(_self,response);
                    })
                })

            },
            showDetail:function (id) {
                let _self=this;
                _self.temDetailHidden=false;
                let params={
                    id:id
                };
                _self.getTemList(params,2)

            },
            getTemType:function () {
                let _self=this;
                _self.$http.post(_self.urlApi+'getTemplateType',{}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.TemTypeArr = response.data.info;
                            for(var i=0;i<_self.temArry.length;i++){
                                for(var j=0;j<_self.TemTypeArr.length;j++){
                                    if(_self.temArry[i].type==_self.TemTypeArr[j].type){
                                        _self.temArry[i].type=_self.TemTypeArr[j].name;
                                    }
                                }
                            }

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
            appStatus:function (value,type) {
                if(!isNaN(value)){
                    return type;
                }else{
                    return ""
                }

            },
            dateFormat:function (value) {
                if (!value) return ''
                let arry='';
                arry=value.split("T")[0];
                return arry
            }

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
        height: 390px;
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
    .template-alert-detail{
        width: 680px;
        min-height:290px;
        top:192px;
        left:433px;
    }
    .template-alert-text{
        width: 600px;
        height:auto!important;
        min-height:180px;
        height:180px;

    }
    .template-alert-detail2{
        min-width: 680px;
        min-height:290px;
        top:192px;
        left:300px;
    }
    .template-alert-text2{
        min-width: 623px;
        max-width:900px;
        margin: 0 10px;
        height:auto!important;
        min-height:230px;
        height:230px;
    }
    .alert-text-padding{
        padding-left: 19px!important;
    }
    .console-alert-btn{
        /*min-height: 50px;*/
        text-align: center;
    }

    .alert-content-border{
        border-bottom: 1px solid #e1e1e1;
        padding:7px 15px 0 19px;
        min-height: 44px;
        width: 100%;
        word-break:break-all;
        word-wrap : break-word;
        line-height:30px;
        min-height:40px;
        height: auto;
    }
    .textEllipsis {
        white-space: nowrap!important;
        overflow: hidden!important;
        text-overflow: ellipsis!important;
        display:inline-block!important;
        min-height: 34px;
    }


</style>
