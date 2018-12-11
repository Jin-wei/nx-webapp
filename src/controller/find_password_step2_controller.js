/**
 * Created by Cici on 2017/5/31.
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
            inputCheckCode:{
                phone:this.$route.params.phone.split(":")[1],
                value:'',
                count:0,
                error:true,
                errorMessage:'',
                getPhoneNub:'',
                lastPhone:'',
            },
            countDown:60,
            reSend:'',
            urlApi:'/api/console/FindPasswordSRV?method='
        }
    },
    mounted:function () {
        let _self=this;
        $('#step2-btn').attr('disabled','disabled');

    },
    methods:{
        checkPhoneCode:function (str) {
            let _self=this;
            _self.inputCheckCode.count++;
            _self.systemError=true;
            if(str=="" || str==null){
                _self.inputCheckCode.errorMessage=_self.$t('MSG.USER_005');
                _self.inputCheckCode.error=false;
                $('#step2-btn').attr('disabled','disabled');
                return;
            }else{
                _self.inputCheckCode.error=true;
                _self.step2BtnDisable();

            };

        },
        step2BtnDisable:function () {
            let _self=this;
            if(_self.inputCheckCode.count>0 && _self.inputCheckCode.error==true && _self.reSend==2){
                $('#step2-btn').removeAttr('disabled','disabled');
            }else{
                $('#step2-btn').attr('disabled','disabled');
            }
        },
        getMessageCode:function () {
            let _self=this;
            this.$http.post('/api/sms',{phone:_self.inputCheckCode.phone,type:'homeForgetPassword'}).then((response)=>{
                if(response.data.errno==0){
                    _self.inputCheckCode.error=true;
                    _self.systemError=true;
                    _self.countDown=60;
                    _self.reSend=2;
                    Interval=setInterval(function () {
                        _self.lastTimer();
                    },1000);
                }else{
                    common.LoginWarningBox(_self,response);
                }
            },(response)=>{
                common.LoginWarningBox(_self,response);
                _self.countDown='';
                _self.reSend=1;
            })

        },
        lastTimer:function () {
            let _self=this;
            if(_self.countDown>0){
                _self.countDown--;
                _self.reSend=2;
            }else if(_self.countDown==0){
                _self.countDown='';
                _self.reSend=1;
                clearInterval(Interval);
                _self.step2BtnDisable();
            }else{
                clearInterval(Interval);
                _self.step2BtnDisable();
            }

        },
        step2Click:function(){
            let _self=this;
            this.$http.post(_self.urlApi+'modifyPasswordStep2', {
                phone: _self.inputCheckCode.phone,
                identifyCode:_self.inputCheckCode.value,
            }).then((response) => {
                if(response.data.errno==0){
                    this.$router.push({path: '/find_password/step3/:'+_self.inputCheckCode.phone});
                }else{
                    common.LoginWarningBox(_self,response);
                }
            }, (response) => {
                common.LoginWarningBox(_self,response);
            })

        },
    },
    created: function(){
        let _self=this;
        _self.inputCheckCode.lastPhone=_self.inputCheckCode.phone.slice(-4);
        _self.getMessageCode();
    }

}