<template>
    <div class="info-relative " v-cloak>
        <div class="new-tem-position ">
            <div class="new-sin-title">
                {{title}}
            </div>
            <div class="new-tem-gray">
                <p v-html="$t('newTem.p1')"></p>
            </div>
            <div class="new-tem-blue">
                <div class="tem-blue-top">
                    <p class="sin-top-padding">
                        <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                        <span>{{$t('newTem.p2.span1')}}{{statusText}}</span>
                        <a  v-show="status!=1" href="">{{$t('newTem.p2.a')}}</a>
                    </p>
                   <!-- <p>
                        <img src="../../../../public/static/images/img/consloe/administration/red-star.png" alt="">
                        <span>{{$t('newTem.p3.span1',['500'])}}</span>
                        <a  @click="linkTo('/console/recharge_step1')">{{$t('newTem.p3.a')}}</a>
                    </p>-->
                    <p>
                        <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                        <span>{{$t('newTem.p4.span1',['500'])}}</span>
                        <select class="form-control sin-select" v-model="temData.application_id" :disabled=temDisable>
                            <option :value='null'></option>
                            <option v-for="app in appList" :value='app.id'>{{app.name}}</option>
                        </select>
                        <span class="red-err">{{$t('MSG.SIN_01')}}</span>
                        <!--<a href="">{{$t('newTem.p4.a')}}</a>-->
                    </p>
                </div>
                <div class="tem-blue-bottom">
                    <p class="sin-top-padding2">
                        <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                        <span class="sin-span">{{$t('newTem.p5.span')}}</span>
                        <select class="form-control sin-select" v-model="temData.type" :disabled=temDisable>
                            <option :value='null'></option>
                            <option v-for="type in TemTypeArr" :value='type.type'>{{type.name}}</option>
                        </select>
                    </p>
                    <div class="tem-bottom-div">
                        <div class="pull-left">
                            <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                            <span class="sin-span">{{$t('newTem.p6.span')}}</span>
                        </div>
                        <div class="pull-left">
                            <div>
                                <input class="sin-input" type="text" v-model="temData.name" :disabled=temDisable>
                            </div>
                                <span class="gray-small">{{$t('newTem.p6.small')}}</span>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <p class="sin-top-padding2">
                        <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                        <span class="sin-span">{{$t('newTem.p7.span')}}</span>
                        <select class="form-control sin-select"  v-model="temData.signature_id" :disabled=temDisable>
                            <option :value='null'></option>
                            <option v-for="sig in sigList" :value='sig.id'>{{sig.value}}</option>
                        </select>
                        <span class="red-err">{{$t('MSG.TEM_01')}}</span>
                    </p>
                    <div class="tem_textarea">
                        <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                        <span class="sin-span">{{$t('newTem.p8')}}</span>
                        <textarea name="" id="1" cols="30" rows="10" v-model="temData.content" :disabled=temDisable></textarea>
                        <div class="textarea-red-err">
                            <span>{{$t('MSG.TEM_02')}}</span>
                        </div>
                    </div>
                    <div class="tem_textarea tem_textarea-padding">
                        <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                        <span class="sin-span">{{$t('newTem.p9')}}</span>
                        <textarea name="" id="2" cols="30" rows="10" v-model="temData.comments" :disabled=temDisable></textarea>
                    </div>
                    <div>
                        <span class="red-err-witdh" :class="{'hidden':temData.status!=2}">{{$t('personAuth.reject')}}{{temData.approval_opinion}}</span>
                    </div>
                </div>
                <div class="sin-btn">
                    <button class="btn sin-blue-btn" @click="temSubmit" :class="{'hidden':temDisable==true}">{{$t('newTem.btn1')}}</button>
                    <button class="btn sin-gray-btn" v-show="id===null || id==='null'" :class="{'hidden':temDisable==true}" @click="temReset">{{$t('newTem.btn2')}}</button>
                    <button class="btn sin-gray-btn" @click="linkTo('/console/template_list')"  v-show="id!==null && id!=='null'">{{$t('newTem.btn3')}}</button>
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
                urlApi:'/api/console/TemplateListSRV?method=',
                urlCommon:'/api/sundry?method=',
                title:'',
                status:'',
                statusText:'',
                money:'',
                appList:"",
                sigList:'',
                getTem:'',
                TemTypeArr:{
                    status:0,
                    approvalMessage:'',
                },
                temData:{
                    application_id:'',
                    signature_id:'',
                    name:'',
                    type:'',
                    content:'',
                    comments:''
                },
                temDisable:false
            }
        },
        name:'rechargeTop',
        mounted:function () {
            let _self=this;
            _self.getCommon('getApplication', 'appList');
            _self.getTemType();
            if(_self.id==null || _self.id=='null'){
                _self.title=_self.$t('newTem.title1');
                _self.$parent.setActive(0,"new_template/:null");
            }else{
                _self.temDisable=true;
                _self.title=_self.$t('newTem.title2');
                _self.$parent.setActive(0,'template_list');
            }
            _self.status = common.getStoreData('status').status
            if (_self.status == null || _self.status == "null") {
                _self.status = 3;
                _self.statusText = _self.$t('newSin.p2.status3');
            } else {
                _self.statusText = _self.$t('newSin.p2.status' + _self.status);
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
            getCommon:function (method,type) {
                let _self=this;
                this.$http.post(_self.urlCommon+method,{customerId:common.getStoreData('userinfo').customer_id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            /*if (type == 'money') {
                                _self.money = response.data.info[0].totalMoney;
                                if (_self.money == null) {
                                    _self.money = 0;
                                }
                                _self.getCommon('getCustomerAuthInfo', 'status');

                            } */
                            if (type == 'status') {
                                _self.status = response.data.info[0].status;
                                if (_self.status == null || _self.status == "null") {
                                    _self.status = 3;
                                    _self.statusText = _self.$t('newSin.p2.status3');
                                } else {
                                    _self.statusText = _self.$t('newSin.p2.status' + _self.status);
                                }

                            } else if (type == 'appList') {
                                _self.appList = response.data.info;
                                _self.getCommon('getSignature', 'sig');
                            } else if (type == 'sig') {
                                _self.sigList = response.data.info;
                                _self.getTemType();
                            }

                        }else{
                            /*if(type=='money'){
                                _self.money=0;
                            }*/
                            if(type=='status'){
                                _self.status=3;
                                _self.statusText=_self.$t('newSin.p2.status3');
                            }else if(type == 'appList'){
                                _self.appList="";
                            }else if(type=='sig'){
                                _self.sigList='';
                            }

                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            },
            temSubmit:function () {
                let _self=this;
                if(_self.id==null || _self.id=='null'){
                    _self.postTem('addTemplate')
                }else{
                    _self.postTem('modifyTemplate')
                }
            },
            postTem:function (method) {
                let _self=this;
                if(common.getStoreData('status').status!=1){
                    common.WarningBox(_self, 'SIN_04');
                    return;
                }
                /*if(_self.money<500){
                    common.WarningBox(_self, 'SIN_05');
                    return;
                }*/
                if(_self.isNull(_self.temData.application_id)){
                    common.WarningBox(_self, 'SIN_01');
                    return;
                }
                /*if(_self.isNull(_self.temData.signature_id)){
                    common.WarningBox(_self, 'TEM_01');
                    return;
                }*/
                if(_self.isNull(_self.temData.name)){
                    common.WarningBox(_self, 'TEM_02');
                    return;
                }
                if(_self.isNull(_self.temData.content)){
                    common.WarningBox(_self, 'TEM_03');
                    return;
                }
                if(_self.isNull(_self.temData.type)){
                    common.WarningBox(_self, 'TEM_04');
                    return;
                }
                let params={
                    applicationId:_self.temData.application_id,
                    signatureId:_self.temData.signature_id,
                    name:_self.temData.name,
                    type:_self.temData.type,
                    content:_self.temData.content,
                    comments:_self.temData.comments
                };
                if(_self.id==null || _self.id=='null'){

                }else{
                    params.id=_self.id;
                }
                this.$http.post(_self.urlApi+method,params).then((response)=>{
                    if(response.data.errno==0){
                        common.WarningBox(_self, 'SAVE_SUCESS');
                        if(_self.id==null || _self.id=='null'){
                            _self.temReset();
                        }else{
                            _self.temDisable=true;
                        }


                        window.setTimeout(function(){
                            _self.linkTo('/console/template_list');
                        },1500)

                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            },

            //获得模版类型
            getTemType:function () {
                let _self=this;
                _self.$http.post(_self.urlApi+'getTemplateType',{}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.TemTypeArr = response.data.info;
                            if(_self.id!==null && _self.id!=='null'){
                                _self.getData(_self.id);
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
            //获得详情
            getData:function () {
                let _self=this;
                _self.$http.post(_self.urlApi+'getTemplate',{id:_self.id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.temData= response.data.info[0];
                            //0审核中 1成功 2驳回
                            if( _self.temData.status==2){
                                _self.temDisable=false;
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
            temReset:function () {
                let _self = this;
                _self.temData = {
                    application_id: '',
                    signature_id: '',
                    name: '',
                    type: '',
                    content: '',
                    comments: ''
                }
            },


        }

    }
</script>
<style>
    .bk-img{
        position: absolute;
        width: 923px;
        height:697px;
        top:82px;
        left:220px;

    }
    .new-tem-position{
        position: relative;
        width: 1028px;
        height: 860px;
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
    .new-tem-gray{
        width: 100%;
        min-height: 131px;
        background:#f7f7f7;
        margin: 0 0 15px 0;
        position: relative;
    }
    .new-tem-gray p{
        display: inline-block;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        padding: 13px 0 0 20px;
    }
    .new-tem-blue{
        width: 100%;
        height: 550px;
        background:#f0fcff;
    }
    .tem-blue-top{
        height: 100px;
        border-bottom:1px solid  #dddddd;

    }
    .tem-blue-top p{
        font-size: 14px;
        line-height: 34px;
        padding-left: 20px;
    }
    .tem-blue-top p a{
        color: #00aeeb;
        border-bottom: 1px solid #00aeeb;
        vertical-align: middle;
    }
   .tem-blue-top .sin-top-padding{
        padding-top: 10px;
    }
    .tem-blue-bottom .sin-top-padding2{
        padding-top: 13px;
    }
    .tem-blue-top .red-err,.tem-blue-bottom .red-err{
        color: #ff172f;
        padding: 0 5px;

    }
    .tem-blue-bottom .tem_textarea  .textarea-red-err{
        display: block;
        height: 22px;
        color: #ff172f;
        padding:3px 0 0 87px;
    }
    .tem-blue-bottom p,.tem-blue-bottom .tem-bottom-div{
        font-size: 14px;
        line-height: 39px;
        padding-left: 20px;
        position: relative;
    }
    .tem-blue-bottom p img,.tem-blue-top p img{
        padding-right: 1px;
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
        margin-left: 5px;
        line-height: 20px;
    }
    .tem-blue-bottom .sin-span{
        display: inline-block;
        min-width: 70px;
    }
    .tem-blue-bottom .gray-small{
        position: absolute;
        display: inline-block;
        font-size: 12px;
        color: #c5c8c9;
        line-height: 12px;
        padding: 0;
        margin: 0;
        top:35px
    }
    .tem-blue-bottom .tem_textarea{
        vertical-align: top;
        line-height: 14px;
        padding:10px 0 0 20px

    }
    .tem-blue-bottom .tem_textarea span{
        display: inline-block;
        vertical-align:top;
    }
    .tem-blue-bottom .tem_textarea img
    {
        display: inline-block;
        vertical-align:top;
        padding-right: 1px;
    }
    .tem-blue-bottom .tem_textarea  textarea{
        width: 325px;
        height: 80px;
        background: #f0fcff;
        border: 1px solid #808080;
        color:#333333;
        padding-left: 10px;
        margin-right: 7px;
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
        padding-left:20px;
        width: 100%;
    }
</style>