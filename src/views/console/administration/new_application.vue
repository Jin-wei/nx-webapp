<template>
    <div class="info-relative " v-cloak>

        <div class="new-app-position ">
            <div class="new-sin-title">
                {{title}}
            </div>
            <div class="new-app-blue">
                <p class="newapp-padding">
                    <img src="/static/images/img/consloe/administration/red-star.png" alt="">
                    <span class="newapp-span">{{$t('newApp.p1')}}</span>
                    <input class="sin-input" v-model="postData.name" type="text" :disabled=appDisable>
                    <span class="red-err">{{$t('MSG.NEWAPP_01')}}</span>
                    <!--<a href="">{{$t('newTem.p4.a')}}</a>-->
                </p>
                <div class="newapp_textarea">
                    <span class="newapp-span">{{$t('newApp.p2.span')}}</span>
                    <textarea id="whiteList" name="" v-model="postData.white_list" cols="30" rows="10" :disabled="changeDisable"></textarea>
                    <div class="app-textarea-gray1">
                        <span>{{$t('newApp.p2.small')}}</span>
                    </div>
                </div>
               <!-- <div class="tem-bottom-div">
                    <span class="newapp-span">{{$t('newApp.p3.span')}}</span>
                    <input class="sin-input" v-model="documentPath" type="text" :disabled=appDisable>
                    <span class="upSendImg">
                            <input class="browse" type="file" id="file"  accept=".csv"  multiple/>
                             <a class="blue-a" href="">{{$t('newApp.p3.a1')}}</a>
                   </span>
                   &lt;!&ndash; <a class="blue-a"  style="padding-left: 45px">{{$t('newApp.p3.a2')}}</a>&ndash;&gt;
                    <a class="blue-a" style="padding-left: 65px" v-on:click="downTem">{{$t('newApp.p3.a3')}}</a>
                    <div class="app-textarea-gray2">
                        <span>{{$t('newApp.p3.small')}}</span>
                    </div>
                </div>-->
                <div class="clear"></div>
                <div class="newapp_textarea2 newapp_textarea-padding1"  :disabled=changeDisable>
                    <span class="pull-left newapp-span">{{$t('newApp.p4.span')}}</span>
                    <div class="service-border pull-left">
                        <p v-for="span in getServiceArry">
                            <label><input name="service" type="checkbox" :value=span.id >{{span.name}}</label>
                            <input class="sin-input2" type="text" :id="'service'+span.id" :placeholder="$t('newApp.p4.plac')">
                        </p>
                    </div>
                    <div class="service-border pull-left">
                        <p>
                            <input class="sin-input2" type="text" v-model="postData.sms_mo_url"  :placeholder="$t('newApp.p6')">
                        </p>
                    </div>
                </div>
                <div class="clear"></div>

                <div class="newapp_textarea2 newapp_textarea-padding2" >
                    <span class="newapp-span">{{$t('newApp.p5')}}</span>
                    <textarea name=""  v-model="postData.comments" cols="30" rows="10" :disabled=appDisable></textarea>
                </div>

                <div class="newapp_textarea2 newapp_textarea-padding2" >
                    <span class="newapp-span red-err red-err-witdh" :class="{'hidden':getDetail.status!=2}">{{$t('personAuth.reject')}}{{getDetail.approval_opinion}}</span>
                </div>

                <div class="newapp-btn">
                    <button class="btn sin-blue-btn" @click="submitApp" :class="{'hidden':appDisable==true}">{{$t('newApp.btn1')}}</button>
                    <button class="btn sin-gray-btn" v-show="id===null || id==='null'" @click="resetApp">{{$t('newApp.btn2')}}</button>
                    <button class="btn sin-blue-btn" @click="changeApp" v-show="changeDisable==false && getDetail.status==1" style="margin-left: 10px">{{$t('newApp.btn4')}}</button>
                    <button class="btn sin-gray-btn" v-show="id!==null && id!=='null'" @click="linkTo('/console/application_list')">{{$t('newApp.btn3')}}</button>
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
//                money:this.$route.params.type.split(":")[1],
                urlApi:'/api/console/ApplicationListSRV?method=',
                id:this.$route.params.id.split(":")[1],
                statusText:'',
                documentPath:'',
                title:'',
                getServiceArry:'',
                postData:{
                    name:'',
                    white_list:'',
                    comments:'',
                    service_Item:'',
                    sms_mo_url:'',
                },
                getDetail:{
                    status:0,
                    approvalMessage:'',
                },
                appDisable:true,
                changeDisable:true,
            }
        },
        name:'rechargeTop',
        mounted:function () {
            let _self=this;
          /*  _self.postData.white_list="192.2.3.4/n192.2.3.4";*/
            _self.getService();
            if(_self.id==null || _self.id=='null'){
                _self.title=_self.$t('newApp.title1');
                _self.appDisable=false;
                _self.changeDisable=false;
                _self.$parent.setActive(0,"new_application/:null");
            }else{
                _self.appDisable=true;
                _self.title=_self.$t('newApp.title2');
                _self.$parent.setActive(0,'application_list');
            }
            $('#file').change(function() {
                let files = this.files
                if (files.length > 0) {
                    console.log(123456);
                    var reader = new FileReader();
                    reader.readAsText(files[0]);
                    reader.onload = loaded;
                    function loaded(evt) {
                        var fileString = evt.target.result;
                        fileString=fileString.replace(/\r/g,'\n')
                        _self.postData.white_list=fileString.substr(9);
                    }

                }
            });


        },
        methods: {
            linkTo:function (url) {
                let _self=this;
                _self.$router.push({path:url});
            },
            getService:function () {
                let _self=this;
                this.$http.post(_self.urlApi+'getService',{}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.getServiceArry=response.data.info;
                            if(_self.id!='null'){
                                let params={
                                    id:_self.id
                                }
                                _self.getData('getApplicationService',params);
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
            submitApp:function () {
                let _self=this;
                if(_self.id=='null' || _self.id==null){
                    _self.postApp('addApplication');
                }else{
                    _self.postApp('modifyApplication');
                }
            },
            postApp:function (method) {
                let _self=this;
                if(common.getStoreData('status').status!=1){
                    common.WarningBox(_self, 'SIN_04');
                    return;
                }
                let toList='';
                let serviceItem=[];
                let flag = 0;
                if(_self.postData.white_list!=""){
                    toList=_self.checkWriteList(_self.postData.white_list);
                }

                $("input:checkbox[name='service']:checked").each(function() {
                    let service={};
                    service.serviceId=$(this).attr('value');
                    service.dr=$('#'+'service'+service.serviceId).val();
                    serviceItem.push(service);
                    flag=flag+1;
                });

                if(_self.postData.name=="" || _self.postData.name==null){
                    common.WarningBox(_self, 'APP_02');
                    return;
                }else if(_self.postData.name.length<2 || _self.postData.name.length>10){
                    common.WarningBox(_self, 'APP_04');
                    return;

                }else if(flag==0) {
                    common.WarningBox(_self, 'APP_01');
                    return;
                }

                let params = {
                    name: _self.postData.name,
                    comments: _self.postData.comments,
                    serviceItem: serviceItem,
                    smsMoUrl: _self.postData.sms_mo_url,
                };
                if(toList!=null){
                    params.whiteList=toList;
                }else{
                    return
                }
                if(_self.id!='null'){
                    params.id=_self.id;
                }
                params=JSON.stringify(params);
                this.$http.post(_self.urlApi + method, params).then((response) => {
                    if (response.data.errno == 0) {
                        common.WarningBox(_self, 'SAVE_SUCESS');
                        if(_self.id==null || _self.id=='null'){
                            _self.resetApp();
                        }else{
                            _self.appDisable=true;
                        }
                        window.setTimeout(function(){
                            _self.linkTo('/console/application_list');
                        },1500)
                    } else {
                        common.dealConsolError(_self, response);
                    }
                }, (response) => {
                    common.dealConsolError(_self, response);
                });
            },
            getData:function (method,params) {
                //0 获得列表, 1删除，2获得详情
                let _self=this;
                let toList='';
                _self.$http.post(_self.urlApi+method,params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0) {
                            _self.getDetail=response.data.info[0];
                            _self.postData.name= _self.getDetail.name;
                            _self.postData.comments= _self.getDetail.comments;
                            _self.postData.sms_mo_url=_self.getDetail.sms_mo_url;
                            if(_self.getDetail.white_list!="" && _self.getDetail.white_list!=null){
/*                                toList=_self.getDetail.white_list.replace(',','\n');*/

                                let reg = /[,]+/;
                                if(reg.test(_self.getDetail.white_list)){
                                    toList=_self.getDetail.white_list.replace(/,/g,'\n');
                                }else{
                                    toList=_self.getDetail.white_list;
                                }
                                _self.postData.white_list=toList;


                            }
                            //0审核中 1成功 2驳回
                            if( _self.getDetail.status==2){
                                _self.appDisable=false;
                                _self.changeDisable=false;

                            }
                            if( _self.getDetail.status==1){
                                _self.changeDisable=false;
                            }

                            for(var i=0;i<_self.getDetail.serviceArr.length;i++){
                                let value=this.getDetail.serviceArr[i].id;
                                $("input:checkbox[value='"+value+"']").attr('checked','true');
                                $('#service'+value).val(this.getDetail.serviceArr[i].dr);

                            }

                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                })
            },
            changeApp:function () {
                let _self=this;
                let toList='';
                let serviceItem=[];
                let flag = 0;
                if(_self.postData.white_list!=""){
                    toList=_self.checkWriteList(_self.postData.white_list);
                }

                $("input:checkbox[name='service']:checked").each(function() {
                    let service={};
                    service.serviceId=$(this).attr('value');
                    service.dr=$('#'+'service'+service.serviceId).val();
                    serviceItem.push(service);
                    flag=flag+1;
                });

                if(_self.postData.name=="" || _self.postData.name==null){
                    common.WarningBox(_self, 'APP_02');
                    return;
                }else if(_self.postData.name.length<2 || _self.postData.name.length>10){
                    common.WarningBox(_self, 'APP_04');
                    return;

                }else if(flag==0) {
                    common.WarningBox(_self, 'APP_01');
                    return;
                }

                let params = {
                    id:_self.id,
                    serviceItem: serviceItem,
                    smsMoUrl: _self.postData.sms_mo_url,
                };
                if(toList!=null){
                    params.whiteList=toList;
                }else{
                    return
                }
                params=JSON.stringify(params);
                this.$http.post(_self.urlApi + 'modifyApplicationOther', params).then((response) => {
                    if (response.data.errno == 0) {
                        common.WarningBox(_self, 'SAVE_SUCESS');
                        if(_self.id==null || _self.id=='null'){
                            _self.resetApp();
                        }else{
                            _self.appDisable=true;
                        }
                        window.setTimeout(function(){
                            _self.linkTo('/console/application_list');
                        },1500)
                    } else {
                        common.dealConsolError(_self, response);
                    }
                }, (response) => {
                    common.dealConsolError(_self, response);
                });
            },

            resetApp:function () {
                let _self=this;
                _self.postData={
                        name:'',
                        white_list:'',
                        comments:'',
                        service_Item:'',
                };
                $("[name='service']").removeAttr("checked");
                $("[name='service']").prop("checked", false);
                $('.sin-input2').val('');
                _self.documentPath="";

            },
            checkWriteList:function (list) {
                let _self=this;
                let ipArry="";
                let newIpArry="";
                let reg = /[\n]+/g;
                let ipTest=/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
                if(reg.test(list)){
                    ipArry=list.split(/\n/g);
                    for(var i=0;i<ipArry.length;i++){
                        if(ipArry[i]!=""){
                            if(ipTest.test(ipArry[i])){
                                newIpArry=newIpArry+ipArry[i]+",";

                            }else{
                                common.WarningBox(_self,'APP_03');
                                return null
                            }
                        }
                    }
                    return newIpArry
                }else{
                    if(list.length>20){
                        common.WarningBox(_self,'APP_03');
                        return null
                    }else{

                        if(ipTest.test(list)){
                            return list
                        }else{
                            common.WarningBox(_self,'APP_03');
                            return null
                        }
                    }
                }
            },
            downTem:function () {
               /* window.location.href = common.getReportFormUrl('/api/console/csvSRV?method=getAppliWhiteList');*/
                let _self=this;
                common.consoleDownFile(_self,_self.urlApi+'getAppliWhiteList',{});
            }

        }

    }
</script>
<style>

    .new-app-position{
        position: relative;
        width: 1028px;
        min-height: 730px;
        padding:50px 0 0 40px;
        margin-bottom: 20px;
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

    .new-tem-gray p{
        display: inline-block;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        padding: 13px 0 0 20px;
    }
    .new-app-blue{
        width: 100%;
        min-height: 579px;
        background:#f0fcff;

    }

    .new-app-blue p{
        font-size: 14px;
        line-height: 38px;
        padding-left: 20px;
    }
    .new-app-blue p a{
        color: #00aeeb;
        border-bottom: 1px solid #00aeeb;
        vertical-align: middle;
    }
    .blue-underlin{
        color: #00aeeb;
        border-bottom: 1px solid #00aeeb;
        cursor: pointer;
    }
    .blue-a{
        color: #00aeeb;
        cursor: pointer;
        padding: 0 0 0 7px;
    }
    .new-app-blue .sin-top-padding{
        padding-top: 10px;
    }
    .new-app-blue .sin-top-padding2{
        padding-top: 13px;
    }
    .new-app-blue .red-err,.tem-blue-bottom .red-err{
        color: #ff172f;
        padding: 0 7px;

    }
    .new-app-blue .sms_textarea .textarea-red-err{
        display: block;
        height: 22px;
        color: #ff172f;
        padding:3px 0 0 87px;
    }
    .new-app-blue p,.new-app-blue .tem-bottom-div{
        font-size: 14px;
        line-height: 38px;
        padding-left: 20px;
        position: relative;
    }
    .new-app-blue .tem-bottom-div{
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

    .new-app-blue .newapp-span{
        display: inline-block;
        min-width: 98px;
    }
    .new-app-blue .gray-small{
        position: absolute;
        display: inline-block;
        font-size: 12px;
        color: #c5c8c9;
        line-height: 12px;
        padding: 0;
        margin: 0;
        top:35px
    }
    .app-textarea-gray1,.app-textarea-gray2{
        display: block;
        font-size: 12px;
        color: #c5c8c9;
        line-height: 16px;
        height: 21px;
        padding: 0 0 0 117px;
        margin: 0;
    }
    .app-textarea-gray2{
        line-height: 9px;
        padding: 0 0 0 102px;
        height: 16px;
    }
    .new-app-blue .newapp_textarea{
        vertical-align: top;
        line-height: 14px;
        padding:8px 0 0 34px

    }
    .new-app-blue .newapp_textarea-padding1{
        padding:8px 0 0 34px
    }
    .new-app-blue .newapp_textarea-padding2{
        padding:12px 0 0 34px
    }
    .new-app-blue .newapp_textarea span,.new-app-blue .newapp_textarea2 span{
        display: inline-block;
        vertical-align:top;
    }
    .new-app-blue .newapp_textarea img, .new-app-blue .newapp_textarea2 img
    {
        display: inline-block;
        vertical-align:top;
        padding-right: 1px;
    }
    .new-app-blue .newapp_textarea  textarea{
        width: 337px;
        height: 80px;
        background: #f0fcff;
        border: 1px solid #808080;
        color:#333333;
        padding-left: 10px;
        margin-right: 7px;
    }
    .service-border{
        width: 360px;
        min-height: 31px;
        background: #f0fcff;
        /*border: 1px solid #808080;*/
        color:#333333;
        padding-left: 0px;
        margin-left: 4px;
        font-weight: 400;
    }
    .service-border label{
        color:#333333;
        font-weight: 400;
        width: 56px;
    }
    .service-border input{
        margin: 0 10px 0 0;
    }
    .service-border p{
        font-size: 14px;
        line-height: 26px;
        padding-left: 0px;
        position: relative;
    }


    .new-app-blue .newapp_textarea2 textarea{
        width: 337px;
        height: 121px;
        background: #f0fcff;
        border: 1px solid #808080;
        color:#333333;
        padding-left: 10px;
        margin-right: 7px;
    }

    .newapp-btn{
        padding:17px 0 0 33px;
    }
    .sin-blue-btn,.sin-gray-btn{
        background:#41b0e3;
        color: #f6f6f6;
        min-width: 100px;
        height:30px;
        font-weight: 600;
        line-height: 14px;
    }
    .sin-input2{
        width: 278px;
        height: 20px;
        background: #f0fcff;
        border: 1px solid #808080;
        color:#333333;
        font-size: 14px;
        padding-left: 10px;
        margin-left: 10px;
        line-height: 20px;
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
    .new-app-blue .newapp-padding{
        padding-top: 10px;
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
    .sin-input2:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #b2b2b2;
    }

    .sin-input2::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #b2b2b2;
    }

    .sin-input2:-ms-input-placeholder,
    .sin-input2:-ms-input-placeholder {
        color: #b2b2b2;
    }

    .sin-input2::-webkit-input-placeholder,
    .sin-input2::-webkit-input-placeholder {
        color: #b2b2b2;
    }
    .new-app-blue .red-err-witdh{
       width: 700px;
    }

</style>