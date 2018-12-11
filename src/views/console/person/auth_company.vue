<!--企业认证-->
<template>
    <div class="info-relative" >
        <div  class="info-position2" v-cloak>
            <div class="info-title">
                {{$t('companyAuth.title')}}
            </div>
            <div class="person-middle-margin">
                <div class="person-block">
                    <span class="person-left-span2">{{$t('companyAuth.count')}}</span>
                    <span>{{phone}}</span>
                    <span class="red-color" :class="{'show':status==2}">{{$t('companyAuth.reject')}}{{approvalMessage}}</span>
                </div>
                <div class="person-block">
                    <div class="pull-left">
                        <span class="person-left-span2">{{$t('companyAuth.companyName')}}</span>
                        <input class="person-right-long-input" type="text" v-model="companyData.realName" :disabled='inputDisable==true'>
                    </div>
                    <div class="pull-left">
                        <span class="gray-samll">{{$t('companyAuth.span1')}}</span>
                    </div>

                </div>
                <div class="clear"></div>
                <div class="person-block type-height">
                    <div class="pull-left">
                        <span class="person-left-span2">{{$t('companyAuth.adress')}}</span>
                        <input class="person-right-long-input" type="text" v-model="companyData.address" :disabled='inputDisable==true'>
                    </div>
                    <div class="pull-left">
                        <span class="gray-samll">{{$t('companyAuth.span2')}}</span>
                    </div>
                </div>
                <div class="person-block type-height">
                    <div class="pull-left">
                        <span class="person-left-span2">{{$t('companyAuth.business')}}</span>
                        <input class="person-right-long-input" type="text" v-model="companyData.idNo" :disabled='inputDisable==true'>
                    </div>
                    <div class="pull-left">
                        <span class="gray-samll">{{$t('companyAuth.span3')}}</span>
                    </div>
                </div>
                <div class="person-block">
                    <span class="person-left-span2">{{$t('companyAuth.photo')}}</span>
                    <input class="person-right-btn-input" v-model="file2Path" type="text" :disabled='inputDisable==true'>
                    <!--<button class="btn lookBtn" @click="chocePicture">浏览</button>-->
                    <span class="upSendImg">
                        <input class="browse" type="file" id="file2"  accept="image/png, image/jpeg, image/gif, image/jpg"   size="1">
                        <button class="btn browse">{{$t('companyAuth.lookBtn')}}</button>
                    </span>

                </div>
            </div>

            <div class="person-bottom-postion2">
                <div class="person-gray-block">
                    <span>{{$t('companyAuth.span4')}}</span>
                </div>
                <div>
                    <img class="thumbnail"  :class="{'hidden':thumbnailImg2}" src="#" id="preview" alt="">
                </div>
            </div>
            <div class="person-btn-position2">
                <button class="btn person-save-tbn" :class="{'show':status==6 || showSaveBtn2==true}" @click="saveCompanyData()">{{$t('companyAuth.saveBtn')}}</button>
                <button class="btn person-save-tbn"  :class="{'show':status==2 && showSaveBtn2==false}" @click="showSaveBtn2=true,inputDisable=false">{{$t('companyAuth.editBtn')}}</button>
                <button class="btn person-cancel-tbn" @click="renturnAuth">{{$t('companyAuth.cancelBtn')}}</button>
            </div>
        </div>
    </div>
</template>

