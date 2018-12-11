<template>
    <div class="info-relative" v-cloak>
        <div class="que-position">
            <div class="rl-title">
                {{$t('queueList.title')}}
            </div>
            <div class="que-search">
                <div class="rl-div1 pull-left">
                    <span class="rl-span">{{$t('queueList.span1')}}</span>
                    <input v-model="searchData.phone" class="rech-input" id="appName" type="text">
                    <span class="rl-span">{{$t('queueList.span2')}}</span>
                    <input v-model="searchData.content" class="rech-input"  type="text" >
                    <span class="rl-span">{{$t('queueList.span3')}}</span>
                    <input v-model="searchData.batchName" class="rech-input"  type="text" :placeholder="$t('queueList.span3P')">
                </div>
                <div class="rl-div2 pull-left">
                    <span class="rl-span">{{$t('queueList.span5')}}</span>
                    <select class="form-control rl-select" v-model="searchData.status">
                        <option value="">{{$t('queueList.all')}}</option>
                        <option value="0">{{$t('queueList.status0')}}</option>
                        <option value="1">{{$t('queueList.status1')}}</option>
                        <option value="2">{{$t('queueList.status2')}}</option>
                       <!-- <option value="3">{{$t('queueList.status3')}}</option>
                        <option value="4">{{$t('queueList.status4')}}</option>-->
                    </select>
                    <span class="rl-span">{{$t('queueList.span4')}}</span>
                    <select class="form-control rl-select" v-model="searchData.isTiming">
                        <option value="">{{$t('queueList.all')}}</option>
                        <option value="0">{{$t('queueList.timing0')}}</option>
                        <option value="1">{{$t('queueList.timing1')}}</option>
                    </select>
                </div>
                <div class="clear"></div>
                <div>
                    <button class="btn blue-btn que-btn" v-on:click="getSinList(1)">{{$t('queueList.btn1')}}</button>
                </div>

            </div>
            <div class="gray-table">
                <div class="box-body">
                    <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                        <table id="table" class="table table-bordered table-hover dataTable" >
                        </table>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')

    export default {
        data: function () {
            return {
                sinDetailHidden:true,
                searchData:{
                    isTiming:'',
                    batchName:'',
                    status:"",
                    content:'',
                    phone:'',
                },
                rechargeArry:{},
                reDetailArry:{
                    status:"0",
                    pay_chanel:"0",
                },
                phone:common.getStoreData('userinfo').name,
                urlApi:'/api/console/ConsoleReportSRV?method=',
                language:common.getStoreData('language'),

            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            _self.$parent.setActive(2,'queue_list');
            common.initStartDatepicker($('#start'),$('#end'));
            common.initEndDatepicker($('#end'),$('#start'));
            $('#start').datepicker('setDate','-7d');
            $('#end').datepicker('setDate',new Date());

            function queryParams(params) {
                params.isTiming=_self.searchData.isTiming;
                params.batchName=_self.searchData.batchName;
                params.status=_self.searchData.status;
                params.content=_self.searchData.content;
                params.phone=_self.searchData.phone;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                return JSON.stringify(params)
            }

            function timeFormate(value, row, index) {
                if (!value) return ''
                let date =value.split('T');
                let time=date[1].slice(0,8);
                return date[0]+' '+time
            }

            function typeFormate(value, row, index) {
                if(!isNaN(value) && value!==null && value!==''){
                    return _self.$t('queueList.timing'+value);
                }else{
                    return ""
                }
            }

            function statusFormate(value, row, index) {
                if(!isNaN(value) && value!==null && value!==''){
                    return _self.$t('queueList.status'+value);
                }else{
                    return ""
                }
            }

            function initTable() {
                $('#table').bootstrapTable({
                    method: 'POST',
                    url: _self.urlApi+'getBatch',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res){
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndex(_self.$t('queueList.table.th1')),
                        common.BTRowFormat('appname', _self.$t('queueList.table.th2')),
                        common.BTRowFormat('batch_name', _self.$t('queueList.table.th3')),
                        common.BTRowFormatWithFormatter('content', _self.$t('queueList.table.th4'),common.remarkFormatter),
                        common.BTRowFormatWithFormatter('is_timing', _self.$t('queueList.table.th5'),typeFormate),
                        common.BTRowFormat('phone', _self.$t('queueList.table.th6')),
                        common.BTRowFormat('result', _self.$t('queueList.table.th7')),
                        common.BTRowFormat('signavalue', _self.$t('queueList.table.th8')),
                        common.BTRowFormatWithFormatter('status', _self.$t('queueList.table.th9'),statusFormate),
                        common.BTRowFormat('tempName', _self.$t('queueList.table.th10')),
                        common.BTRowFormat('temptype', _self.$t('queueList.table.th11')),
                        common.BTRowFormatWithFormatter('timing', _self.$t('queueList.table.th12'),common.formateTimeDate),
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

                    },
                    onLoadError:function (status,row) {
                        common.dealConsoleTableError(_self,status,row);
                    },
                    onPostBody: function (name, args) {
                        $('[data-toggle="popover"]').each(function () {
                            $(this).popover()
                        })
                    }

                })
                common.changeTableClass($('#table'))
            }

            $(function() {
                initTable()
            });
            /*_self.getAppName();*/

        },
        methods: {
            linkTo:function (id) {
                let _self=this;
                _self.$router.push({path:'/console/recharge_step3/:null/:null/:'+id});
                /*    this.$router.push({path: '/console/recharge_step3/:'+_self.money+"/:"+_self.type+"/:null"});*/
            },
            getSinList:function (type) {
                let _self=this;
                if (type == 0) {

                } else if (type == 1) {
                    if (common.getStoreData('status').status != 1) {
                        common.WarningBox(_self, 'SIN_04');
                        return;
                    }
                }
                $('#table').bootstrapTable("refreshOptions", {pageNumber: 1})

            },
            getAppName:function () {
                let _self=this;
                let params={
                    customerId:common.getStoreData('userinfo').customer_id,
                    appName:_self.searchData.appName,
                }
                common.fuzzySearch(_self,'appName',_self.urlApi + 'getApplication',params);

            },


        },
        filters: {
            timeFormat:function (value) {
                if (!value) return ''
                let date =value.split('T');
                let time=date[1].slice(0,8);
                return date[0]+' '+time
            },

            priceFormat:function (value,type) {
                if(!isNaN(value)){
                    let price=common.priceFormat(value);
                    return price
                }else{
                    return ""
                }

            },
            startDate:function (dateStr){
                let newTime = new Date();
                let Year = newTime.getFullYear();
                let Month = newTime.getMonth()+1;
                let myDate = newTime.getDate()-7;
                if(myDate<10){
                    myDate="0"+myDate;
                }
                if(Month<10){
                    Month="0"+Month;
                }
                var time = Year+"-"+Month+"-"+myDate;
                return time;
            },
            statusFormat:function (value,type) {
                if(!isNaN(value)){
                    return type;
                }else{
                    return ""
                }

            },

        }
    }
