/**
 * Created by Cici on 2017/6/9.
 */
import $ from 'jquery'
const common = require('commonFunc')
var formData = new FormData();
var files='';
export default {
    data:function () {
        return{
            phone:'',
            status:'',
            customerType:'',//0个人 1企业
            customerType2:'',
            topBtn:'',//6未认证，0认证中，2认证驳回，1认证成功,4个人 5企业，
            personBlock:true,
            companyBlock:true,
            applyBlock:true,
            detailBtn:true,
            personBlock:true,
            companyBlock:true,
            inputDisable:true,
            showSaveBtn1:false,
            showSaveBtn2:false,
            getData:"",
            thumbnailImg2:true,//企业认证缩略图
            thumbnailImg:true,//个人认证缩略图
            personUrl:'/auth_person:/',
            companyUrl:'/auth_company/:',
            urlApi:'/api/console/AuthInformationSRV?method=getAuthInfo',
            urlCommon:'/api/sundry?method=',
            language:common.getStoreData('language'),
            imgUrl:'',

        }
    },
    mounted:function () {
        let _self=this;
        if(common.getStoreData('userinfo').name!=undefined){
            _self.phone=common.getStoreData('userinfo').name;
        }
        _self.$parent.setActive(3,"auth_information")
        _self.getStatus();
        // _self.getImg();
    },
    methods: {
        linkTo:function (url) {
            this.$router.push({path:'/console/'+url+"/:"+this.topBtn});
        },
        changeStatus:function (status,type) {
            let _self=this;
            if(status==null){
                _self.topBtn=6;
                _self.personBlock=false;
                _self.companyBlock=false;
                _self.applyBlock=false;
                _self.detailBtn=true;
                _self.inputDisable=false;
                return;
            }else {
                _self.applyBlock = true;
                _self.detailBtn = false;
                _self.inputDisable = true;
                if (type == 0) {
                    _self.customerType2 = 0;
                    _self.personBlock = false;
                    _self.companyBlock = true;

                } else if (type == 1) {
                    _self.customerType2 = 1;
                    _self.personBlock = true;
                    _self.companyBlock = false;
                }

                if (status == 0) {
                    _self.topBtn = 0;
                    return;
                }
                else if (status == 1) {
                    _self.topBtn = 1;
                    return;
                }
                else if (status == 2) {
                    _self.topBtn = 2;
                    return;
                }
            }


        },
        getStatus:function () {
            let _self=this;
            this.$http.post(_self.urlCommon+'getCustomerAuthInfo',{customerId:common.getStoreData('userinfo').customer_id}).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        _self.status=response.data.info[0].status;
                        _self.customerType=response.data.info[0].customer_type;
                        //result没有数据 未认证 0审核中 1审核成功 2驳回 customerType0个人 1企业
                        _self.changeStatus(_self.status,_self.customerType);
                        _self.imgUrl=window.location.protocol + '//' + window.location.host+response.data.info[0].id_photo


                    }else{
                        _self.changeStatus(null);
                    }
                }else{
                    common.dealConsolError(_self,response);
                }
            },(response)=>{
                common.dealConsolError(_self,response);
            });
        },



    }
}
