<template>
    <div>
        <recharge-top></recharge-top>
        <div class="recharge-bottom">
            <div class="recharge-step-border">
                <div :class="{'recharge-bk-step3':language=='zh_cn','recharge-bk-step3-en':language=='en','show':step==3}" >
                    <div class="step-padding">
                        <span class="recharge-step1">{{$t('recharge.bottom.step1.title')}}</span>
                        <span class="recharge-step2">{{$t('recharge.bottom.step2.title')}}</span>
                        <span class="recharge-step3 active">{{$t('recharge.bottom.step3.title')}}</span>
                        <span class="recharge-step4">{{$t('recharge.bottom.step4.title')}}</span>
                        <span class="recharge-step5">{{$t('recharge.bottom.step5.title')}}</span>
                    </div>
                </div>
                <div :class="{'recharge-bk-step4':language=='zh_cn','recharge-bk-step4-en':language=='en','show':step==4}" >
                    <div class="step-padding">
                        <span class="recharge-step1">{{$t('recharge.bottom.step1.title')}}</span>
                        <span class="recharge-step2">{{$t('recharge.bottom.step2.title')}}</span>
                        <span class="recharge-step3">{{$t('recharge.bottom.step3.title')}}</span>
                        <span class="recharge-step4  active">{{$t('recharge.bottom.step4.title')}}</span>
                        <span class="recharge-step5">{{$t('recharge.bottom.step5.title')}}</span>
                    </div>
                </div>
                <div :class="{'recharge-bk-step5':language=='zh_cn','recharge-bk-step5-en':language=='en','show':step==5}" >
                    <div class="step-padding">
                        <span class="recharge-step1">{{$t('recharge.bottom.step1.title')}}</span>
                        <span class="recharge-step2">{{$t('recharge.bottom.step2.title')}}</span>
                        <span class="recharge-step3">{{$t('recharge.bottom.step3.title')}}</span>
                        <span class="recharge-step4">{{$t('recharge.bottom.step4.title')}}</span>
                        <span class="recharge-step5 active">{{$t('recharge.bottom.step5.title')}}</span>
                    </div>
                </div>
            </div>
            <div class="recharge-step2-content">
                <p class="" :class="{'show':step==5}">{{$t('recharge.bottom.step'+step+'.samllTitle')}}</p>
                <div class="recharge-content-gray3">
                    <div class="">
                        <div class="gry-div">
                            <span class="step3-left-span">{{$t('recharge.bottom.step3.span1')}}</span>
                            <span>{{id}}</span>
                        </div>
                        <div class="wirte-div">
                            <span class="step3-left-span">{{$t('recharge.bottom.step3.span2')}}</span>
                            <span class="step3-red">{{getMoney}}</span>
                            <span>{{$t('recharge.bottom.step3.span2_2')}}</span>
                        </div>
                        <div class="gry-div">
                            <span class="step3-left-span">{{$t('recharge.bottom.step3.span3')}}</span>
                            <span>{{typeText}}</span>
                        </div>
                        <div class="wirte-div">
                            <span class="step3-left-span">{{$t('recharge.bottom.step3.span4')}}</span>
                            <span>{{status}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn blue-btn recharge-next-btn3" @click="toApplay()">{{btnText}}</button>
        </div>

        <div class="console-alert-warp" :class="{'hidden':step4Alert}"  @click="step4Alert=true"></div>
        <div class="console-alert-content recharge-alert-detail" :class="{'hidden':step4Alert}">
            <div class="alert-content">
                <div class="col-md-12">
                    <div class="pull-right">
                        <span class="glyphicon glyphicon-remove alert-close" @click="step4Alert=true"></span>
                    </div>
                </div>
                <div class="alert-text recharge-alert-text">
                    <div class="col-md-12 recharge-span-opsition">
                        <p>{{$t('recharge.bottom.step3.p1')}}</p>
                    </div>
                </div>
                <div class="console-alert-btn">
                    <button class="btn  dark-grey-btn btn-padding"  @click="getStatus">{{$t('recharge.bottom.step3.btn1')}}</button>
                    <button class="btn  dark-grey-btn"  @click="linkTo">{{$t('recharge.bottom.step3.btn2')}}</button>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
    const common = require('commonFunc')
    import rechargeTop from './recharge-step-top.vue'

    export default{
        data:function () {
            return{
                money:0,
                getMoney:0,
                type:this.$route.params.type.split(":")[1],//0支付宝 1微信 2银联
                id:this.$route.params.id.split(':')[1],
                typeText:'',
                title:'',
                step4Alert:true,
                step:3,// 3 4 5
                status:this.$t('recharge.bottom.step3.status0'),
                btnText:'',
                language:common.getStoreData('language'),
            }
        },
        components: {rechargeTop},
        mounted:function () {
            let _self=this;
            _self.$parent.setActive(1,"recharge_step1");
            _self.money=this.$route.params.money.split(":")[1];
            _self.btnText=_self.$t('recharge.bottom.step'+_self.step+'.applyBtn');
            if(_self.money==='null' && _self.type==='null'){
                _self.typeText=_self.$t('recharge.bottom.step3.type0');
                _self.$http.post('/api/console/RechargeListSRV?method=getRecharge',{payId:_self.id}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.getMoney=common.priceFormat(response.data.info[0].amount);

                            _self.money=response.data.info[0].amount*100
                            _self.type=response.data.info[0].pay_chanel;
                            _self.typeText=_self.$t('recharge.bottom.step3.type'+_self.type);
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                });
            }else{
                _self.getMoney=common.priceFormat(_self.money/100);
                _self.typeText=_self.$t('recharge.bottom.step3.type'+_self.type);
            }

        },
        methods:{
            linkTo:function () {
               let _self=this;
               _self.$router.push({path:'/console/recharge_list'})
            },
            toApplay:function () {
                let _self=this;
                if(_self.step==3){
                    _self.step=4;
                    _self.step4Alert=false;
                    window.open('/blank/:'+_self.type+"/:"+_self.id+"/:"+_self.money);
                    _self.btnText=_self.$t('recharge.bottom.step'+_self.step+'.applyBtn0');
                }else if(_self.step==4){
                    _self.step4Alert=false;
                    window.open('/blank/:'+_self.type+"/:"+_self.id+"/:"+_self.money);
                    _self.btnText=_self.$t('recharge.bottom.step'+_self.step+'.applyBtn0');

                }else if(_self.step==5){
                    _self.$router.push({path:'/console/recharge_list'});
                    _self.btnText=_self.$t('recharge.bottom.step'+_self.step+'.applyBtn');
                }
            },

            postData:function (url,params) {
                let _self=this;
                this.$http.post(url,params).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                        }else{
                        }
                    }else{
                        common.dealConsolError(_self,response);
                    }
                },(response)=>{
                    common.dealConsolError(_self,response);
                });
            },
            getStatus:function () {
                let _self=this;
                _self.step4Alert=true;
                _self.$http.post('/api/console/RechargeListSRV?method=getRecharge',{payId:_self.id}).then((response) => {
                    if(response.data.errno==0){
                        if(response.data.info.length>0){

                            if(response.data.info[0].status===0){
                                _self.step=4;
                                _self.btnText=_self.$t('recharge.bottom.step'+_self.step+'.applyBtn0');
                            }else if(response.data.info[0].status===1){
                                _self.step=5;
                                _self.btnText=_self.$t('recharge.bottom.step'+_self.step+'.applyBtn');
                            }
                            _self.status=_self.$t('recharge.bottom.step3.status'+response.data.info[0].status);
                        }
                    }else{
                        common.dealErrorCommon(_self, response)
                    }
                }, (response) => {
                    common.dealErrorCommon(_self, response)
                })
            },

        }

    }


