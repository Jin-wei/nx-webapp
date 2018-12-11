<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 短信价格管理</a></li>
                <li class="active">供应商费率表详情</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin">
            <div class="row">
                <div class="col-md-12">
                    <div class="">
                        <div class="box-body country-padding" style="min-height: 65px;">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm ">国码code</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.code" type="text" class="form-control input-sm browse">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">运营商名称</label>
                                    <div class="col-sm-2">
                                        <input  v-model="searchData.operatorName"  type="text"  class="form-control input-sm"   placeholder="">
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary "  v-on:click="searchCustomer">     查  询     </button>
                                        <button type="button" class="btn btn-default model-margin"  v-on:click="revertData">     重  置     </button>
                                        <button type="button" class="btn btn-default model-margin" v-on:click="returnPage">     返  回     </button>
                                    </div>
                                </div>
                            </form>

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
    const apiUrl = '/api/admin/supplierRateDetail?method='

    function timeFormatter(value, row) {
        if (!value) return ''
        let date =value;
        date =date.split('T');
        let time=date[1].slice(0,8);
        return date[0]+' '+time
    }

    export default {
        data: function() {
            return {
                id:common.getUrlParams('id'),
                pagePara: {},
                searchData:{
                    code:'',
                    operatorName:'',
                },
                inputFile:'',
                title:'',
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this;
            function queryParams(params) {
                params.code =_self.searchData.code;
                params.operatorName =_self.searchData.operatorName;
                params.id =_self.id;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter() {
                return [
                    '<a class="tableDelete" title="删除">',
                    '<i class="glyphicon glyphicon-remove"></i>',
                    '</a>'
                ].join('')
            }


            function initTable() {
                window.tableEvents = {
                    'click .tableDelete': function(e, value, row, index) {
                        common.rowDeleteWithApi(_self, '确认删除此国家？', apiUrl + 'deleteFeeDetail', $('#table'), row, 'id')
                    }
                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getFeeDetail',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndex('序号'),
                        common.BTRowFormat('code', '国码code'),
                        common.BTRowFormat('ChName', '国家名称'),
                        common.BTRowFormat('operatorName', '运营商名称'),
                        common.BTRowFormat('c_price', '当前价格'),
                        common.BTRowFormat('f_price', '生效价格'),
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
                    undefinedText:'',
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

            $('#file').change(function() {
                let files = this.files
                let formData = new FormData();
                formData.append('file', files[0]);
                _self.$http.post('/api/admin/CountrySRV?method=addCountryByCSV', formData).then((response) => {
                    if(response.data.errno==0){
                        common.WarningBox(_self,'SAVE_SUCESS');
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })

            });
        },
        methods: {
            choseFile:function () {
                $("#file").trigger("click");
            },
            revertData:function () {
                let _self=this;
                _self.searchData={//查询条件
                    code:'',
                    operatorName:'',
                }
            },
            returnPage:function () {
                let _self=this;
                _self.$router.push({path:'/admin/supplierRate'});
            },
            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },

        }

    }

</script>

<style>
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

    .country-padding {
        padding: 10px 0;
    }
    .import{
        padding: 0;
        vertical-align: middle;
        line-height: 34px;
    }
    .import label{

        line-height: 28px;
    }

    #file{
        position:absolute;
        z-index:100;
        margin-left:0px;
        font-size:60px;
        opacity:0;
        filter:alpha(opacity=0);
        margin-top:2px;
        cursor: pointer;
    }
    .browse{
        margin-top:2px;
    }
    .editable-click, a.editable-click, a.editable-click:hover{
        border-bottom:none;
        font-style:normal;
    }
    .box-header>.fa, .box-header>.glyphicon, .box-header>.ion, .box-header .box-title{
        color: #333333;
    }
    a{
        cursor:pointer;
    }
</style>