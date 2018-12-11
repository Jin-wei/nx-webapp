/**
 * Created by Cici on 2017/6/14.
 */
import $ from 'jquery'
const common = require('commonFunc')
const CryptoJS = require('crypto-js');
var formData = new FormData();
export default {
    data:function () {
        return{
            oldPassword:'',
            newPassword:'',
            sureNewPassword:'',
            urlApi:'/api/console/ConsoleChangePasswordSRV?method=',

        }
    },
    mounted:function () {
        let _self=this;
        _self.$parent.setActive(3,"console_change_password");
    },
    methods: {
        checkPassword:function(str) {
            let _self = this;
            const re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if (str == "" || str == null) {
                common.WarningBox(_self,'CHANGE_PASSWORD_002');
                return false;
            } else if (re.test(str) == false) {
                common.WarningBox(_self,'CHANGE_PASSWORD_005');
                return false;
            }
            else {
                return true;
            }
        },
        postChangePassword: function () {
            let _self = this;
            /*if(common.getStoreData('status').status!=1){
                common.WarningBox(_self, 'SIN_04');
                return;
            }*/
            if (_self.oldPassword == '' || _self.oldPassword == null) {
                common.WarningBox(_self,'CHANGE_PASSWORD_001');
                return;
            }

            if (_self.checkPassword(_self.newPassword) && _self.checkPassword(_self.sureNewPassword)) {
                if (_self.newPassword != _self.sureNewPassword) {
                    common.WarningBox(_self,'CHANGE_PASSWORD_004');
                    return;
                }
                let params={
                    // type:1,
                    newPassword:_self.newPassword,
                    oldPassword:CryptoJS.MD5(_self.oldPassword).toString(),
                };
                this.$http.post(_self.urlApi+'updatePassword',params).then((response)=>{
                    if(response.data.errno==0){
                        common.WarningBox(_self,'SAVE_SUCESS');
                        _self.oldPassword='';
                        _self.newPassword='';
                        _self.sureNewPassword='';
                    }else {
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            }


        },
    }
}
