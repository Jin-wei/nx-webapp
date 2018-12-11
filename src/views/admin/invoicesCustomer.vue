<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 财务报表管理</a></li>
                <li class="active">发票管理</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 160px">
                        <form class="form-horizontal">
                            <div class="top-border">
                                <div class="form-group">
                                    <label  class="col-sm-1 control-label input-sm">手机号</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.phone" type="number" class="form-control input-sm"   oninput="if(value.length>20)value=value.slice(0,20)">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">邮箱</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.email" type="email" class="form-control input-sm"  max="50">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">快递公司</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="searchData.taxpayerId">
                                            <option value="">全部</option>
                                            <!--<option value="0">待定</option>-->
                                            <option v-for="email in emailArry" :value="email.type">{{email.name}}</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">快递单号</label>
                                    <div class="col-sm-2">
                                        <input type="number" v-model="searchData.taxpayer_no"  class="form-control input-sm"  oninput="if(value.length>20)value=value.slice(0,20)">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">发票类型</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="searchData.type">
                                            <option value="">全部</option>
                                            <option value="0">普通发票</option>
                                            <option value="1">增值税专用发票</option>
                                        </select>
                                    </div>
                                    <label  class="col-sm-1 control-label input-sm">申请时间</label>
                                    <div class="col-sm-5">
                                        <div class="">
                                            <div class="input-group">
                                                <input  type="text" class="form-control" id="start_date" placeholder="起始时间"/>
                                                <span class="input-group-addon" style="background: #d2d6de">-</span>
                                                <input type="text" class="form-control" id="end_date" placeholder="截止时间"/>
                                            </div>
                                        </div>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm">客户名称</label>
                                    <div class="col-sm-2">
                                        <input id="customer" type="text" class="form-control input-sm"   oninput="if(value.length>30)value=value.slice(0,30)"  v-on:keyup="getCustomer">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">业务员</label>
                                    <div class="col-sm-2">
                                        <input id="salesName"  type="text" class="form-control input-sm"   oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getSales">
                                    </div>
                                    <div class="col-md-3">
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

        <div class="modal fade" id="AddModal">
            <div class="modal-dialog" style="width: 800px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">发票详情</h4>
                    </div>
                    <form @submit.prevent="" id="formA">
                        <div class="modal-body" style="min-height: 490px">
                            <div class="form-group col-md-4">
                                <label >账户ID</label>
                                <input class="form-control" v-model="detailData.user_id"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>发票抬头信息</label>
                                <input class="form-control" v-model="detailData.title" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>申请时间</label>
                                <input class="form-control" v-model="detailData.c_time" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>发票金额</label>
                                <input class="form-control" v-model="detailData.amount" disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>发票类型</label>
                                <input class="form-control" v-model="detailData.type"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>发票状态</label>
                                <input class="form-control" v-model="detailData.status"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>纳税人识别号</label>
                                <input class="form-control" v-model="detailData.taxpayer_no"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>企业电话</label>
                                <input class="form-control" v-model="detailData.enterprise_phone"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>收件人</label>
                                <input class="form-control"  v-model="detailData.recipient"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>收件人手机号</label>
                                <input class="form-control" v-model="detailData.recipient_phone"  disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>快递公司</label>
                                <input class="form-control" v-model="detailData.postal"   disabled>
                            </div>
                            <div class="form-group  col-md-4">
                                <label>快递单号</label>
                                <input class="form-control"  v-model="detailData.taxpayer_no"  disabled>
                            </div>
                            <div class="form-group  col-md-6">
                                <label>开户行</label>
                                <input class="form-control" v-model="detailData.bank_name" disabled>
                            </div>
                            <div class="form-group  col-md-6">
                                <label>注册地址</label>
                                <input class="form-control" v-model="detailData.post_address" disabled>
                            </div>
                            <div class="form-group  col-md-6">
                                <label>收取地址</label>
                                <input class="form-control" v-model="detailData.address"  disabled>
                            </div>
                            <div class="form-group  col-md-6">
                                <label>审批未通过理由</label>
                                <input class="form-control" v-model="detailData.approval_opinion" rows="5" disabled>
                            </div>


                        </div>
                        <div class="modal-footer">
                            <!--<button type="submit" class="btn btn-default" style="margin-right: 10px"  data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                            <button type="submit" class="btn btn-success"> 审批通过 </button>
                            <button  class="btn btn-danger" v-on:click="approvalReject"> 审批不通过 </button>-->
                            <button type="button" class="btn btn-default" style="margin-right: 10px" data-dismiss="modal" aria-hidden="true"> 返  回 </button>
                            <button type="button" class="btn btn-success" :class="{'hidden':btnStatus==1}" v-on:click="examinePost(detailData.id,1)"> 审批通过 </button>
                            <button type="button" class="btn btn-danger" v-on:click="approvalReject" :class="{'hidden':btnStatus==1 || btnStatus==2}"> 审批不通过 </button>
                            <button  class="btn btn-info" v-on:click="mailing"  :class="{'hidden':btnStatus!=1}" style="display:inline-block"> 寄出发票 </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="reject">
            <div class="modal-dialog" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">审批驳回</h4>
                    </div>
                    <form @submit.prevent="examinePost(detailData.id,2)" id="invoicesRetrun">
                        <div class="modal-body" style="min-height: 100px">
                            <div class="form-group col-md-12">
                                <label >驳回原因</label>
                                <input v-model="approvalText" class="form-control col-md-8"  maxlength="50" data-parsley-maxlength="50" data-parsley-required="true">
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

        <div class="modal fade" id="EmailModel">
            <div class="modal-dialog" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">邮寄信息</h4>
                    </div>
                    <form @submit.prevent="examinePost(detailData.id,3)" id="EmailForm">
                        <div class="modal-body" style="min-height: 210px">

                            <div class="form-group  col-md-12">
                                <label>快递公司</label>
                                <select class="form-control" v-model="emailData.emailId"  data-parsley-required="true">
                                    <option value="">全部</option>
                                    <option v-for="email in emailArry" :value="email.type">{{email.name}}</option>
                                </select>
                            </div>
                            <div class="form-group  col-md-12">
                                <label>快递单号</label>
                                <input class="form-control" v-model="emailData.emailNum" data-parsley-required="true">
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

    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    const apiUrl = '/api/admin/invoicesCustomer?method='
    var sumArry='';

    function moneyFormat() {
        if(!isNaN(sumArry.totalAmount)){
            return sumArry.totalAmount
        }else{
            return ""
        }
    }

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
    function type(value, row) {
        if(value===null){
            return ''
        }else if(value===0){
            return '普通发票'
        }else if(value===1){
            return '增值税专用发票'
        }
    }
    function statusFormatter(value, row) {
        if(value===null){
            return ''
        }else if(value===0){
            return '审核中'
        }else if(value===1){
            return '审核通过'
        }else if(value===2){
            return '拒绝'
        }else if(value===3){
            return '寄出'
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
                    taxpayerId:"",
                    cTimeBegin:"",
                    cTimeEnd:"",
                    type:'',
                    taxpayer_no:'',
                    id_no:'',
                    id_type:'',
                    realName:'',
                    salesName:''
                },
                emailArry:'',
                detailData:{
                    user_id: '',
                    phone: '',
                    status: '',
                    address:'',
                    c_time:'',
                    approverNum:'',
                    approval_opinion:'',
                    amount:'',
                    title:'',
                    type:'',//radio
                    service_type:"",//radio
                    taxpayer_no:'',
                    post_address:'',
                    recipient:'',
                    recipient_phone:'',
                    bank_account:'',
                    bank_name:'',
                    registered_address:'',
                    enterprise_phone:'',
                    postal:'',

                },
                emailData:{
                    emailId:'',
                    emailNum:'',
                }
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this;
            _self.getEmail();
            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));


            function queryParams(params) {
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.phone=_self.searchData.phone;
                params.email=_self.searchData.email;
                params.postal=_self.searchData.taxpayerId;
                params.trackNo=_self.searchData.taxpayer_no;
                params.type=_self.searchData.type;
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
                    url: apiUrl + 'getInvoice',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        sumArry=res.info.sumDate;
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndexFooter('序号'),
                        /*common.BTRowFormat('user_id', '账户ID'),*/
                        common.BTRowFormat('real_name', '客户名称'),
                        common.BTRowFormat('phone', '手机号'),
                        common.BTRowFormat('email', '邮箱'),
//                        common.BTRowFormatWithFormatter('c_time', '申请时间',timeFormatter),
                        common.BTRowFormat('c_time', '申请时间'),
                        common.BTRowFormatFooter('amount', '发票金额',moneyFormat),
                        common.BTRowFormatWithFormatter('type', '发票类型',type),
                        common.BTRowFormatWithFormatter('status', '状态',statusFormatter),
                        common.BTRowFormat('name', '快递公司'),
                        common.BTRowFormat('track_no', '快递单号'),
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
                    showFooter:true,
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
            _self.getCustomer();
            _self.getSales();

        },
        methods: {
            //获得详情
            showModel: function(id) {
                let _self = this
                _self.workRow = {}
                $('#EmailForm').parsley().reset()
                $('#invoicesRetrun').parsley().reset()
                $('#AddModal').modal('show')
                _self.approvalText="";

                _self.$http.post(apiUrl + 'getInvoice',{id:id}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.rows.length>0){
                            _self.detailData=response.data.info.rows[0];
                            _self.detailData.c_time=_self.detailData.c_time;
                            _self.btnStatus=_self.detailData.status;
                            _self.detailData.status=statusFormatter(_self.detailData.status);
                            _self.detailData.type=type(_self.detailData.type);
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

            //详情修改
            modifyData:function (id) {
                let _self=this;
                let params={
                    sales:_self.detailData.sales,
                    encode:_self.detailData.encode,
                    id:id,
                }
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                _self.$http.post(apiUrl + 'modifyCustomer',params).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('修改成功！')
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
                    realName:'',
                    salesName:''
                };
                $('#start_date').val("");
                $('#end_date').val("");
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
                    if ($('#invoicesRetrun').parsley().isValid()) {
                        _self.examineHttp(params);
                    }
                }else if(status==1){
                    params={
                        id:id,
                        status:status,
                    };
                    _self.examineHttp(params);

                }
                else if(status==3){
                    params={
                        id:id,
                        status:status,
                        trackNo:_self.emailData.emailNum,
                        postal:_self.emailData.emailId,
                    };
                    if ($('#EmailModel').parsley().isValid()) {
                        _self.examineHttp(params);
                    }


                }


            },
            //驳回请求
            examineHttp:function (params) {
                let _self=this;
                _self.$http.post(apiUrl + 'reviewed',params).then((response) => {
                    if(response.data.errno==0){
                        common.dealPromptCommon('修改成功！',600)
                        $('#EmailForm').parsley().reset()
                        $('#invoicesRetrun').parsley().reset()

                        $('#reject').modal('hide');
                        $('#AddModal').modal('hide');
                        $('#EmailModel').modal('hide');
                        $('#table').bootstrapTable("refresh", this.queryParams)
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },
            addM: function(event) {
                let _self = this
                _self.workRow = {}
                $('#formA').parsley().reset()
                $('#AddModal').modal('show')
            },

            approvalReject:function () {
                let _self = this
                $('#reject').modal('show')
            },

            //邮寄窗口
            mailing:function () {
                let _self = this
                $('#EmailModel').modal('show')
            },
            getEmail:function () {
                let _self=this;
                _self.$http.post(apiUrl + 'getCourier',{}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.emailArry=response.data.info;
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },

            exportExl:function () {
                let _self=this;
                let params={};
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.phone=_self.searchData.phone;
                params.email=_self.searchData.email;
                params.postal=_self.searchData.taxpayerId;
                params.trackNo=_self.searchData.taxpayer_no;
                params.type=_self.searchData.type;

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                common.downFile(_self,apiUrl+'downloadInvoice',params);
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

</style>