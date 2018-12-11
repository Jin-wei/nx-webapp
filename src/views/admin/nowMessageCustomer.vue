<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 财务报表管理</a></li>
                <li class="active">实时短信发送记录</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 80px">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-1 control-label input-sm">手机号</label>
                                <div class="col-sm-2">
                                    <input type="number" v-model="search.phone" id="rangDate" class="form-control input-sm"  oninput="if(value.length>20)value=value.slice(0,20)" >
                                </div>
                                <label class="col-sm-1 control-label input-sm">邮箱</label>
                                <div class="col-sm-2">
                                    <input type="email" v-model="search.email" class="form-control input-sm"  oninput="if(value.length>20)value=value.slice(0,20)" >
                                </div>
                                <label  class="col-sm-1 control-label input-sm">创建时间</label>
                                <div class="col-sm-5">
                                    <div class="">
                                        <div class="input-group">
                                            <input  type="text" class="form-control" id="start_date" placeholder="起始时间"/>
                                            <span class="input-group-addon" style="background: #d2d6de">-</span>
                                            <input type="text" class="form-control" id="end_date" placeholder="截止时间"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-primary " v-on:click="searchCustomer" style="margin-left: 10px">  查    询  </button>
                                    <button type="button" class="btn btn-default resert-margin"  v-on:click="revertData">  重    置  </button>
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
    const apiUrl = '/api/admin/nowMessageCustomer?method='

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
                }
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this;
            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));


            function queryParams(params) {
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.phone =_self.search.phone;
                params.email =_self.search.email;
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
                    url: apiUrl + 'getCountry',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndex('序号'),
                        common.BTRowFormat('chinese', '账户ID'),
                        common.BTRowFormat('chinese', '手机号'),
                        common.BTRowFormat('name', '邮箱'),
                        common.BTRowFormat('name', '发送时间'),
                        common.BTRowFormat('name', '发送内容'),
                        common.BTRowFormat('name', '国家名称'),
                        common.BTRowFormat('name', '国家编码'),
                        common.BTRowFormat('name', '发送状态'),
                    ],
                    idField: 'id',
                    uniqueId: 'id',
                    clickToSelect: true,
                    showRefresh: false,
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 15, 25, 50, 100],
                    locale: 'zh-CN',
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
            revertData:function () {
                let _self=this;
                _self.search={
                    phone:'',
                    email:'',
                };
                $('#start_date').val("");
                $('#end_date').val("");
            },
            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
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

</style>