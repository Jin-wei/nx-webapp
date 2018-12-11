<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 应用管理</a></li>
                <!--<li class="active"></li>-->
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 147px">
                        <form class="form-horizontal">
                                <div class="form-group">
                                    <label  class="col-sm-1 control-label input-sm">手机号</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.phone" type="number" class="form-control input-sm"   oninput="if(value.length>20)value=value.slice(0,20)">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">邮箱</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.email" type="email" class="form-control input-sm"  max="50">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">状态</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="searchData.status">
                                            <option value="">全部</option>
                                            <option value="1">上线</option>
                                            <option value="0">申请中</option>
                                            <option value="2">申请驳回</option>

                                        </select>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">应用名称</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.appName" type="text" class="form-control input-sm"  maxlength="50" data-parsley-maxlength="50">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">App Key</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.appKey" type="text" class="form-control input-sm"  maxlength="50" data-parsley-maxlength="50">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">客户名称</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.realName" type="email" class="form-control input-sm"  max="50">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">业务员</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.salesName" type="email" class="form-control input-sm"  max="50">
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-primary" v-on:click="searchCustomer">  查    询  </button>
                                        <button type="button" class="btn btn-default resert-margin"  v-on:click="revertData">  重    置  </button>
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

        <div class="modal fade" id="AddModal">
            <div class="modal-dialog" style="width: 800px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">应用管理详情</h4>
                    </div>
                    <form @submit.prevent="modifyApplication()" id="formA">
                        <div class="modal-body" style="min-height: 490px">
                            <div class="form-group col-md-4">
                                <label >账户ID</label>
                                <input class="form-control" v-model="detailData.user_id"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>应用名称</label>
                                <input class="form-control" v-model="detailData.appName" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>状态</label>
                                <input class="form-control" v-model="detailData.status" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>App Key</label>
                                <input class="form-control" v-model="detailData.app_key" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>App Secret</label>
                                <input class="form-control" v-model="detailData.app_secret"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>创建时间</label>
                                <input class="form-control" v-model="detailData.c_time"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>上线时间</label>
                                <input class="form-control" v-model="detailData.approver_time"   disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>申请次数</label>
                                <input class="form-control" v-model="detailData.approverNum" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>驳回原因</label>
                                <input class="form-control" v-model="detailData.approval_opinion"  disabled>
                            </div>
                            <div class="form-group  col-md-6">
                                <label>服务器白名单</label>
                                <textarea class="form-control" v-model="detailData.white_list" rows="5" disabled></textarea>
                            </div>
                            <div class="form-group  col-md-6">
                                <div>
                                    <label>产品服务</label>
                                </div>
                                <div class="produce" v-for=" service in detailData.serviceArr">
                                    <span class="produce-span">{{service.serviceName}}</span>
                                    <div class="produce-div">
                                        <input class="form-control " :value="service.dr" disabled>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="produce">
                                    <span class="produce-span">上行地址</span>
                                    <div class="produce-div">
                                        <input class="form-control"  v-model="detailData.sms_mo_url">
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <!--<div class="produce">
                                    <span class="produce-span">短信</span>
                                    <div class="produce-div">
                                        <input class="form-control " v-model="workRow.description"  disabled>
                                    </div>
                                    <div class="clear"></div>
                                </div>-->

                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" style="margin-right: 10px" > 修  改 </button>
                            <button type="button" class="btn btn-default" style="margin-right: 10px" data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                            <button type="button" class="btn btn-success" :class="{'hidden':btnStatus==1}" v-on:click="examinePost(detailData.appId,1)"> 审批通过 </button>
                            <button type="button" class="btn btn-danger" v-on:click="approvalReject" :class="{'hidden':btnStatus==1 || btnStatus==2}"> 审批不通过 </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="AddModal2">
            <div class="modal-dialog" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">审批驳回</h4>
                    </div>
                    <form @submit.prevent="examinePost(detailData.appId,2)" id="formB">
                        <div class="modal-body" style="min-height: 100px">
                            <div class="form-group col-md-12">
                                <label >驳回原因</label>
                                <input v-model="approvalText" class="form-control col-md-8"  maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary"> 提  交 </button>
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
    const apiUrl = '/api/admin/applicationCustomer?method='


    function typeFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '个人用户'
        }else if(value===1){
            return '企业用户'
        }

    }
    function timeFormatter(value) {
        if (!value) return ''
        let date =value;
        date =date.split('T');
        let time=date[1].slice(0,8);
        return date[0]+' '+time
    }
    function uTimeFormatter(value, status) {
        if (!value) return ''
        if(status===1){
            return value
        }else{
            return ''
        }
    }


    function statusFormatter(value) {
        if(value===null){
            return '未申请'
        }else if(value===0){
            return '申请中'
        }else if(value===1){
            return '上线'
        }else if(value===2){
            return '申请驳回'
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
                    phone:"",
                    email:"",
                    status:"",
                    appName:'',
                    appKey:'',
                    realName:'',
                    salesName:''
                },
                saleArry:'',
                detailData:{
                    appId:'',
                    customerUserId: '',
                    email: '',
                    phone: '',
                    status: '',
                    c_time:'',
                    approver_time:'',
                    approverNum:'',
                    approval_opinion:'',
                    appName:'',
                    white_list:'',
                    comments:'',
                    service_Item:'',
                    app_key:"",
                    app_secret:'',
                    sms_mo_url:'',
                    serviceArr:[],

                }
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this
            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));

            function queryParams(params) {
                params.phone=_self.searchData.phone;
                params.email=_self.searchData.email;
                params.status=_self.searchData.status;
                params.appName=_self.searchData.appName;
                params.appKey=_self.searchData.appKey;
                params.status=_self.searchData.status;
                params.realName=_self.searchData.realName;
                params.salesName=_self.searchData.salesName;

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter(value,row) {
                if(row.status==1){
                    return [
                        '<span class="label label-info operation-margin btn-glyphicon tableEidte " >  编辑  </span>'+
                        '<span class="label label-warning operation-margin btn-delete">  强制下线  </span>'
                    ].join('')
                }else {
                    return [
                        '<span class="label label-info operation-margin btn-glyphicon tableEidte ">  编辑  </span>'
                    ].join('')
                }

            }

            function initTable() {
                window.tableEvents = {
                    'click .tableEidte': function(e, value, row, index) {
                        _self.showModel(row.appId);
                    },
                    'click .btn-delete': function(e, value, row, index) {
                        _self.examinePost(row.appId,3)
                    },
                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getApplication',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndex('序号'),
                        common.BTRowFormat('real_name', '客户名称'),
                        common.BTRowFormat('phone', '手机号'),
                        common.BTRowFormat('email', '邮箱'),
                        common.BTRowFormat('appName', '应用名称'),
                        common.BTRowFormat('app_key', 'App Key'),
                        common.BTRowFormatWithFormatter('status', '状态',statusFormatter),
//                        common.BTRowFormatWithFormatter('c_time', '创建时间',timeFormatter),
//                        common.BTRowFormatWithFormatter('approver_time', '上线时间',uTimeFormatter),
                        common.BTRowFormat('c_time', '创建时间'),
                        common.BTRowFormat('approver_time', '上线时间'),
                        common.BTRowFormat('approverName', '审批人'),
                        common.BTRowFormat('salesName', '业务员'),
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


        },
        methods: {
            //获得详情
            showModel: function(id) {
                let _self = this
                _self.workRow = {}
                $('#formB').parsley().reset()
                $('#formA').parsley().reset()
                $('#AddModal').modal('show')
                _self.approvalText="";

                _self.$http.post(apiUrl + 'getApplication',{id:id}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.rows.length>0){
                            _self.detailData=response.data.info.rows[0];
                            _self.detailData.c_time=_self.detailData.c_time;
                            _self.detailData.approver_time=uTimeFormatter(_self.detailData.approver_time,_self.detailData.status);
                            _self.btnStatus=_self.detailData.status;
                            _self.detailData.status=statusFormatter(_self.detailData.status);

                            let reg = /[,]+/;
                            if(reg.test( _self.detailData.white_list)){
                                _self.detailData.white_list=_self.detailData.white_list.replace(/,/g,'\n');
                            }else{
                            }

                        }else{
                            _self.detailData = {
                                customerUserId: '',
                                account_sid: '',
                                email: '',
                                phone: '',
                                balance: '',
                                customer_type: '',
                                status: '',
                                c_time: '',
                                sales: '',
                                encode: ''
                            }
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },
            //审批拒绝弹窗显示
            approvalReject:function () {
                let _self = this
                $('#AddModal2').modal('show')
            },
            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },

            //重置
            revertData:function () {
                let _self=this;
                _self.searchData={
                    phone:"",
                    email:"",
                    status:"",
                    appName:'',
                    appKey:'',
                    realName:'',
                    salesName:''
                };
            },
            //驳回
            examinePost:function (id,status) {
                let _self=this;
                let params="";
                if(status==2){
                    params={
                        id:id,
                        status:status,
                        approvalOpinion:_self.approvalText
                    }
                    if ($('#formB').parsley().isValid()) {
                        _self.examineHttp(params,id,status);
                    }
                }else if(status==1){
                    params={
                        id:id,
                        status:status,
                    };
                    _self.examineHttp(params,id,status);

                }else if(status==3){
                    params={
                        id:id,
                        status:2,
                    };
                    _self.examineHttp(params,id,status);
                }


            },
            examineHttp:function (params,id,status) {
                let _self=this;
                _self.$http.post(apiUrl + 'reviewed',params).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('修改成功！',600)
                        if(status!=3){
                            _self.showModel(id);
                        }
                        $('#table').bootstrapTable("refresh", this.queryParams)
                        window.setTimeout(function(){
                            $('#AddModal').modal('hide')
                            $('#AddModal2').modal('hide');
                        },1200)

                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },
            modifyApplication:function () {
                let _self=this;
                let params={
                    id:_self.detailData.appId,
                    smsMoUrl:_self.detailData.sms_mo_url
                };
                _self.$http.post(apiUrl + 'modifyApplication',params).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('修改成功！',600)
                        window.setTimeout(function(){
                            $('#AddModal').modal('hide')
                            $('#AddModal2').modal('hide');
                        },1200)

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
    .operation-margin{
        margin-right: 10px;
        cursor: pointer;
    }


</style>