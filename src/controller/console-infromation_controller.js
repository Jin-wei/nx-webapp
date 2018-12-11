/**
 * Created by Cici on 2017/6/7.
 */
import $ from 'jquery'
import common from 'commonFunc'

export default{
    data:function () {
        return{
            userId:'',
            inputDisable:true,
            editBtnHidden:false,
            saveBtnHidden:true,
            userData:{
                address:'',
                email:'',
                phone:'',
                qq:'',
                address:'',
                urgent_contact:'',
            },
            phone:{
                hidden:true,
                newPhone:'',
                areCode:'',
                inputCode:'',
                getCode:"",
            },
            email:{
                hidden:true,
                newEmail:'',
                inputCode:'',
                getCode:'1234',

            },
            emailError:{
                hidden:true,
                errorMessage:'',
            },
            emailCodeError:{
                hidden:true,
                errorMessage:'',
            },
            phoneError:{
                hidden:true,
                errorMessage:'',
            },
            phoneCodeError:{
                hidden:true,
                errorMessage:'',
            },
            urlApi:'/api/console/BasicInformationSRV?method='

        }

    },
    mounted:function () {
        let _self=this;
        _self.$parent.setActive(3,"basic_information");
        if(common.getStoreData('userId')!=undefined){
            _self.userId=common.getStoreData('userId');
        }
        _self.getinformation();
        // _self.addDisable();
    },
    methods:{
        //获得个人信息
        getinformation:function(){
            let _self=this;
            this.$http.post(_self.urlApi+'getBasicInfo',{}).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        _self.userData=response.data.info[0];
                    }
                }else{
                    common.dealConsolError(_self,response);
                }
            },(response)=>{
                common.dealConsolError(_self,response);
            });
        },
        //匹配邮箱
        checkEmail:function(str){
            let _self=this;
            const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(str=="" || str==null){
                _self.emailError.hidden=false;
                _self.emailError.errorMessage=_self.$t('MSG.USER_008');
                return false;
            }
            else if(re.test(str)==false){
                _self.emailError.hidden=false;
                _self.emailError.errorMessage=_self.$t('MSG.USER_003');
                return false;
            }else{
                _self.emailError.hidden=true;
                return true;

            };

        },
        //匹配邮箱验证码
        checkEmailCode:function (str) {
            let _self=this;
            if(str=="" || str==null){
                _self.emailCodeError.hidden=false;
                _self.emailCodeError.errorMessage=_self.$t('MSG.USER_005');
                return false;
            }
            // else if(str!=_self.email.getCode){
            //     _self.emailCodeError.hidden=false;
            //     _self.emailCodeError.errorMessage=_self.$t('MSG.USER_006');
            //     return false;
            // }
            else{
                _self.emailCodeError.hidden=true;
                return true;
            };
        },

        //发送邮件
        sendEmail:function () {
            let _self=this;
            if(common.getStoreData('status').status==0){
                common.WarningBox(_self, 'SIN_07');
                return;
            }
            var checkReturn=_self.checkEmail(_self.email.newEmail);
            if(checkReturn){
                this.$http.post('/api/email',{type:'consoleModifyEmail',toEmail:_self.email.newEmail}).then((response)=>{
                    if(response.data.errno==0){
                        common.WarningBox(_self,'USER_SEND_SUCESS');
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            }
        },
        //点击邮箱确认按钮
        emailSure:function () {
            let _self=this;
            if(common.getStoreData('status').status==0){
                common.WarningBox(_self, 'SIN_07');
                return;
            }
            var checkReturn=_self.checkEmail(_self.email.newEmail);
            var checkCode=_self.checkEmailCode(_self.email.inputCode);
            if(checkCode && checkReturn){
                let params={
                    newEmail:_self.email.newEmail,
                    identifyCode:_self.email.inputCode,
                }
                _self.saveData(params,'modifyEmail',2);

            };
        },
        //显示邮箱弹窗
        showChangeEmail:function () {
            let _self=this;
            _self.email.hidden=false;
            _self.emailCodeError.hidden=true;
            _self.emailError.hidden=true;
            _self.email.newEmail='';
            _self.email.inputCode='';
        },
        //显示电话弹窗
        showChangePhone:function () {
            let _self=this;
            _self.phone.hidden=false;
            _self.phoneError.hidden=true;
            _self.phoneCodeError.hidden=true;
            _self.phone.newPhone='';
            _self.phone.inputCode='';
        },
        getPhoneCode:function () {
            let _self=this;
            _self.phone.hidden=false;
            _self.phoneError.hidden=true;
            _self.phoneCodeError.hidden=true;
        },
        //匹配电话
        checkPhone:function(str1,str2) {
            let _self=this;
            // const re = /^1[3|4|5|7|8]\d{9}$/;

            if(str1=="" || str1==null){
                _self.phoneError.hidden=false;
                _self.phoneError.errorMessage=_self.$t('MSG.USER_009');
                return false;

            }else if (isNaN(str1)) {
                _self.phoneError.hidden=false;
                _self.phoneError.errorMessage=_self.$t('MSG.USER_002');
                return false;
            }else if(str2=="" || str2==null){
                _self.phoneError.hidden=false;
                _self.phoneError.errorMessage=_self.$t('MSG.USER_016');
                return false;
            }
            else {
                _self.phoneError.hidden=true;
                return true;
            };


        },
        //匹配短信验证码
        checkPhoneCode:function (str) {
            let _self=this;
            _self.phoneNumberCont++;
            if(str=="" || str==null) {
                _self.phoneCodeError.errorMessage = _self.$t('MSG.USER_005');
                _self.phoneCodeError.hidden = false;
                return false;
            }
            else{
                _self.phoneCodeError.hidden=true;
                return true;
            };

        },
        //保存 qq adress
        saveOtherData:function () {
            let _self=this;
            if(common.getStoreData('status').status==0){
                common.WarningBox(_self, 'SIN_07');
                return;
            }
            let params={
                qq:_self.userData.qq,
                address:_self.userData.address,
                urgentContact:_self.userData.urgent_contact
            };
            _self.saveData(params,'modifyMyBasicInfo',1);
        },
        //发送短信
        sendMessage:function () {
            let _self=this;
            if(common.getStoreData('status').status==0){
                common.WarningBox(_self, 'SIN_07');
                return;
            }
            let checkPhone=_self.checkPhone(_self.phone.newPhone,_self.phone.areCode);
            if(checkPhone){
                this.$http.post('/api/sms',{phone:_self.phone.areCode+_self.phone.newPhone,type:'consoleModifyPhone'}).then((response)=>{
                    if(response.data.errno==0){
                        common.WarningBox(_self,'USER_SEND_SUCESS');

                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })

            }
        },
        phoneSure:function () {
            let _self=this;
            if(common.getStoreData('status').status==0){
                common.WarningBox(_self, 'SIN_07');
                return;
            }
            var checkCodeReturn=_self.checkPhoneCode(_self.phone.inputCode);
            var checkPhoneReturn=_self.checkPhone(_self.phone.newPhone,_self.phone.areCode);
            if(checkCodeReturn && checkPhoneReturn){

                let params={
                    newPhone:_self.phone.areCode+_self.phone.newPhone,
                    identifyCode:_self.phone.inputCode
                }
                _self.saveData(params,'modifyPhone',3);
            }
        },
        saveData:function (data,method,type) {
            let _self=this;
            this.$http.post(_self.urlApi+method,data).then((response)=>{
                if(response.data.errno==0){
                    common.WarningBox(_self,'SAVE_SUCESS');
                    if(type==3){
                        _self.phone.hidden=true;
                        _self.userData.phone=_self.phone.newPhone;
                    }else if(type==2){
                        _self.email.hidden=true;
                        _self.userData.email=_self.email.newEmail;
                    }
                    else if(type==1){
                        _self.saveBtnHidden=true;
                        _self.editBtnHidden=false;
                        _self.inputDisable=true;
                    }
                }else{
                    common.dealConsolError(_self,response);
                }
            },(response)=>{
                common.dealConsolError(_self,response);
            });

        },
        showSaveBtn:function () {
            let _self=this;
            _self.saveBtnHidden=false;
            _self.editBtnHidden=true;
            _self.inputDisable=false;
        },


    },
    created(){

    },
}