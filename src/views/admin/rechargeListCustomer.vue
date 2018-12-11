<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 财务报表管理</a></li>
                <li class="active">充值记录列表</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 160px">
                        <form class="form-horizontal">
                            <div class="top-border">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">订单ID</label>
                                    <div class="col-sm-2">
                                        <input v-model="search.id" type="text" class="form-control input-sm"
                                                oninput="if(value.length>30)value=value.slice(0,30)">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">充值方式</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="search.type">
                                            <option value="">全部</option>
                                            <option value="0">支付宝</option>
                                            <option value="1">微信支付</option>
                                            <option value="2">银联</option>
                                            <option value="8">业务员代充</option>
                                            <option value="9">赠送</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">创建时间</label>
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
                                    <label class="col-sm-1 control-label input-sm">充值状态</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="search.status">
                                            <option value="">全部</option>
                                            <option value="0">未支付</option>
                                            <option value="1">支付成功</option>
                                        </select>
                                    </div>

                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary " v-on:click="searchRecharge">
                                            查    询
                                        </button>
                                        <button type="button" class="btn btn-default resert-margin"
                                                v-on:click="revertData"> 重    置
                                        </button>
                                        <button type="button" class="btn btn-default model-margin"
                                                v-on:click="returnPage"> 返  回
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </form>
                        <div>
                            <button type="button" class="btn btn-primary  import-btn" v-on:click="exportExl">  导出充值记录  </button>
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

        <div class="modal fade" id="AddModal">
            <div class="modal-dialog" style="width: 800px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title pull-left">账单详情</h4>
                        <h4 class="modal-title pull-right" style="margin-right: 10px">账单生成日期:2017/04/20 19:59:11</h4>
                    </div>
                    <form @submit.prevent="" id="formA">
                        <div class="modal-body" style="min-height: 234px">
                            <div class="alert-text rl-alert-text">
                                <div class="col-md-12 alert-text-border alert-text-padding">
                                    <div class="col-md-12" style="padding: 0">
                                        <span >订单号码：{{detail.id}}</span>
                                    </div>
                                </div>
                                <div class="col-md-12 alert-text-border  alert-text-padding">
                                    <span>充值账号：{{detail.accont}</span>
                                </div>
                                <div class="col-md-12 alert-text-border alert-text-padding">
                                    <div class="col-md-6" style="padding: 0">
                                        <span>充值金额： </span>
                                    </div>
                                    <div class="col-md-6">
                                        <span>人民币(小写)：{{detail.price}}</span>
                                    </div>
                                </div>
                                <div class="col-md-12 alert-text-border  alert-text-padding">
                                    <span>充值方式：{{detail.type}}</span>
                                </div>
                                <div class="col-md-12 alert-text-border alert-text-padding" style="border-bottom: none">
                                    <span>充值状态：{{detail.status}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-default" style="margin-right: 10px"  data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    const apiUrl = '/api/admin/rechargeListCustomer?method='
    var sumArry='';

    function moneyFormat() {
        if(!isNaN(sumArry.totalAmount)){
            return sumArry.totalAmount
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
    function  priceFormat (value,type) {
        if(!isNaN(value)){
            let price=common.priceFormat(value);
            return price
        }else{
            return ""
        }

    }
    function statusFormatter(value, row) {
        if(value===null){
            return ''
        }else if(value===0){
            return '未支付'
        }else if(value===1){
            return '支付成功'
        }
    }


    function typeFormate(value, row) {
        if(value===null){
            return ''
        }else if(value===0){
            return '支付宝'
        }else if(value===1){
            return '微信'
        }else if(value===2){
            return '银联'
        }else if(value===9){
            return '赠送'
        }else if(value===8){
            return '业务员代充'
        }
    }
    function statusFormatter(value, row) {
        if(value===null){
            return ''
        }else if(value===0){
            return '未支付'
        }else if(value===1){
            return '支付成功'
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
                id:common.getUrlParams('id'),
                type:common.getUrlParams('type'),
                search:{
                    type:'',
                    id:'',
                    status:'',
                },
                detail:{
                    id:'',
                    accont:"",
                    price:'',
                    type:'',
                    status:''
                },
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this

            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));
            if(_self.type==1){

            }else {

            }
            function queryParams(params) {
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.payChanel =_self.search.type;
                params.customerId =_self.id;
                params.payId =_self.search.id;
                params.status =_self.search.status;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter() {
                return [
                    '<span class="label label-primary showDetail" title="详情">  查看详单  </span>'
                ].join('')
            }


            function initTable() {
                window.tableEvents = {
                    'click .showDetail': function(e, value, row, index) {
                        _self.getDetail(row.id);
                    }
                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getRechargeDetail',
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
                        common.BTRowFormat('real_name', '客户名称'),
                        common.BTRowFormat('pay_id', '订单号码'),
//                        common.BTRowFormatWithFormatter('c_time', '订单生成时间',timeFormatter),
                        common.BTRowFormat('c_time', '订单生成时间'),
                        common.BTRowFormatWithFormatter('pay_chanel', '充值方式',typeFormate),
                        common.BTRowFormatFooter('amount', '充值金额',moneyFormat),
                        common.BTRowFormat('salesName', '业务员'),
                        common.BTRowFormatWithFormatter('status', '充值状态',statusFormatter),
                    ],
                    idField: 'id',
                    uniqueId: 'id',
                    clickToSelect: true,
                    showRefresh: false,
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 15, 25, 50, 100],
                    locale: 'zh-CN',
                    showFooter:true,
                    undefinedText:'',
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

        },
        methods: {
            searchRecharge: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },
            revertData:function () {
                let _self=this;
                _self.search={
                    type:'',
                    id:'',
                    status:'',
                };
                $('#start_date').val("");
                $('#end_date').val("");
            },
            returnPage:function () {
                let _self=this;

                if(_self.type==1){
                    _self.$router.push({path:'/admin/allCustomer'});
                }else {
                    _self.$router.push({path:'/admin/rechargeCustomer'});
                }
            },
            exportExl:function () {
                let _self=this;
                let params={};
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.payChanel =_self.search.type;
                params.customerId =_self.id;
                params.payId =_self.search.id;
                params.status =_self.search.status;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params)
                common.downFile(_self,apiUrl+'downloadRechargeDetail',params);
            },
            getDetail:function (id) {
               let _self=this;
                $('#AddModal').modal('show');
                _self.$http.post(apiUrl + 'modifyCustomer',{id:id}).then((response) => {
                    if(response.data.errno==0){
                          if(response.data.info.length>0){
                              _self.detail=response.data.info[0];
                              _self.detail = {
                                  id: '',
                                  accont: "",
                                  price: '',
                                  type: '',
                                  status: ''
                              };
                          }else{
                              _self.detail = {
                                  id: '',
                                  accont: "",
                                  price: '',
                                  type: '',
                                  status: ''
                              };
                          }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
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
    .showDetail{
        cursor: pointer;
    }

</style>