</script>
<style>
    .recharge-bottom{
        position: relative;
        width: 1028px;
        min-height: 246px;
        padding:81px 0 0 40px;
        font-weight: 500;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    .recharge-bk-step3,.recharge-bk-step4,.recharge-bk-step5,.recharge-bk-step3-en,.recharge-bk-step4-en,.recharge-bk-step5-en{
        display: none;
        margin-top: 2px;
        width: 806px;
        height: 36px;
        background: url("/static/images/img/consloe/administration/p-price3.png") 100% 100% no-repeat;
    }
    .step-padding{
        padding-left: 33px;
    }
    .recharge-bk-step4,.recharge-bk-step4-en{
        background: url("/static/images/img/consloe/administration/p-step4.png") 100% 100% no-repeat;
    }
    .recharge-bk-step5,.recharge-bk-step5-en{
        background: url("/static/images/img/consloe/administration/p-step5.png") 100% 100% no-repeat;
    }
    .recharge-bk-step3 span,.recharge-bk-step4 span,.recharge-bk-step5 span{
        display: inline-block;
        font-size: 16px;
        color: #333333;
        line-height:36px;
        font-weight: 400;
        width:142px;
    }
    .recharge-bk-step3-en span,.recharge-bk-step4-en span,.recharge-bk-step5-en span{
        display: inline-block;
        font-size: 12px;
        color: #333333;
        line-height:36px;
        font-weight: 400;
        width:142px;
    }
    .recharge-bk-step3 .recharge-step1,.recharge-bk-step4  .recharge-step1,.recharge-bk-step5  .recharge-step1{
        min-width:130px!important;
    }
    .recharge-bk-step3 .active,.recharge-bk-step4 .active,.recharge-bk-step5 .active{
        color:#f7f7f7 ;
    }

    .recharge-bk-step3 .recharge-step2,.recharge-bk-step4 .recharge-step2,.recharge-bk-step5 .recharge-step2{
        width:173px;
    }
    .recharge-bk-step3 .recharge-step3,.recharge-bk-step4 .recharge-step3,.recharge-bk-step5 .recharge-step3{
        width:157px;
    }
    .recharge-bk-step3 .recharge-step4,.recharge-bk-step4 .recharge-step4,.recharge-bk-step5 .recharge-step4{
        width:174px;
    }
    .recharge-bk-step3 .recharge-step5,.recharge-bk-step4 .recharge-step5,.recharge-bk-step5 .recharge-step5{
        width:60px;
    }

    .recharge-bk-step3-en .recharge-step1,.recharge-bk-step4-en  .recharge-step1,.recharge-bk-step5-en  .recharge-step1{
        min-width:130!important;
    }
    .recharge-bk-step3-en .recharge-step2,.recharge-bk-step4-en .recharge-step2,.recharge-bk-step5-en .recharge-step2{
        width:173px;
    }
    .recharge-bk-step3-en .recharge-step3,.recharge-bk-step4-en .recharge-step3,.recharge-bk-step5-en .recharge-step3{
        width:157px;
    }
    .recharge-bk-step3-en .recharge-step4,.recharge-bk-step4-en .recharge-step4,.recharge-bk-step5-en .recharge-step4{
        width:174px;
    }
    .recharge-bk-step3-en .recharge-step5,.recharge-bk-step4-en .recharge-step5,.recharge-bk-step5-en .recharge-step5{
        width:60px;
    }
    .recharge-bk-step3-en .active,.recharge-bk-step4-en .active,.recharge-bk-step5-en .active{
        color:#f7f7f7 ;
    }


    .recharge-step-border{
        width: 100%;
        height: 52px;
        border-bottom:1px solid #dddddd;
    }
    .recharge-step2-content p{
        font-size: 14px;
        line-height: 42px;
        padding-left: 19px;
    }

    .recharge-step2-content span {
        font-size: 14px;
        line-height: 20px;
    }

    .recharge-content-gray3 {
        width: 100%;
        height: 141px;
        /*background:#f7f7f7;*/
    }

    .recharge-form-padding {
        padding: 34px 0 0 8px;
    }
    .recharge-next-btn3{
        height: 28px;
        margin: 20px 0 0 19px;
    }

    input[type='radio'].radio {
        opacity:0;
        display:inline-block;
        width: 2px;
    }
    .gry-div{
        background: #f7f7f7;
        height: 35px;
        line-height: 34px;
        border-bottom:1px solid #dddddd;
    }
    .wirte-div{
        background: #ffffff;
        height: 35px;
        line-height: 34px;
        border-bottom:1px solid #dddddd;
    }
    .step3-left-span{
        display: inline-block;
        padding-left: 18px;
        min-width: 98px;
    }
    .step3-red{
        color: red;
    }
    .recharge-alert-detail{
        width: 500px;
        height:240px;
        top:235px;
        left:535px;
    }
    .recharge-alert-text{
        width: 380px;
        height:150px;
    }
    .recharge-span-opsition{
        width: 380px;
        height:141px;
        text-align: center;
        vertical-align: middle;
        line-height: 20px;
        padding-top: 53px;

    }
    .btn-padding{
        margin-right: 40px;
    }
    .alert-close{
        cursor: pointer;
        padding-top: 10px;
    }
    .recharge-samll-title{
        display: none;
    }


</style>
