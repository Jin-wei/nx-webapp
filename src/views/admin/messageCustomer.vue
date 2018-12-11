<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 财务报表管理</a></li>
                <li class="active">短信记录查询</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 80px">
                        <form class="form-horizontal">
                            <div class="top-message-border">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">客户</label>
                                    <div class="col-sm-2">
                                        <input class="form-control col-md-8"  id="customer"  oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getCustomer">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">应用名称</label>
                                    <div class="col-sm-2">
                                        <input type="text"  id="appName"  class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getApp">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">号码</label>
                                    <div class="col-sm-2">
                                        <input type="number" v-model="search.phone"  id="phone" class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">目的地</label>
                                    <div class="col-sm-2">
                                        <input type="text" id="country" class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getCountry">
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">供应商</label>
                                    <div class="col-sm-2">
                                        <input type="text"  class="form-control input-sm" id="vendorName"  oninput="if(value.length>30)value=value.slice(0,30)" >
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">内容</label>
                                    <div class="col-sm-2">
                                        <input type="text"  class="form-control input-sm" id="content"  oninput="if(value.length>30)value=value.slice(0,30)" >
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">状态</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" id="SeccStatus">
                                            <option value=''>全部</option>
                                            <option value="0">成功</option>
                                            <option value="1">失败</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">类型</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="search.type">
                                            <option value=''>全部</option>
                                            <option value="1">定时短信</option>
                                            <option value="0">即时发送</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">提交时间</label>
                                    <div class="col-sm-5">
                                        <div class="input-group">
                                            <input  type="text" class="form-control" id="start_date" placeholder="起始时间"/>
                                            <span class="input-group-addon" style="background: #d2d6de">-</span>
                                            <input type="text" class="form-control" id="end_date" placeholder="截止时间"/>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary message-btn-margin" v-on:click="searchCustomer">  查    询  </button>
                                        <button type="button" class="btn btn-default resert-margin"  v-on:click="revertData">  重    置  </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div>
                            <button type="button" class="btn btn-primary  import-btn" v-on:click="exportExl">  批量导出  </button>
                        </div>
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
    const apiUrl = '/api/admin/messageCustomer?method='
    var sumArry='';

    function cutomerPriceFormat() {
        if(!isNaN(sumArry.totalCustomerPrice)){
            return sumArry.totalCustomerPrice
        }else{
            return ""
        }
    }

    function basePriceFormat() {
        if(!isNaN(sumArry.totalVendorPrice)){
            return sumArry.totalVendorPrice
        }else{
            return ""
        }
    }

    function profitPriceFormat() {
        if(!isNaN(sumArry.totalProfit)){
            return sumArry.totalProfit
        }else{
            return ""
        }
    }

    function timeFormatter(value, row) {
        if (!value) return ''
        let date =value;
        date =date.split('T');
        let time=date[1].slice(0,8);
        return date[0]+' '+time
    }
    function typeFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '即时发送'
        }else if(value===1){
            return '定时发送'
        }

    }
    function statusFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '路由未匹配上'
        }else if(value===1){
            return '提交给供应商'
        }else if(value===2){
            return '供应商没有发送成功'
        }else if(value===3){
            return '已经发送成功'
        }else if(value===4){
            return '余额不足'
        }else{
            return '发送失败'
        }

    }
    function reStatusFormatter(value, row) {
        if(value===null){
            return ' '
        }
       /* else if(value===0){
            return '失败'
        }else if(value===1){
            return '成功'
        }*/

    }

    export default {
        data: function() {
            return {
                pagePara: {},
                workRow: {
                    menu_icon: ''
                },
                date:'',
                inputFile:'',
                oldRow: {},
                search:{
                    phone:'',
                    customer:'',
                    appName:'',
                    city:'',
                    status:'',
                    type:''
                },

                //url获得
                customer:common.getStoreData('customer'),
                vendorName:common.getStoreData('vendorName'),
                appName:common.getStoreData('appName'),
                startDate:common.getStoreData('startDate'),
                endDate:common.getStoreData('endDate'),
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this

            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));

            $('#start_date').datepicker('setDate',new Date());
            $('#end_date').datepicker('setDate',new Date());

            //赋值url获得数据
            if(_self.judgeNull(_self.customer)){
                $('#customer').val(_self.customer)
            }
            if(_self.judgeNull(_self.appName)){
                $('#appName').val(_self.appName)
            }
            if(_self.judgeNull(_self.startDate)){
                $('#start_date').val(_self.startDate)
            }else{

            }
            if(_self.judgeNull(_self.endDate)){
                $('#end_date').val(_self.endDate)
            }
            if(_self.judgeNull(_self.vendorName)){
                ('#content').val(_self.vendorName)
            }


            function queryParams(params) {
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.phone =_self.search.phone;
                params.appName =$('#appName').val();
                params.chinese =$('#country').val();
                params.smsType =_self.search.type;
                params.realName=$('#customer').val();
                params.message=$('#content').val();
                params.vendorName=$('#vendorName').val();
                params.SeccStatus=$('#SeccStatus').val();

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter() {
                return [
                    '<span class="label label-primary messageDetail" title="详情">  查看短信明细  </span>'
                ].join('')
            }


            function initTable() {
                window.tableEvents = {
                    'click .messageDetail': function(e, value, row, index) {
                        _self.$router.push({path: '/admin/messageListCustomer', query: {id: row.id}});
                    }

                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getMessage',
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
                        common.BTRowFormat('real_name', '客户'),
                        common.BTRowFormat('vendorName', '供应商'),
                        common.BTRowFormat('appName', '应用名称'),
                        common.BTRowFormat('phone', '号码'),
                        common.BTRowFormat('chinese', '目的地国家'),
                        common.BTRowFormatWithFormatter('message', '内容',common.remarkFormatter),
//                        common.BTRowFormatWithFormatter('created_time', '提交时间',timeFormatter),
//                        common.BTRowFormatWithFormatter('target_time', '发送时间',timeFormatter),
                        common.BTRowFormat('created_time', '提交时间'),
                        common.BTRowFormat('target_time', '发送时间'),
                        common.BTRowFormatFooter('customer_price', '客户价格',cutomerPriceFormat),
                        common.BTRowFormatFooter('vendor_price', '成本价格',basePriceFormat),
                        common.BTRowFormatFooter('profit', '利润',profitPriceFormat),
                        common.BTRowFormatWithFormatter('sms_type', '类型',typeFormatter),
                        common.BTRowFormat('result', '状态'),
                        common.BTRowFormatWithFormatter('dr_result', '回执状态',reStatusFormatter),
                        common.BTRowFormat('kh_result', '客户状态'),
                        common.BTRowFormat('size', '计费条数'),
                    ],
                    idField: 'id',
                    uniqueId: 'id',
                    clickToSelect: true,
                    showRefresh: false,
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 15, 25, 50, 100],
                    locale: 'zh-CN',
                    undefinedText:'',
                    showFooter:true,
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
            _self.getCustomer();
            _self.getApp();
            _self.getCountry();
        },
        methods: {
            revertData:function () {
                let _self=this;
                _self.search={
                    phone:'',
                    customer:'',
                    appName:'',
                    city:'',
                    status:'',
                    type:''
                };

                $('#start_date').val("");
                $('#end_date').val("");
                $( "#customer" ).val("");
                $( "#appName" ).val("");
                $( "#country" ).val("");
                $('#content').val("");
                $('#vendorName').val("");
                $('#SeccStatus').val("");

            },
            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },
            getCustomer:function () {
                //客户模糊查询
                let _self=this;
                let params={
                    realName:$('#customer').val(),
                };
                common.fuzzySearch(_self,'customer',apiUrl + 'getCustomer',params);
            },
            getApp:function () {
                //应用模糊查询
                let _self=this;
                let params={
                    appName:$('#appName').val(),
                };
                common.fuzzySearch(_self,'appName',apiUrl + 'getApplication',params);
            },
            getPhone:function () {
                let _self=this;
                let params={
                    phoneName:$('#phone').val(),
                };
                common.fuzzySearch(_self,'phone',apiUrl + 'getPhone',params);
            },
            getCountry:function () {
                let _self=this;
                let params={
                    countryName:$('#country').val(),
                };
                common.fuzzySearch(_self,'country',apiUrl + 'getCountry',params);

            },
            exportExl:function () {
                let _self=this;
                let params={};
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.phone =_self.search.phone;
                params.appName =$('#appName').val();
                params.chinese =$('#country').val();
                params.smsType =_self.search.type;
                params.realName=$('#customer').val();

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                common.downFile(_self,apiUrl+'downloadMessage',params);
            },
            judgeNull:function (value) {
                if(value!=undefined && value!=null && value!=''){
                    return true
                }else {
                    return false
                }
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
    .messageDetail{
        cursor: pointer;
    }
    .message-btn-margin{
        margin-left: 18px;
    }
    .top-message-b    .clear{
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
    .messageDetail{
        cursor: pointer;
    }
    .message-btn-margin{
        margin-left: 18px;
    }
    .top-message-border{
        min-height: 70px;
        border-bottom:1px  solid #f3f3f3;
    }


</style>