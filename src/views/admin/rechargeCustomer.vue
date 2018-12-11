<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 财务报表管理</a></li>
                <li class="active">用户充值管理</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 80px">
                        <form class="form-horizontal">
                            <div class="top-recharge-border">
                                <div class="form-group ">

                                    <label class="col-sm-1 control-label input-sm">手机号</label>
                                    <div class="col-sm-2">
                                        <input type="number" v-model="search.phone"  class="form-control input-sm"  oninput="if(value.length>20)value=value.slice(0,20)" >
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">邮箱</label>
                                    <div class="col-sm-2">
                                        <input type="email" v-model="search.email" class="form-control input-sm"  oninput="if(value.length>50)value=value.slice(0,50)">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">客户名称</label>
                                    <div class="col-sm-2">
                                        <input id="customer" type="text" class="form-control input-sm"   oninput="if(value.length>30)value=value.slice(0,30)"  v-on:keyup="getCustomer">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">业务员</label>
                                    <div class="col-sm-2">
                                        <input id="salesName"  type="text" class="form-control input-sm"   oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getSales">
                                    </div>

                                </div>
                                <div class="form-group">
                                    <div class="col-md-2" style="margin-left: 20px">
                                        <button type="button" class="btn btn-primary" v-on:click="searchCustomer">  查    询  </button>
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
    const apiUrl = '/api/admin/rechargeCustomer?method='
    var sumArry='';

    function  priceFormat (value,type) {
        if(!isNaN(value)){
            let price=common.priceFormat(value);
            return price
        }else{
            return ""
        }

    }

    function moneyFormat() {
        if(!isNaN(sumArry.totalBalance)){
            return sumArry.totalBalance
        }else{
            return ""
        }
    }

    function numFormat() {
        if(!isNaN(sumArry.successNum)){
            return sumArry.successNum
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
                search:{
                    phone:'',
                    email:'',
                    realName:'',
                    salesName:''
                },
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this

            function queryParams(params) {
                params.phone =_self.search.phone;
                params.email =_self.search.email;
                params.realName=$('#customer').val();
                params.salesName=$('#salesName').val();
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter() {
                return [
                    '<span class="label label-primary rechargeDeatil" title="详情">  查看充值记录  </span>'
                ].join('')
            }


            function initTable() {
                window.tableEvents = {
                    'click .rechargeDeatil': function(e, value, row, index) {
                        _self.$router.push({path: '/admin/rechargeListCustomer', query: {id: row.id}})
                    }

                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getRecharge',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        sumArry=res.info.sumDate;
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndexFooter('No.'),
                        /*common.BTRowFormat('user_id', '账户ID'),*/
                        common.BTRowFormat('real_name', '客户名称'),
                        common.BTRowFormat('phone', '手机号'),
                        common.BTRowFormat('email', '邮箱'),
                        common.BTRowFormat('salesName', '业务员'),
                        common.BTRowFormatFooter('balance', '余额（元）',moneyFormat),
                        common.BTRowFormatFooter('successNum', '充值成功次数',numFormat),
                        common.actFormatter('act', actFormatter, tableEvents)
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
            _self.getCustomer();
            _self.getSales();

        },
        methods: {
            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },
            revertData:function () {
                let _self=this;
                _self.search={
                    phone:"",
                    email:"",
                    realName:'',
                    salesName:''

                };
                $('#customer').val("");
                $('#salesName').val("");
            },
            getSales:function () {
                //业务员模糊查询
                let _self=this;
                let params={
                    salesName:$('#salesName').val(),
                };
                common.fuzzySearch(_self,'salesName',apiUrl + 'getSales',params);
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
                params.phone =_self.search.phone;
                params.email =_self.search.email;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params)
                common.downFile(_self,apiUrl+'downloadRecharge',params);
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
    .rechargeDeatil{
        cursor: pointer;
    }
    .top-recharge-border{
        min-height: 70px;
        border-bottom:1px  solid #f3f3f3;
    }

</style>