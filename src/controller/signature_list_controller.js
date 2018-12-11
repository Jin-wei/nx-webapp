/**
 * Created by Cici on 2017/6/14.
 */
import $ from 'jquery'
const common = require('commonFunc')
function timeFormatter(value) {
    if (!value) return ''
    let date =value;
    date =date.split('T');
    let time=date[1].slice(0,8);
    return date[0]+' '+time
}
export default {
    data: function () {
        return {
            sinDetailHidden:true,
            sinArry:"",
            sinDetailArry:{
                status:0
            },
            urlApi:'/api/console/SignatureListSRV?method=',
            language:common.getStoreData('language')
        }
    },
    components: { },
    mounted: function () {
        let _self=this;
        _self.$parent.setActive(0,'signature_list');
        _self.getSinList({},1);

    },
    methods: {
        linkTo:function (id) {
            let _self=this;
            _self.$router.push({path:'/console/new_signature/:'+id});
        },
        getSinList:function (params ,type) {
            let _self=this;
            _self.$http.post(_self.urlApi+'getSignature',params).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        if(type==1){
                            _self.sinArry=response.data.info;
                        }else if(type==2){
                            _self.sinDetailArry=response.data.info[0];
                        }
                    }else{
                        if(type==1){
                            _self.sinArry='';
                        }else if(type==2){
                            _self.sinDetailArry='';
                        }
                    }

                }else{
                    common.dealConsolError(_self,response);
                }
            },(response)=>{
                common.dealConsolError(_self,response);
            })
        },
        deleteSin:function (id) {
            let _self=this;
            let params={
                id:id
            }
            common.dealConfrimCommon('确认要删除此应用吗？', function() {
                _self.$http.post(_self.urlApi+'deleteSignature',params).then((response)=>{
                    if(response.data.errno==0){
                        common.WarningBox(_self, 'DELETE_SUCESS');
                        _self.getSinList({},1);
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            })

        },
        showDetail:function (id) {
           let _self=this;
           _self.sinDetailHidden=false;
            let params={
                id:id
            };
            _self.getSinList(params,2)

        },

    },
    filters: {
        appStatus:function (value,type) {
            if(!isNaN(value)){
                return type;
            }else{
                return ""
            }

        },
        dateFormat:function (value) {
            if (!value) return ''
            let arry='';
            arry=value.split("T")[0];
            return arry
        },

    }
}