<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 短信价格管理</a></li>
                <li class="active">所属国家</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin">
            <div class="row">
                <div class="col-md-12">
                    <div class="box box-solid">
                        <div class="box-body " style="min-height: 65px;">
                            <form class="form-horizontal">
                                <div class="country-top-border">
                                    <div class="form-group">
                                        <label class="col-sm-1 control-label input-sm">国码</label>
                                        <div class="col-sm-2">
                                            <input id="code" type="text" class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)" >
                                        </div>
                                        <label class="col-sm-1 control-label input-sm">英文名</label>
                                        <div class="col-sm-2">
                                            <input id="en" type="text" class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)" >
                                        </div>
                                        <label class="col-sm-1 control-label input-sm">中文名</label>
                                        <div class="col-sm-2">
                                            <input id="cn" type="text" class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)" >
                                        </div>
                                        <label class="col-sm-1 control-label input-sm">是否有效</label>
                                        <div class="col-sm-2">
                                            <select class="form-control" id="effectiveFlag">
                                                <option value="">全部</option>
                                                <option value="0" selected>有效</option>
                                                <option value="1">无效</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div class="from-group">
                                        <div class="col-md-3 search-btn-margin">
                                            <button type="button" class="btn btn-primary search-btn-margin" v-on:click="searchCountry">  查    询  </button>
                                            <button type="button" class="btn btn-default resert-margin"  v-on:click="revertData">  重    置  </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group import">
                                    <label class="col-sm-1 control-label input-sm ">导入国家</label>
                                    <div class="col-sm-2">
                                        <input type="file" id="file" class="form-control input-sm " accept=".csv"  multiple>
                                        <input type="text"  id="inputFile" class="form-control input-sm browse">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-primary " v-on:click="choseFile">     浏  览     </button>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm ">导入运营商</label>
                                    <div class="col-sm-2">
                                        <input type="file" id="file2" class="form-control input-sm "  accept=".csv" size="1">
                                        <input type="text"  id="inputFile2" class="form-control input-sm browse">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-primary " v-on:click="choseCountry">     浏  览     </button>
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-warning add-country-btn" v-on:click="showCountry"><i class="fa fa-fw fa-plus"></i>新增国家</button>
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

        <!--新增运营商-->
        <div class="modal fade" id="operateModal">
            <div class="modal-dialog" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">新增运营商</h4>
                    </div>
                    <form id="operateForm" @submit.prevent="addOperate(countryId)">
                        <div class="modal-body" style="min-height: 350px">
                            <div class="form-group col-md-12">
                                <label >运营商中文名称：</label>
                                <input class="form-control col-md-8" v-model="operate.chinese"   maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-12">
                                <label >运营商英文名称：</label>
                                <input class="form-control col-md-8" v-model="operate.name"   maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-12">
                                <label >mcc：</label>
                                <input class="form-control col-md-8" v-model="operate.mcc"   maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-12">
                                <label >mnc</label>
                                <input class="form-control col-md-8" v-model="operate.mnc"   maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary"  > 提  交 </button>
                            <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

        <!--增加号码段-->
        <div class="modal fade" id="nubModal">
            <div class="modal-dialog" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">新增号码段</h4>
                    </div>
                    <form id="nubForm" @submit.prevent="addNum(operateId)">
                        <div class="modal-body" style="min-height: 350px">
                            <div class="form-group col-md-12">
                                <label >号码段名称：</label>
                                <textarea class="form-group col-md-12" v-model="number"  cols="30" rows="10"  data-parsley-required="true"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" > 提  交 </button>
                            <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

        <!--号码段列表-->
        <div class="modal fade" id="nubDetailModal">
            <div class="modal-dialog nub-size" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">号码段列表</h4>
                    </div>
                    <form>
                        <div class="box-body">
                            <div class="form-group code-search-height">
                                <label class="col-sm-1 control-label input-sm">号码段</label>
                                <div class="col-sm-4">
                                    <input id="phoneCode" type="text" class="form-control input-sm"
                                           oninput="if(value.length>30)value=value.slice(0,30)">
                                </div>
                                <div class="col-md-3 search-btn-margin">
                                    <button type="button" class="btn btn-primary search-btn-margin" v-on:click="searchCode">  查    询  </button>
                                </div>
                        </div>
                            <div id="example3_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                                <table id="nubTable" class="table table-bordered table-hover dataTable"  >
                                </table>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

        <!--新增国家-->
        <div class="modal fade" id="countryModal">
            <div class="modal-dialog" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">新增国家</h4>
                    </div>
                    <form id="countryForm" @submit.prevent="addCountry()">
                        <div class="modal-body" style="min-height: 350px">
                            <div class="form-group col-md-12">
                                <label >中文名称：</label>
                                <input class="form-control col-md-8" v-model="country.chinese"   maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-12">
                                <label >英文名称：</label>
                                <input class="form-control col-md-8" v-model="country.name"   maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-12">
                                <label >国码</label>
                                <input class="form-control col-md-8" v-model="country.code" type="number"   maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-12">
                                <label >所属区域：</label>
                                <input class="form-control col-md-8" v-model="country.region"   maxlength="50" data-parsley-maxlength="50" >
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary"  > 提  交 </button>
                            <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true"> 返  回 </button>
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
    const apiUrl = '/api/admin/ownedCountry?method='
    const apiUrl2 = '/api/admin/menucontrol?method='

    export default {
        data: function() {
            return {
                pagePara: {},
                workRow: {
                    menu_icon: ''
                },

                inputFile:'',
                oldRow: {},
                loading:true,
                operate:{
                    chinese:'',
                    name:'',
                    mcc:'',
                    mnc:'',
                },
                country:{
                    chinese:"",
                    name:"",
                    code:"",
                    region:"",
                },
                countryId:'',
                operateId:'',
                number:"",
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this

            function queryParams(params) {
                params.code=$('#code').val();
                params.chinese=$('#cn').val();
                params.name=$('#en').val();
                params.effectiveFlag=$('#effectiveFlag').val();
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }

            function nubParams(params) {
                params.operatorId=_self.operateId;
                params.code=$('#phoneCode').val();
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter(value, row) {
                if(row.effective_flag==0){
                    return [
                        '<span class="label label-success operation-margin btn-submit" >  有  效  </span>'+
                        '<span class="label label-info operation-margin btn-opr" >  增加运营商  </span>'
                        /*'<span class="label label-warning operation-margin delete1" >  删  除  </span>'*/
                    ].join('')
                }else if(row.effective_flag==1){
                    return [
                        '<span class="label label-success operation-margin btn-submit" >  无  效  </span>'+
                        '<span class="label label-info operation-margin btn-opr" >  增加运营商  </span>'
                        /*'<span class="label label-warning operation-margin delete1" >  删  除  </span>'*/
                    ].join('')
                }

            }
            function actFormatter2(value, row) {
                if(row.effective_flag==0){
                    return [
                        '<span class="label label-success operation-margin btn-submit" >  有  效  </span>'+
                        '<span class="label label-info operation-margin add-nub" >  新增号码段  </span>'+
                        /*  '<span class="label label-warning operation-margin btn-delete2" >  删  除  </span>'+*/
                        '<span class="label label-primary operation-margin btn-detail" >  详  情  </span>'
                    ].join('')
                }else if(row.effective_flag==1){
                    return [
                        '<span class="label label-success operation-margin btn-submit" >  无  效  </span>'+
                        '<span class="label label-info operation-margin add-nub" >  新增号码段  </span>'+
                        /*  '<span class="label label-warning operation-margin btn-delete2" >  删  除  </span>'+*/
                        '<span class="label label-primary operation-margin btn-detail" >  详  情  </span>'
                    ].join('')
                }

            }
            function actFormatter3() {
                return [
                    '<a class="tableDelete" title="删除">',
                    '<i class="glyphicon glyphicon-remove delete3"></i>',
                    '</a>'
                ].join('')
            }




            function initTable() {
                window.tableEvents = {
                    'click .delete1': function (e, value, row, index) {
                        common.rowDeleteWithApi(_self, '确认删除此国家？', apiUrl + 'deleteCountry', $('#table'), row, 'materiel_id')
                    },
                    'click .btn-submit': function (e, value, row, index) {
                        _self.id=row.id
                        changeUseful(row,'modifyCountry',$('#table'));
                    },
                    'click .btn-opr': function (e, value, row, index) {
                        _self.countryId=row.id;
                        _self.operate={
                            chinese:'',
                            name:'',
                            mcc:'',
                            mnc:'',
                        };
                        $('#operateForm').parsley().reset();
                        $('#operateModal').modal('show');

                    },

                };

                function changeUseful(row,url,table) {
                    let params={};
                    params.id=row.id;
                    params.effectiveFlag=!row.effective_flag;
                    params=JSON.stringify(params);
                    _self.$http.post(apiUrl+url, params).then((response) => {
                        if(response.data.errno==0){
                            let updaterow = response.data.info;
                            /* $('#table').bootstrapTable("refresh", this.queryParams)*/
                            table.bootstrapTable('updateByUniqueId', {
                                id: row.id,
                                row: updaterow[0]
                            })

                        }else{

                            common.dealErrorCommon(_self, response)
                        }
                    }, (response) => {
                        common.dealErrorCommon(_self, response)
                    })
                }


                function expandTable(index, row, $detail) {
                    let $el = $detail.html('<table></table>').find('table')
                    let data = row.operator;
                    window.tableEvents = {
                        'click .delete2': function (e, value, row, index) {
                            common.rowDeleteWithApi(_self, '号码段删除', apiUrl + 'deleteOperatorNumber', $el, row, 'code')
                        },
                        'click .btn-submit': function (e, value, row, index) {
                            changeUseful(row,'modifyOperator',$el);
                        },
                        'click .add-nub': function (e, value, row, index) {
                            _self.operateId=row.id;
                            _self.number='';
                            $('#nubForm').parsley().reset();
                            $('#nubModal').modal('show');

                        },'click .btn-detail': function (e, value, row, index) {
                            _self.operateId=row.id;
                            $('#nubDetailModal').modal('show');
                             $('#nubTable').bootstrapTable("refresh", this.queryParams);
                            $('#phoneCode').val("");

                        },
                    }

                    $el.bootstrapTable({
                        data: data,
                        columns: [
                            common.BTRowFormatEditable('chinese', '运营商中文名'),
                            common.BTRowFormatEditable('name', '运营商英文名'),
                            common.BTRowFormatEditable('mcc', 'mcc'),
                            common.BTRowFormatEditable('mnc', 'mnc'),
                            common.actFormatter('act', actFormatter2, tableEvents)
                        ],
                        idField: 'id',
                        uniqueId: 'id',
                        onExpandRow: function (index, row, $detail) {
                            nubTable(index, row, $detail)

                        },
                        onEditableSave: function (field, row, oldValue, $el) {
                            common.rowModifyWithT(_self, apiUrl + 'modifyOperator', row, 'code', $el)
                        },
                    })
                }


                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getCountry',
                    queryParams: queryParams,
                    sidePagination: 'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function (res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatEnumberW('code', '国码', '200px'),
                        common.BTRowFormatEditable('chinese', '中文名'),
                        common.BTRowFormatEditable('name', '英文名'),
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
                    undefinedText: '',
                    detailView: true,
                    onEditableShown: function (field, row, $el, editable) {
                        _self.oldRow = $.extend(true, {}, row)
                    },
                    onEditableSave: function (field, row, oldValue, $el) {
                        common.rowModifyWithT(_self, apiUrl + 'modifyCountry', row, 'materiel_id', $('#table'))
                    },
                    onLoadError: function (status, row) {
                        common.dealTableError(_self, status, row);
                    },
                    onExpandRow: function (index, row, $detail) {
                        expandTable(index, row, $detail)
                    },

                })
                common.changeTableClass($('#table'))
            }

            function initNubTable() {
                window.tableEvents = {
                    'click .delete3': function (e, value, row, index) {
                        common.rowDeleteWithApi(_self, '确认删除此号码段？', apiUrl + 'deleteOperatorNumber', $('#nubTable'), row, 'id')
                    },
                };

                $('#nubTable').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getOperatorNumber',
                    queryParams: nubParams,
                    sidePagination: 'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function (res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatEnumberW('code', '号码段'),
                        common.actFormatter('act', actFormatter3, tableEvents)

                    ],
                    idField: 'id',
                    uniqueId: 'id',
                    clickToSelect: true,
                    showRefresh: false,
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 15, 25, 50, 100],
                    locale: 'zh-CN',
                    undefinedText: '',
                    onEditableShown: function (field, row, $el, editable) {
                        _self.oldRow = $.extend(true, {}, row)
                    },
                    onEditableSave: function (field, row, oldValue, $el) {
                        common.rowModifyWithT(_self, apiUrl + 'modifyOperatorNumber', row, 'id', $('#nubTable'))
                    },
                    onLoadError: function (status, row) {
                        common.dealTableError(_self, status, row);
                    },

                })
                common.changeTableClass($('#nubTable'))
            }

            $(function() {
                initTable()
                initNubTable()

            })

            $('#file').change(function() {
                let files = this.files
                let formData = new FormData();
                formData.append('file', files[0]);
                common.importLoading('show');
                _self.$http.post(apiUrl+'addCountryByCSV', formData).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('导入成功!');
                        common.importLoading();
                        $('#file').val("");
                        $('#table').bootstrapTable("refresh", this.queryParams)
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
                let files = this.files
                let formData = new FormData();
                formData.append('file', files[0]);
                common.importLoading('show');
                _self.$http.post(apiUrl+'addOperatorByCSV', formData).then((response) => {
                    if(response.data.errno==0){
                        common.importLoading();
                        common.dealPromptCommon('导入成功!');
                        $('#file2').val("");
                        $('#table').bootstrapTable("refresh", this.queryParams)
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
            searchCountry:function () {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },
            //重置
            revertData:function () {
                let _self=this;
                $('#code').val("");
                $('#cn').val("");
                $('#en').val("");
                $('#effectiveFlag').val("");
            },
            choseCountry:function () {
                $("#file2").trigger("click");
            },
            addOperate:function (id) {
                let _self=this;
                let params={};
                params.chinese=_self.operate.chinese;
                params.name=_self.operate.name;
                params.mcc=_self.operate.mcc;
                params.mnc=_self.operate.mnc;
                params.countryId=id;
                params=JSON.stringify(params);
                if ($('#operateForm').parsley().isValid()) {
                    _self.$http.post(apiUrl+'addOperatorByInput', params).then((response) => {
                        if(response.data.errno==0){
                            common.dealPromptCommon('保存成功！',600)
                            $('#table').bootstrapTable('updateByUniqueId', {
                                id: _self.countryId,
                                row: response.data.info[0]
                            })
                            $('#operateForm').parsley().reset();
                            window.setTimeout(function(){
                                $('#operateModal').modal('hide')
                            },1200)
                        }else{
                            common.dealErrorCommon(_self, response)
                        }
                    }, (response) => {
                        common.dealErrorCommon(_self, response)
                    })
                }
            },
            addNum:function (id) {
                let _self=this;
                let params={};
                let regN = /^([0-9]*;?)+$/;
                if(regN.test(_self.number)){
                    params.operNumber=_self.number;
                }else {
                    common.dealPromptCommon('号码段格式错误！',1000)
                    return
                }

                params.operatorId=id;
                params=JSON.stringify(params);
                if ($('#nubForm').parsley().isValid()) {
                    _self.$http.post(apiUrl+'addOperatorNumber', params).then((response) => {
                        if(response.data.errno==0){
                            common.dealPromptCommon('保存成功！',600)
                            $('#nubForm').parsley().reset();
                            window.setTimeout(function(){
                                $('#nubModal').modal('hide')
                            },1200)
                        }else{

                            common.dealErrorCommon(_self, response)
                        }
                    }, (response) => {
                        common.dealErrorCommon(_self, response)
                    })
                }
            },
            searchCode:function () {
                $('#nubTable').bootstrapTable("refreshOptions", {pageNumber: 1})
            },
            showCountry:function () {
                let _self=this;
                $('#countryForm').parsley().reset();
                $('#countryModal').modal('show')
                _self.country = {
                    chinese: "",
                    name: "",
                    code: "",
                    region: "",
                };

            },
            addCountry:function () {
                let _self=this;
                let params={};
                params=_self.country;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                if ($('#countryForm').parsley().isValid()) {
                    _self.$http.post(apiUrl+'addCountryByInput', params).then((response) => {
                        if(response.data.errno==0){
                            common.dealPromptCommon('保存成功！',600);
                            $('#countryForm').parsley().reset();
                            window.setTimeout(function(){
                                $('#countryModal').modal('hide')
                            },1200)
                        }else{
                            common.dealErrorCommon(_self, response)
                        }
                    }, (response) => {
                        common.dealErrorCommon(_self, response)
                    })
                }
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
        /*line-height: 34px;*/
        margin-top: 15px;
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
    .country-top-border{
        min-height: 100px;
        border-bottom:1px  solid #f3f3f3;
    }
    .search-btn-margin{
        margin-left: 6px;
    }
    .operation-margin{
        margin-right: 10px;
        cursor: pointer;
    }
    .nub-size{
        min-width: 800px!important;
        min-height: 500px!important;
    }
    .code-search-height{
        margin-top: 10px;
        min-height: 30px;
    }
    .add-country-btn{
        margin:0 0 10px 0;
    }
</style>