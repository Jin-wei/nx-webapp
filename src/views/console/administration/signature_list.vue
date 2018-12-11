<template>
    <div class="info-relative" v-cloak>
        <div class="signature-position">
            <div class="signature-title">
                <div class="pull-left">
                    {{$t('signatureList.title')}}
                </div>
                <div class="pull-right">
                    <button class="btn blue-btn" @click="linkTo(null)">{{$t('signatureList.new')}}</button>
                </div>
            </div>
            <div class="table-div">
                <div class="table-header-fix">
                    <table class="gray-header-table " cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th style="width: 241px;padding-left:51px"> {{$t('signatureList.table.th1')}}</th>
                            <th style="width: 196px">{{$t('signatureList.table.th2')}}</th>
                            <th style="width: 197px">{{$t('signatureList.table.th3')}}</th>
                            <th style="width: 171px">{{$t('signatureList.table.th4')}}</th>
                            <th style="width: 185px">{{$t('signatureList.table.th5')}}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body">
                    <table  class="gray-body-table"  cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr v-for="data in sinArry">
                         <!--   <td style="width: 241px;padding-left:51px">{{data.key}}</td>-->
                            <td style="width: 241px;padding-left:51px">{{data.serviceId}}</td>
                            <td style="width: 196px">{{data.value}}</td>
                            <!--<td style="width: 197px">{{data.c_time | dateFormat}}</td>-->
                            <td style="width: 197px">{{data.c_time }}</td>
                            <td style="width: 171px">{{data.status | appStatus($t('filters.appStatus'+data.status))}}</td>
                            <td style="width: 170px">
                                <a :class="{'lookBtn':language=='zh_cn','lookBtn2':language=='en'}" @click="showDetail(data.serviceId)">{{$t('signatureList.table.td_a1')}}</a>
                                <a :class="{'changeBtn':language=='zh_cn','changeBtn2':language=='en'}" @click="linkTo(data.serviceId)">{{$t('signatureList.table.td_a2')}}</a>
                                <a :class="{'deleteBtn':language=='zh_cn','deleteBtn2':language=='en'}" @click="deleteSin(data.serviceId)">{{$t('signatureList.table.td_a3')}}</a>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="console-alert-warp" :class="{'hidden':sinDetailHidden}"  @click="sinDetailHidden=true"></div>
        <div class="console-alert-content signature-alert-detail" :class="{'hidden':sinDetailHidden}">
            <div class="alert-narrow-title">
                <button type="button" class="close close-margin"  @click="sinDetailHidden=true">×</button>
                <div class="pull-left">{{$t('signatureList.detail.title')}}</div>
            </div>
            <div class="alert-content">
                <div class="alert-text signature-alert-text">
                        <!--<div class="col-md-6 alert-text-border">
                            <span>{{$t('signatureList.detail.span1')}}{{sinDetailArry.key}}</span>
                        </div>-->
                        <div class="col-md-6 alert-text-border">
                            <span>{{$t('signatureList.detail.span2')}}{{sinDetailArry.value}}</span>
                        </div>
                        <div class="col-md-6 alert-text-border">
                            <span>{{$t('signatureList.detail.span3')}}{{sinDetailArry.status | appStatus($t('filters.appStatus'+sinDetailArry.status))}}</span>
                        </div>
                        <div class="col-md-6 alert-text-border">
                            <span>{{$t('signatureList.detail.span4')}}{{sinDetailArry.c_time | dateFormat}}</span>
                        </div>
                        <div class="col-md-6 alert-text-border">
                            <span>{{$t('signatureList.detail.span5')}}{{sinDetailArry.approverName}}</span>
                        </div>
                        <div class="col-md-6 alert-text-border">
                            <span>{{$t('signatureList.detail.span6')}}{{sinDetailArry.approver_time | dateFormat}}</span>
                        </div>
                        <div class="col-md-6 alert-text-border">
                            <span>{{$t('signatureList.detail.span7')}}{{sinDetailArry.approval_opinion}}</span>
                        </div>
                </div>
                <div class="console-alert-btn">
                    <button class="btn  dark-grey-btn"  @click="sinDetailHidden=true">{{$t('signatureList.detail.returnBtn')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../../../controller/signature_list_controller.js"></script>

<style src="../../../css/signature_list.css"></style>