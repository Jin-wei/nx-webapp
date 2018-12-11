/**
 * Created by Cici on 2017/6/1.
 */
import $ from 'jquery'
import vue from 'vue'
import common from 'commonFunc'
import messageService from 'messageService'

var Interval='';
export default{
    name:'findPassword',
    data:function () {
        return{
            systemError:true,
            systemErrorMessage:'',
            inputPassword:{
                value:'',
                count:0,
                error:true,
                errorMessage:''
            },
            inputNewPassword:{
                value:'',
                count:0,
                error:true,
                errorMessage:''
            },
            phone:this.$route.params.phone.split(":")[1],
            urlApi:'/api/console/FindPasswordSRV?method='
        }
    },
    mounted:function () {
        let _self=this;
        $('#step3-btn').attr('disabled','disabled');
    },
    methods:{
        //匹配密码
        checkPassword:function(str){
            let _self=this;
            _self.inputPassword.count++;
            const re=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if(_self.inputNewPassword.value!=''){
                if(str!=_self.inputNewPassword.value){
                    _self.inputNewPassword.errorMessage=_self.$t('MSG.USER_015');
                    _self.inputNewPassword.error=false;
                    _self.step3BtnDisable();
                }else if(str==_self.inputNewPassword.value){
                    _self.inputNewPassword.error=true;
                    _self.step3BtnDisable();
                }
            }
            if(str=="" || str==null){
                _self.inputPassword.errorMessage=_self.$t('MSG.USER_004');
                _self.inputPassword.error=false;
                _self.step3BtnDisable();
                return;
            }else if(re.test(str)==false){
                _self.inputPassword.errorMessage=_self.$t('MSG.USER_010');
                _self.inputPassword.error=false;
                _self.step3BtnDisable();
                return;
            }
            else{
                _self.inputPassword.error=true;
                _self.step3BtnDisable();
            };



        },
        checkNewPassword:function (str) {
            let _self=this;
            _self.inputNewPassword.count++;
            if(str=="" || str==null){
                _self.inputNewPassword.errorMessage=_self.$t('MSG.USER_004');
                _self.inputNewPassword.error=false;
                _self.step3BtnDisable();
                return;
            }else if(str!=_self.inputPassword.value){
                _self.inputNewPassword.errorMessage=_self.$t('MSG.USER_015');
                _self.inputNewPassword.error=false;
                _self.step3BtnDisable();
                return;
            } else{
                _self.inputNewPassword.error=true;
                _self.step3BtnDisable();
            };
        },
        step3BtnDisable:function () {
            let _self=this;
            if(_self.inputNewPassword.count>0 && _self.inputPassword.count>0 && _self.inputNewPassword.error==true && _self.inputPassword.error==true  ){
                $('#step3-btn').removeAttr('disabled','disabled');
            }else{
                $('#step3-btn').attr('disabled','disabled');
            }
        },
        step3Click:function () {
            let _self=this;
            this.$http.post(_self.urlApi+'modifyPasswordStep3',{phone:_self.phone,newPassword:_self.inputNewPassword.value}).then((response)=>{
                if(response.data.errno==0){
                    _self.systemError=true;
                    _self.$router.push({path:'/find_password/step4'});
                }else{
                    common.LoginWarningBox(_self,response);
                }
            },(response)=>{
                common.LoginWarningBox(_self,response);
            })

        },
    },

    created: function(){
        let _self=this;
    }
}
