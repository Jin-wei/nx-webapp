/**
 * Created by BaiBin on 2017/5/15.
 */
import $ from 'jquery'
const common = require('commonFunc')
const apiUrl = '/api/system/groupcontrol?method='

export default {
    data: function () {
        return {
            interfaceId:this.$route.params.interfaceId.split(':')[1],
            getData:'',
            title:'',
            content:'',
            urlApi:'/api/console/DevelopDocSRV?method='
        }
    },
    name: 'developDocSubController',
    components: { },
    mounted: function () {
        let _self=this;
        if(_self.interfaceId=='null'){
            _self.title=_self.$t('develop.id0.title');
            $('#sub-content').html(_self.$t('develop.id0.content'));
        }else{
            _self.getDocDetail();
        };
    },
    methods: {
        getDocDetail:function () {
            let _self=this;
            _self.interfaceId=this.$route.params.interfaceId.split(':')[1];
            if(_self.interfaceId=='null'){
                _self.title=_self.$t('develop.id0.title');
                $('#sub-content').html(_self.$t('develop.id0.content'));
            }else{
                this.$http.post(_self.urlApi+'getInterface',{interfaceId:_self.interfaceId}).then((response)=> {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.getData=response.data.info[0];
                            _self.title=_self.getData.serviceName;
                            $('#sub-content').html(
                                '接口名称：'+_self.getData.interfaceName+'<br>'+
                                '服务描述：'+_self.getData.serviceDescription+'<br>'+
                                '协议：'+_self.getData.protocal+'<br>'+
                                '地址：'+_self.getData.host+'<br>'+
                                '端口：'+_self.getData.port+'<br>'+
                                '路径：'+_self.getData.path+'<br>'+
                                '参数：'+_self.getData.parameters+'<br>'
                            );
                        }else{
                            _self.title="";
                            $('#sub-content').html("");
                            common.WarningBox(_self,'PRICE_002');
                        }
                    }else{
                        common.dealConsolError(_self,response);
                    };

                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            };

        }

    },
    watch:{
        '$route':'getDocDetail'
    },
    created () {
        this.$store.commit('changeHeaderActive',{firstMenu:"document"});
    }
}