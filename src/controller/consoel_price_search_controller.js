/**
 * Created by Cici on 2017/6/12.
 */
/**
 * Created by Cici on 2017/6/9.
 */
import $ from 'jquery'
const common = require('commonFunc')
var formData = new FormData();
export default {
    data:function () {
        return{
            searchString:"",
            hideoperator:false,
            priceArry:{
                chinese:'',
                name:'',
                code:'',
                nowPrice:'',
                operatorArr:[],
            },
            priceGetArr:'',
            urlApi:'/api/console/ConsoelPriceSearchSRV?method=',
            urlApi2:'/api/console/pricenIquiryISRV?method=',
        }
    },
    mounted:function () {
        let _self=this;
        _self.searchData("",0);
        _self.$parent.setActive(3,"consoel_price_search");
        _self.getNation();

    },
    methods: {
        coverString:function (subStr,str){
            var reg = eval("/"+subStr+"/ig");
            return reg.test(str);
        },
        getNation:function () {
            //模糊查询
            let _self=this;
            var arr = [];
            this.$http.post(_self.urlApi2 + 'searchCountry',{other:_self.searchString}).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        for(var i=0;i<response.data.info.length;i++){
                            var str =response.data.info[i].chinese + '(' + response.data.info[i].name + ')' +' '+response.data.info[i].code;
                            arr.push(str);

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
                    common.dealConsolError(_self,response);
                };
            },(response)=>{
                common.dealConsolError(_self,response);
                arr=[];
            });
        },

        searchData:function (name,type) {
            let _self=this;
            if(name=='' || name==null){
              /*  common.WarningBox(global.MSG_PRICE_001);*/
                _self.postHttp('');
            }else{
                if(type==1){
                   /* if(common.getStoreData('status').status!=1){
                        common.WarningBox(_self, 'SIN_04');
                        return;
                    }*/
                }
                _self.searchParams={
                    other:name.split('(')[0]
                };
                _self.postHttp(_self.searchParams);
            };


        },
        postHttp:function (params) {
            let _self=this;
            this.$http.post(_self.urlApi+'searchPriceConsole',params).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        _self.priceGetArr=response.data.info;
                        /*window.setTimeout(function () {
                            $('#214').hide()
                        },100)*/
                    }else{
                        _self.priceGetArr=""
                        common.WarningBox(_self,'PRICE_002');
                    }
                }else{
                    common.dealConsolError(_self,response);
                };
            },(response)=>{
                common.dealConsolError(_self,response);
            });
        },
        toggleOperator:function (id) {
            let _self=this;
            $('#'+id).toggle()
        },

    }
}
