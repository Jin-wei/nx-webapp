<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 财务报表管理</a></li>
                <li class="active">队列报表</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 100px">
                        <form class="form-horizontal">
                            <div class="">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">客户ID</label>
                                    <div class="col-sm-2">
                                        <input type="text" class="form-control" v-model="search.customerId" id="customerID" oninput="if(value.length>30)value=value.slice(0,30)" />
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">批次名称</label>
                                    <div class="col-sm-2">
                                        <input type="text"  class="form-control"  v-model="search.batchName" id="batchName" oninput="if(value.length>30)value=value.slice(0,30)"/>

                                    </div>

                                    <label class="col-sm-1 control-label input-sm">定时时间</label>
                                    <div class="col-sm-5">
                                        <div class="">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="start_date"
                                                       placeholder="起始时间"/>
                                                <span class="input-group-addon" style="background: #d2d6de">-</span>
                                                <input type="text" class="form-control" id="end_date"
                                                       placeholder="截止时间"/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">手机号</label>
                                    <div class="col-sm-2">
                                        <input type="text" class="form-control" v-model="search.phone" oninput="if(value.length>30)value=value.slice(0,30)" />
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">短信内容</label>
                                    <div class="col-sm-2">
                                        <input type="text"  class="form-control" v-model="search.content" oninput="if(value.length>30)value=value.slice(0,30)"/>

                                    </div>
                                    <label class="col-sm-1 control-label input-sm">是否定时</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="search.isTiming">
                                            <option value="">全部</option>
                                            <option value="0">非定时</option>
                                            <option value="1">定时</option>
                                        </select>

                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary " v-on:click="searchRecharge" style="margin-left: 18px">  查    询  </button>
                                        <button type="button" class="btn btn-default resert-margin"  v-on:click="revertData">  重    置  </button>
                                    </div>
                                   <!-- <label class="col-sm-1 control-label input-sm">状态</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="search.status">
                                            <option value="">全部</option>
                                            <option value="0">默认</option>
                                            <option value="1">已提交</option>
                                            <option value="2">提交失败</option>
                                            <option value="3">发送成功</option>
                                            <option value="4">发送失败</option>
                                        </select>

                                    </div>-->
                                </div>
                                <div class="from-group">

                                </div>
                            </div>
                        </form>
                        <div class="clear"></div>
                    </div>
                </div>

            </div>
        </div>



            <div class="row">
                <div class="col-xs-12">
                    <div class="box box-primary" >
                        <div class="box-header">
                            <h3 class="box-title">查询结果</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                                <table id="table" class="table table-bordered table-hover dataTable"  >
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <!-- /.content -->


    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    const apiUrl = '/api/admin/quequeCustomer?method='
    var sumArry=''

    function timeFormatter(value, row) {
        if (!value) return ''
        let date =value;
        date =date.split('T');
        let time=date[1].slice(0,8);
        return date[0]+' '+time
    }

    function statusFormatter(value, row) {
        if(value===null || value===""){
            return ""
        }else if(value==0){
            return '默认'
        }
        else if(value==1){
            return '已提交'
        }
        else if(value==2){
            return '提交失败'
        }
        else if(value==3){
            return '发送成功'
        }
        else if(value==4){
            return '发送失败'
        }
    }

    function timeingFormatter(value, row) {
        if(value===null || value===""){
            return ""
        }else if(value==0){
            return '非定时'
        }
        else if(value==1){
            return '定时'
        }

    }

    export default {
        data: function() {
            return {
                pagePara: {},
                workRow: {
                    menu_icon: ''
                },
                search:{
                    customerId:"",
                    batchName:'',
                    phone:'',
                    status:'',
                    isTiming:"",
                    content:'',

                },
                date:'',
                inputFile:'',
                oldRow: {},
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this

            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));


            function queryParams(params) {
                params.timingBegin= $('#start_date').val();
                params.timingEnd= $('#end_date').val();
                params.customerId =_self.search.customerId;
                params.batchName=_self.search.batchName;
                params.phone=_self.search.phone;
                params.status=_self.search.status;
                params.isTiming=_self.search.isTiming;
                params.content=_self.search.content;

                for(var key in params){
                    if(params[key]==='' ){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }

            function actFormatter(value) {
                let appName=";"
                if(value==null || value==""){
                    appName="";
                }else{
                    appName=value;
                }
                return [
                    '<a class="turnMessage" title="跳转">' + appName + '</a>'
                ].join('')
            }

            function initTable() {
                window.tableEvents = {
                    'click .turnMessage': function(e, value, row, index) {
                        _self.$router.push({path: '/admin/messageCustomer'})
                        common.setStoreData('appName',value);
                        common.setStoreData('startDate',$('#start_date').val());
                        common.setStoreData('endDate',$('#end_date').val());


                    }
                };
                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getBatch',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        sumArry=res.info.sumDate;
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndexFooter('序号'),
                        common.BTRowFormat('appname', '应用名称'),
                        common.BTRowFormat('batch_name', '批次名称'),
                        common.BTRowFormatWithFormatter('content', '内容',common.remarkFormatter),
                        common.BTRowFormatWithFormatter('is_timing', '是否定时',timeingFormatter),
                        common.BTRowFormat('phone', '号码'),
                        common.BTRowFormat('result', '回执'),
                        common.BTRowFormat('signavalue', '签名'),
                        common.BTRowFormat('status', '状态'),
                        common.BTRowFormat('tempName', '模版名称'),
                        common.BTRowFormat('temptype', '模版类型'),
//                        common.BTRowFormatWithFormatter('timing', '定时时间',timeFormatter),
                        common.BTRowFormatWithFormatter('timing', '定时时间',common.formateTimeDate),
                    ],
                    idField: 'id',
                    uniqueId: 'id',
                    clickToSelect: true,
                    showRefresh: false,
                    pagination: true,
                    pageSize: 15,
                    pageList: [10, 15, 25, 50, 100],
                    locale: 'zh-CN',
                    undefinedText:'',
                    showFooter:false,
                    /*striped:true,*/
                    onEditableShown: function(field, row, $el, editable) {
                        _self.oldRow = $.extend(true, {}, row)
                    },
                    onEditableSave: function(field, row, oldValue, $el) {
                        common.rowModifyWithT(_self, apiUrl + 'modifyCountry', row, 'materiel_id', $('#table'))
                    },
                    onLoadError:function (status,row) {
                        common.dealTableError(_self,status,row);
                    },
                    onPostBody: function (name, args) {
                        $('[data-toggle="popover"]').each(function () {
                            $(this).popover()
                        })
                    }

                })
                common.changeTableClass($('#table'))
            }

            $(function() {
                initTable()

            })

        },
        methods: {
            searchRecharge: function (event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },
            revertData: function () {
                let _self = this;
                $('#start_date').val("");
                $('#end_date').val("");
                _self.search={
                       customerId:"",
                        batchName:'',
                        phone:'',
                        status:'',
                        isTiming:"",
                        content:'',

                };
            },
            getAppName:function () {
                //业务员模糊查询
                let _self=this;
                let params={
                    appName:$('#appName').val(),
                };
                common.fuzzySearch(_self,'appName',apiUrl + 'getApplication',params);
            },

            getCustomer:function () {
                //客户模糊查询
                let _self=this;
                let params={
                    realName:$('#customer').val(),
                };
                common.fuzzySearch(_self,'customer',apiUrl + 'getCustomer',params);
            },

            exportExl:function () {
                let _self=this;
                let params={};
                params.realName=$('#customer').val();
                params.dayBegin= $('#start_date').val();
                params.dayEnd= $('#end_date').val();
                params.appName =$( "#appName" ).val();

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                common.downFile(_self,apiUrl+'downloadDayReportCustomerApplication',params);
            },
        }

    }

