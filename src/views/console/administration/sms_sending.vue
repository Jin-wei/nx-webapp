<template>
    <div class="info-relative " v-cloak>
        <div class="new-sms-position ">
            <div class="new-sin-title">
                {{$t('sms.title')}}
            </div>
            <div class="new-sms-gray">
                <p v-html="$t('sms.p7.rule')"></p>
            </div>
            <div class="new-sms-blue">
                <p class="sms-padding">
                    <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                    <span>{{$t('sms.p1.span')}}</span>
                    <select class="form-control sin-select" v-model="smsData.appId"  @change="getCommon('getTemplate','tem',1)">
                        <option value=''></option>
                        <option v-for="app in appList" :value='app.id'>{{app.name}}</option>
                    </select>
                    <span class="red-err"></span>
                    <!--<a href="">{{$t('newTem.p4.a')}}</a>-->
                </p>
                <div class="tem-bottom-div">
                   <!-- <img src="../../../../public/static/images/img/consloe/administration/red-star.png" alt="">-->
                    <span class="sin-span">{{$t('sms.p2.span')}}</span>
                    <select class="form-control sin-select" v-model="smsData.temId"  @change="checkApp()">
                        <option value=''></option>
                        <option v-for="tem in temList" :id="'t'+tem.id" :value='tem.id' :name="tem.signature_id" :alt="tem.content" :temptype="tem.type" >{{tem.name}}</option>

                    </select>
                    <span class="red-err"></span>
                    <!--<a href="">{{$t('newTem.p4.a')}}</a>-->
                </div>
                <div class="tem-bottom-div">
                   <!-- <img src="../../../../public/static/images/img/consloe/administration/red-star.png" alt="">-->
                    <span class="sin-span">{{$t('sms.p3.span')}}</span>
                    <select class="form-control sin-select" v-model="smsData.sigId" :disabled=sigDisable  @change="changeSin(1)">
                        <option value=''></option>
                        <option v-for="sig in sigList" :id="'s'+sig.id" :value='sig.id' :name="sig.value">{{sig.value}}</option>
                    </select>
                    <span class="red-err">{{$t('MSG.SMS_01')}}</span>
                    <!--<a href="">{{$t('newTem.p4.a')}}</a>-->
                </div>
                <div class="sms_textarea">
                    <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                    <textarea name="" id="1" cols="30" rows="10" v-model="smsData.number" :disabled="type==1"></textarea>
                    <div class="textarea-gray1">
                        <span>{{$t('sms.p4.small')}}</span>
                    </div>
                </div>
                <div class="sms-left">
                    <div class="tem-bottom-div">
                        <span class="sin-span">{{$t('sms.p5.span')}}</span>
                        <input class="sin-input" v-model="documentPath" type="text">
                        <span class="upSendImg">
                            <input class="browse" type="file" id="file"  accept=".csv"  multiple/>
                            <a class="blue-underline" href="">{{$t('sms.p5.a1')}}</a>
                   </span>
                        <!-- <a class="blue-a" >{{$t('sms.p5.a2')}}</a>-->
                        <a class="blue-a" style="padding-left: 39px"  v-on:click="downTem">{{$t('sms.p5.a3')}}</a>
                        <div class="textarea-gray2" >
                            <span>{{$t('sms.p5.small')}}</span>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="tem-bottom-div">
                        <span class="sin-span">{{$t('sms.p6.span')}}</span>
                        <input class="sin-input" type="text" id="choseDate" >
                        <a  class="blue-underline"  @click="showDate">{{$t('sms.p6.a1')}}</a>
                        <div class="textarea-gray2">
                            <span id="dateSpan">{{$t('sms.p6.small')}}</span>
                        </div>
                    </div>
                    <div class="clear"></div>

                    <div class="sms_textarea sms_textarea-padding" v-if="contentDisabled==false">
                        <span class="sin-span">{{$t('sms.p7.span')}}</span>
                        <textarea v-model="smsData.content"  id="2" cols="30" rows="10" oninput="if(value.length>1000)value=value.slice(0,1000)"  v-on:keyup="characterCont"></textarea>
                        <div class="textarea-gray1">
                            <span>{{$t('sms.p7.small',{hCharacter:hCharacter})}}</span>
                        </div>
                    </div>

                    <div class="sms_textarea sms_textarea-padding2" v-if="contentDisabled==true">
                        <span class="sin-tem-span">{{$t('sms.p7.span')}}</span>
                        <div class="sms-tem-content">
                            <span v-html="temcontentHtml"  class='variable'></span>
                        </div>
                        <div class="textarea-gray1 sms-tem-gray">
                            <span>{{$t('sms.p7.small2')}}</span>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="sms-btn">
                    <button class="btn sin-blue-btn" type="button" v-on:click="postHttp()">{{$t('sms.btn1')}}</button>
                    <button class="btn sin-gray-btn"  v-on:click="resetSms">{{$t('sms.btn2')}}</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    var isNull=function (str) {
        if(str===null || str==='null' || str==='') {
            return true
        }else{
            return false
        }
    };
    export default{
        data:function () {
            return{
//                money:this.$route.params.type.split(":")[1],
                urlApi:'/api/console/SmsSendingSRV?method=',
                urlCommon:'/api/sundry?method=',
                status:'',
                statusText:'',
                documentPath:'',
                appList:'',
                sigList:'',
                temList:'',
                hCharacter:'0',//已写字符
                smsData:{
                    appId:'',
                    sigId:'',
                    temId:'',
                    number:'',
                    time:'',
                    content:'',
                    uploadurl:'',
                },
                sigDisable:false,
                contentDisabled:false,
                temcontent:"",
                temcontentHtml:"",
                sendCount:0,
                type:0//0手动输入 1文件上传
            }
        },
        name:'rechargeTop',
        mounted:function () {
            let _self=this;
            _self.$parent.setActive(0,"sms_sending");

            $(function () {
                $('#choseDate').daterangepicker({
                    format: 'YYYY-MM-DD HH:mm',
                    singleDatePicker: true,
                    timePicker: true,
                    timePicker24Hour: true,
                    locale: common.daterangepickerenglishtime,
                    drops: "up",
                })
                $('#choseDate').val("");


                $('#choseDate').on('cancel.daterangepicker', function(ev, picker) {
                    //do something, like clearing an input
                    $('#choseDate').val('');
                });

            });




            _self.getCommon('getApplication','appList');
            _self.getCommon('getSignature','sig');
            _self.getCommon('getTemplate','tem');

            $('#file').change(function() {
                let files = this.files
                _self.documentPath='';
                if (files.length > 0) {
                    var reader = new FileReader();
                    reader.readAsText(files[0]);
                    reader.onload = loaded;
                    function loaded(evt) {
                        _self.type=1;
                        var fileString = evt.target.result;
                        fileString=fileString.replace(/(\r\n)|(\n)|(\n\r)|(\r)/g,',')
                        let fileString2=fileString.replace(/\,{2,}/g,',')
                        let phone="";
                        phone=fileString2.split(',');
                        if(phone.length-1>10000){
                            common.WarningBox(_self, 'SMS_07');
                            $('#file').val('');
                            return
                        }
                        _self.documentPath=_self.documentPath+$('#file').val()+';';
                        common.importLoading('show');
                        let formData = new FormData();
                        formData.append('file', files[0]);
                        _self.$http.post(_self.urlApi+'upload', formData).then((response) => {
                            if(response.data.errno==0){
                                common.importLoading();
                                _self.smsData.number=fileString2;
                                common.WarningBox(_self, 'SMS_05');
                                _self.smsData.uploadurl=response.data.info.uploadurl.url;
                                $('#file').val('');
                            }else{
                                common.importLoading();
                                common.dealConsolError(_self, response)
                                $('#file').val('');
                            }
                        }, (response) => {
                            $('#file').val('');
                            common.importLoading();
                            common.dealConsolError(_self, response)
                        });

                    }

                }

            });
        },
        methods:{
            showDate:function () {
                $('#choseDate').click()
            },

            //search 1 查询模版
            getCommon:function (method,type,search) {
                let _self=this;
                let params={};
                if(search==1){
                    params.applicationId=_self.smsData.appId;
                    _self.smsData.temId="";
                    _self.smsData.sigId="";
                    _self.smsData.content="";
                    _self.sigDisable=false;
                    _self.contentDisabled=false;
                }
                params.customerId=common.getStoreData('userinfo').customer_id;
                for(var key in params){
                    if(params[key]===''){
                        delete params[key];
                    }
                }
                params=JSON.stringify(params);
                this.$http.post(_self.urlApi+method,params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            if(type=='tem'){
                                _self.temList=response.data.info;
                            }else if(type=='appList'){
                                _self.appList=response.data.info;
                            }else if(type=='sig'){
                                _self.sigList=response.data.info;
                            }

                        }else{
                            if(type=='tem'){
                                _self.temList='';
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
            downTem:function () {
                let _self=this;
                common.consoleDownFile(_self,_self.urlApi+'getSendPhoneList',{});
            },
            checkApp:function () {
                let _self=this;
                window.setTimeout(function () {
                    if(_self.smsData.temId!='' && _self.smsData.temId!=undefined){
                        _self.smsData.sigId=$("#t"+_self.smsData.temId).attr("name");
                        _self.temcontent=$("#t"+_self.smsData.temId).attr("alt");
                        _self.temcontentHtml=_self.temcontent.replace(/\{[A-Za-z0-9]*\}/g, "\<input\ type='text' oninput='if(value.length>30)value=value.slice(0,30)'>\<\/input\>");
                        _self.contentDisabled=true;
                        _self.sigDisable=true;

                    }else{
                        _self.contentDisabled=false;
                        _self.sigDisable=false;
                        _self.smsData.content='';
                        if(_self.smsData.sigId!=''){
                            _self.smsData.sigId='';
                        }

                    }
                },300)

            },

            changeSin:function (type) {
                let _self=this;
                if(type==1){
                    window.setTimeout(function () {
                        _self.smsData.content="";
                    },300)
                }else if(type==2){

                }


            },


            checkNumber:function (number) {
                let _self=this;
                let reg = /[\,]/;
                let regN = /^([0-9]*,?)+$/;
                if(regN.test(number)){
                    return number;
                }else{
                    common.WarningBox(_self,'SMS_02');
                    return ""
                }
            },

            postHttp: function () {
                let _self = this;
                let params = {};
                if (_self.smsData.number === "") {
                    common.WarningBox(_self, 'SMS_01');
                    return
                } else {

                }
                if(isNull(_self.smsData.appId)){
                    common.WarningBox(_self, 'SMS_03');
                    return
                }
                //手动 浏览
                if(_self.type==1){
                    if(_self.smsData.uploadurl==""){
                        common.WarningBox(_self, 'SMS_04');
                        return
                    }else{
                        params.uploadurl=_self.smsData.uploadurl;
                    }
                }else if(_self.type==0){
                    if (_self.checkNumber(_self.smsData.number) == "") {
                        return
                    }else {
                        let phone="";
                        params.phone=new Array();
                        phone=_self.smsData.number.split(',');
                        if(phone.length-1>10000){
                            common.WarningBox(_self, 'SMS_07');
                            return
                        }
                        for(let i=0;i<phone.length;i++){
                            if(phone[i]!=="" && phone[i]!==null){
                                params.phone.push(phone[i]);
                            }
                        }
                    }

                }

                params.appid=_self.smsData.appId;


                if(!isNull(_self.smsData.sigId)){
                    params.signaid=_self.smsData.sigId;
                    params.signavalue=$("#s"+_self.smsData.sigId).attr("name");
                }

                if(isNull(_self.smsData.temId)){
                    params.content=_self.smsData.content;
                    params.temptype='3';
                }else{
                    params.tempid=_self.smsData.temId;
                    params.temptype=$("#t"+_self.smsData.temId).attr("temptype");
                    let temp=[]
                    $(".variable input").each(function () {
                        temp.push($(this).val());
                    });

                    let resultStr = ''
                    let contentString = _self.temcontentHtml
                    let n = 0;
                    let inputText="\<input\ type='text' oninput='if(value.length>30)value=value.slice(0,30)'>\<\/input\>"
                    while(resultStr != contentString) {
                        resultStr = contentString
                        contentString=contentString.replace(inputText,temp[n]);
                        n++
                    }
                    params.content=contentString;

                }
                params.customerid=common.getStoreData('userinfo').customer_id;

                let msg = _self.$t('sms.sure');
                if(!isNull($('#choseDate').val())){
                    params.time=$('#choseDate').val();
                }
                params=JSON.stringify(params);
                common.dealConfrimCommon(msg, function () {
                    //返回请求才可点击
                    if( _self.sendCount==0){
                        _self.sendCount++;
                    }else{
                        return
                    }
                    common.importLoading('show');
                    _self.$http.post(_self.urlApi+'sendSms', params).then((response) => {
                        common.importLoading();
                        if (response.data.errno == 0) {
                            common.WarningBox(_self, 'SMS_06');
                            _self.sendCount=0;
                            _self.resetSms();

                        } else {
                            common.dealConsolError(_self, response);
                            _self.sendCount=0;
                        }
                    }, (response) => {
                        common.importLoading();
                        common.dealConsolError(_self, response);
                        _self.sendCount=0;
                    });
                })


            },
            resetSms: function () {
                let _self = this;
                _self.smsData={
                    appId: '',
                    sigId: '',
                    temId: '',
                    number: '',
                    time: '',
                    content: '',
                    uploadurl:"",
                },
                $("[name='service']").removeAttr("checked");
                $('.sin-input2').val('');
                $('#choseDate').val("");
                _self.documentPath="";
                _self.temcontentHtml="";
                _self.contentDisabled=false;
                _self.sigDisable=false;
                _self.type=0;

            },
            characterCont:function () {
                let _self=this;
                _self.hCharacter= _self.smsData.content.length;
            },

        }

    }
</script>
<style>
    .bk-img{
        position: absolute;
        width: 1041px;
        height:632px;
        top:79px;
        left:220px;

    }
    .new-sms-position{
        position: relative;
        width: 1028px;
        min-height: 550px;
        padding:50px 0 0 40px;
        font-weight: 500;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        margin-bottom: 20px;
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

    .new-tem-gray p{
        display: inline-block;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        padding: 13px 0 0 20px;
    }
    .new-sms-blue{
        width: 100%;
        min-height: 520px;
        background:#f0fcff;

    }

    .new-sms-blue p{
        font-size: 14px;
        line-height: 35px;
        padding-left: 20px;
    }
    .new-sms-blue p a{
        color: #00aeeb;
        border-bottom: 1px solid #00aeeb;
        vertical-align: middle;
        cursor: pointer;
    }
    .blue-underline{
        color: #00aeeb;
        border-bottom: 1px solid #00aeeb;
        cursor: pointer;
    }
    .blue-a{
        color: #00aeeb;
        cursor: pointer;
        padding: 0 0 0 7px;
    }
    .new-sms-blue .sin-top-padding{
        padding-top: 10px;
    }
    .new-sms-blue .sin-top-padding2{
        padding-top: 13px;
    }
    .new-sms-blue .red-err,.tem-blue-bottom .red-err{
        color: #ff172f;
        padding: 0 7px;

    }
    .new-sms-blue .sms_textarea .textarea-red-err{
        display: block;
        height: 22px;
        color: #ff172f;
        padding:3px 0 0 87px;
    }
    .new-sms-blue p,.new-sms-blue .tem-bottom-div{
        font-size: 14px;
        line-height: 35px;
        padding-left: 20px;
        position: relative;
    }
    .new-sms-blue .tem-bottom-div{
        padding-left: 34px;
    }
    .tem-blue-bottom p img,.tem-blue-top p img{
        padding-right: 1px;
        width: 10px;
        height: 10px;
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
    .sms-tem-content input{
        display: inline-block;
        width: 80px;
        height: 20px;
        background: #f0fcff;
        border: 1px solid #808080;
        color:#333333;
        padding-left: 10px;
        margin:0 7px;
        line-height: 23px;
    }
    .new-sms-blue .sin-span{
        display: inline-block;
        min-width: 70px;
    }
    .sin-tem-span{
        display: inline-block;
        min-width: 70px;
        float: left;
        line-height: 29px;
    }
    .new-sms-blue .gray-small{
        position: absolute;
        display: inline-block;
        font-size: 12px;
        color: #c5c8c9;
        line-height: 12px;
        padding: 0;
        margin: 0;
        top:35px
    }
    .textarea-gray1,.textarea-gray2{
        display: block;
        font-size: 12px;
        color: #c5c8c9;
        line-height: 16px;
        min-height: 21px;
        max-width: 860px;
        padding: 0 0 0 99px;
        margin: 0;
    }
    .sms-tem-gray{
        /*padding: 0 0 0 60px;*/
    }
    .sms-tem-content{
        float: left;
        min-height:80px;
        width: 325px;
        line-height: 23px;
        margin-top: 3px;
    }
    .textarea-gray2{
        line-height: 9px;
        padding: 0 0 0 85px;
        height: 15px;
    }
    .new-sms-blue .sms_textarea{
        vertical-align: top;
        line-height: 14px;
        padding:8px 0 0 20px

    }
    .new-sms-blue .sms_textarea-padding{
        padding:8px 0 0 34px;

    }
    .new-sms-blue .sms_textarea-padding2{
        padding:0 0 0 34px;

    }
    .sms-left{
        width:470px;
        float: left;
    }
    .new-sms-blue .sms_textarea span{
        display: inline-block;
        vertical-align:top;
    }
    .new-sms-blue .sms_textarea img
    {
        display: inline-block;
        vertical-align:top;
        padding-right: 1px;
    }
    .new-sms-blue .sms_textarea  textarea{
        width: 337px;
        height: 80px;
        background: #f0fcff;
        border: 1px solid #808080;
        color:#333333;
        padding-left: 10px;
        margin-right: 7px;
    }

    .sms-btn{
        padding:20px 0 0 21px;
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
    .new-sms-blue .sms-padding{
        padding-top: 12px;
    }
    .upSendImg{
        overflow:hidden;
        position:absolute
    }
    #file{
        position:absolute;
        z-index:100;
        margin-left:0px;
        font-size:60px;
        opacity:0;
        filter:alpha(opacity=0);
        margin-top:0px;
        cursor: pointer;
    }

    .new-sms-gray {
        width: 100%;
        min-height: 131px;
        background: #f7f7f7;
        margin: 0 0 15px 0;
        position: relative;
    }
    .new-sms-gray p{
        display: inline-block;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        width: 97%;
        padding: 13px 0 0 20px;
    }
    .sms-example{
        float: left;
        width: 400px;
        margin: 20px 0 0 30px;
        border:1px solid #f0f0f0;
        border-radius: 10px;
    }

</style>