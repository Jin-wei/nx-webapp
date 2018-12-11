<template>
    <div>
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 短信价格管理</a></li>
                <li class="active">编辑客户报价单</li>
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
                                    <label class="col-sm-1 control-label input-sm ">运营商名称</label>
                                    <div class="col-sm-2">
                                        <input v-model="searchData.operatorName" type="text"  class="form-control input-sm browse">
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-primary " v-on:click="searchCustomer">     查  询     </button>
                                        <button type="button" class="btn btn-default model-margin" @click="revertData" >     重  置     </button>
                                        <button type="button" class="btn btn-primary " style="margin-left: 15px" @click="downTable">     导出报价单     </button>
                                        <button type="button" class="btn btn-default model-margin"  v-on:click="returnPage">     返  回     </button>
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
                                <table id="table" class="table table-bordered table-hover dataTable" >
                                </table>
                            </div>
                            <div style="text-align: center">
                                <button type="button" class="btn btn-primary" v-on:click="saveAndImport">     保存并导出报价单     </button>
                                <button type="button" class="btn btn-success add-margin" v-on:click="AddImport">     新增报价     </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <!-- /.content -->

        <div class="modal fade" id="AddModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">增加报价</h4>
                    </div>
                    <form  id="addPriceForm"  @submit.prevent="addPrice()">
                        <div class="modal-body" style="min-height: 430px">
                            <!--<div class="form-group col-md-12">
                                <label >国码code</label>
                                <input v-model="detailData.code" class="form-control col-md-8" data-parsley-required="true">
                            </div>-->
                            <div class="form-group col-md-12">
                                <label>国家名称</label>
                                <!--<input v-model="detailData.ChName" class="form-control" data-parsley-required="true">-->
                                <!--<select id="country" v-model="detailData.countryId" class="form-control" data-parsley-required="true" @change="getSelectVendor()">
                                    <option value="">全部</option>
                                    <option v-for="country in countryArr" :value="country.id">{{country.name}}</option>
                                </select>-->
                                <select class="form-control customer-select" multiple id="counytryName" data-parsley-required="true" ></select>
                            </div>

                            <div class="form-group  col-md-12">
                                <label>运营商名称</label>
                                <!--<input v-model="detailData.operatorName" class="form-control" data-parsley-required="true">-->
                                <select id="vendor" v-model="detailData.operatorId" class="form-control" data-parsley-required="true">
                                    <option value=""></option>
                                    <option value="allOperator">全部</option>
                                    <option v-for="vendor in vendorArr" :value="vendor.id">{{vendor.name}}</option>
                                </select>
                            </div>
                            <div class="form-group  col-md-12">
                                <label>价格</label>
                                <input v-model="detailData.price" class="form-control" type="number" data-parsley-required="true" step="0.0001">
                            </div>
                            <div class="form-group  col-md-12">
                                <label>生效日期</label>
                                <input   id="effectiveDate" class="form-control"  data-parsley-required="true">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" > 提  交 </button>
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
    const apiUrl = '/api/admin/quotationEditSheet?method='

    function timeFormatter(value) {
        if (!value) return ''
        let date =value;
        date =date.split('T');
        return date[0]
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
                oldRow: {},
                detailData:{
                    code: '',
                    ChName: '',
                    operatorName: '',
                    price: '',
                    effectiveDate:'',
                    operatorId:"",
                    countryId:"",
                },
                editeParams:[],
                vendorArr:new Array,
                countryArr:'',
            }
        },
        name: 'allCustomer',
        mounted: function() {
            let _self = this;
            common.initDatepicker($('#effectiveDate'));

            function queryParams(params) {
                params.code =_self.searchData.code;
                params.operatorName =_self.searchData.operatorName;
                params.quotationId=_self.id;
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
            function dateFormate(value, row, index) {
                let dateString =value.split('T')[0];
                let  dt = new Date(dateString)
                let rl=common.DateFormat(dt,"yyyy-MM-dd");
                return rl;
            }


            function initTable() {
                window.tableEvents = {
                    'click .tableDelete': function(e, value, row, index) {
                        common.rowDeleteWithApi(_self, '确认删除此国家？', apiUrl + 'deleteCountry', $('#table'), row, 'materiel_id')
                    }
                };

                $('#table').bootstrapTable({
                    method: 'POST',
                    url: apiUrl + 'getQuottionDetail',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res){
                        if(res.info.rows.length>0){
                            for(var i=0;i<res.info.rows.length;i++){
                                res.info.rows[i].effectiveDate=dateFormate(res.info.rows[i].effectiveDate);
                            }

                        }
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndex('序号'),
                        common.BTRowFormat('code', '国码code'),
                        common.BTRowFormat('ChName', '国家名称'),
                        common.BTRowFormat('operatorName', '运营商名称'),
                        {
                            field: 'price',
                            title: '价格',
                            class: 'text-nowrap',
                            align: 'center',
                            valign: 'middle',
                            editable: {
                                type: 'text',
                                validate: function(value) {
                                    value = $.trim(value)
                                    if (!value) {
                                        return '请输入金额'
                                    }
                                    if (!/^\d+\.\d{2}$|^\d+\.\d{1}$|^\d+\.\d{3}$|^\d+\.\d{4}$|^\d+$/.test(value)) {
                                        return '请输入正确的金额格式如: 0.0000'
                                    }

                                    return ''
                                }
                            }
                        },
                        {
                            field: 'effectiveDate',
                            title: '生效日期',
                            class: 'text-nowrap',
                            align: 'center',
                            valign: 'middle',
                            editable: {
                                type: 'date',
                                emptytext: '无',
                                placement:'left',
                            }
                        }
                    ],
                    idField: 'id',
                    uniqueId: 'id',
                    clickToSelect: true,
                    showRefresh: false,
                    pagination: false,
                    /*pageSize: 10,
                    pageList: [10, 15, 25, 50, 100],*/
                    locale: 'zh-CN',
                    undefinedText:'',
                    onEditableShown: function(field, row, $el, editable) {
                        _self.oldRow = $.extend(true, {}, row)
                    },
                    onEditableSave: function(field, row, oldValue, $el) {
                        /*for(var i=0;i<_self.editeParams.length;i++){
                            if(_self.editeParams[i].operatorName==row.operatorName){
                                _self.editeParams[i]=row
                                return
                            }
                        }*/
                        _self.editeParams.push(row)

                    },
                    onLoadError:function (status,row) {
                        common.dealTableError(_self,status,row);
                    }

                })
                common.changeTableClass($('#table'))
            }

            $(function() {
                initTable()
                $(window).resize(function () {
                    $('#table').bootstrapTable('resetView');
                });
                _self.getSelectContry();
            })
            $('#counytryName').on('select2:select', function(evt) {
                let contryId = $('#counytryName').val();
                _self.detailData.countryId=contryId[0];
                _self.getSelectVendor();
            });

        },
        methods: {
            revertData:function () {
                let _self=this;
                _self.searchData={//查询条件
                    code:'',
                    operatorName:'',
                }
            },
            returnPage:function () {
                this.$router.push({path:'/admin/quotationSheet'});
            },
            searchCustomer: function(event) {
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})
            },
            saveAndImport:function () {
                let _self=this;
                let params={
                    id:_self.id,
                    saveType:1,
                    quotationArr: _self.editeParams
                };
                params=JSON.stringify(params);
                _self.$http.post(apiUrl+'addQuotation', params).then((response) => {
                    if(response.data.errno==0){
                        $('#table').bootstrapTable("refresh", this.queryParams)
                        common.dealPromptCommon('保存成功!');
                        _self.editeParams=[];
                        window.setTimeout(function () {
                            let downUrl=response.data.info;
                            window.location.href =  window.location.protocol + '//' + window.location.host+downUrl;
                            _self.returnPage();
                        },2000)
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },
            downTable:function () {
                let _self=this;
                common.downFile(_self,apiUrl+'download',{quotationId:_self.id});
            },
            AddImport:function () {
                let _self=this;
                $('#counytryName').val('').trigger('change');
                $('#AddModal').modal('show');
                $('#addPriceForm').parsley().reset();
                _self.revertDetail();
            },
            addPrice:function () {
                let _self=this;
                if ($('#addPriceForm').parsley().isValid()) {
                    let contryId=$('#counytryName').val();
                    let priceObj={
                        code:contryId[0],
                        operatorName:'',
                        price:_self.detailData.price,
                        ChName:$('#counytryName').find("option:selected").text(),
                        operatorId:_self.detailData.operatorId,
                        effectiveDate:$('#effectiveDate').val()
                    }
                    let operatorName=$("#vendor").find("option:selected").val();
                    /*for(var i=0;i<_self.editeParams.length;i++){
                     if(_self.editeParams[i].operatorName==_self.detailData.operatorName){
                     common.dealPromptCommon('该运营商已存在！');
                     return
                     }
                     }*/
                    if(operatorName!="allOperator"){
                        priceObj.operatorName=$("#vendor").find("option:selected").text();
                        let insObj = JSON.parse(JSON.stringify(priceObj))
                        $('#table').bootstrapTable('append', insObj)
                        _self.editeParams.push(insObj);
                    }else{
                        let i = 0
                        for(let key in _self.vendorArr){
                            priceObj.id = 'ins' + i.toString()
                            priceObj.operatorName = _self.vendorArr[key].name;
                            priceObj.operatorId = _self.vendorArr[key].id;
                            let insObj = JSON.parse(JSON.stringify(priceObj))
                            $('#table').bootstrapTable('append',insObj)
                            i++
                            _self.editeParams.push(insObj);
                        }
                    }

                    $('#AddModal').modal('hide');
                }
            },
            revertDetail:function () {
                let _self=this;
                _self.detailData={
                    code: '',
                    ChName: '',
                    operatorName: '',
                    price: '',
                    effectiveDate:''
                };
                $('#effectiveDate').val("");
            },
            getSelectContry:function () {
                let _self=this;
                _self.$http.post(apiUrl + 'getCountry',{}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.countryArr =response.data.info;
                            common.initSelect2($('#counytryName'),_self.countryArr);
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })

            },
            getSelectVendor:function () {
                let _self=this;
                if(_self.detailData.countryId!=""){
                    let vendorParams={
                        countryId:_self.detailData.countryId,
                    }
                    vendorParams=JSON.stringify(vendorParams);
                    async function getVendor() {
                        try {
                            let response = await _self.$http.post(apiUrl+'getOperatorByCountry', vendorParams);
                            _self.vendorArr = $.extend(true, {}, response.data.info);
                        } catch (error) {
                            common.dealErrorCommon(_self, response)
                        }
                    }
                    getVendor();
                }else{
                    _self.vendorArr=[];
                }

            },

        },


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
    .add-margin{
        margin-left: 10px;
    }
</style>