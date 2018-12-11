<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 短信价格管理</a></li>
                <li class="active">运营商维护</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin">
            <div class="row">
                <div class="col-md-12">
                    <div class="">
                        <div class="box-body country-padding" style="min-height: 65px;">
                            <div class="form-group col-md-3 import">
                                <label class="col-sm-4 control-label input-sm ">导入运营商</label>
                                <div class="col-sm-8">
                                    <input type="file" id="file" class="form-control input-sm "  accept=".csv"  size="1">
                                    <input type="text"  id="inputFile" class="form-control input-sm browse">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button type="button" class="btn btn-primary " v-on:click="choseFile">     浏  览     </button>
                                <button type="button" class="btn btn-default model-margin" >  运营商导出  </button>
                            </div>

                            <div class="form-group col-md-3 import">
                                <label class="col-sm-4 control-label input-sm ">导入号码段</label>
                                <div class="col-sm-8">
                                    <input type="file" id="file2" class="form-control input-sm "  accept=".csv" size="1">
                                    <input type="text"  id="inputFile2" class="form-control input-sm browse">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button type="button" class="btn btn-primary " v-on:click="choseCountry">     浏  览     </button>
                                <button type="button" class="btn btn-default model-margin" v-on:click="countydownTem">  号码段导出  </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            <div class="row">
                <div class="col-xs-12">
                    <div class="box box-primary" >
                        <div class="box-header">
                            <h3 class="box-title">查询结果</h3>
                            <!--<button type="button" class="btn btn-primary ">     增  加     </button>-->
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
        <!--<div  :class="{'hidden':loading}">
            <div class="loading-warp">
                <div>
                    <img src="../../../public/static/images/img/loading.gif" alt="">
                </div>
            </div>

        </div>-->

    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    const apiUrl = '/api/admin/priceOperatorControl?method='
//    const apiUrl2 = '/api/admin/menucontrol?method='

    export default {
        data: function() {
            return {
                pagePara: {},
                tableData: {},
                workRow: {
                    menu_icon: ''
                },
                inputFile:'',
                oldRow: {},
                loading:true
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this
            let importOperate=0;
            let $table =$('#table')
            function queryParams(params) {
                params.matNameOrCodeOrFormat ='';
                return JSON.stringify(params)
            }


            function initTable() {
                window.tableEvents = {
                    'click .delete1': function(e, value, row, index) {
                        common.rowDeleteWithApi(_self, '供应商删除', apiUrl + 'deleteOperator', $table, row, 'operatorId')
                    },

                }
                function expandTable (index,row, $detail) {
                    let $el = $detail.html('<table></table>').find('table')
                    let data = row.numArr
                    window.tableEvents = {
                        'click .delete2': function(e, value, row, index) {
                            common.rowDeleteWithApi(_self, '号码段删除', apiUrl + 'deleteOperatorNumber', $el, row, 'code')
                        }
                    }

                    $el.bootstrapTable({
                        data: data,
                        columns: [
                            common.BTRowFormatEditable('code', '号码段'),
                            common.actFormatter('act', actFormatter2, tableEvents)
                        ],
                        onEditableSave: function (field, row, oldValue, $el) {
                            common.rowModifyWithT(_self, apiUrl + 'modifyOperatorNumber', row, 'code', $el)
                        },
                    })
                }

                function stateFilter(value) {
                    for (let i = 0; i < _self.purchaseStates.length; i++) {
                        if (_self.purchaseStates[i].id === value) {
                            return _self.purchaseStates[i].text
                        }
                    }
                    return ''
                }

                $table.bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getOperatorInfo',
                    sidePagination:'server',
                    queryParams:queryParams,
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        {
                            field: 'operatorName',
                            align: 'left',
                            title: '所属国家',
                            events: tableEvents,

                            editable: {
                                type: 'text',
                                emptytext: '无'
                            }
                        },
                        common.BTRowFormatEditable('operatorName', '名称'),
                        common.BTRowFormatEditable('mnc', 'mnc'),
                        common.BTRowFormatEditable('mcc', 'mcc'),
                        common.actFormatter('act', actFormatter, tableEvents)
                    ],
                    idField: 'operatorId',
                    uniqueId: 'operatorId',
                    clickToSelect: true,
                    showRefresh: false,
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 15, 25, 50, 100],
                    locale: 'zh-CN',
                    detailView: true,
                    undefinedText:'',
                    onExpandRow: function (index, row, $detail) {
                        expandTable(index,row, $detail)
                    },
                    onEditableShown: function(field, row, $el, editable) {
                        _self.oldRow = $.extend(true, {}, row)
                    },
                    onEditableSave: function (field, row, oldValue, $el) {
                        common.rowModifyWithT(_self, apiUrl + 'modifyOperator', row, 'operatorId', $table)
                    },
                    onLoadError:function (status,row) {
                        common.dealTableError(_self,status,row);
                    }


                })
                common.changeTableClass($table)
            }

            function actFormatter() {
                return [
                    '<a class="tableDelete" title="删除">',
                    '<i class="glyphicon glyphicon-remove delete1"></i>',
                    '</a>'
                ].join('')
            }
            function actFormatter2() {
                return [
                    '<a class="tableDelete" title="删除">',
                    '<i class="glyphicon glyphicon-remove delete2"></i>',
                    '</a>'
                ].join('')
            }


            $(function() {
                initTable()

            })

            $('#file').change(function() {
                /*common.dealPromptCommon('正在上传请稍后。。。');*/
                let files = this.files
                let formData = new FormData();
                formData.append('file', files[0]);
                common.importLoading('show');
                _self.$http.post(apiUrl+'addOperatorByCSV', formData).then((response) => {
                    if(response.data.errno==0){
                        common.importLoading();
                        common.dealSuccessCommon('上传成成功!');
                        importOperate=importOperate+1;
                        initTable()
                    }else{
                        common.importLoading();
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.importLoading();
                    common.dealErrorCommon(_self, response)
                })
            });
            $('#file2').change(function() {
                if(importOperate==0){
                    common.dealPromptCommon('请先导入供应商!');
                    return;
                }
                let files = this.files
                let formData = new FormData();
                formData.append('file', files[0]);
                common.importLoading('show');
                _self.$http.post(apiUrl+'addOperatorNumByCSV', formData).then((response) => {
                    if(response.data.errno==0){
                        common.importLoading();
                        common.dealPromptCommon('上传成成功!');
                        initTable()
                    }else{
                        common.importLoading();
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.importLoading();
                    common.dealErrorCommon(_self, response)
                })

            });
        },
        methods: {
            choseFile:function () {
                $("#file").trigger("click");
            },
            choseCountry:function () {
                $("#file2").trigger("click");
            },
            countydownTem:function () {
                let _self=this;
                common.downFile(_self,apiUrl+'download',{});
            }

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
    #file2{
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
    .loading-warp{
        position:fixed;
        top:0%;
        left:0%;
        width:100%;
        height:100vh;
        background-color:rgba(0,0,0,0.5);
        z-index:1001;
    }
    .loading-warp div{
        margin-top:12%;
        text-align: center;
    }
    .loading-warp div img{
        border-radius: 15px;
        width: 500px;
        height: 350px;
    }
</style>