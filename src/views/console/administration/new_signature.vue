<template>
    <div class="info-relative " v-cloak>
        <div class="new-sin-position ">
            <div class="new-sin-title">
                {{title}}
            </div>
            <div class="new-sin-gray">
                <p v-html="$t('newSin.p1')"></p>
            </div>
            <div class="new-sin-blue">
                <div class="sin-blue-top">
                    <p class="sin-blue-top-padding">
                        <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                        <span>{{$t('newSin.p2.span1')}}{{statusText}}</span>
                        <a v-show="status!=1" @click="linkTo('/console/auth_information')">{{$t('newSin.p2.a')}}</a>
                    </p>
                   <!-- <p>
                        <img src="../../../../public/static/images/img/consloe/administration/red-star.png" alt="">
                        <span>{{$t('newSin.p3.span1',['500'])}}</span>
                        <a  @click="linkTo('/console/recharge_step1')">{{$t('newSin.p3.a')}}</a>
                    </p>-->
                    <!--<p>
                        <img src="../../../../public/static/images/img/consloe/administration/red-star.png" alt="">
                        <span>{{$t('newSin.p4.span1')}}</span>
                        <select class="form-control sin-select" v-model="postData.application_id" :disabled=sigDisable>
                            <option :value='null'></option>
                            <option v-for="data in appList" :value='data.id'>{{data.name}}</option>
                        </select>
                        &lt;!&ndash;<span class="red-err">{{$t('MSG.SIN_01')}}</span>
                        <a>{{$t('newSin.p4.a')}}</a>&ndash;&gt;
                    </p>-->
                </div>
                <div class="sin-blue-bottom">
                   <!-- <p class="sin-blue-top-padding">
                        <span class="sin-span">{{$t('newSin.p5')}}</span>
                        <input v-model="postData.key" class="sin-input" type="text" :disabled=sigDisable>
                        <span class="red-err">{{$t('MSG.SIN_02')}}</span>
                    </p>-->
                    <p class="sin-blue-top-padding">
                        <span class="sin-span">{{$t('newSin.p6')}}</span>
                        <input v-model="postData.sin_value" class="sin-input" type="text" :disabled=sigDisable>
                        <span class="red-err">{{$t('MSG.SIN_03')}}</span>
                    </p>
                </div>

                <div>
                    <span class="red-err-witdh" :class="{'hidden':sinDetailArry.status!=2}">{{$t('personAuth.reject')}}{{sinDetailArry.approval_opinion}}</span>
                </div>
                <div class="sin-btn">
                    <button class="btn sin-blue-btn" @click="sigSubmit" :class="{'hidden':sigDisable==true}">{{$t('newSin.btn1')}}</button>
                    <button class="btn sin-gray-btn" v-show="id===null || id==='null'" @click="sigReset" :class="{'hidden':sigDisable==true}">{{$t('newSin.btn2')}}</button>
                    <button class="btn sin-gray-btn" @click="linkTo('/console/signature_list')"  v-show="id!==null && id!=='null'">{{$t('newSin.btn3')}}</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    export default{
        data:function () {
            return{
                id:this.$route.params.id.split(":")[1],
                urlApi:'/api/console/SignatureListSRV?method=',
                urlCommon:'/api/sundry?method=',
                title:'',
                status:'',
                money:'',
                statusText:'',
                postData:{
                    sin_value:'',
                    key:'',
                    application_id:null,
                },
                sinDetailArry:{
                    status:0,
                    approvalMessage:'',
                },
                appList:'',
                sin_value:'',
                sigDisable:false,
            }
        },
        name:'rechargeTop',
        mounted:function () {
            let _self=this;

            _self.getStatus('getCustomerAuthInfo');
            _self.getApplist();
           /* _self.getMoney('getSumRecharge');*/
            if(_self.id===null || _self.id==='null'){
                _self.title=_self.$t('newSin.title1');
                _self.sigDisable=false;
                _self.$parent.setActive(0,"new_signature/:null");
            }else{
              /*  _self.getData(_self.id);*/
                _self.sigDisable=true;
                _self.title=_self.$t('newSin.title2');
                _self.$parent.setActive(0,'signature_list');
            }
        },
        methods:{
            linkTo:function (url) {
               let _self=this;
               _self.$router.push({path:url});
            },
            isNull:function (str) {
                if(str===null || str==='null' || str==='') {
                    return true
                }else{
                    return false
                }
            },
            getStatus:function (method) {
                let _self=this;
                this.$http.post(_self.urlCommon+method,{customerId:common.getStoreData('userinfo').customer_id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.status=response.data.info[0].status;
                            if( _self.status==null ||  _self.status=="null"){
                                _self.status=3;
                                _self.statusText=_self.$t('newSin.p2.status3');
                            }else{
                                _self.statusText=_self.$t('newSin.p2.status'+_self.status);
                            }

                        }else{
                            _self.status=3;
                            _self.statusText=_self.$t('newSin.p2.status3');
                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            },
            getMoney:function (method) {
                let _self=this;
                this.$http.post(_self.urlCommon+method,{customerId:common.getStoreData('userinfo').customer_id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.money=response.data.info[0].totalMoney;
                            if(_self.money==null){
                                _self.money=0;
                            }
                        }else{
                            _self.money=0;
                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            },
            getApplist:function () {
                let _self=this;
                this.$http.post(_self.urlCommon+'getApplication',{customerId:common.getStoreData('userinfo').customer_id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.appList=response.data.info;
                            if(_self.id===null || _self.id==='null'){
                            }else{
                                if(_self.id!==null && _self.id!=='null'){
                                    _self.getData(_self.id);
                                }
                            }

                        }else{

                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            },
            sigSubmit:function () {
                let _self=this;
                if(_self.id==null || _self.id=='null'){
                    _self.addSin('addSignature')
                }else{
                    _self.addSin('modifySignature')
                }
            },
            addSin:function (method) {
                let _self=this;
                if(common.getStoreData('status').status!=1){
                    common.WarningBox(_self, 'SIN_04');
                    return;
                }
                /*if(_self.money<500){
                    common.WarningBox(_self, 'SIN_05');
                    return;
                }*/
                /*if(_self.isNull(_self.postData.application_id)){
                    common.WarningBox(_self, 'SIN_01');
                    return;
                }*/
                /*if(_self.isNull(_self.postData.key)){
                    common.WarningBox(_self, 'SIN_02');
                    return;
                }*/
                if(_self.isNull(_self.postData.sin_value)){
                    common.WarningBox(_self, 'SIN_03');
                    return;
                }
                if(_self.postData.sin_value.length<2 || _self.postData.sin_value.length>10){
                    common.WarningBox(_self, 'SIN_06');
                    return;
                }
                let params={
                   /* applicationId:_self.postData.application_id,
                    key:_self.postData.key,*/
                    sinValue:_self.postData.sin_value
                };
                if(_self.id==null || _self.id=='null'){

                }else{
                    params.id=_self.id;
                }
                this.$http.post(_self.urlApi+method,params).then((response)=>{
                    if(response.data.errno==0){
                        common.WarningBox(_self, 'SAVE_SUCESS');

                        if(_self.id==null || _self.id=='null'){
                            _self.sigReset();;
                        }else{
                            _self.sigDisable=true;
                        }
                        window.setTimeout(function(){
                            _self.linkTo('/console/signature_list');
                        },1500)
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            },
            getData:function (id) {
                let _self=this;
                _self.$http.post(_self.urlApi+'getSignature',{id:id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.sinDetailArry = response.data.info[0];
                            _self.postData.sin_value = _self.sinDetailArry.value;
                            _self.postData.key =  _self.sinDetailArry.key;
                            _self.postData.application_id = _self.sinDetailArry.applicationId;
                            if( _self.sinDetailArry.status==2){
                                _self.sigDisable=false;
                            }
                        }else{
                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },

            sigReset:function () {
                let _self=this;
                _self.postData.sin_value= '';
                _self.postData.key='';
                _self.postData.application_id="";
            },

        }

    }
</script>
<style>
    .bk-img{
        position: absolute;
        width: 1060px;
        height:967px;
        top:79px;
        left:216px;

    }
    .new-sin-position{
        position: relative;
        width: 1028px;
        height: 350px;
        padding:50px 0 0 40px;
        font-weight: 500;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    .new-sin-title{
        font-size: 18px;
        line-height: 18px;
        height: 40px;
        padding:0 0 20px 19px;
        border-bottom:1px solid #dddddd;
        margin-bottom: 20px;
        font-weight: 400;
    }
    .new-sin-gray{
        width: 100%;
        min-height: 130px;
        background:#f7f7f7;
        margin: 0 0 15px 0;
        position: relative;
    }
    .new-sin-gray p{
        display: inline-block;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        padding: 9px 0 0 19px;
    }
    .new-sin-blue{
        width: 100%;
        height: 290px;
        background:#f0fcff;
    }
    .sin-blue-top{
        height: 62px;
        border-bottom:1px solid  #dddddd;

    }
    .sin-blue-top p{
        font-size: 14px;
        line-height: 34px;
        padding-left: 21px;
    }
    .sin-blue-top p a{
        color: #00aeeb;
       border-bottom: 1px solid #00aeeb;
        vertical-align: middle;
    }
    .sin-blue-top .sin-blue-top-padding{
        padding-top: 10px;
    }
    .sin-blue-top .red-err,.sin-blue-bottom .red-err{
        color: #ff172f;
        padding: 0 5px;

    }
    .sin-blue-bottom p{
        font-size: 14px;
        line-height: 38px;
        padding-left: 37px;
    }
    .sin-select {
        border: solid 1px #808080;
        height: 20px;
        display: inline-block;
        width: 119px;
        color:#333333;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url("/static/images/img/consloe/administration/blue-drop.png") no-repeat scroll right center transparent;
        line-height: 14px;
        padding: 0 14px 0 10px ;
    }
    .sin-select::-ms-expand { display: none; }
    .sin-input{
        width: 119px;
        height: 20px;
        background: #f0fcff;
        border: 1px solid #808080;
        color:#333333;
        padding-left: 10px;
        margin-right: 7px;
        line-height: 20px;
    }
    .sin-blue-bottom .sin-blue-top-padding{
        padding-top: 14px;
    }
    .sin-blue-bottom .sin-span{
        display: inline-block;
        min-width: 70px;
    }
    .sin-btn{
        padding:13px 0 0 21px;
    }
    .sin-blue-btn,.sin-gray-btn{
        background:#41b0e3;
        color: #f6f6f6;
        min-width: 100px;
        height:30px;
        font-weight: 600;
        line-height: 14px;
    }
    .sin-gray-btn{
        background: #b3b3b3;
        margin-left: 16px;
    }
    .sin-blue-btn:hover,.sin-blue-btn:focus{
        background:#41b0e3;
        color: #f6f6f6;
    }
    .sin-gray-btn:hover,.sin-gray-btn:focus{
        background: #b3b3b3;
        color: #f6f6f6;
    }
    .red-err-witdh{
        color: #ff172f;
        padding-left:37px;
        width: 100%;
    }
</style>