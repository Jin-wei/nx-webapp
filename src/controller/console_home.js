/**
 * Created by Cici on 2017/6/6.
 */
import $ from 'jquery'
const common = require('commonFunc')
export default{
    data: function () {
        return {
            nowPath:this.$route.path,
            status:'',
            urlApi:'/api/console/AuthInformationSRV?method=getAuthInfo',
            price:'300.00',
            vouchers:'',
            total:'',
            message:'',
            account:'',
            rest:'',
            urlApi2:"/api/console/HomeSRV?method=",
            urlCommon:'/api/sundry?method=',
            getLeft:{
                balance:'0.00',
                account_sid:'',
            },
            rightData:{
                totleCustomerPrice:0,
                totleCustomerCount:0,
            },
            dataResult: new Array,
            timeArry: new Array,
            dataArry: new Array,
            seriesName: "",
            chartName: "",
            yTitle: "",
            unit: '',
            day:'',
            statusData:'',
            language:common.getStoreData('language'),
            remindPrice:'',

        }
    },
    components: { },
    mounted: function () {
        let _self=this;
        _self.$parent.setActive(0,"home");
        _self.getLeftData();
        _self.getRightData();
        _self.getChartData();
        _self.postStatus();

    },
    methods: {
        linkTo: function (url) {
            this.$router.push({ path: '/console/'+ url})
        },
        httpPost:function (url,params,type) {
            let _self=this;
            this.$http.post(url,params).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                         if(type==0){
                             _self.getLeft=response.data.info[0];
                             if(_self.getLeft.balance!=0 && _self.getLeft.balance!='' &&  _self.getLeft.balance!=null){
                                 _self.getLeft.balance=common.priceFormat(_self.getLeft.balance);
                             }
                         }else if(type==1){
                             _self.rightData=response.data.info[0];
                             if(_self.rightData.totleCustomerPrice!='' &&  _self.rightData.totleCustomerPrice!=null){
                                 _self.rightData.totleCustomerPrice=common.priceFormat(_self.rightData.totleCustomerPrice);
                             }
                         }else if(type==2){
                             _self.dataResult=response.data.info;
                             _self.formatData(_self.dataResult);
                         }
                    }
                    else{
                        if(type==0){
                            _self.getLeft={
                                balance:'0.00',
                                 account_sid:'',
                            };
                        }else if(type==1){
                            _self.getLeft={
                                balance:'0.00',
                                account_sid:'',
                            };
                        }else if(type==2){
                            _self.dataResult='';
                        }
                    }
                }else{
                    common.dealWebError(_self,response);
                }
            },(response)=>{
                common.dealWebError(_self,response);
            });
        },
        getStatus:function () {
            let _self=this;
            //result没有数据 未认证 0审核中 1审核成功 2驳回 customerType0个人 1企业
            _self.status= _self.statusData.status;
            _self.customerType=_self.statusData.customer_type;
            if(_self.status==1){
                if(_self.customerType==0){
                    _self.status=3;
                }else if(_self.customerType==1){
                    _self.status=4;
                }
            }
            if(_self.getLeft.balance==null || _self.getLeft.balance==""){
                _self.getLeft.balance=0;
            }
        },
        getLeftData:function () {
            let _self=this;
            _self.httpPost(_self.urlApi2+'getCustomerInfo',{},0);
        },
        getRightData:function () {
            let _self=this;
            _self.httpPost(_self.urlApi2+'getSmsPrice',{},1);
        },
        getChartData:function () {
            let _self=this;
            _self.httpPost(_self.urlApi2+'getMessageMonth',{},2);
        },
        postStatus:function (method) {
            let _self=this;
            this.$http.post(_self.urlCommon+'getCustomerAuthInfo',{customerId:common.getStoreData('userinfo').customer_id}).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        _self.statusData=response.data.info[0];
                        _self.getStatus();
                    }else{
                    }
                }else{
                    common.dealWebError(_self,response);
                }
            },(response)=>{
                common.dealWebError(_self,response);
            });
        },
        setNull:function (object) {
            for(var key in object){
                if(object[key]=='' || object[key]==null){
                    object[key]='0.00';
                }else{
                    object[key]=common.priceFormat(object[key]);
                }
            }
        },

        currentMonth:function () {
            let Year = new Date().getFullYear();
            let Month = new Date().getMonth()+1;
            if(Month<10){
                Month="0"+Month;
            }
            let time = Year+"-"+Month;
            return time;
        },
        formatData:function (data) {
            let _self=this;
            _self.yTitle=_self.$t('conHome.chart.yTitle');
            _self.unit=_self.$t('conHome.chart.yTitle');
            _self.seriesName=_self.$t('conHome.chart.title');
            _self.day=_self.$t('conHome.chart.day');
            for(var i=0; i<data.length;i++){
                //去掉本日数据
                if(data[i].money==null || data[i].money==""){
                    data[i].money=0;
                }
                _self.dataArry.push(data[i].money);
                _self.timeArry.push(data[i].day);
            }
            _self.getChart();
        },
        showModel:function () {
          let _self=this;
            $('#remindForm').parsley().reset()
            $('#remindModal').modal('show')
            _self.remindPrice="";
            _self.getExamine();
        },
        examinePost:function () {
            let _self=this;
            let params={};
            params.balanceWarn=_self.remindPrice;
            params.customerid=common.getStoreData('userinfo').customer_id;
            params=JSON.stringify(params);
            if($('#remindForm').parsley().isValid()){
                _self.$http.post(_self.urlApi2 + 'setBalanceWarn',params).then((response) => {
                    if(response.data.errno==0){
                        common.WarningBox(_self,'SAVE_SUCESS');
                        $('#remindModal').modal('hide');
                    }else{
                        common.dealWebError(_self, response)
                    }
                }, (response) => {
                    common.dealWebError(_self, response)
                })
            }

        },
        getExamine:function () {
            let _self=this;
            _self.$http.post(_self.urlApi2 + 'getBalanceWarn',{}).then((response) => {
                if(response.data.errno==0){
                    if(response.data.info[0].balance_warn!=null){
                        _self.remindPrice=response.data.info[0].balance_warn;
                    }
                }else{
                    common.dealWebError(_self, response)
                }
            }, (response) => {
                common.dealWebError(_self, response)
            })

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
    }
}