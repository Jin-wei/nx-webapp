<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 供应商管理</a></li>
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
                                    <label class="col-sm-1 control-label input-sm">供应商名称</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.name" type="text" class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)" >
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">IP</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.host" type="text" class="form-control input-sm"  oninput="if(value.length>30)value=value.slice(0,30)" >
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">API类型</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="searchData.apiType">
                                            <option value="">全部</option>
                                            <option value="0">HTTP</option>
                                            <option value="1">SMPP</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">所属业务员</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="searchData.salesName">
                                            <option value="">暂无</option>
                                            <option v-for="sale in saleArry" :value=sale.name>{{sale.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
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
                                <button type="button" class="btn btn-primary import-btn" v-on:click="showModel(0,0)"><i class="fa fa-fw fa-plus"></i>增加</button>
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

        <div class="modal fade" id="supplierModel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">{{modelTilte}}供应商</h4>
                    </div>
                    <form  id="supplierForm" @submit.prevent="postHttp(type,detailData.id)">
                        <div class="modal-body" style="min-height: 680px">
                            <div class="form-group col-md-6">
                                <label >code</label>
                                <input v-model="detailData.code" class="form-control col-md-8"  data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-6">
                                <label >供应商名称</label>
                                <input v-model="detailData.name" class="form-control col-md-8"  data-parsley-required="true">
                            </div>
                            <div class="form-group col-md-6">
                                <label>账户</label>
                                <input v-model="detailData.account" class="form-control"  data-parsley-required="true">
                            </div>
                            <div class="form-group  col-md-6">
                                <label>密码</label>
                                <input  v-model="detailData.password" class="form-control"  data-parsley-required="true">
                            </div>

                            <div class="form-group  col-md-6">
                                <label>IP</label>
                                <input v-model="detailData.host" class="form-control"  data-parsley-required="true">
                            </div>
                            <div class="form-group  col-md-6">
                                <label>端口号</label>
                                <input v-model="detailData.port" class="form-control" type="number"  data-parsley-required="true">
                            </div>
                            <div class="form-group  col-md-6">
                                <label>编码方式</label>
                                <select class="form-control" v-model="detailData.encode"  data-parsley-required="true">
                                    <option value="">暂无</option>
                                    <option value="UTF8">UTF8</option>
                                    <option value="UCS2">UCS2</option>
                                    <option value="GSM">GSM</option>
                                </select>
                            </div>
                            <div class="form-group  col-md-6">
                                <label>货币类型</label>
                                <select class="form-control" v-model="detailData.currency">
                                    <option value="">暂无</option>
                                    <option value="RMB">RMB</option>
                                    <option value="USB">USB</option>
                                    <option value="EUR">EUR</option>
                                    <option value="JPY">JPY</option>
                                </select>
                            </div>

                            <div class="form-group  col-md-6">
                                <label>前缀过滤</label>
                                <input v-model="detailData.filterPrefix" class="form-control"  >
                            </div>

                            <div class="form-group  col-md-6">
                                <label>所属业务员</label>
                                <select class="form-control" v-model="detailData.sales" data-parsley-required="true">
                                    <option value="null">暂无</option>
                                    <option v-for="sale in saleArry" :value=sale.id>{{sale.name}}</option>
                                </select>
                            </div>
                            <div class="form-group  col-md-6">
                                <label>API类型</label>
                                <select class="form-control" v-model="detailData.apiType">
                                    <option value="">暂无</option>
                                    <option value="0">HTTP</option>
                                    <option value="1">SMPP</option>
                                </select>
                            </div>
                            <div class="form-group  col-md-6">
                                <label>API配置</label>
                                <input v-model="detailData.apiClass" class="form-control"  >
                            </div>
                            <div class="form-group  col-md-6">
                                <label>system type</label>
                                <input v-model="detailData.systemType" class="form-control"  >
                            </div>
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
    const apiUrl = '/api/admin/supplierManage?method='

    function connectFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '未连接'
        }else if(value===1){
            return '已连接'
        }

    }

    function apiFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return 'HTTP'
        }else if(value===1){
            return 'SMPP'
        }

    }

    export default {
        data: function() {
            return {
                pagePara: {},
                workRow: {
                    menu_icon: ''
                },
                rangTime:'',
                date:'',
                inputFile:'',
                oldRow: {},
                btnStatus:1,
                approvalText:'',//驳回原因
                searchData:{//查询条件
                    name:"",
                    host:"",
                    salesName:"",
                    apiType:"",
                },
                filePath:'',
                detailData:{
                    id:'',
                    code:'',
                    name:'',
                    password: '',
                    account: '',
                    systemType: '',
                    sales:'',
                    filterPrefix:'',
                    currency:'',
                    encode:'',
                    host:'',
                    apiType:'',
                    port:'',
                    apiClass:"",
                },
                offer:{
                    type:0,
                    name:'',
                },
                supplierDisable:true,
                modelTilte:'',
                type:'',//0新增，1修改
                saleArry:'',

            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this

            function queryParams(params) {
                params.host=_self.searchData.host;
                params.salesName=_self.searchData.salesName;
                params.name=_self.searchData.name;
                params.apiType=_self.searchData.apiType;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }

            function actFormatter(value, row) {
                return [
                    '<span class="label label-info operation-margin btn-edite" >  修改  </span>'+
                    '<span class="label label-warning operation-margin btn-delete" >  删除  </span>'
                ].join('')

            }


            function initTable() {
                window.tableEvents = {
                    'click .btn-delete': function(e, value, row, index) {
                        common.rowDeleteWithApi(_self, '确认删除此报价？', apiUrl + 'deleteVendor', $('#table'), row, 'id')
                    },
                    'click .btn-edite': function(e, value, row, index) {
                        _self.showModel(1,row.id);
                    },
                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getVendor',
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
                        common.BTRowFormat('vendorName', '供应商名称'),
                        common.BTRowFormat('account', '账户'),
                        common.BTRowFormat('password', '密码'),
                        common.BTRowFormat('system_type', '系统类型'),
                        common.BTRowFormat('host', 'IP'),
                        common.BTRowFormat('port', '端口号'),
                        common.BTRowFormat('encode', '编码'),
                        common.BTRowFormat('currency', '货币类型'),
                        common.BTRowFormat('filter_prefix', '前缀'),
                        common.BTRowFormatWithFormatter('connect_flag', '连接状态',connectFormatter),
                        common.BTRowFormat('salesName', '所属业务员'),
                        common.BTRowFormatWithFormatter('api_type', 'API类型',apiFormatter),
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
            _self.getSales();

        },
        methods: {
            //获得详情
            showModel: function(type,id) {
                let _self = this;
                _self.type=type;
                if(type===0){
                    _self.modelTilte='新增';
                    _self.detailData={
                        id:'',
                        code:'',
                        name:'',
                        password: '',
                        account: '',
                        systemType: '',
                        sales:'',
                        filterPrefix:'',
                        currency:'',
                        encode:'',
                        host:'',
                        apiType:'',
                        port:'',
                        apiClass:"",
                    }
                }else if(type==1){
                    _self.modelTilte='修改';
                    _self.getDetail(id);

                }
                $('#supplierForm').parsley().reset()
                $('#supplierModel').modal('show')
                _self.approvalText="";
            },

            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },


            //重置
            revertData:function () {
                let _self=this;
                _self.searchData={//查询条件
                    realName:"",
                    host:"",
                    salesman:"",
                    apiType:"",
                };
            },
            getDetail:function (id) {
                let _self=this;
                _self.$http.post(apiUrl + 'getVendor', {id:id}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.rows.length>0){
                            let getData=response.data.info.rows[0];
                            _self.detailData.id=getData.id;
                            _self.detailData.code=getData.code;
                            _self.detailData.name=getData.vendorName;
                            _self.detailData.password=getData.password;
                            _self.detailData.account=getData.account;
                            _self.detailData.systemType=getData.system_type;
                            _self.detailData.sales=getData.user_id;
                            _self.detailData.filterPrefix=getData.filter_prefix;
                            _self.detailData.currency=getData.currency;
                            _self.detailData.encode=getData.encode;
                            _self.detailData.host=getData.host;
                            _self.detailData.apiType=getData.api_type;
                            _self.detailData.port=getData.port;
                            _self.detailData.apiClass=getData.api_class;
                        }else{
                            _self.revertDetail();
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    // error callback
                    common.dealErrorCommon(this, response)
                })
            },
            getSales:function (type,id) {
                let _self=this;
                this.$http.post(apiUrl + 'getSales', {}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.saleArry=response.data.info;
                            if(type===0){

                            }else if(type===1){
                                _self.getDetail(id);
                            }
                        }else{
                            _self.saleArry="";
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    // error callback
                    common.dealErrorCommon(this, response)
                })
            },

            //增加修改请求
            postHttp:function (type,id) {
                let _self=this;
                let url='';
                let params="";
                params=_self.detailData;
                if(type===0){
                    url='addVendor';

                }else if(type===1){
                    url='modifyVendor';
                    params.id=id;
                }

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
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

            coverString:function (subStr,str){
                var reg = eval("/"+subStr+"/ig");
                return reg.test(str);
            },


            getCustomerName:function () {
                //模糊查询
                let _self=this;
                var arr = [];
                //车辆自动提示
                $("#CustomerName").autocomplete({
                    minLength: 0,
                    source: arr,
                    scrollHeight:300,
                    source: function(request, response) {
                        $.ajax({
                            url: apiUrl + 'getVendor',
                            type: 'POST',
                            dataType: "json",
                            data: {
                                name:_self.offer.name
                            },
                            beforeSend: function(request) {
                                request.setRequestHeader("authorization", common.getStoreData('token'));
                            },
                            success: function( data ) {
                                response(data.info );
                            },
                            error:function (data) {
                                common.dealErrorCommon(_self, data)
                            }
                        });
                    },
                    select: function( event, ui ) {
                        $( "#select1" ).val( ui.item.id );
                        _self.offer.name=ui.item.name;
                        return false;
                    }
                }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                    ul.css({
                        'z-index':'9999',
                        'position':'absolute'
                    });
                    return $( '<li>' )
                        .append( "<div class='col-md-12'><p style='float: left'>" + item.name +"</p></div>" )
                        .appendTo( ul );
                };
            },
            revertDetail:function () {
                let _self=this;
                _self.detailData={
                    id:'',
                    code:'',
                    name:'',
                    password: '',
                    account: '',
                    systemType: '',
                    sales:'',
                    filterPrefix:'',
                    currency:'',
                    encode:'',
                    host:'',
                    apiType:'',
                    port:'',
                    apiClass:"",
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
        min-height: 82px;
    }


</style>