</script>
<style>
    .clear{
        clear:both;
    }
    .content-header .breadcrumb{
        margin-bottom: 10px;
    }
    .model-margin{
        margin-left: 15px;
    }
    .resert-margin {
        margin-left: 10px;
    }

    .fixed-table-container {
        border: none;
    }
    .body-session-margin{
        margin-top: 6px;
    }

    .fixed-table-header .bootstrap-table .table {
        border-bottom: none;
    }
    .bootstrap-table .table:not(.table-condensed), .bootstrap-table .table:not(.table-condensed)>tbody>tr>td, .bootstrap-table .table:not(.table-condensed)>tbody>tr>th, .bootstrap-table .table:not(.table-condensed)>tfoot>tr>td, .bootstrap-table .table:not(.table-condensed)>tfoot>tr>th, .bootstrap-table .table:not(.table-condensed)>thead>tr>td{
        padding:3px 6px;
    }
    .table tbody{
        margin-top: -1px;
    }

    .import label{

        line-height: 28px;
    }

    .box-header>.fa, .box-header>.glyphicon, .box-header>.ion, .box-header .box-title{
        color: #333333;
    }
    a{
        cursor:pointer;
    }
    .produce-span{
        display: inline-block;
        float: left;
        width: 70px;
        line-height: 34px;
    }
    .produce-div{
        float: left;
        width: 285px;
    }
    .produce{
        margin-bottom: 10px;
    }
    .top-border{
        min-height: 107px;
        border-bottom:1px  solid #f3f3f3;

    }
    .import-btn{
        margin-top: 10px;
        float: right;
    }
    .alert-text-padding{
        padding-left: 19px;
        line-height: 40px;
    }
    .alert-text-border{
        border-bottom: 1px solid #f4f4f4;
        padding-left: 0;
        padding-right: 15px;
        display:inline-block;
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;

    }
    .message-border{
        min-height: 60px;
        border-bottom:1px  solid #f3f3f3;
    }
    .day-message-border{
        min-height: 60px;
        border-bottom:1px  solid #f3f3f3;
    }
    .showDetail{
        cursor: pointer;
    }
    .day-border{
        min-height: 100px;
        border-bottom:1px  solid #f3f3f3;
    }

</style>