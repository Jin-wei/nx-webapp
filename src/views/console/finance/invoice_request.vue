<template>
    <div class="info-relative " v-cloak>
      <!--   <img class="bk-img" src="../../../../public/static/images/img/no/bk.png" alt="">-->
        <div class="invo-position ">
            <div class="invo-title">
                {{title}}
            </div>
            <div class="invo-gray">
                <p v-html="$t('newInvoice.p1')"></p>
            </div>
            <div class="invo-money">
                <p> {{$t('newInvoice.p2')}}<span>{{moneyshow}}</span>{{$t('newInvoice.p2_1')}}</p>
            </div>
            <div class="">
                <div class="invo-content-border">
                    <div class="pull-left invo-input-left">
                        <div class="invo-line-height1 invo-line-padding">
                            <span>{{$t('newInvoice.span1')}}</span>
                            <input v-model="invoiceData.amount" class="invo-short-input" type="text" :disabled=appDisable>
                            <span>{{$t('newInvoice.p2_1')}}</span>
                        </div>
                        <div class="invo-line-height2">
                            <span>{{$t('newInvoice.span2')}}</span>
                            <input v-model="invoiceData.title" class="invo-long-input" type="text" :disabled=appDisable>
                        </div>
                        <div class="invo-line-height3" :disabled=appDisable>
                            <span>{{$t('newInvoice.span3')}}</span>
                            <input type="radio" id="type0" name="type" value="0" class="radio radio-margin1" checked>
                            <label for="type0" class="radio">{{$t('newInvoice.span3_radio1')}}</label>
                            <input type="radio" id="type1" name="type" value="1" class="radio radio-margin2">
                            <label for="type1" class="radio">{{$t('newInvoice.span3_radio2')}}</label>
                        </div>

                    </div>
                    <div class="pull-left invo-type-btn">
                        <button class="btn blue-btn" :class="{'hidden':invoiceType==0}">{{$t('newInvoice.btn1')}}</button>
                        <button class="btn blue-btn" :class="{'hidden':invoiceType==1}">{{$t('newInvoice.btn2')}}</button>
                    </div>
                    <div class="clear"></div>
                    <div>
                        <div class="invo-line-height3" :disabled=appDisable>
                            <span>{{$t('newInvoice.span4')}}</span>
                            <input type="radio" id="content0" name="content" value="0" class="radio radio-margin1">
                            <label for="content0" class="radio">{{$t('newInvoice.span4_radio1')}}</label>
                            <input type="radio" id="content1" name="content" value="1" class="radio radio-margin3">
                            <label for="content1" class="radio">{{$t('newInvoice.span4_radio2')}}</label>
                            <input type="radio" id="content2" name="content" value="2" class="radio radio-margin3">
                            <label for="content2" class="radio">{{$t('newInvoice.span4_radio3')}}</label>
                        </div>
                        <div class="invo-line-height1 ">
                            <span>{{$t('newInvoice.span5')}}</span>
                            <input v-model="invoiceData.taxpayer_no" class="invo-short-input" type="text" :disabled=appDisable>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>

            <div class="invo-tax-border" :class="{'hidden':invoiceType =='0'}">
                <div class="invo-line-height1  invo-line-padding">
                    <span>{{$t('newInvoice.span6')}}</span>
                    <input  v-model="invoiceData.bank_account" class="invo-middle-input" type="text" :disabled=appDisable>
                    <span></span>
                </div>
                <div class="invo-line-height1 ">
                    <span>{{$t('newInvoice.span7')}}</span>
                    <input v-model="invoiceData.bank_name" class="invo-middle-input2" type="text" :disabled=appDisable>
                    <span class="invo-gray-span">{{$t('newInvoice.span7_samll')}}</span>
                </div>
                <div class="invo-line-height1 ">
                    <span>{{$t('newInvoice.span8')}}</span>
                    <input v-model="invoiceData.registered_address" class="invo-middle-input2" type="text" :disabled=appDisable>
                    <span class="invo-gray-span">{{$t('newInvoice.span8_samll')}}</span>
                </div>
                <div class="invo-line-height1 ">
                    <span>{{$t('newInvoice.span9')}}</span>
                    <input v-model="invoiceData.enterprise_phone" class="invo-short-input" type="number" :disabled=appDisable>
                </div>
            </div>

            <div class="">
                <div class="invo-line-height1  invo-line-padding">
                    <span>{{$t('newInvoice.span10')}}</span>
                    <input v-model="invoiceData.post_address"  class="invo-middle-input2" type="text" :disabled=appDisable>
                    <span class="invo-gray-span">{{$t('newInvoice.span10_samll')}}</span>
                </div>
                <div class="invo-line-height1 ">
                    <span>{{$t('newInvoice.span11')}}</span>
                    <input v-model="invoiceData.recipient" class="invo-short-input" type="text" :disabled=appDisable>
                </div>
                <div class="invo-line-height1 ">
                    <span>{{$t('newInvoice.span12')}}</span>
                    <input v-model="invoiceData.recipient_phone" class="invo-short-input" type="number" :disabled=appDisable>
                </div>
            </div>
            <div class="invo-btn">
                <button class="btn invo-blue-btn" v-on:click="submitApp" :class="{'hidden':urlType==0 && status!=2}">{{$t('newInvoice.saveBtn')}}</button>
                <button class="btn invo-gray-btn" v-show="urlType==1 || urlType=='null'" v-on:click="resetInv">{{$t('newInvoice.clearBtn')}}</button>
                <button class="btn sin-gray-btn" v-show="urlType==0 || urlType==1 " @click="LinkTo('/console/billing_list')">{{$t('newApp.btn3')}}</button>
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
                urlType:this.$route.params.type.split(":")[1],
                authType:'',//0个人 1企业
                title:'',
                money:0,
                moneyshow:0,
                urlApi:'/api/console/InvoiceRequestSRV?method=',
                status:'',
                invoiceType:0,//0 普通发票，1增值税发票,
                appDisable:true,
                invoiceData:{
                    amount:'',
                    title:common.getStoreData('status').real_name,
                    type:'',//radio
                    service_type:"",//radio
                    taxpayer_no:'',
                    post_address:'',
                    recipient:'',
                    recipient_phone:'',
                    bank_account:'',
                    bank_name:'',
                    registered_address:'',
                    enterprise_phone:''
                }
            }
        },
        name:'rechargeTop',
        mounted:function () {
            let _self=this;
            $("input[name='type']").click(function(){
                _self.invoiceType=$(this).val();
            });
            _self.getInvoicePrice();
            if(_self.id==null || _self.id=='null'){
                _self.appDisable=false;
                _self.$parent.setActive(1,"invoice_request/:null/:null");
                _self.title=_self.$t('newInvoice.title');
            }else {

                if(_self.urlType == 0){
                    _self.appDisable=true;
                    _self.$parent.setActive(1,'billing_list');
                    _self.title=_self.$t('newInvoice.title2');

                }else if(_self.urlType == 1){
                    _self.appDisable=false;
                    _self.$parent.setActive(1,'billing_list');
                    _self.title=_self.$t('newInvoice.title3');

                }
                _self.getInvData();

            }
        },

        methods:{
            LinkTo:function (url) {
                let _self=this;
                _self.$router.push({path:url});
            },
            //查看信息
            getInvData:function () {
                let _self=this;
                this.$http.post(_self.urlApi+'getInvoice',{id:_self.id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.invoiceData=response.data.info[0];
                            $("[name='type'][value='"+_self.invoiceData.type+"']").attr('checked','true');
                            $("[name='content'][value='"+_self.invoiceData.service_type+"']").attr('checked','true');
                            _self.invoiceType=_self.invoiceData.type;
                            _self.status=_self.invoiceData.status;

                            if(_self.status==2){
                                _self.appDisable=false;
                            }
                        }else{
                            _self.invoiceData="";
                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            },

            isEmptyObject:function (e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            //获得剩余发票金额
            getInvoicePrice:function () {
                let _self=this;
                this.$http.post(_self.urlApi + 'getInvoicePrice', {}).then((response) => {
                    if (response.data.errno == 0) {
                        if( response.data.info!="" && response.data.info!=null && response.data.info!={}){
                            _self.money=response.data.info;
                            _self.moneyshow=common.priceFormat( _self.money);
                        }else{
                            _self.money=0;
                            _self.moneyshow=0;

                        }
                    } else {
                        common.dealConsolError(_self, response);
                    }
                }, (response) => {
                    common.dealConsolError(_self, response);
                });
            },

            //提交请求
            submitApp:function () {
                let _self=this;
                if (common.getStoreData('status').status != 1) {
                    common.WarningBox(_self, 'SIN_04');
                    return;
                }
                if(_self.urlType=='null' || _self.urlType==null || _self.urlType==1){
                    _self.postInv('addInvoice');
                }else{
                    _self.postInv('modifyInvoice');
                }
            },
            isNull:function (str) {
                if(str===null || str==='null' || str==='') {
                    return true
                }else{
                    return false
                }
            },
            postInv:function (method) {
                let _self=this;
                if(common.getStoreData('status').status!=1){
                    common.WarningBox(_self, 'SIN_04');
                    return;
                }else if(common.getStoreData('status').status==1){
                    _self.authType=common.getStoreData('status').customer_type;
                }
                _self.invoiceData.type=$("input[name='type']:checked").val();
                let params={};

                //todo
                if(_self.invoiceData.amount==""){
                    common.WarningBox(_self,'CON_PRICE_001');
                    return
                }
                if(_self.authType==0){
                    if(_self.invoiceType==0){
                        if(_self.money<200){
                            common.WarningBox(_self,'INV_06');
                            return
                        }
                        if(_self.invoiceData.amount>_self.money || _self.invoiceData.amount<200){
                            common.WarningBox(_self,"INV_02");
                            return
                        }
                    }else if(_self.invoiceType==1){
                        common.WarningBox(_self,'INV_03');
                        return
                    }
                }else if(_self.authType==1){
                    if(_self.invoiceType==0){
                        if(_self.money<200){
                            common.WarningBox(_self,'INV_06');
                            return
                        }
                        if(_self.invoiceData.amount>_self.money || _self.invoiceData.amount<200){
                            common.WarningBox(_self,"INV_04");
                            return;
                        }
                    }else if(_self.invoiceType==1){
                        if(_self.money<1000){
                            common.WarningBox(_self,'INV_07');
                            return
                        }
                        if(_self.invoiceData.amount>_self.money || _self.invoiceData.amount<1000){
                            common.WarningBox(_self,"INV_05");
                            return;
                        }
                    }
                }


                if(_self.invoiceData.type==0){
                    params={
                        amount:_self.invoiceData.amount,
                        title:_self.invoiceData.title,
                        type: _self.invoiceData.type,//radio
                        serviceType:$("input[name='content']:checked").val(),//radio
                        taxpayerNo:_self.invoiceData.taxpayer_no,
                        postAddress:_self.invoiceData.post_address,
                        recipient:_self.invoiceData.recipient,
                        recipientPhone:_self.invoiceData.recipient_phone
                    }

                    for(var key in params){
                        if(params[key]=='' || params[key]==undefined){
                            common.WarningBox(_self,'CON_PRICE_001');
                            return;
                        }
                    }

                    params.bankAccount='';
                    params.bankName='';
                    params.registeredAddress='';
                    params.enterprisePhone='';
                    params.postal='';
                    params.trackNo='';

                }else if(_self.invoiceData.type==1){
                    params={
                        amount:_self.invoiceData.amount,
                        title:_self.invoiceData.title,
                        type: _self.invoiceData.type,//radio
                        serviceType:$("input[name='content']:checked").val(),//radio
                        taxpayerNo:_self.invoiceData.taxpayer_no,
                        postAddress:_self.invoiceData.post_address,
                        recipient:_self.invoiceData.recipient,
                        recipientPhone:_self.invoiceData.recipient_phone,
                        bankAccount:_self.invoiceData.bank_account,
                        bankName:_self.invoiceData.bank_name,
                        registeredAddress:_self.invoiceData.registered_address,
                        enterprisePhone:_self.invoiceData.enterprise_phone
                    }

                    for(var key in params){
                        if(params[key]=='' || params[key]==undefined){
                            common.WarningBox(_self,'CON_PRICE_001');
                            return;
                        }
                    }
                    params.postal='';
                    params.trackNo='';

                }
                if(_self.id!='null'){
                    params.id=_self.id;
                }
                params=JSON.stringify(params);
                this.$http.post(_self.urlApi + method, params).then((response) => {
                    if (response.data.errno == 0) {
                        common.WarningBox(_self, 'SAVE_SUCESS');
                        if( _self.urlType==1){
                            _self.status=0;
                            _self.appDisable=true;

                        }else{
                            _self.resetInv();
                        }

                        window.setTimeout(function(){
                            _self.LinkTo('/console/billing_list');
                        },1500)
                    } else {
                        common.dealConsolError(_self, response);
                    }
                }, (response) => {
                    common.dealConsolError(_self, response);
                });
            },
            //重置
            resetInv:function () {
                let _self=this
                for(var key in _self.invoiceData){
                    _self.invoiceData[key]=''
                }
                $("[name='content']").removeAttr("checked");

                if(_self.invoiceType==0){
                    $("[name='type'][value='0']").attr('checked','true');
                }else if(_self.invoiceType==1){
                    $("[name='type'][value='1']").attr('checked','true');
                }
            },

        },


    }
</script>
<style>
    .bk-img{
        position: absolute;
        width: 1060px;
        height:967px;
        top:80px;
        left:220px;
    }
    .invo-position{
        position: relative;
        width: 1028px;
        min-height: 880px;
        padding:50px 0 0 40px;
        font-weight: 500;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    .invo-title{
        font-size: 18px;
        line-height: 18px;
        height: 40px;
        padding:0 0 20px 19px;
        border-bottom:1px solid #dddddd;
        margin-bottom: 20px;
        font-weight: 400;
    }
    .invo-gray{
        width: 100%;
        min-height: 160px;
        background:#f7f7f7;
        margin: 0 0 15px 0;
        position: relative;
    }
    .invo-gray p{
        display: inline-block;
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        padding: 12px 0 0 19px;
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

    .sin-blue-bottom .sin-blue-top-padding{
        padding-top: 14px;
    }
    .sin-blue-bottom .sin-span{
        display: inline-block;
        min-width: 70px;
    }

    .invo-money{
        font-size: 18px;
        line-height: 49px;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        margin-top: 20px;
        padding-left: 21px;
    }
    .invo-money span{
        color:#41b0e3;
    }
    .invo-input-left{
        width: 650px;
    }
    .invo-line-height1,.invo-line-height2,.invo-line-height3{
        font-size: 14px;
        line-height: 35px;
        padding-left: 20px;
        min-height: 35px;

    }
    .invo-line-height1 span,.invo-line-height2 span,.invo-line-height3 span{
        display: inline-block;
        min-width: 100px;
    }
    .invo-line-padding{
        padding-top: 9px;
    }
    .invo-line-height3{
        line-height: 30px;
    }
    .invo-short-input,.invo-middle-input,.invo-long-input,.invo-middle-input2{
        width: 123px;
        height: 20px;
        background: #ffffff;
        border: 1px solid #808080;
        color:#333333;
        padding-left: 10px;
        margin-right: 7px;
        line-height: normal;
    }
    .invo-middle-input{
        width: 215px;
    }
    .invo-middle-input2{
        width: 300px;
    }
    .invo-long-input{
        width: 403px;
    }

    .invo-line-height3 input[type='radio'].radio {
        opacity:0;
        display:inline-block;
        width: 0px;
    }
    .invo-line-height3 label{
        padding: 0;
        margin: 0;
        font-weight: 400;
        cursor: pointer;
    }
    .invo-line-height3 label.radio {
        background:url("/static/images/img/consloe/administration/auth-icon1.png") 0px 9px no-repeat;
        height:30px;
        display:inline-block;
        padding:0 0 0 20px;
        text-align: center;
        vertical-align: middle;
        margin: 0;
    }
    .invo-line-height3 input[type='radio'].radio:checked + .radio {
        background:url("/static/images/img/consloe/administration/autb-icon2.png") 0px 9px no-repeat;
    }
    .invo-line-height3 .radio-margin1{
        margin-left: -3px;
    }
    .invo-line-height3 .radio-margin2{
        margin-left: 40px;
    }
    .invo-line-height3 .radio-margin3{
        margin-left: 26px;
    }
    .invo-content-border{
        width: 100%;
        min-height: 197px;
        border-bottom: 1px solid #dddddd;
    }
    .invo-tax-border{
        width: 100%;
        min-height: 159px;
        border-bottom: 1px solid #dddddd;
    }
    .invo-type-btn{
        padding: 76px 0 0 69px;
    }
    .invo-btn{
        padding:18px 0 0 20px;
    }
    .invo-blue-btn,.invo-gray-btn{
        background:#41b0e3;
        color: #f6f6f6;
        width: 100px;
        height:30px;
        font-weight: 600;
        line-height: 14px;
    }
    .invo-gray-btn{
        background: #b3b3b3;
        margin-left: 16px;
    }
    .invo-blue-btn:hover,.invo-blue-btn:focus{
        background:#41b0e3;
        color: #f6f6f6;
    }
    .invo-gray-btn:hover,.invo-gray-btn:focus{
        background: #b3b3b3;
        color: #f6f6f6;
    }
    .invo-line-height1 .invo-gray-span{
        width: 300px;
        font-size: 12px;
        color: #bfbfbf;
        line-height: 12px;
        padding: 0;
        margin: 0;
    }
    .sin-gray-btn{
        background: #b3b3b3;
        color:#ffffff;
        margin-left: 16px;
        width: 100px;
        height:30px;
        font-weight: 600;
        line-height: 14px;
    }
    .sin-gray-btn:hover{
        background: #b3b3b3;
        color:#ffffff;
    }

</style>