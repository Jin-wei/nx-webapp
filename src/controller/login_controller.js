/**
 * Created by Cici on 2017/6/1.
 */
import common from 'commonFunc'
import loginHeader from '../components/login/loginHeader'
import loginFooter from '../components/login/loginFooter'
import messageService from 'messageService'

export default{
    name: 'login',
    data: function () {
        return {
            username: '',
            password: '',
            imgNub:'',
            remeberNub:'',
            rememberMe:0,
            errorImgNub: '',
            errorUserName:'',
            errorPassword:'',
            systemErrorMessage:'',
            isA: true,//用户名错误显示
            isB: true,//密码错误显示
            isC: true,//验证码错误显示
            systemError:true,//系统错误
            changeUserCount:0,
            changePasswordCount:0,
            changeImgCount:0,
            sessionUserName:common.getStoreData('userName'),
            sessionPassword:common.getStoreData('password'),
            captcha: {},
            captchaText: '',
            language:'',

        }
    },
    mounted: function () {
        let _self = this
        $('body').removeClass();
        $('#login').attr('disabled','disabled');

        async function getCaptcha() {
            try {
                let response = await _self.$http.post('/api/captcha', {type:'login'});
                _self.captcha = $.extend(true, {}, response.data.info);
                _self.systemError = true;
                $('.hide-order-detail-desk').show();
            } catch (error) {
                // common.dealErrorCommon(_self, error)
                common.LoginWarningBox(_self,error);
            }
        }

        getCaptcha()

        if(_self.sessionUserName!=undefined){
            _self.username=_self.sessionUserName;
            _self.changeUserCount ++;
        }
        if(_self.sessionPassword!=undefined){
            _self.password=this.sessionPassword;
            _self.changePasswordCount++;
        }

    },
    components:{loginHeader,loginFooter,messageService},
    methods:{
        linkTo: function (url) {
            this.$router.push(url)
        },
        //匹配电话
        checkPhone:function(str) {
            let _self=this;
            // if(!isNaN(_self.username)){
            //     const re = /^1[3|4|5|7|8]\d{9}$/;
            //     if (re.test(str)) {
            //         _self.isA=true;
            //     }else {
            //         _self.errorUserName=global.MSG_USER_002;
            //         _self.isA=false;
            //     };
            // };

            if (!isNaN(_self.username)) {
                _self.isA = true;
            }
            else {
                _self.errorUserName = _self.$t('MSG.USER_002');
                _self.isA = false;
            };
        },
        //匹配邮箱
        checkEmail:function(str){
            let _self=this;
            if(isNaN(_self.username)){
                const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                if(re.test(str)){
                    _self.hasError=_self.hasError+1;
                    _self.isA=true;
                }else{
                    _self.errorUserName=_self.$t('MSG.USER_003');
                    _self.isA=false;
                    return false;
                };
            };
        },
        //同时匹配
        checkPhoneEmail:function () {
            let _self=this;
            /*_self.changeUserCount ++;*/
            _self.systemError = true;
            if(_self.username=='' || _self.username==null){
                _self.errorUserName=_self.$t('MSG.USER_001');
                _self.isA= false;
                $('#login').attr('disabled','disabled');
                return false;
            }else{
                if(!isNaN(_self.username)){
                    _self.checkPhone(_self.username);
                }
                else if(isNaN(_self.username)){
                    _self.checkEmail(_self.username);
                };
                _self.removeDisable();

            };

        },
        //匹配密码
        checkPassword:function () {
            let _self=this;
            /*_self.changePasswordCount++;*/
            _self.systemError = true;
            if(_self.password==''){
                _self.errorPassword=_self.$t('MSG.USER_004');
                _self.isB= false;
                $('#login').attr('disabled','disabled');
                return false;
            }else{
                _self.isB= true;
                _self.removeDisable();
            };

        },

        checkImgNub:function (str) {
            let _self = this;
            /*_self.changeImgCount++;*/
            _self.systemError = true;
            if (str == '') {
                _self.errorImgNub = _self.$t('MSG.USER_005');
                _self.isC = false;
                $('#login').attr('disabled', 'disabled');
                $('#imgCode').addClass('red-border');
                return false;
            }
            else{
                _self.isC = true;
                $('#imgCode').removeClass('red-border');
                _self.removeDisable();
            }

        },
        removeDisable:function () {
            let _self=this;
            if(_self.isB==true && _self.isA==true && _self.isC==true   && _self.captchaText!='' && _self.username!='' && _self.password!=''){
                $('#login').removeAttr('disabled');
            }else{
                $('#login').attr('disabled','disabled');
            };
        },

        login: function(event) {
            let _self = this
            let encInfo = common.aesEncryptModeCFB(this.username, this.password)
            this.$http.post('/api/auth', {
                username: this.username,
                identifyCode: encInfo[1],
                magicNo: encInfo[0],
                uuid: _self.captcha.uuid,
                captcha: _self.captchaText,
                type:999
            }).then((response) => {
                let token = response.headers.get('authorization')
                if(response.data.errno==0){
                    if (token) {
                        _self.systemError = true;
                        _self.language=common.getStoreData('language')
                        if(_self.language==undefined){
                            _self.language='zh_cn'
                        }

                        common.removeStoreData('token');
                        common.removeStoreData('userinfo');
                        common.removeStoreData('status');
                        common.setStoreData('token', token)
                        common.setStoreData('userinfo', response.data.info)

                        common.setStoreData('language', _self.language);

                        this.$router.push({
                            path: '/console/home'
                        })
                    } else {
                        common.LoginWarningBox(_self,response);
                        _self.language=common.getStoreData('language')
                        if(_self.language==undefined){
                            _self.language='zh_cn'
                        }
                        common.removeStoreData('token');
                        common.removeStoreData('userinfo');
                        common.removeStoreData('status');
                        common.setStoreData('language', _self.language);
                    }
                }else{
                    common.LoginWarningBox(_self,response);
                }
            }, (response) => {
                common.LoginWarningBox(_self,response);
            })
        },

        refreshCaptcha: function(event) {
            let _self = this
            async function getCaptcha() {
                try {
                    let response = await _self.$http.post('/api/captcha', {type:'login'});
                    _self.captcha = $.extend(true, {}, response.data.info);
                    _self.systemError = true;
                    $('.hide-order-detail-desk').show();
                } catch (error) {
                    // common.dealErrorCommon(_self, error)
                    common.LoginWarningBox(_self,error);
                }
            }
            getCaptcha()
        }

    },
    created(){

    }
}