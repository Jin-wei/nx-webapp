<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 路由管理</a></li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 90px">
                        <form class="form-horizontal">
                            <div class="">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">路由名称</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.name" type="text" class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)" >
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">是否默认</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="searchData.default">
                                            <option value="">全部</option>
                                            <option value="1">是</option>
                                            <option value="0">否</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">状态</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="searchData.status">
                                            <option value="">全部</option>
                                            <option value="0">停用</option>
                                            <option value="1">启用</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary search-btn-margin" v-on:click="searchCustomer">  查    询  </button>
                                        <button type="button" class="btn btn-default resert-margin"  v-on:click="revertData">  重    置  </button>
                                    </div>
                                </div>
                                <div class="form-group">

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
                            <div>
                                <button type="button" class="btn btn-primary import-btn" v-on:click="showModel(0,0,'')"><i class="fa fa-fw fa-plus"></i>增加</button>
                                <!--<button type="button" class="btn btn-info import-btn" v-on:click=""><i class="fa fa-fw fa-edit"></i>修改</button>
                                <button type="button" class="btn btn-warning import-btn" v-on:click="deleteS"><i class="fa fa-fw fa-remove"></i>删除</button>-->

                            </div>
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

        <!--new supplier-->
        <div class="modal fade" id="supplierModel">
            <div class="modal-dialog sort-model-width">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">{{modelTilte}}路由</h4>
                    </div>
                    <form  id="supplierForm" @submit.prevent="postHttp(type,id)">
                        <div class="modal-body rout-height">
                            <div class="form-group col-md-12">
                                <label >路由名称</label>
                                <input  class="form-control col-md-8" v-model="detailData.name"  oninput="if(value.length>30)value=value.slice(0,30)" data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-12">
                                <label>选择供应商</label>
                                <select class="form-group customer-select" multiple id="supplierName"></select>
                            </div>
                            <div class="form-group col-md-12">
                                <label >是否锁定</label>
                                <div class="radio rout-radio">
                                    <label class=""><input  type="radio" name="lock"  value="1" checked/>启用</label>
                                    <label class="rout-auto-margin"><input  type="radio" name="lock"  value="0" class="" />停用</label>
                                </div>
                                <!--<input v-model="detailData.name" class="form-control col-md-8"  data-parsley-required="true">-->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" @click="">  提  交  </button>
                            <button type="button" class="btn btn-default"  data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--sort-->
        <div class="modal fade" id="sortModel">
            <div class="modal-dialog  sort-model-width">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">设置供应商排序</h4>
                    </div>
                    <form  id="sortForm" @submit.prevent="setSport(id)">
                        <div class="modal-body sort-height supplierSort">
                            <div class="form-group col-md-6 " v-for="sort in sortArry">
                                <label >{{sort.name}}</label>
                                <input  class="sort-input" type='number' :id='sort.id' :value="sort.level" data-parsley-required="true">
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" >  提  交  </button>
                            <button type="button" class="btn btn-default"  data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--customer-->
        <div class="modal fade" id="customerModel">
            <div class="modal-dialog  sort-model-width">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">设置客户</h4>
                    </div>
                    <form  id="customerForm" @submit.prevent="setCustomer()">
                        <div class="modal-body sort-height">
                            <div class="form-group col-md-12">
                                <label >客户名称</label>
                                <select class="form-group customer-select" multiple id="customerName"></select>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" >  提  交  </button>
                            <button type="button" class="btn btn-default"  data-dismiss="modal" aria-hidden="true"> 返  回 </button>
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
    const apiUrl = '/api/admin/routingManage?method='

    function statusFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '停用'
        }else if(value===1){
            return '启用'
        }

    }

    function defaultFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '否'
        }else if(value===1){
            return '是'
        }

    }

    export default {
        data: function() {
            return {
                pagePara: {},
                workRow: {
                    menu_icon: ''
                },
                id:"",
                rangTime:'',
                date:'',
                inputFile:'',
                oldRow: {},
                btnStatus:1,
                approvalText:'',//驳回原因
                searchData:{//查询条件
                    name:"",
                    default:"",
                    status:"",
                },
                filePath:'',
                detailData:{
                    id:'',
                    name:'',
                    lock:''
                },
                offer:{
                    type:0,
                    name:'',
                },
                supplierDisable:true,
                modelTilte:'',
                type:'',//0新增，1修改
                saleArry:'',
                sortArry:'',
                sortData:''
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this
            let customerSelector = $('#customerName');
            let supplierSelector = $('#supplierName');

            function queryParams(params) {
                params.status=_self.searchData.status;
                params.defaultFlag=_self.searchData.default;
                params.name=_self.searchData.name;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }

            function actFormatter(value, row) {
                /*return [
                    '<span class="label label-success operation-margin btn-edite" >  编辑路由  </span>'+
                    '<span class="label label-info operation-margin btn-delete" >  删除路由  </span>'+
                    '<span class="label label-warning operation-margin btn-sort" >  供应商排序  </span>'+
                    '<span class="label label-primary operation-margin set-customer" >  设置客户  </span>'+
                    '<span class="label label-default operation-margin set-default" >  设置默认  </span>'
                ].join('')*/
                if(row.default_flag===0){
                    return [
                        '<span class="label label-success operation-margin btn-edite" >  编辑路由  </span>'+
                        '<span class="label label-info operation-margin btn-delete" >  删除路由  </span>'+
                        '<span class="label label-warning operation-margin btn-sort" >  供应商排序  </span>'+
                        '<span class="label label-primary operation-margin set-customer" >  设置客户  </span>'+
                        '<span class="label label-default operation-margin set-default" >  设置默认  </span>'
                    ].join('')
                }else if(row.default_flag===1){
                    return [
                        '<span class="label label-success operation-margin btn-edite" >  编辑路由  </span>'+
                        '<span class="label label-info operation-margin btn-delete" >  删除路由  </span>'+
                        '<span class="label label-warning operation-margin btn-sort" >  供应商排序  </span>'+
                        '<span class="label label-primary operation-margin set-customer" >  设置客户  </span>'+
                        '<span class="label label-default operation-margin cancel-default">  取消默认  </span>'
                    ].join('')
                }

            }


            function initTable() {
                window.tableEvents = {
                    'click .btn-delete': function(e, value, row, index) {
                        common.rowDeleteWithApi(_self, '确认删除此路由？', apiUrl + 'deleteRouter', $('#table'), row, 'id')
                    },
                    'click .btn-edite': function(e, value, row, index) {
                        _self.id=row.id
                        _self.showModel(1,row.id,row);
                    },
                    'click .btn-sort': function(e, value, row, index) {
                        $('#sortForm').parsley().reset()
                        $('#sortModel').modal('show')
                        _self.id=row.id
                        _self.sortArry=row.vendorArr
                    },
                    'click .set-customer': function(e, value, row, index) {
                        $('#customerForm').parsley().reset()
                        $('#customerModel').modal('show')
                        _self.id=row.id
                        let temp = [];
                        for (var i = 0; i < row.customerArr.length; i++) {
                            temp.push(row.customerArr[i].customer_id.toString());
                        }
                        $("#customerName").val(temp).trigger('change')
                    },
                    'click .set-default': function(e, value, row, index) {
                        _self.setDefault(row,1)
                    },
                    'click .cancel-default': function(e, value, row, index) {
                        _self.setDefault(row,0)
                    },
                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getRouter',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        /*{
                         field: 'state',
                         checkbox: true
                         },*/
                        common.BTRowFormatWithIndexFooter('序号'),
                        common.BTRowFormat('name', '路由名称'),
                        common.BTRowFormatWithFormatter('default_flag', '是否默认',defaultFormatter),
                        common.BTRowFormatWithFormatter('status', '状态',statusFormatter),
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
            _self.getCustomerName();
            _self.getSupplierName();

            /*let retData=[{id:'1',text:'韦金'},{id:'2',text:'聂继淳'},{id:'3',text:'else'},{id:'4',text:'韦金4'},{id:'5',text:'聂继淳2'},];
            _self.sortData=[{id:'01',text:'SP0039 - SMSala/Almuqeet Syste12',value:'1'},{id:'02',text:'SP0039 - SMSala/Almuqeet Syste12',value:'0'},{id:'03',text:'SP0039 - SMSala/Almuqeet Syste13',value:'3'},];
            common.initSelect2Single(groupSelector, retData);
            common.initSelect2Single(supplierSelector, retData);*/
           /* $("#customerName").val(['1','2']).trigger('change')*/

        },
        methods: {
            //获得详情
            showModel: function(type,id,row) {
                let _self = this;
                _self.type=type;
                $('#supplierName').val('').trigger('change');
                if(type===0){
                    _self.modelTilte='新增';
                    _self.detailData={
                        id:'',
                        name:'',
                        lock:''
                    }
                    $("input[name='lock'][value=1]").prop("checked",true);
                }else if(type==1){
                    _self.modelTilte='修改';
                    let getData=row;
                    _self.detailData.id=getData.id;
                    _self.detailData.name=getData.name;
                    let temp = [];
                    for (var i = 0; i < getData.vendorArr.length; i++) {
                        temp.push(getData.vendorArr[i].vendor_id.toString());
                    }
                    $("#supplierName").val(temp).trigger('change')
                    $("[name='lock'][value='"+getData.status+"']").prop("checked",true);

                }
                $('#supplierForm').parsley().reset()
                $('#supplierModel').modal('show')
            },

            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },


            //重置
            revertData:function () {
                let _self=this;
                _self.searchData={//查询条件
                    name:"",
                    default:"",
                    status:"",
                };
            },



            //增加修改请求
            postHttp:function (type,id) {
                let _self=this;
                let url='';
                let params={};
                params.name=_self.detailData.name;
                params.status=$("input[name='lock']:checked").val();
                let vendorArr= $('#supplierName').val();
                params.vendorArr=[];
                if(vendorArr!="" && vendorArr!=null){
                    for(var i=0;i<vendorArr.length;i++){
                        let a={};
                        a.vendorId=vendorArr[i];
                        params.vendorArr.push(a);
                    }
                }

                if(type===0){
                    url='addRouter';

                }else if(type===1){
                    url='modifyRouter';
                    params.id=id;
                }
                params=JSON.stringify(params);
                if ($('#supplierForm').parsley().isValid()) {
                    _self.$http.post(apiUrl + url,params).then((response) => {
                        if(response.data.errno==0){
                            common.dealPromptCommon('保存成功！',600)
                            $('#table').bootstrapTable("refresh", this.queryParams)
                            $('#supplierForm').parsley().reset();
                            _self.revertDetail();
                            window.setTimeout(function(){
                                $('#supplierModel').modal('hide')
                            },1200)
                        }else{
                            common.dealErrorCommon(_self, response)
                        }
                    }, (response) => {
                        common.dealErrorCommon(_self, response)
                    })
                }

            },
            getCustomerName:function () {
                //客户模糊查询
                let _self=this;
                let groupSelector = $('#customerName');
                _self.$http.post(apiUrl +'getCustomer',{}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            common.initSelect2Single(groupSelector, response.data.info);
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },
            getSupplierName:function () {
                //供应商模糊查询
                let _self=this;
                let supplierSelector = $('#supplierName');
                _self.$http.post(apiUrl +'getVendor',{}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            common.initSelect2Single(supplierSelector, response.data.info);
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },
            //设置排序
            setSport:function (id) {
                let _self=this;
                let params={};
                params.vendorArr="";
                params.vendorArr=_self.getSupplierSort();
                params.id=id;
                params=JSON.stringify(params);
                _self.$http.post(apiUrl +'modifyRouterLevel',params).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('保存成功！',600)
                        $('#sortForm').parsley().reset();
                        $('#table').bootstrapTable("refresh", this.queryParams)
                        window.setTimeout(function(){
                            $('#sortModel').modal('hide')
                        },1200)
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },

            //设置客户
            setCustomer:function () {
                let _self=this;
                let params={};
                params.id=_self.id;
                params.customerArr=[];
                let customerArr= $('#customerName').val()
                if(customerArr!=null){
                    for(var i=0;i<customerArr.length;i++){
                        let a={};
                        a.customerId=customerArr[i];
                        params.customerArr.push(a);
                    }
                }else{
                }

                params=JSON.stringify(params);
                if ($('#customerForm').parsley().isValid()) {
                    _self.$http.post(apiUrl + 'modifyRouter',params).then((response) => {
                        if(response.data.errno==0){
                            common.dealPromptCommon('保存成功！',600)
                            $('#customerForm').parsley().reset();
                            _self.revertDetail();
                            $('#table').bootstrapTable("refresh", this.queryParams)
                            window.setTimeout(function(){
                                $('#customerModel').modal('hide')
                            },1200)
                        }else{
                            common.dealErrorCommon(_self, response)
                        }
                    }, (response) => {
                        common.dealErrorCommon(_self, response)
                    })
                }
            },
            //获取供应商排序
            getSupplierSort: function () {
                let str = [];
                $(".supplierSort input[type='number']").each(function () {
                    let temp={}
                    temp.level = $(this).val();
                    temp.id = $(this).attr('id');
                    str.push(temp);
                });
                return str
            },
            //设置默认
            setDefault:function (row,type) {
                let _self=this;
                let params={};
                params.defaultFlag=type;
                params.id=row.id;
                params=JSON.stringify(params);
                _self.$http.post(apiUrl +'modifyRouterDefault',params).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('保存成功！',600);
                        $('#table').bootstrapTable("refresh", this.queryParams)
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },

            revertDetail: function () {
                let _self = this;
                _self.detailData = {
                    id:'',
                    name:'',
                    lock:''
                }
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

    .quo-top-border{
        min-height: 60px;
        border-bottom:1px  solid #f3f3f3;

    }
    .import-btn{
        margin:0 0 10px 0;
    }
    #file{
        position:absolute;
        z-index:100;
        width: 56.8px;
        height: 34px;
        margin-left:0px;
        font-size:60px;
        opacity:0;
        filter:alpha(opacity=0);
        margin-top:2px;
        cursor: pointer;
    }
    .search-btn-margin{
        margin-left: 18px;
    }
    .operation-margin{
        margin-right: 10px;
        cursor: pointer;
    }
    .margin-left-ten{
        display: inline-block;
        margin-left: 10px;
    }
    .ui-autocomplete {
        max-height: 200px;
        overflow-y: auto;
        /* prevent horizontal scrollbar */
        overflow-x: hidden;
        /* add padding to account for vertical scrollbar */
        padding-right: 20px;
    }
    #supplierForm div div{
        min-height: 60px;
    }
    .rout-auto-margin{
      margin-left: 30px;
    }
    #supplierForm .rout-radio{
        min-height: 16px;
    }
    .rout-checkbox-margin{
        padding-left: 0;

        height: 20px;
    }
    .rout-height{
        min-height: 350px;
        height: auto;
    }
    .rout-checkbox{
        height: 300px;
        overflow: auto;
    }
    #supplierForm .rout-checkbox div{
        min-height: 30px;
        overflow: auto;
    }
    .sort-input{
        display: inline-block;
        width: 35px;
        margin-left: 10px;
        margin-right: 20px;
    }
    .sort-div{
        display: inline-block;
    }
    .sort-model-width{
        width: 800px!important;
    }
    .sort-height{
        min-height:200px;
        height:auto!important;
        height:200px;
        position: relative;
    }
    .clear{
        clear:both;
    }


</style>