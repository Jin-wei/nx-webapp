<template>
    <div class="">
        <section class="content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> 财务报表管理</a></li>
                <li class="active">短信年账单统计</li>
            </ol>
        </section>

        <section class="content chart-session-margin" style="min-height: 650px">
            <div class="row" >
                <div class="col-md-12">
                    <div class="">
                        <div class="box-body country-padding" style="min-height: 65px;">
                            <form class="form-horizontal">
                                <div class="form-group " style="margin-left: -40px">
                                    <label class="col-sm-1 control-label input-sm ">年</label>
                                    <div class="col-sm-2">
                                        <input type="text"  id="year"    class="form-control input-sm browse">
                                    </div>
                                    <label class="col-sm-1 control-label input-sm ">客户</label>
                                    <div class="col-sm-2">
                                        <input id="customerId" hidden>
                                        <input type="text" v-model="search.customer" class="form-control" id="customer" oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getCustomer"/>
                                    </div>
                                    <label class="col-sm-1 control-label input-sm ">应用名称</label>
                                    <div class="col-sm-2">
                                        <input id="appNameId" hidden>
                                        <input type="text"  id="appName"   class="form-control input-sm browse"  oninput="if(value.length>30)value=value.slice(0,30)" v-on:keyup="getAppName">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-primary " v-model="getData" v-on:click="getData">     查  询     </button>
                                    </div>'
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-primary  " v-on:click="exportExl">  批量导出  </button>
                                    </div>
                                </div>
                            </form>
                           <!-- <div class="form-group col-md-3 import">
                                <label class="col-sm-3 control-label input-sm ">自然年</label>
                                <div class="col-sm-9">
                                    <input type="text"  id="year" class="form-control input-sm browse">
                                </div>
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-primary " v-on:click="">     查  询     </button>
                            </div>-->
                        </div>
                    </div>

                </div>
            </div>
            <div id="data-chart" class="admin-chart"></div>
        </section>
    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    var  urlApi='/api/admin/chart_year?method=';
    export default {
        data: function () {
            return {
               /* urlApi:'/api/console/HomeSRV?method=',*/

                //chart
                dataResult: new Array,
                timeArry: new Array,
                dataArry: new Array,
                seriesName: "",
                chartName: "",
                yTitle: "",
                unit: '',
                day:'',
                statusData:'',
                search:{
                    customer:"",
                    year:'',
                    appName:'',
                },

            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            let newTime = new Date();
            let todayYear = newTime.getFullYear();
            $('#year').val(todayYear);
            $('#year').datepicker(common.yearPickerConfig);
            _self.getData();
        },
        methods: {
            getData:function () {
                let _self=this;
                let params={
                    year:$('#year').val(),
                    realName:$('#customer').val(),
                    appName:$('#appName').val(),
                }
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                _self.$http.post(urlApi+'getYearReportAdmin',params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.dataResult=response.data.info;
                            _self.formatData(_self.dataResult);
                        }else{
                            _self.dataResult="";
                        }

                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                },(response)=>{
                    common.dealErrorCommon(_self, response)
                })
            },
            formatData:function (data) {
                let _self=this;
                _self.dataArry=new Array;
                _self.timeArry=new Array;

                _self.yTitle='年账单统计';
                _self.unit='元';
                _self.seriesName='年账单统计';
                _self.day='月';
                for(var i=0; i<data.length;i++){
                    if(data[i].totalCustomerFee==null || data[i].totalCustomerFee==""){
                        data[i].totalCustomerFee=0;
                    }
                    _self.dataArry.push(data[i].totalCustomerFee);
                    _self.timeArry.push(data[i].day);
                }
                _self.getChart();
            },

            getChart: function () {
                $('#data-chart').highcharts({
                    title: {
                        text: this.chartName,
                        x: -20 //center
                    },
                    exporting: false,
                    credits: {
                        enabled: false // 禁用版权信息
                    },
                    xAxis: {
                        categories: this.timeArry,//x轴值
                        labels: {
                            //useHTML: true,
                            formatter: function () {
                                return '<a href="javascript:void()">' +
                                    this.value
                                '</a>';
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: this.yTitle
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {//数据提示框:tooltip.enabled = false不启用提示框。
                        valueSuffix: this.unit,
                        headerFormat: '<small>{point.key}</small>'+this.day+'<br>',
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0,
                    },
                    series: [
                        {
                            name: this.seriesName,
                            data: this.dataArry//y轴值
                        }
                    ]
                });
            },
            getAppName:function () {
                //业务员模糊查询
                let _self=this;
                let params={
                    appName:$('#appName').val(),
                };
                common.fuzzySearch(_self,'appName',urlApi + 'getApplication',params);
            },

            getCustomer:function () {
                //客户模糊查询
                let _self=this;
                let params={
                    realName:$('#customer').val(),
                };
                common.fuzzySearch(_self,'customer',urlApi + 'getCustomer',params);
            },
            exportExl:function () {
                let _self=this;
                let params={
                    year:$('#year').val(),
                    realName:$('#customer').val(),
                    appName:$('#appName').val(),
                }
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                common.downFile(_self,urlApi+'downloadYearReportAdmin',params);
            },
        },



    }
</script>
<style>

    .admin-chart{
        width:1000px;
        height: 340px;
    }
    .chart-session-margin{
        min-height: 600px;
    }

</style>