</script>

<style>
    .bk-img{
        position: absolute;
        width: 1120px;
        height:561px;
        top:79px;
        left:219px;

    }
    .rl-title{
        font-size: 18px;
        line-height: 18px;
        padding:0 0 21px 20px;
        border-bottom:1px solid #dddddd;
        margin-bottom: 20px;
        font-weight: 400;
    }
    .que-position{
        position: relative;
        width: 1028px;
        min-height: 620px;
        padding:50px 0 0 40px;
        font-weight: 500;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }


    .lookBtn{
        font-size: 14px;
        color: #41b0e3;
        cursor: pointer;
    }
    .changeBtn{
        font-size: 14px;
        color: #41b0e3;
        margin-left: 13px;
        cursor: pointer;
    }
    .gray-body-table .lookBtn:hover,.gray-body-table .changeBtn:hover{
        color: #41b0e3;
        border-bottom: 1px solid #41b0e3;
    }
    .deleteBtn{
        font-size: 14px;
        color: #e34242;
        margin-left: 13px;
        cursor: pointer;
    }
    .gray-body-table .deleteBtn:hover{
        color: #e34242;
        border-bottom: 1px solid #e34242;
    }
    .signature-title{
        height: 39px;
    }
    .rl-alert-detail{
        width: 680px;
        height:365px;
        top:231px;
        left:446px;
    }
    .rl-alert-text{
        width: 623px;
        height:269px;
        padding: 10px 0 0 0;
    }
    .alert-text-padding{
        padding-left: 19px;
    }
    .applic-green-icon{
        width: 12px;
        height: 12px;
        margin:0 1px 0 2px;
    }
    .que-search{
        width: 100%;
        height: 120px;
    }
    .rl-select {
        border: solid 1px #808080;
        height: 20px;
        display: inline-block;
        width: 140px;
        color:#333333;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("/static/images/img/consloe/administration/blue-drop.png") no-repeat scroll right center transparent;
        line-height: 14px;
        padding: 0 14px 0 13px ;
    }
    .rl-select::-ms-expand { display: none; }
    .rl-span,.rl-span2{
        display: inline-block;
        min-width: 119px;
        padding:0 0 0 21px;
        line-height: 13px;
    }
    .rl-span2{
        padding:0 0 0 46px;
        min-width: 116px;
    }
    .rl-div1{
        padding:2px 0 0 0;
        height: 40px;
    }
    .rl-div2 input{
        border: solid 1px #808080;
        height: 20px;
        display: inline-block;
        width: 140px;
        color:#333333;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("/static/images/img/consloe/administration/blue-drop.png") no-repeat scroll right center transparent;
        line-height: 14px;
        padding: 0 14px 0 13px ;
    }
    .rl-middle-line{
        display: inline-block;
        width: 39px;
        height: 6px;
        color: #333333;
        border-top:1px solid #333333;
        margin:0 2px;

    }
    .que-search .que-btn{
        margin: 19px 0 0 20px;
    }
    .gray-body-table .rl-blue-underline{
        color:#00afe9 ;
        text-decoration: underline;
        cursor: pointer;
    }
    .alert-narrow-title2{
        background:#545d64;
        color: #f7f7f7;
        font-size: 16px;
        height: 40px;
        width: 100%;
        line-height: 39px;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        font-weight:500;
        padding:0 31px;

    }
    .rech-input {
        width: 138px;
        height: 20px;
        background: #ffffff;
        border: 1px solid #808080;
        padding-left: 5px;
        margin-right: 7px;

    }
    .samll-rech-btn{
        min-width: 80px;
        height: 20px;
        font-weight: 600;
        font-size: 13px;
        line-height: 8px;
    }
    .table-body{
        max-height: 420px !important;
    }
    .queque-table-div{
        width: 990px;
        min-height: 600px!important;
        overflow: auto;
    }
    .que-long-table,.que-long-table table{
        width: 1460px!important;
    }
    .que-height{
        min-height: 545px!important;
        margin-top:40px;
        padding-top: 0!important;
    }

</style>
