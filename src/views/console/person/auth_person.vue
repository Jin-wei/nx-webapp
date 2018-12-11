<template>
    <div class="info-relative" >
        <div  class="info-position2">
            <div class="info-title">
                {{$t('personAuth.title')}}
            </div>
            <div class="person-middle-margin">
                <div class="person-block">
                    <span class="person-left-span">{{$t('personAuth.count')}}</span>
                    <span>{{phone}}</span>
                    <span class="red-color" :class="{'show':status==2}">{{$t('personAuth.reject')}}{{approvalMessage}}</span>
                </div>
                <div class="pull-left">
                    <div class="person-block">
                        <div class="pull-left">
                            <span class="person-left-span">{{$t('personAuth.realName')}}</span>
                            <input class="person-right-short-input" type="text" v-model="personData.realName" :disabled='inputDisable==true'>
                        </div>
                        <div class="pull-left">
                            <span class="gray-samll">{{$t('personAuth.span1')}}</span>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="person-block">
                        <span class="person-left-span">{{$t('personAuth.type')}}</span>
                        <div class="radio person-radio" :disabled='inputDisable==true'>
                            <label class=""><input  type="radio" name="optionsRadiosinline"  value="0" class="" />{{$t('personAuth.radio1')}}</label>
                            <label class="person-radio-margin"><input  type="radio" name="optionsRadiosinline"  value="1" class="" />{{$t('personAuth.radio2')}}</label>
                        </div>
                    </div>
                    <div class="person-block type-height">
                        <span class="person-left-span">{{$t('personAuth.nub')}}</span>
                        <input class="person-right-long-input" type="text" v-model="personData.idNo" >
                    </div>
                    <div class="person-block">
                        <span class="person-left-span">{{$t('personAuth.img')}}</span>
                        <input class="person-right-btn-input" v-model="file1Path" type="text" :disabled='inputDisable==true'>
                        <!--<button class="btn lookBtn" @click="chocePicture">浏览</button>-->
                        <span class="upSendImg">
                            <input class="browse" type="file" id="file"  accept="image/png, image/jpeg, image/gif, image/jpg"  size="1">
                            <button class="btn browse" @click="">{{$t('personAuth.lookBtn')}}</button>
                        </span>
                    </div>
                </div>


                <div class="clear"></div>
            </div>
            <div class="person-bottom-postion">
                <div class="person-gray-block">
                    <span>{{$t('personAuth.span2')}}</span>
                </div>
                <div class="person-img-bk" :class="{'hidden':personImgBk}">
                    <div class="person-div-padding">
                        <p>{{$t('personAuth.p1')}}</p>
                        <p>{{$t('personAuth.p2')}}</p>
                        <p>{{$t('personAuth.p3')}}</p>
                        <p class="person-p-padding">{{$t('personAuth.p3')}}</p>
                        <p>{{$t('personAuth.p4')}}</p>
                    </div>
                </div>
                <div class="">
                    <img class="thumbnail thumbnail2"  :class="{'hidden':thumbnailImg}" src="#" id="preview2" alt="">
                </div>
            </div>
            <div class="person-btn-position">
                <button class="btn person-save-tbn"  :class="{'show':status==6 || showSaveBtn1==true}" @click="savePersonData()">{{$t('personAuth.saveBtn')}}</button>
                <button class="btn person-save-tbn"  :class="{'show':status==2 && showSaveBtn1==false}" @click="showSaveBtn1=true,inputDisable=false">{{$t('personAuth.editBtn')}}</button>
                <button class="btn person-cancel-tbn" @click="renturnAuth">{{$t('personAuth.cancelBtn')}}</button>
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
                topBtn:'',
                showSaveBtn1:true,
                approvalMessage:'',
                personData:{
                    realName:"",
                    idType:"",
                    idNo:'',

                },
                file1Path:'',
                inputDisable:false,
                getData:"",
                thumbnailImg:true,//个人认证缩略图
                urlApi:'/api/console/AuthInformationSRV?method=',
                approvalMessage:'',
                returnImgId:'',
                personImgBk:false,

            }
        },
        mounted:function () {
            let _self=this;
            if(common.getStoreData('userinfo').name!=undefined){
                _self.phone=common.getStoreData('userinfo').name;
            }
            _self.$parent.setActive(3,"auth_information");

            if(_self.status==0 || _self.status==1){
                    _self.showDetail();
                    _self.showSaveBtn1=false;
                    _self.inputDisable=true;
            }else if(_self.status==2){
                    _self.showDetail();
                    _self.showSaveBtn1=false;
                    _self.inputDisable=true;
            }else if(_self.status==6){
                    _self.showSaveBtn1=true;
            }

            $('#file').change(function() {
                files = this.files;
                if (files.length > 0) {
                    _self.file1Path=$('#file').val();

                    //显示图片
                    var $file = $(this);
                    var $img = $("#preview2");

                    let formData = new FormData();
                    formData.append('file', files[0]);
                    _self.$http.post('/api/console/AuthInformationSRV?method=saveFile', formData).then((response) => {
                        if(response.data.errno==0){
                            _self.returnImgId=response.data.info;
                            /*common.WarningBox(_self,'SAVE_SUCESS');*/
                            $img.attr('src',window.location.protocol + '//' + window.location.host+_self.returnImgId);
                            _self.thumbnailImg=false;
                            _self.personImgBk=true;
                            $('#file').val('');

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
            savePersonData:function () {
                let _self=this;
                let method="";
                if(_self.status==6){
                    method='addAuthentication';
                }else if(_self.status==2){
                    method='modifyAuthentication';
                }
                _self.personData.idType=$("input[name='optionsRadiosinline']:checked").val();
                _self.personData.customerType=1;
                for(var key in _self.personData){
                    if(_self.personData[key]=='' || _self.personData[key]==undefined){
                        common.WarningBox(_self,'CON_PRICE_001');
                        return;
                    }
                }
                if(_self.returnImgId==""){
                    common.WarningBox(_self,'IMG_01');
                    return;
                }else{
                    _self.personData.idPhoto=_self.returnImgId;
                }
                let reg=/^[0-9a-zA-Z]+$/;
                if(!reg.test(_self.personData.idNo)){
                    common.WarningBox(_self, 'USER_017');
                    return;
                }
                _self.personData.customerType=0;
                _self.personData.adress="";
                _self.$http.post(_self.urlApi+method,_self.personData).then((response) => {
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


            showDetail:function () {
                let _self=this;
                _self.$http.post(_self.urlApi+'getAuthInfo',{}).then((response) => {
                    if(response.data.errno==0){
                        if (response.data.info.length > 0) {
                            _self.getData = response.data.info[0];
                            _self.approvalMessage = _self.getData.approval_opinion;
                            _self.personData.realName = _self.getData.real_name;
                            _self.personData.idNo = _self.getData.id_no;
                            _self.returnImgId=_self.getData.id_photo;
                            if(_self.getData.id_type!=null){
                                var type=_self.getData.id_type.toString();
                                $("input[name='optionsRadiosinline'][value='" + type + "']").attr("checked",true);
                            }
                            if(_self.getData.id_photo!=""){
                                _self.thumbnailImg=false;
                                $("#preview2").attr('src',window.location.protocol + '//' + window.location.host+_self.getData.id_photo);
                                _self.personImgBk=true;
                            }

//                            alert(typeof(type));

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