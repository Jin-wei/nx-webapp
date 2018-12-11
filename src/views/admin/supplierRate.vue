<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 短信价格管理</a></li>
                <li class="active">供应商费率表</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 70px">
                        <form class="form-horizontal">

                            <div class="form-group">
                                <label class="col-sm-1 control-label input-sm">供应商名称</label>
                                <div class="col-sm-2">
                                    <input v-model="searchData.name" type="text" class="form-control input-sm" id="inputID" oninput="if(value.length>30)value=value.slice(0,30)" >
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
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-primary "  v-on:click="searchCustomer">  查    询  </button>
                                    <button type="button" class="btn btn-default resert-margin" v-on:click="revertData">  重    置  </button>
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
    const apiUrl = '/api/admin/supplierRate?method='

    function typeFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '未确认'
        }else if(value===1){
            return '已确认'
        }

    }
    function timeFormatter(value, row) {
        if (!value) return ''
        let date =value;
        date =date.split('T');
        let time=date[1].slice(0,8);
        return date[0]+' '+time
    }

    function nameFormatter(value, row) {
        if (row.customer_id === 0) {
            return '公共'
        } else if (value === null) {
            return ' '
        }
    }

    export default {
        data: function() {
            return {
                title:'',
                rangTime:'',
                date:'',
                inputFile:'',
                btnStatus:1,
                approvalText:'',//驳回原因
                searchData:{//查询条件
                    name:"",
                    cTimeBegin:"",
                    cTimeEnd:"",
                },
                filePath:'',

            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this
            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));


            function queryParams(params) {
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.name=_self.searchData.name;
                params.type=1;

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter(value, row) {
                return [
                    '<span class="label label-primary operation-margin btn-detail" >  详情  </span>'+
                    '<span class="label label-warning operation-margin btn-delete" >  删除  </span>'
                ].join('')
            }

            function initTable() {
                window.tableEvents = {
                    'click .btn-delete': function(e, value, row, index) {
                        common.rowDeleteWithApi(_self, '确认删除此报价？', apiUrl + 'deleteFee', $('#table'), row, 'id')
                    },
                    'click .btn-detail': function(e, value, row, index) {
                        _self.$router.push({path: '/admin/supplierRateDetail', query: {id: row.id}})
                    }

                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getFee',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        //去掉后两位
                        common.BTRowFormatWithIndex('序号'),
                        common.BTRowFormat('venderName', '供应商名称'),
                        common.BTRowFormat('count', '报价单明细数量'),
                        common.BTRowFormat('salesName', '所属业务员'),
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
                    /*onClickRow:function (row, $element) {
                     _self.showModel(row.user_id);
                     },*/

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
                _self.filePath=$('#file').val();
                /* _self.$http.post('/api/admin/CountrySRV?method=addCountryByCSV', formData).then((response) => {
                 if(response.data.errno==0){
                 common.WarningBox(_self,'SAVE_SUCESS');
                 _self.loading=true;
                 }else{
                 common.dealErrorCommon(_self, response)
                 }
                 }, (response) => {
                 common.dealErrorCommon(_self, response)
                 })*/

            });

        },
        methods: {
            //获得详情
            showModel: function(id) {
                let _self = this
                _self.workRow = {}
                $('#importForm').parsley().reset()
                $('#importModal').modal('show')
                _self.approvalText="";
            },

            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },


            //重置
            revertData:function () {
                let _self=this;
                _self.searchData={//查询条件
                    name:"",
                    type:"",
                    cTimeBegin:"",
                    cTimeEnd:"",
                },
                    $('#start_date').val("");
                $('#end_date').val("");
            },
            //驳回

            examineHttp:function (params,id) {
                let _self=this;
                _self.$http.post(apiUrl + 'reviewed',params).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('修改成功！')
                        _self.showModel(id);
                        $('#table').bootstrapTable("refresh", this.queryParams)

                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            }

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

    .resert-margin {
        margin-left: 10px;
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
    .operation-margin{
        margin-right: 10px;
        cursor: pointer;
    }

</style>