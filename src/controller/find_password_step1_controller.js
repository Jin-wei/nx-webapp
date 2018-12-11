/**
 * Created by Cici on 2017/5/31.
 */
import $ from 'jquery'
import vue from 'vue'
import common from 'commonFunc'
import messageService from 'messageService'

export default{
    name:'findPassword',
    data:function () {
        return{
            systemError:true,
            systemErrorMessage:'',
            inputPhone:{
                phone:'',
                count:0,
                error:true,
                errorMessage:''
            },
            inputCheckImg:{
                value:'',
                count:0,
                error:true,
                errorMessage:''
            },
            imgCode:{
                imgCode:'',
                count:0,
                error:true,
                errorMessage:''
            },
            captcha: {},
            captchaText: '',
            urlApi:'/api/console/FindPasswordSRV?method='

            //html message


        }
    },
    mounted:function () {
        let _self=this;
        $('#step1-btn').attr('disabled','disabled');
        //获得验证码图片
        async function getCaptcha() {
            try {
                let response = await _self.$http.post('/api/captcha', {type:'homeForgetPassword'});
                _self.captcha = $.extend(true, {}, response.data.info);
                _self.systemError=  true;
            } catch (error) {
                // common.dealErrorCommon(_self, error)
                common.LoginWarningBox(_self,error);
            }
        }

        getCaptcha()
    },
    methods:{
        checkPhone:function (str) {
            let _self=this;
            _self.inputPhone.count++;
            _self.systemError=true;
            const re = /^1[3|4|5|7|8]\d{9}$/;

            if(str=="" || str==null){
                _self.inputPhone.errorMessage=_self.$t('MSG.USER_009');
                _self.inputPhone.error=false;
                _self.step1BtnDiable();
                return;

            }else if (isNaN(str)) {
                _self.inputPhone.errorMessage=_self.$t('MSG.USER_002');
                _self.inputPhone.error=false;
                _self.step1BtnDiable();
                return;
            }
            else {
                _self.inputPhone.error=true;
                _self.step1BtnDiable();
            };
        },

        checkImgCode:function (str) {
            let _self=this;
            _self.inputCheckImg.count++;
            _self.systemError=true;
            if(str==''){
                _self.inputCheckImg.errorMessage=_self.$t('MSG.USER_005');
                _self.inputCheckImg.error= false;
                _self.step1BtnDiable();
                return false;
            }else{
                _self.inputCheckImg.error= true;
                _self.step1BtnDiable();
            };
        },
        step1BtnDiable:function () {
            let _self=this;
            if(_self.inputPhone.count>0 && _self.inputCheckImg.count>0 && _self.inputCheckImg.error==true && _self.inputPhone.error==true){
                $('#step1-btn').removeAttr('disabled');
            }else{
                $('#step1-btn').attr('disabled','disabled');
            };

        },
        step1Click:function () {
            let _self=this;
            this.$http.post(_self.urlApi+'modifyPasswordStep1', {
                phone: this.inputPhone.phone,
                uuid:_self.captcha.uuid,
                captcha: _self.inputCheckImg.value,
            }).then((response) => {
                if(response.data.errno===0){
                    _self.systemError=true;
                    this.$router.push({path: '/find_password/step2/:'+_self.inputPhone.phone});
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
                    _self.systemError=  true;
                } catch (error) {
                    // common.dealErrorCommon(_self, error)
                    common.LoginWarningBox(_self,error);
                }
            }
            getCaptcha()
        },
    },
}