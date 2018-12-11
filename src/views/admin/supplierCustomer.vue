$('#table').bootstrapTable("refreshOptions", {pageNumber: 1})<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 短信价格管理</a></li>
                <li class="active">供应商报价单</li>
            </ol>
        </section>

        <!-- Main content -->
        <section class="content body-session-margin"> <div class="row">
            <div class="col-md-12">
                <div class="box box-solid">
                    <div class="box-body" style="min-height: 120px">
                        <form class="form-horizontal">
                            <div class="quo-top-border">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label input-sm">供应商名称</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.venderName" type="text" class="form-control input-sm" id="inputID" oninput="if(value.length>30)value=value.slice(0,30)" >
                                    </div>
                                    <label class="col-sm-1 control-label  input-sm">确认标志</label>
                                    <div class="col-sm-2">
                                        <select class="form-control" v-model="searchData.status">
                                            <option value="">全部</option>
                                            <option value="0">未确认</option>
                                            <option value="1">已确认</option>
                                        </select>
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
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-primary search-btn-margin" v-on:click="searchCustomer">  查    询  </button>
                                        <button type="button" class="btn btn-default resert-margin"  v-on:click="revertData">  重    置  </button>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <div>
                            <button type="button" class="btn btn-primary  import-btn" v-on:click="showModel">  导入报价单  </button>
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

        <div class="modal fade" id="importModal">
            <div class="modal-dialog" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">导入报价单</h4>
                    </div>
                    <form id="importForm">
                        <div class="modal-body" style="min-height: 350px">
                            <div class="form-group col-md-12">
                                <label >供应商名称：</label>
                                <input class="form-control col-md-8" v-model="offer.name" id="CustomerName"  maxlength="50" data-parsley-maxlength="50" v-on:keyup="getCustomerName">
                            </div>
                            <div class="form-group col-md-12">
                                <label >选择文件：</label><span>（请选.csv文件）</span>
                                <div>
                                    <input type="file" id="file" class="form-control input-sm " accept=".csv"  multiple>
                                    <input type="text" id="select1" hidden>
                                    <button  class="btn btn-primary"> 浏   览 </button>
                                    <span class="margin-left-ten">{{filePath}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-on:click="importFile"> 提  交 </button>
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
    const apiUrl = '/api/admin/supplierCustomer?method='

    function statusFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '未确认'
        }else if(value===1){
            return '已确认'
        }

    }
    function commonFormatter(value, row) {
        if(value===null){
            return ' '
        }else if(value===0){
            return '否'
        }else if(value===1){
            return '是'
        }

    }
    function nameFormatter(value, row) {
        if (row.customer_id === 0) {
            return '公共'
        } else if (value === null) {
            return ' '
        }
    }
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
                    venderName:"",
                    status:"",
                    cTimeBegin:"",
                    cTimeEnd:"",
                },
                filePath:'',
                fileUrl:"",
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
                offer:{
                    name:'',
                },
                offerInputDisable:true
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this
            common.initStartDatepicker($('#start_date'),$('#end_date'));
            common.initEndDatepicker($('#end_date'),$('#start_date'));


            _self.getCustomerName();

            function queryParams(params) {
                params.cTimeBegin= $('#start_date').val();
                params.cTimeEnd= $('#end_date').val();
                params.status=_self.searchData.status;
                params.venderName=_self.searchData.venderName;
                params.type=1;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }


            function actFormatter(value, row) {
                if(row.status===0){
                    return [
                        '<span class="label label-success operation-margin btn-submit" >  提交  </span>'+
                        '<span class="label label-warning operation-margin btn-delete" >  删除  </span>'+
                        '<span class="label label-primary operation-margin btn-detail" >  详情  </span>'
                    ].join('')
                }else if(row.status===1){
                    return [
                        '<span class="label label-success operation-margin btn-submit"  style="cursor: not-allowed; opacity: 0.5;   ">  提交  </span>'+
                        '<span class="label label-warning operation-margin btn-delete">  删除  </span>'+
                        '<span class="label label-primary operation-margin btn-detail" >  详情  </span>'
                    ].join('')
                }

            }

            function initTable() {
                window.tableEvents = {
                    'click .btn-submit': function(e, value, row, index) {
                        if(row.status===0){
                            /*common.rowModifyWithT(_self, apiUrl + 'modifyCountry', row, 'materiel_id', $('#table'))*/
                            common.dealConfrimCommon('请确认是否提交？', function() {
                                _self.$http.post(apiUrl + 'confirmQuotation',{id:row.id}).then((response) => {
                                    if(response.data.errno==0){
                                        common.dealPromptCommon('提交成功！')
                                        $('#table').bootstrapTable("refresh", queryParams)

                                    }else{
                                        common.dealErrorCommon(_self, response)
                                    }
                                }, (response) => {
                                    common.dealErrorCommon(_self, response)
                                })
                            })

                        }
                    },
                    'click .btn-delete': function(e, value, row, index) {
                        common.rowDeleteWithApi(_self, '确认删除此报价？', apiUrl + 'deleteQuotation', $('#table'), row, 'id')
                    },
                    'click .btn-detail': function(e, value, row, index) {
                        _self.$router.push({path: '/admin/supplierDetailCustomer', query: {id: row.id}})
                    }

                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getQuotation',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res) {
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndex('序号'),
                        common.BTRowFormat('venderName', '供应商名称'),
                        common.BTRowFormat('count', '报价明细数量'),
                        common.BTRowFormat('salesName', '所属业务员'),
//                        common.BTRowFormatWithFormatter('c_time', '生成日期',timeFormatter),//0不公共 1公共
                        common.BTRowFormat('c_time', '生成日期'),
                        common.BTRowFormatWithFormatter('status', '确认标志',statusFormatter),//0未确认 1已确认
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
                _self.$http.post(apiUrl+'upload', formData).then((response) => {
                    if(response.data.errno==0){
                        _self.fileUrl=response.data.info.uploadurl.url;
                        $('#file').val('');
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
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
                    venderName: "",
                    status: "",
                    cTimeBegin: "",
                    cTimeEnd: "",
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
                                if(data.info.length==0){

                                }
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

            getCustomerName2:function () {
             let _self=this;
             common.fuzzySearch(_self,'CustomerName',apiUrl + 'getVendor',_self.offer.name);
            },

            importFile: function () {
                let _self=this;
                if(_self.fileUrl==''){
                    common.dealPromptCommon('请选择文件！')
                    return
                }
                let params="";
                if($( "#select1" ).val()=="" || $( "#select1" ).val()==null){
                    common.dealPromptCommon('请选择一个供应商名称！')
                    return
                }
                params={
                    isCommon:0,
                    saveType:0,
                    customerId:$( "#select1" ).val(),
                    uploadurl:_self.fileUrl,
                    type:1
                }
                params=JSON.stringify(params);

                _self.$http.post(apiUrl+'addQuotation', params).then((response) => {
                    if (response.data.errno == 0) {
                        common.dealPromptCommon('提交成功！',600)
                        // 置空
                        $('#table').bootstrapTable("refresh", this.queryParams)
                        _self.revertOffer();
                        window.setTimeout(function(){
                            $('#importModal').modal('hide')
                        },1200)
                    } else {
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })

            },
            revertOffer:function () {
                let _self=this;
                _self.offer={
                    type:1,
                    name:'',

                };
                _self.fileUrl='';
                _self.offerInputDisable=true;
                _self.filePath='';

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
        margin-top: 10px;
        float: right;
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


</style>