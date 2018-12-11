/**
 * Created by BaiBin on 2017/5/11.
 */
import $ from 'jquery'
const common = require('commonFunc')
const apiUrl = '/api/system/groupcontrol?method='

export default {
    data: function () {
        return {
            searchString:'',
            rate:'',
            symbol:'¥',
            searchprice:{
                nowPrice:'0',
                chinese:'中国',
                name:'China'
            },
            turnPrice:0,
            searchParams:'',
            type:'',//1单次，2取list
            priceArry:"",
            imgUrl:'/static/images/img/national_flag/',
            endUrl:'.png',
            urlApi:'/api/console/pricenIquiryISRV?method=',
            common_01:'common_01',

        }
    },
    name: 'priceInquiryController',
    components: { },
    mounted: function () {
        this.$store.commit('changeHeaderActive',{firstMenu:"price",secondMenu:""});
        let _self=this;
        _self.searchParams={
            other:'China'
        };
        _self.postHttp(_self.searchParams,1);

        _self.searchParams={
            size:8,
            start:0,
        };
        _self.postHttp(_self.searchParams,2);
        _self.getNation();

    },
    methods: {
        clickPrice : function (index) {
            let _self=this;
            if(index==1){
                _self.symbol='¥';
                _self.turnPrice=_self.searchprice.nowPrice;
                _self.changeActive(1);

            }else if(index==2){
                _self.getExchangeRate('EUR');

            }else if(index==3){
                _self.getExchangeRate('USD');
            }

        },
        changeActive:function (index) {
            for(var i=1;i<4;i++){
                $('#btn-'+i).attr("src", "/static/images/img/price_inquiry/icon-write-"+i+".png");
            }
            let id = '#btn-'+index;
            $(id).attr("src", "/static/images/img/price_inquiry/icon-black-"+index+".png");
        },
        getExchangeRate:function (currency) {
            let _self=this;
            this.$http.post(_self.urlApi+'searchExchangeRate',{currency:currency}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.rate=response.data.info[0].rate;
                            _self.turnPrice=(_self.searchprice.nowPrice*_self.rate).toFixed(4);
                            if(currency=='EUR'){
                                _self.symbol='€';
                                _self.changeActive(2);
                            }else if(currency=='USD'){
                                _self.symbol='$';
                                _self.changeActive(3);
                            }
                        }else{
                            common.WarningBox(_self,'PRICE_003');
                        }
                    }else{
                        common.dealWebError(_self,response);
                        return false;
                    }
            },(response)=>{
                    common.dealWebError(_self,response);
                    return false;
            });
        },
        searchData:function (name) {
            let _self=this;
            if(_self.searchString=='' || _self.searchString==null){
                common.WarningBox(_self,'PRICE_001');
            }else{
                _self.searchParams={
                    other:name.split('(')[0]
                };
                _self.postHttp(_self.searchParams,1);
            };

        },
        postHttp:function (params,type) {
            let _self=this;
            this.$http.post(_self.urlApi+'searchPrice',params).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        if(type==1 ){
                            _self.searchprice=response.data.info[0];
                            _self.clickPrice(1);
                        }else if(type==2){
                            _self.priceArry=response.data.info;
                        }
                    }else{
                        common.WarningBox(_self,'PRICE_002');
                    }
                }else{
                    common.dealWebError(_self,response);
                };
            },(response)=>{
                common.dealWebError(_self,response);
            });
        },
        downTable:function () {
            let _self = this;
            let downUrl = '';
            _self.$http.post('/admin/getAllCountrySmsPriceCSV.csv', {}).then((response) => {
                if (response.data.errno == 0) {
                    downUrl = response.data.info;
                    window.location.href = window.location.protocol + '//' + window.location.host + downUrl;
                } else {
                    common.dealWebError(_self, response)
                }
            }, (response) => {
                common.dealWebError(_self, response)
            })

        },
        coverString:function (subStr,str){
            var reg = eval("/"+subStr+"/ig");
            return reg.test(str);
        },
        getNation:function () {
            //模糊查询
            let _self=this;
            var arr = [];
            this.$http.post(_self.urlApi+'searchCountry',{other:_self.searchString}).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        for(var i=0;i<response.data.info.length;i++){
                            var str =response.data.info[i].chinese + '(' + response.data.info[i].name + ')' +' '+response.data.info[i].code;
                            arr.push(str);
                            /* if(_self.coverString($("#countryInput").val(),str)){
                                arr.push(str);
                            }*/
                        }
                        $( "#countryInput" ).autocomplete({
                            minLength: 0,
                            source: arr,
                            select: function( event, ui ) {
                                var terms =ui.item.label;
                                // $( "#countryInput" ).val(terms);
                                _self.searchString=terms;
                                return false;
                            }
                        });
                    }else{
                        arr=[];
                    }
                }else{
                    arr=[];
                    common.dealWebError(_self,response);
                };
            },(response)=>{
                common.dealWebError(_self,response);
                arr=[];
            });
        },


    },
}