<style src="../../../css/authentication_information.css"></style>
<script>
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
                status:this.$route.params.status.split(":")[1],//6未认证，0认证中，2认证驳回，1认证成功,4个人，5企业，
                customerType:'',//0个人 1企业
                approvalMessage:'',
                companyData:{
                    realName:'',
                    idNo:'',
                    idType:'2',
                    address:'',


                },
                file2Path:'',
                showSaveBtn2:true,
                inputDisable:false,
                getData:"",
                thumbnailImg2:true,//企业认证缩略图
                returnImgId:'',
                urlApi:'/api/console/AuthInformationSRV?method=',

            }
        },
        mounted:function () {
            let _self=this;
            _self.$parent.setActive(3,"auth_information");
            if(common.getStoreData('userinfo').name!=undefined){
                _self.phone=common.getStoreData('userinfo').name;
            }


            if(_self.status==0 || _self.status==1){
                _self.showDetail();
                _self.showSaveBtn2=false;
                _self.inputDisable=true;
            }else if(_self.status==2){
                _self.showDetail();
                _self.showSaveBtn2=false;
                _self.inputDisable=true;
            }else if(_self.status==6){
                _self.showSaveBtn2=true;
            }

            $('#file2').change(function() {
                files = this.files;
                if (files.length > 0) {
                    _self.file2Path=$('#file2').val();
                    //显示图片
                    var $file = $(this);
                    var $img = $("#preview");

                    let formData = new FormData();
                    formData.append('file', files[0]);
                        _self.$http.post('/api/console/AuthInformationSRV?method=saveFile', formData).then((response) => {
                            if(response.data.errno==0){
                                _self.returnImgId=response.data.info;
                                $img.attr('src',window.location.protocol + '//' + window.location.host+_self.returnImgId);
                               /* common.WarningBox(_self,'SAVE_SUCESS');*/
                                _self.thumbnailImg2=false;
                                $('#file2').val('');
                            }else{
                                if(response.status==413){
                                    common.WarningBox(_self,'USER_018');
                                }
                                return
                                common.dealConsolError(_self,response);
                            }
                        }, (response) => {
                            if(response.status==413){
                                common.WarningBox(_self,'USER_018');
                            }
                            return
                            common.dealConsolError(_self,response);
                       })
                }

            });

            // _self.getImg();
        },
        methods: {
            saveCompanyData:function () {
                let _self=this;
                let method="";
                if(_self.status==6){
                    method='addAuthentication';
                }else if(_self.status==2){
                    method='modifyAuthentication';
                }

                for(var key in _self.companyData){
                    if(_self.companyData[key]==''){
                        common.WarningBox(_self,'CON_PRICE_001');
                        return;
                    }
                }
                if(_self.returnImgId==""){
                    common.WarningBox(_self,'IMG_01');
                    return;
                }else{
                    _self.companyData.idPhoto=_self.returnImgId;
                }

                _self.companyData.customerType=1;
                _self.$http.post(_self.urlApi+method,_self.companyData).then((response) => {
                    if(response.data.errno==0){
                        common.WarningBox(_self,'SAVE_SUCESS');
                        window.setTimeout(function(){
                            _self.renturnAuth();
                        },1500)
                    }else{
                        common.dealConsolError(_self,response);
                    }
                }, (response) => {
                    common.dealConsolError(_self,response);
                })
            },
            renturnAuth:function () {
                let _self=this;
                this.$router.push({path:'/console/auth_information'});
            },

            getImg:function (id) {
                let _self=this;
                _self.$http.post(global.api+'/getIdPhoto',{idPhoto:id}).then((response) => {
                    // if(response.data.success){
                    //     common.WarningBox(MSG_SAVE_SUCESS);
                    // }else{
                    //     common.WarningBox(response.data.message);
                    // }

                }, (response) => {
                    // error callback
                    common.dealConsolError(_self,response);
                });

                //获得图片

            },
            showDetail:function () {
                let _self=this;
                _self.$http.post(_self.urlApi+'getAuthInfo',{}).then((response) => {
                    if(response.data.errno==0){
                        if (response.data.info.length > 0) {
                            _self.getData = response.data.info[0];
                            _self.approvalMessage = _self.getData.approval_opinion;

                            _self.companyData.realName = _self.getData.real_name;
                            _self.companyData.idNo = _self.getData.id_no;
                            _self.companyData.address=_self.getData.address;
                            _self.returnImgId=_self.getData.id_photo;
//                            _self.getImg('593f4fdfe9fc3618bb81285a');
                            if(_self.getData.id_photo!=""){
                                _self.thumbnailImg2=false;
                                $("#preview").attr('src',window.location.protocol + '//' + window.location.host+_self.getData.id_photo);
                            }
                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                }, (response) => {
                    // error callback
                    common.dealConsolError(_self,response);
                })

            },


        }
    }


</script>