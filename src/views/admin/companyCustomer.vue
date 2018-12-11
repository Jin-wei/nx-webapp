<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 客户管理</a></li>
                <li class="active">企业客户</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin">
            <div class="row">
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
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">认证状态</label>
                                    <div class="col-sm-2">
                                        <select class="form-control input-sm" v-model="searchData.status">
                                            <option value=''>全部</option>
                                            <option value="-1">未申请</option>
                                            <option value="0">审核中</option>
                                            <option value="1">审核通过</option>
                                            <option value="2">审核驳回</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary" v-on:click="searchCustomer">  查    询  </button>
                                        <button type="button" class="btn btn-default resert-margin"  v-on:click="revertData">  重    置  </button>
                                    </div>
                                </div>
                                <!--<div class="form-group">
                                    <div class="col-md-1 col-md-offset-10">
                                        <button type="button" class="form-control btn btn-primary m-r-3 m-b-3" > 重    置 </button>
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="form-control btn btn-default m-r-3 m-b-3">  查    询  </button>
                                    </div>
                                </div>-->
                            </form>
                        </div>
                    </div>

                </div>
            </div>



            <div class="row">
                <div class="col-xs-12">
                    <div class="box box-primary">
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
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->

                    <!-- /.box -->
                </div>
                <!-- /.col -->
            </div>
        </section>
        <!-- /.content -->


        <div class="modal fade" id="AddModal">
            <div class="modal-dialog" style="width: 800px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">企业客户详情</h4>
                    </div>
                    <form id="formA">
                        <div class="modal-body" style="min-height: 520px">
                            <div class="form-group col-md-4">
                                <label >账户ID</label>
                                <input  v-model="detailData.customerUserId" class="form-control col-md-8" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>手机号</label>
                                <input v-model="detailData.phone" class="form-control" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>邮箱</label>
                                <input v-model="detailData.email" class="form-control" disabled>
                            </div>

                            <div class="form-group  col-md-4">
                                <label>公司名称</label>
                                <input v-model="detailData.real_name" class="form-control" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>营业执照号</label>
                                <input v-model="detailData.id_no" class="form-control" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>审批状态</label>
                                <input v-model="detailData.status" class="form-control" disabled>
                            </div>

                            <div class="form-group  col-md-4">
                                <label>申请认证时间</label>
                                <input v-model="detailData.c_time" class="form-control" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>申请次数</label>
                                <input v-model="detailData.approverNum" class="form-control" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>申请失败原因</label>
                                <input v-model="detailData.approval_opinion" class="form-control" disabled>
                            </div>
                            <div class="form-group  col-md-12">
                                <label>公司地址</label>
                                <input  v-model="detailData.address" class="form-control" disabled>
                            </div>
                            <div class="form-group  col-md-12">
                                <label  >路由名称</label>
                                <select class="form-control customer-select" multiple id="rootName" data-parsley-required="true"></select>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>编码方式</label>
                                <select class="form-control" v-model="detailData.encode">
                                    <option :value="null">暂无</option>
                                    <option value="UTF8">UTF8</option>
                                    <option value="UCS2">UCS2</option>
                                    <option value="GSM">GSM</option>
                                </select>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>所属业务员</label>
                                <select class="form-control" v-model="detailData.sales">
                                    <option :value="null">暂无</option>
                                    <option v-for="sale in saleArry" :value="sale.id">{{sale.name}}</option>
                                </select>
                            </div>

                            <div class="form-group  col-md-4" >
                                <label>营业执照照片</label>
                                <div class="dataPhone">
                                    <div class="form-group">
                                        <a class="box-image-link" :href="imgSrc" data-lightbox="0">
                                            <img class="box-image" :src="imgSrc">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-on:click="modifyData(detailData.id)"> 修  改 </button>
                            <button type="button" class="btn btn-default" style="margin-right: 10px" data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                            <button type="button" class="btn btn-success" :class="{'hidden':btnStatus==1}" v-on:click="examinePost(detailData.id,1)"> 审批通过 </button>
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
                    <form  @submit.prevent="examinePost(detailData.id,2)" id="companyForm">
                        <div class="modal-body" style="min-height: 100px">
                            <div class="form-group col-md-12">
                                <label >驳回原因</label>
                                <input v-model="approvalText" class="form-control col-md-8"  maxlength="50" data-parsley-maxlength="50"  data-parsley-required="true">
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
    const apiUrl = '/api/admin/companyCustomer?method='


    function typeFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '个人用户'
        }else if(value===1){
            return '企业用户'
        }

    }
    function timeFormatter(value, row) {
        if (!value) return ''
        let date =value;
        date =date.split('T');
        let time=date[1].slice(0,8);
        return date[0]+' '+time
    }
    function statusFormatter(value, row) {
        if(value===null){
            return '未申请'
        }else if(value===0){
            return '审核中'
        }else if(value===1){
            return '审核通过'
        }else if(value===2){
            return '审核驳回'
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
                    cTimeBegin:"",
                    cTimeEnd:"",
                },
                saleArry:'',
                detailData:{
                    customerUserId: '',
                    account_sid: '',
                    email: '',
                    phone: '',
                    balance: '',
                    customer_type: '',
                    status: '',
                    real_name:'',
                    id_no:'',
                    address:'',
                    sales:'',
                    encode:'',
                    c_time:'',
                    approverNum:'',
                    approval_opinion:'',
                    id_photo:'',
                },
                imgSrc:''
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
                params.phone=_self.searchData.phone;
                params.email=_self.searchData.email;
                params.customerType=1;
                params.status=_self.searchData.status;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter() {
                return [
                    '<a class="tableEidte" title="编辑">',
                    '<i class="glyphicon glyphicon-edit"></i>',
                    '</a>'
                ].join('')
            }

            function initTable() {
                window.tableEvents = {
                    'click .tableEidte': function(e, value, row, index) {
                        _self.showModel(row.id);
                    }
                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getAllCustomer',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        /*common.BTRowFormatWithIndex('No.'),*/
                        common.BTRowFormat('customerUserId', '账户ID'),
                        common.BTRowFormat('phone', '用户手机号'),
                        common.BTRowFormat('email', '邮箱'),
                        common.BTRowFormat('real_name', '公司名称'),
                        common.BTRowFormat('address', '公司地址'),
                        common.BTRowFormatWithFormatter('status', '认证状态',statusFormatter),
//                        common.BTRowFormatWithFormatter('c_time', '申请认证时间',timeFormatter),
                        common.BTRowFormat('c_time', '申请认证时间'),
                        common.actFormatter('act', actFormatter, tableEvents)
                        //去掉后两位

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
            _self.getRoot();
        },
        methods: {
            //获得详情
            showModel: function(id) {
                let _self = this
                _self.workRow = {}
                $('#formA').parsley().reset()
                $('#companyForm').parsley().reset()
                $('#AddModal').modal('show')
                _self.approvalText="";
                /* console.log(row);
                 _self.detailData=row;*/

                _self.$http.post(apiUrl + 'getAllCustomer',{id:id}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.rows.length>0){
                            _self.detailData=response.data.info.rows[0];
                            _self.detailData.c_time=_self.detailData.c_time;
                            _self.btnStatus=_self.detailData.status;
                            _self.detailData.status=statusFormatter(_self.detailData.status);
                            _self.imgSrc=window.location.protocol + '//' + window.location.host+_self.detailData.id_photo;
                            let temp = [];
                            for (var i = 0; i < _self.detailData.routerArr.length; i++) {
                                temp.push(_self.detailData.routerArr[i].id.toString());
                            }
                            $("#rootName").val(temp).trigger('change');
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
            //获得所属业务员
            getSales:function () {
                let _self=this;
                _self.$http.post(apiUrl + 'getSales',{}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.saleArry=response.data.info;
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },
            //获得路由
            getRoot:function () {
                let _self=this;
                let groupSelector = $('#rootName');
                _self.$http.post(apiUrl + 'getRouter',{}).then((response) => {
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
            //详情修改
            modifyData:function (id) {
                let _self=this;
                if(_self.detailData.sales==null){
                    common.dealPromptCommon('业务员不能为空！',600)
                    return
                }
                if(_self.detailData.encode==null){
                    common.dealPromptCommon('编码方式不能为空！',600)
                    return
                }

                let params={
                    sales:_self.detailData.sales,
                    encode:_self.detailData.encode,
                    id:id,
                }
                let routerArr= $('#rootName').val();
                params.routerArr=[];
                for(var i=0;i<routerArr.length;i++){
                    let a={};
                    a.routerid=routerArr[i];
                    params.routerArr.push(a);
                }
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                _self.$http.post(apiUrl + 'modifyCustomer',params).then((response) => {
                    if(response.data.errno==0){
                        $('#table').bootstrapTable("refresh", this.queryParams)
                        common.dealPromptCommon('修改成功！',600)
                        window.setTimeout(function(){
                            $('#AddModal').modal('hide')
                        },1200)
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },
            //重置
            revertData:function () {
                let _self=this;
                _self.searchData={
                    phone:'',
                    id:'',
                    email:'',
                    status:'',
                };
                $('#start_date').val("");
                $('#end_date').val("");
            },
            //驳回
            examinePost:function (id,status) {
                let _self=this;
                let params="";
                if(status==2){
                    params={
                        id:id,
                        status:status,
                        approvalOpinion:_self.approvalText,
                        toEmail:_self.detailData.email
                    }
                    if ($('#companyForm').parsley().isValid()) {
                        _self.examineHttp(params,id);
                    }
                }else if(status==1){
                    params={
                        id:id,
                        status:status,
                        toEmail:_self.detailData.email
                    };
                    _self.examineHttp(params,id);

                }


            },
            examineHttp:function (params,id) {
                let _self=this;
                _self.$http.post(apiUrl + 'reviewed',params).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('修改成功！',600)
                        _self.showModel(id);
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
            }

        }

    }

</script>
<style>
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
        padding:8px
    }
    .table tbody{
        margin-top: -1px;
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
    .dataPhone,.dataPhone img{
        width:90px;
        height: 90px;
        border:1px solid #f7f7f7;
    }
</style>