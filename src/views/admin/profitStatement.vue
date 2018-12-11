<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 财务报表管理</a></li>
                <li class="active">客户利润报表</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 100px">
                        <form class="form-horizontal">
                            <div class="profit-border">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">业务员</label>
                                    <div class="col-sm-2">
                                        <input type="text"  class="form-control" id="sale" oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getSales"/>

                                    </div>
                                    <label class="col-sm-1 control-label input-sm">客户</label>
                                    <div class="col-sm-2">
                                        <input type="text"  class="form-control" id="customer" oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getCustomer"/>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">查询日期</label>
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
                                <div class="from-group">
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary " v-on:click="searchRecharge" style="margin-left: 18px">  查    询  </button>
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
    const apiUrl = '/api/admin/profitStatement?method='
    var sumArry=''

    function dateFormatter(value, row) {
        if (!value) return ''
        let date =value;
        date =date.split('T');
        return date[0]
    }

    function succTotalSize() {
        if(!isNaN(sumArry.succTotalSize)){
            return sumArry.succTotalSize
        }else{
            return ""
        }
    }

    function totalCustomerFee() {
        if(!isNaN(sumArry.totalCustomerFee)){
            return sumArry.totalCustomerFee
        }else{
            return ""
        }
    }

    function totalVendorFee() {
        if(!isNaN(sumArry.totalVendorFee)){
            return sumArry.totalVendorFee
        }else{
            return ""
        }
    }

    function totalProfit() {
        if(!isNaN(sumArry.totalProfit)){
            return sumArry.totalProfit
        }else{
            return ""
        }
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

                //url
                sale:common.getStoreData('sale'),
                startDate:common.getStoreData('startDate'),
                endDate:common.getStoreData('endDate'),

            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this

            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));

            if(_self.judgeNull(_self.sale)){
                $('#sale').val(_self.sale)
            }
            if(_self.judgeNull(_self.startDate)){
                $('#start_date').val(_self.startDate)
            }else{

            }
            if(_self.judgeNull(_self.endDate)){
                $('#end_date').val(_self.endDate)
            }

            function queryParams(params) {
                params.salesName=$('#sale').val();
                params.dayBegin= $('#start_date').val();
                params.dayEnd= $('#end_date').val();
                params.realName =$( "#customer" ).val();

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function initTable() {
                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getProfitCustomer',
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
                        common.BTRowFormat('salesName', '业务员'),
                        common.BTRowFormat('real_name', '客户'),
                        common.BTRowFormatFooter('succTotalSize', '总发送成功数量',succTotalSize),
                        common.BTRowFormatFooter('totalCustomerFee', '客户消费总金额',totalCustomerFee),
                        common.BTRowFormatFooter('totalVendorFee', '总成本金额',totalVendorFee),
                        common.BTRowFormatFooter('totalProfit', '总利润',totalProfit),
                       /* common.BTRowFormatWithFormatter('DAY', '日期',dateFormatter),*/

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
                    }

                })
                common.changeTableClass($('#table'))
            }

            $(function() {
                initTable()

            })
            _self.getCustomer();
            _self.getSales();

        },
        methods: {
            searchRecharge: function (event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },
            revertData: function () {
                let _self = this;
                _self.search = {
                    sale:'',
                    customer:"",
                };
                $('#start_date').val("");
                $('#end_date').val("");
                $('#sale').val("");
                $("#customer").val("");
            },
            getSales:function () {
                //业务员模糊查询
                let _self=this;
                let params={
                    salesName:$('#sale').val(),
                };
                common.fuzzySearch(_self,'sale',apiUrl + 'getSales',params);
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
                params.salesName=$('#sale').val();
                params.dayBegin= $('#start_date').val();
                params.dayEnd= $('#end_date').val();
                params.realName =$( "#customer" ).val();

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                common.downFile(_self,apiUrl+'downloadProfitCustomer',params);
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
    .profit-border{
        min-height: 100px;
        border-bottom:1px  solid #f3f3f3;
    }

</style>