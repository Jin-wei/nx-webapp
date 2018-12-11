import $ from 'jquery'
import common from 'commonFunc'
import loginHeader from '../components/login/loginHeader'
import loginFooter from '../components/login/loginFooter'

export default{
    name: 'register',
    data: function () {
        return {
            inputEmail: '',
            inputPassword: '',
            inputphone:'',
            phoneNumber:'',
            errorMessage: '',
            areaCode:'',
            emailError:true,//邮箱错误显示
            passwordError:true,//密码错误显示
            phoneError:true,//电话错误显示
            phoneCodeError:true,//手机验证码错误显示
            systemError:true,//系统错误显示
            registerfrom:false,
            successWarn:true,
            successWarnCont:'3',
            emailErrorMessage:'',
            passwordErrorMessage:'',
            phoneErrorMessage:'',
            phoneCodeErrorMessage:'',
            systemErrorMessage:'',
            inputphoneCont:0,
            inputPasswordCont:0,
            phoneNumberCont:0,
            inputAreCount:0,
            inputEmailCont:"",
            getPhoneNub:'',
            Remembercheckbox:false,
            urlApi:'/api/console/RegisterSRV?method=',
            urlApi2:'/api/console/pricenIquiryISRV?method=',

        }
    },
    components:{loginHeader,loginFooter},
    mounted:function(){
        $('#getPhone').attr('disabled','disabled');
        $('#resigterBtn').attr('disabled','disabled');
        let _self=this;
        _self.getNation();
    },
    methods:{
        linkTo: function (url) {
            this.$router.push(url)
        },
        showModel:function () {
            $('#serveModal').modal('show');
        },

        getNation:function () {
            //模糊查询
            let _self=this;
            var arr = [];
            this.$http.post(_self.urlApi2 + 'searchCountry',{other:_self.areaCode}).then((response)=>{
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
                                _self.areaCode=parseInt(terms.split(')')[1]);
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
        //匹配电话
        checkPhone:function(str) {
            let _self=this;
            _self.inputphoneCont++;
            _self.systemError=true;
            // const re = /^1[3|4|5|7|8]\d{9}$/;
            // if(str=="" || str==null){
            //     _self.phoneErrorMessage=global.MSG_USER_009;
            //     _self.phoneError=false;
            //     return;
            //     _self.removeDisabled();
            // }else if (re.test(str)==false) {
            //     _self.phoneErrorMessage=global.MSG_USER_002;
            //     _self.phoneError=false;
            //     _self.removeDisabled();
            // }
            // else{
            //     _self.phoneError=true;
            //     $('#getPhone').removeAttr('disabled','disabled');
            //     _self.removeDisabled();
            // };

            if(str=="" || str==null){
                _self.phoneErrorMessage=_self.$t('MSG.USER_009');
                _self.phoneError=false;
                _self.removeDisabled();
                _self.removeSendPhone();
                return;

            }else if (isNaN(str)) {
                _self.phoneError=false;
                _self.phoneErrorMessage =_self.$t('MSG.USER_002');
                _self.removeDisabled();
                _self.removeSendPhone();
            }
            else {
                _self.phoneError=true;
                _self.removeDisabled();
                _self.removeSendPhone();
            };


        },
        checkAreCode:function (str) {
            let _self=this;
            _self.inputAreCount++;
            if(str=="" || str==null){
                _self.phoneErrorMessage=_self.$t('MSG.USER_016');
                _self.phoneError=false;
                _self.removeDisabled();
                _self.removeSendPhone();
                return;
            }else{
                _self.phoneError=true;
                _self.removeSendPhone();

            }
        },
        //匹配邮箱
        checkEmail:function(str){
            let _self=this;
            _self.inputEmailCont++;
            const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(str=="" || str==null){
                _self.emailError=false;
                _self.emailErrorMessage=_self.$t('MSG.USER_008');
                _self.removeDisabled();
                return;
            }
            else if(re.test(str)==false){
                _self.emailErrorMessage=_self.$t('MSG.USER_003');
                _self.emailError=false;
                _self.removeDisabled();
                return;
            }else{
                _self.removeDisabled();
                _self.emailError=true;

            };

        },
        //匹配密码
        checkPassword:function(str){
            let _self=this;
            _self.inputPasswordCont++;
            _self.systemError=true;
            const re=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if(str=="" || str==null){
                _self.passwordErrorMessage=_self.$t('MSG.USER_004');
                _self.passwordError=false;
                _self.removeDisabled();
                return;
            }else if(re.test(str)==false){
                _self.passwordErrorMessage=_self.$t('MSG.USER_010');
                _self.passwordError=false;
                _self.removeDisabled();
                return;
            }
            else{
                _self.passwordError=true;
                _self.removeDisabled();
            };


        },
        checkPhoneCode:function (str) {
            let _self=this;
            _self.phoneNumberCont++;
            _self.systemError=true;
            _self.phoneCodeError=true;
            if(str=="" || str==null){
                _self.phoneCodeErrorMessage=_self.$t('MSG.USER_005');
                _self.phoneCodeError=false;
                _self.removeDisabled();
                return;
            }
            else{
                _self.phoneCodeError=true;
                _self.removeDisabled();
            };

        },
        checkSevice:function () {
            let _self=this;
            window.setTimeout(function () {
                _self.removeDisabled();
            },100);

        },
        removeDisabled:function () {
            let _self=this;
            if(_self.phoneError==true && _self.passwordError==true && _self.phoneCodeError==true && _self.Remembercheckbox==1  && _self.areaCode!=''  && _self.emailError==true && _self.inputEmail!='' && _self.inputphone!='' && _self.phoneNumber!=''){
                $('#resigterBtn').removeAttr('disabled','disabled');
            }else{
                $('#resigterBtn').attr('disabled','disabled');
            }
        },
        removeSendPhone:function () {
            let _self=this;
            _self.phoneNumber="";
            if(_self.phoneError==true && _self.inputphoneCont>0 && _self.inputAreCount>0){
                $('#getPhone').removeAttr('disabled','disabled');
            }else{
                $('#getPhone').attr('disabled','disabled');
            }
        },
        getPhoneCode:function () {
            let _self=this;
            _self.phoneCodeError=true;
            _self.systemError=true;
            this.$http.post('/api/sms',{phone:_self.areaCode+_self.inputphone,type:'homeSignup'}).then((response)=>{
                if(response.data.errno==0){
                    _self.systemError=true;
                    common.WarningBox(_self,'USER_SEND_SUCESS');
                }else{
                    common.LoginWarningBox(_self,response);
                }
            },(response)=>{
                common.LoginWarningBox(_self,response);

            })
        },
        clickRegister:function () {
            let _self=this;
            let params={
                phone:_self.areaCode+_self.inputphone,
                password:_self.inputPassword,
                identifyCode:_self.phoneNumber
            }
            if(_self.inputEmail!=""){
                params.email=_self.inputEmail;
            }
            this.$http.post(_self.urlApi+'signup',params).then((response)=>{
                if(response.data.errno==0){
                    let token = response.headers.get('authorization')
                    _self.systemError=true;
                    _self.successWarn=false;
                    _self.systemError = true;
                    _self.timer();
                    /*common.clearStoreData();
                    common.setStoreData('token', token)
                    common.setStoreData('userinfo', response.data.info)*/
                }else{
                    common.LoginWarningBox(_self,response);
                }
            },(response)=>{
                common.LoginWarningBox(_self,response);

            })
        },

        timer:function () {
            let _self=this;
            var timerInterval=setInterval(function () {
                if(_self.successWarnCont>0){
                    _self.successWarnCont--;
                }else{
                    _self.$router.push({path:'/login'});
                    clearInterval(timerInterval);
                }
            },1000);
        }
    }

}
