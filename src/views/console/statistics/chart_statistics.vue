<template>
    <div class="info-relative" v-cloak>
      <div class="chart-position" >
            <div class="chart-dispaly" :class="{'show':status==0}">
                <div class="chart-title">
                    {{$t('yearStatic.title')}}
                </div>
                <div class="chart-search">
                    <div class="chart-div1">
                        <span class="">{{$t('yearStatic.span1')}}</span>
                        <input class="sin-input" type="text" id="year">
                        <span style="padding-left: 40px">{{$t('yearStatic.app')}}</span>
                        <input id="appNameId" type="text" style="display: none">
                        <input  class="app-input" id="appName" type="text" v-model="yearApp" v-on:keyup="getAppName1">
                    </div>
                    <button class="btn blue-btn chart-btn" v-on:click="getData(status)">{{$t('yearStatic.btn1')}}</button>
                </div>
                <div>

                </div>
            </div>
          <div class="chart-dispaly" :class="{'show':status==1}">
              <div class="chart-title">
                  {{$t('monthStatic.title')}}
              </div>
              <div class="chart-search">
                  <div class="chart-div1">
                      <span class="">{{$t('monthStatic.span1')}}</span>
                      <input class="sin-input" type="text" id="month">
                      <span style="padding-left: 40px">{{$t('yearStatic.app')}}</span>
                      <input id="appNameId2" type="text" style="display: none">
                      <input  class="app-input" id="appName2" type="text" v-model="monthApp" v-on:keyup="getAppName2">
                  </div>
                  <button class="btn blue-btn chart-btn" v-on:click="getData(status)">{{$t('monthStatic.btn1')}}</button>
              </div>
              <div>

              </div>
          </div>
          <!--<div class="chart-dispaly" :class="{'show':status==2}">
              <div class="chart-title">
                  {{$t('appStatic.title')}}
              </div>
              <div class="chart-search">
                  <div class="chart-div1">
                      <span class="">{{$t('appStatic.span1')}}</span>
                      <input class="sin-input" type="text" id="start3">
                      <span class="chart-span">{{$t('appStatic.span2')}}</span>
                      <select class="form-control chart-select">
                          <option>{{$t('appStatic.span2_option')}}</option>
                      </select>
                  </div>
                  <button class="btn blue-btn chart-btn">{{$t('appStatic.btn1')}}</button>
              </div>
              <div>

              </div>
          </div>-->
          <div id="data-chart" class="static-chart"></div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    export default {
        data: function () {
            return {
                id:'',
                sinDetailHidden:true,
                sinArry:{},
                sinDetailArry:{},
                status:this.$route.params.status.split(":")[1],//0年 2月 3应用
                urlApi:'/api/console/ConsoleReportSRV?method=',
                monthApp:"",
                yearApp:'',

                dataResult: new Array,
                timeArry: new Array,
                dataArry: new Array,
                seriesName: "",
                chartName: "",
                yTitle: "",
                unit: '',
                day:'',

            }
        },
        components: { },
        mounted: function () {
            let _self=this;
            $('#month').val(common.todyMonth);
            let newTime = new Date();
            let todayYear = newTime.getFullYear();
            $('#year').val(todayYear);
            $('#year').datepicker(common.yearPickerConfig);
            $('#month').datepicker(common.monthPickerConfig);
            _self.getStatus();
            _self.getAppName1();
            _self.getAppName2();


        },
        methods: {
            getData:function (status) {
                let _self=this;
                let url=''
                let appId='';
                let params={};
                if(status==0){
                    url='getYearReportConsole';
                    params={
                        year: $('#year').val(),
                        appName:$('#appName').val(),
                    }
                }else if(status==1){
                    url='getMonthReportConsole';
                    let getYear=$('#month').val().split('-')[0];
                    let getMonth=$('#month').val().split('-')[1];
                    params={
                        year:getYear,
                        month:getMonth,
                        appName:$('#appName2').val(),
                    }
                }

                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                _self.$http.post(_self.urlApi+url,params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.dataResult=response.data.info;
                            _self.formatData(_self.dataResult);
                        }

                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },
            formatData:function (data) {
                let _self=this;
                _self.dataArry=new Array;
                _self.timeArry=new Array;
                if(_self.status==0){
                    _self.yTitle=_self.$t('yearStatic.yTitle');
                    _self.unit=_self.$t('yearStatic.yTitle');
                    _self.seriesName=_self.$t('yearStatic.title');
                    _self.day=_self.$t('yearStatic.day');
                    for(var i=0; i<data.length;i++){
                        if(data[i].totalCustomerFee==null || data[i].totalCustomerFee==""){
                            data[i].totalCustomerFee=0;
                        }
                        _self.dataArry.push(data[i].totalCustomerFee);
                        _self.timeArry.push(data[i].day);
                    }
                    _self.getChart();

                }else if(_self.status==1){
                    _self.yTitle=_self.$t('monthStatic.yTitle');
                    _self.unit=_self.$t('monthStatic.yTitle');
                    _self.seriesName=_self.$t('monthStatic.title');
                    _self.day=_self.$t('monthStatic.day');
                    for(var i=0; i<data.length;i++){
                        if(data[i].money==null || data[i].money==""){
                            data[i].money=0;
                        }
                        _self.dataArry.push(data[i].money);
                        _self.timeArry.push(data[i].day);
                    }
                    _self.getChart();
                }



            },

            getStatus:function () {
                let _self=this;
                _self.status=this.$route.params.status.split(":")[1];
                if(_self.status==0){
                    _self.$parent.setActive(2,'chart_statistics/:0');
                }else if(_self.status==1){
                    _self.$parent.setActive(2,'chart_statistics/:1');
                }else if(_self.status==2){
                    _self.$parent.setActive(2,'chart_statistics/:2');
                    _self.id=common.getUrlParams('id');
                }
                _self.getData(_self.status);
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
            getAppName1:function () {
                let _self=this;
                let params={
                    customerId:common.getStoreData('userinfo').customer_id,
                    appName:_self.yearApp,
                }
                common.fuzzySearch(_self,'appName',_self.urlApi + 'getApplication',params);

            },
            getAppName2:function () {
                let _self=this;
                let params={
                    customerId:common.getStoreData('userinfo').customer_id,
                    appName:_self.monthApp,
                }
                common.fuzzySearch(_self,'appName2',_self.urlApi + 'getApplication',params);
            },
        },

        watch:{
            '$route':'getStatus'
        },

    }
</script>

<style>
    .bk-img{
        position: absolute;
        width: 1135px;
        height:640px;
        top:75px;
        left:219px;

    }
    .chart-title{
        font-size: 18px;
        line-height: 18px;
        padding:0 0 21px 20px;
        border-bottom:1px solid #dddddd;
        margin-bottom: 20px;
        font-weight: 400;
    }
    .chart-position{
        position: relative;
        width: 990px;
        height: 390px;
        top:50px;
        left:40px;
        /*padding:50px 0 0 40px;*/
        font-weight: 500;
    }

    .gray-body-table .lookBtn:hover,.gray-body-table .changeBtn:hover{
        color: #41b0e3;
        border-bottom: 1px solid #41b0e3;
    }
    .gray-body-table .deleteBtn:hover{
        color: #e34242;
        border-bottom: 1px solid #e34242;
    }

    .chart-search{
        width: 100%;
        height: 90px;
        padding:8px 0 0 20px;
    }
    .chart-select {
        border: solid 1px #808080;
        height: 20px;
        display: inline-block;
        width: 139px;
        color:#333333;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("/static/images/img/consloe/administration/blue-drop.png") no-repeat scroll right center transparent;
        line-height: 14px;
        padding: 0 14px 0 8px ;
    }
    .chart-select::-ms-expand { display: none; }
    .chart-span{
        display: inline-block;
        width: 97px;
        padding:0 0 0 27px;
        line-height: 13px;
    }
    .chart-div1{
        padding:2px 0 0 0;
        height: 40px;
    }
    .chart-div1 input,.chart-div1 .app-input{
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
    .chart-div1 .app-input{
        background: none;
    }

    .chart-search .chart-btn{
        margin: 4px 0 0 1px;
        height: 32px;
    }
    .gray-body-table .chart-blue-underline{
        color:#00afe9 ;
        text-decoration: underline;
        cursor: pointer;
    }
    .static-chart{
        margin-top: 40px;
        width:1000px;
        height: 340px;
    }
    .chart-dispaly{
        display: none;
        width: 100%;
    }

</style>