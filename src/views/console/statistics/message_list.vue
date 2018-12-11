<template>
    <div class="info-relative" v-cloak>
        <div class="ml-position">
            <div class="rl-title">
                {{$t('messageList.title')}}
            </div>
            <div class="rl-search">
                <div class="rl-div1 ">
                    <span class="message-span">{{$t('messageList.span1')}}</span>
                    <input id="appNameId" type="text" hidden>
                    <input  class="rech-input" id="appName"  type="text" v-on:keyup="getAppName">
                    <span class="message-span3">{{$t('messageList.span2')}}</span>
                    <input id="phoneId" type="text" hidden>
                    <input class="rech-input" id="phone" type="text" v-on:keyup="getPhone">
                    <span class="message-span">{{$t('messageList.span4')}}</span>
                    <input id="placeId" type="text" hidden>
                    <input class="rech-input" id="place" type="text" v-on:keyup="getPlace">
                    <span class="message-span3">{{$t('messageList.table.th5')}}</span>
                    <input class="rech-input" id="content" type="text" v-on:keyup="getPlace">
                </div>
                <div class="rl-div2">
                    <span class="message-span">{{$t('messageList.span3')}}</span>
                    <input class="sin-input" type="text" id="start"  name="start">
                    <span class="rl-middle-line"></span>
                    <input class="sin-input" type="text" id="end"  name="end">
                    <span class="message-span2">{{$t('messageList.span5')}}</span>
                    <select class="form-control rl-select" v-model="searchData.type">
                        <option value="">{{$t('messageList.type_option')}}</option>
                        <option value="0">{{$t('messageList.type0')}}</option>
                        <option value="1">{{$t('messageList.type1')}}</option>
                    </select>
                    <span class="message-span2">{{$t('messageList.span6')}}</span>
                    <select class="form-control rl-select" v-model="searchData.status">
                        <option value="">{{$t('messageList.type_option')}}</option>
                        <option value="0">{{$t('messageList.status0')}}</option>
                        <option value="1">{{$t('messageList.status1')}}</option>
                    </select>
                </div>
                <div class="clear"></div>
                <button class="btn blue-btn rl-btn" v-on:click="getSinList(1)">{{$t('messageList.btn1')}}</button>
            </div>
            <div class="gray-table">
                <div class="box-body">
                    <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                        <table id="table" class="table table-bordered table-hover dataTable" >
                        </table>
                    </div>
                </div>
            </div>
            <!--<div class="table-div message-table-div" >
                <div class="table-header-fix long-table" >
                    <table class="gray-header-table " cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th style="width: 75px;padding-left:10px">{{$t('messageList.table.th1')}}</th>
                            <th style="width: 100px">{{$t('messageList.table.th2')}}</th>
                            <th style="width: 140px">{{$t('messageList.table.th3')}}</th>
                            <th style="width: 140px">{{$t('messageList.table.th4')}}</th>
                            <th style="width: 140px">{{$t('messageList.table.th5')}}</th>
                            <th style="width: 140px">{{$t('messageList.table.th6')}}</th>
                            <th style="width: 140px">{{$t('messageList.table.th7')}}</th>
                            <th style="width: 120px">{{$t('messageList.table.th8')}}</th>
                            <th style="width: 90px">{{$t('messageList.table.th9')}}</th>
                            <th style="width: 90px">{{$t('messageList.table.th10')}}</th>
                            <th style="width: 90px">{{$t('messageList.table.th11')}}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class=" long-table"   :class="{'table-body':language=='zh_cn','table-en-body':language=='en'}">
                    <table  class="gray-body-table"  cellpadding="0" cellspacing="0" >
                        <tbody>
                        <tr v-for="data in rechargeArry">
                            <td style="width: 75px;padding-left:10px">{{data.index}}</td>
                            <td style="width: 100px">{{data.appName}}</td>
                            <td style="width: 140px">{{data.phone}}</td>
                            <td style="width: 140px">{{data.chinese}}</td>
                            <td style="width: 140px" :id="data.id" v-html="data.message" @click="showContent"></td>
                            <td style="width: 140px">{{data.created_time | dateFormat}}</td>
                            <td style="width: 140px">{{data.target_time | dateFormat}}</td>
                            <td style="width: 120px">{{data.customer_price | priceFormat}}</td>
                            <td style="width: 90px">{{data.sms_type | invStatus($t('messageList.type'+data.sms_type))}}</td>
                            <td style="width: 90px">{{data.kh_result}}</td>
                            <td style="width: 90px">{{data.dr_result}}</td>

                           &lt;!&ndash;td style="min-width: 65px">{{data.kh_result}}</td>&ndash;&gt;
                        </tr>


                        </tbody>
                    </table>
                </div>
            </div>

        </div>-->
        </div>

    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    var sumArry='';

    function moneyFormat() {
        if(!isNaN(sumArry.totalMoney)){
            return sumArry.totalMoney
        }else{
            return ""
        }
        return 0
    }

    function numFormat() {
        if(!isNaN(sumArry.totalSize)){
            return sumArry.totalSize
        }else{
            return ""
        }
        return 0
    }

    export default {
        data: function () {
            return {
                sinDetailHidden:true,
                searchData:{
                    status:'',
                    type:'',
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
            _self.$parent.setActive(2,'message_list');
            common.initStartDatepicker($('#start'),$('#end'));
            common.initEndDatepicker($('#end'),$('#start'));
            $('#start').datepicker('setDate',new Date());
            $('#end').datepicker('setDate',new Date());
            _self.getAppName();

            function queryParams(params) {
                params.appName = $("#appName").val();
                params.cTimeBegin = $('#start').val();
                params.cTimeEnd = $('#end').val();
                params.phone = $("#phone").val();
                params.chinese = $("#place").val();
                params.smsType = _self.searchData.type;
                params.message =$('#content').val();
                if(_self.searchData.status==='0'){
                    params.status='0,1,2,4'
                }else if(_self.searchData.status==='1'){
                    params.status='3'
                }
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
                if(!isNaN(value) && value!==null){
                    return _self.$t('messageList.type'+value);
                }else{
                    return ""
                }
            }

            function initTable() {
                $('#table').bootstrapTable({
                    method: 'POST',
                    url: _self.urlApi+'getMessageConsole',
                    queryParams:queryParams,
                    sidePagination:'server',
                    ajaxOptions: common.bootstrapTableAjaxConfig,
                    responseHandler: function(res){
                        sumArry=res.info.sumDate;
                        return res.info;
                    },
                    height: common.getTableHeight(),
                    columns: [
                        common.BTRowFormatWithIndexFooter(_self.$t('messageList.table.th1')),
                        common.BTRowFormat('appName', _self.$t('messageList.table.th2')),
                        common.BTRowFormat('phone', _self.$t('messageList.table.th3')),
                        common.BTRowFormat('chinese', _self.$t('messageList.table.th4')),
                        common.BTRowFormatWithFormatter('message', _self.$t('messageList.table.th5'),common.remarkFormatter),
//                        common.BTRowFormatWithFormatter('created_time', _self.$t('messageList.table.th7'),timeFormate),
                        common.BTRowFormat('created_time', _self.$t('messageList.table.th7')),
                        /*common.BTRowFormatWithFormatter('target_time', _self.$t('messageList.table.th7'),timeFormate),*/
                        common.BTRowFormat('customer_price', _self.$t('messageList.table.th8')),
                        common.BTRowFormatFooter('totalSize', _self.$t('messageList.table.th13'),numFormat),
                        common.BTRowFormatFooter('totalMoney', _self.$t('messageList.table.th14'),moneyFormat),
                        common.BTRowFormatWithFormatter('sms_type', _self.$t('messageList.table.th9'),typeFormate),
                        common.BTRowFormat('kh_result', _self.$t('messageList.table.th10')),
                        common.BTRowFormat('dr_result', _self.$t('messageList.table.th11')),
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
                    showLoading:"a d",
                    showFooter:true,
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
                    appName:$('#appName').val(),
                }
                common.fuzzySearch(_self,'appName',_self.urlApi + 'getApplication',params);

            },

            getPhone:function () {
                let _self=this;
                var arr = [];
                $("#phone").autocomplete({
                    minLength: 0,
                    source: arr,
                    scrollHeight:300,
                    source: function(request, response) {
                        $.ajax({
                            url: _self.urlApi + 'getCustomer',
                            type: 'POST',
                            dataType: "json",
                            data: {

                            },
                            beforeSend: function(request) {
                                request.setRequestHeader("authorization", common.getStoreData('token'));
                            },
                            success: function( data ) {
                                response(data.info );
                            },
                            error:function (data) {
                                common.dealConsolError(_self, data)
                            }
                        });
                    },
                    select: function( event, ui ) {
                        $( "#phoneId" ).val( ui.item.id );
                        _self.search.sale=ui.item.real_name;
                        return false;
                    }
                }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                    ul.css({
                        'z-index':'9999',
                        'position':'absolute'
                    });
                    return $( '<li>' )
                        .append( "<div class='col-md-12'><p style='float: left'>" + item.real_name +"</p></div>" )
                        .appendTo( ul );
                };
            },
            getPlace:function () {
                let _self=this;
                let params={
                    customerId:common.getStoreData('userinfo').customer_id,
                    getCountry:$('#place').val(),
                }
                common.fuzzySearch(_self,'place',_self.urlApi + 'getCountry',params);
            },

            contentForm: function (value) {
                if (value) {
                    let displayName = (value.length > 7) ? (value.substring(0, 7) + '...') : value
                    return [
                        '<a role="button" data-toggle="popover" data-trigger="hover" data-placement="left" data-html="true" data-content="' +
                        '<div class=&quot;box&quot;>' +
                        '<div class=&quot;box-body&quot;>' +
                        '<div class=&quot;form-group&quot;>' +
                        '<div class=&quot;&quot;><span>' + value + '</span></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>">' + displayName + '</a>'
                    ].join('')
                }
            },
            showContent:function () {
                $('[data-toggle="popover"]').each(function () {
                    $(this).popover()
                })
            }


        },
        filters: {
            priceFormat:function (value,type) {
                if(!isNaN(value)){
                    let price=common.priceFormat(value);
                    return price
                }else{
                    return ""
                }

            },
            timeFormat:function (value) {
                if (!value) return ''
                let date =value.split('T');
                let time=date[1].slice(0,8);
                return date[0]+' '+time
            },
            dateFormat:function (value) {
                if (!value) return ''
                let date =value.split('T');
                return date[0]
            },
            invStatus:function (value,type) {
                if(!isNaN(value) && value!=null){
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
    .ml-position{
        position: relative;
        width: 1028px;
        min-height: 600px;
        padding:50px 0 0 40px;
        font-weight: 500;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        margin-bottom: 20px;
    }
    .gray-body-table .lookBtn:hover,.gray-body-table .changeBtn:hover{
        color: #41b0e3;
        border-bottom: 1px solid #41b0e3;
    }

    .gray-body-table .deleteBtn:hover{
        color: #e34242;
        border-bottom: 1px solid #e34242;
    }

    .rl-search{
        width: 100%;
        height: 129px;
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
    .message-span,.message-span2,.message-span3{
        display: inline-block;
        min-width: 119px;
        padding:0 0 0 21px;
        line-height: 13px;
    }
    .message-span2{
        padding:0 0 0 46px;
        min-width: 100px;
    }
    .message-span3{
        min-width: 68px!important;
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
    .rl-search .rl-btn{
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
    .message-table-div{
        width: 990px;
        overflow: auto;
    }
    .long-table,.long-table table{
        width: 1280px!important;
    }


</style>
