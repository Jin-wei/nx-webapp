<template>
    <div>
        <recharge-top></recharge-top>
        <div class="recharge-bottom">
            <div class="recharge-step-border">
                <div :class="{'recharge-bk-step2':language=='zh_cn','recharge-bk-step2-en':language=='en'}">
                    <div class="step-padding">
                        <span class="recharge-step1 ">{{$t('recharge.bottom.step1.title')}}</span>
                        <span class="recharge-step2 active">{{$t('recharge.bottom.step2.title')}}</span>
                        <span class="recharge-step3">{{$t('recharge.bottom.step3.title')}}</span>
                        <span class="recharge-step4">{{$t('recharge.bottom.step4.title')}}</span>
                        <span class="recharge-step5">{{$t('recharge.bottom.step5.title')}}</span>
                    </div>
                </div>
            </div>
            <div class="recharge-step2-content">
                <p>{{$t('recharge.bottom.step2.samllTitle')}}</p>
                <div class="recharge-content-gray2">
                    <div class="recharge-form-padding">
                        <form >
                            <input type="radio"  id="alipay" name="type" value="0" class="radio" checked>
                            <label for="alipay" class="radio">
                                <img class="type-img" src="/static/images/img/consloe/administration/alipay.png" align="middle" />
                            </label>
                            <input type="radio" name="type" id="wechat" value="1" class="radio">
                            <label for="wechat" class="radio wechat" >
                                <img class="type-img" src="/static/images/img/consloe/administration/wechat.png" align="middle" />
                            </label>
                           <input type="radio" name="type" id="unionPay" value="2" class="radio">
                            <label for="unionPay" class="radio unionPay" >
                                <img class="type-img" src="/static/images/img/consloe/administration/unionPay.png" align="middle" />
                            </label>
                        </form>

                    </div>
                </div>
            </div>
            <button class="btn blue-btn recharge-next-btn" @click="toStep3()">{{$t('recharge.bottom.nextBtn')}}</button>
        </div>
    </div>

</template>

<style>
    .recharge-bottom{
        position: relative;
        width: 1028px;
        min-height: 246px;
        padding:81px 0 0 40px;
        font-weight: 500;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    }

    .step-padding{
        padding-left: 43px;
    }

    .recharge-bk-step2,.recharge-bk-step2-en{
        margin-top: 2px;
        width: 806px;
        height: 36px;
        background: url("/static/images/img/consloe/administration/p-step2.png") 100% 100% no-repeat;
    }
    .step-padding{
        padding-left: 43px;
    }
    .recharge-bk-step2  span{
        display: inline-block;
        font-size: 16px;
        color: #333333;
        line-height:36px;
        font-weight: 400;
        width:142px;
    }
    .recharge-bk-step2-en  span{
        display: inline-block;
        font-size: 12px;
        color: #333333;
        line-height:36px;
        font-weight: 400;
        min-width:142px;
    }
    .recharge-bk-step2 .active,.recharge-bk-step2-en .active{
        color:#f7f7f7 ;
    }
    .recharge-bk-step2 .recharge-step1,.recharge-bk-step2-en  .recharge-step1{
        min-width:130px;
    }
    .recharge-bk-step2 .recharge-step2,.recharge-bk-step2-en  .recharge-step2{
        width:173px;
    }
    .recharge-bk-step2 .recharge-step3,.recharge-bk-step2-en .recharge-step3{
        width:157px;
    }
    .recharge-bk-step2 .recharge-step4,.recharge-bk-step2-en .recharge-step4{
        width:130px;
    }
    .recharge-bk-step1 .recharge-step5,.recharge-bk-step1-en .recharge-step5{
        width:60px;
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
    .recharge-step2-content input {
        /*width: 123px;*/
        height: 20px;
        background: #f7f7f7;
        border: 1px solid #808080;
        padding-left: 5px;
        margin-right: 7px;

    }

    .recharge-content-gray2 {
        width: 100%;
        height: 99px;
        background:#f7f7f7;
    }

    .recharge-form-padding {
        padding: 34px 0 0 8px;
    }
    .recharge-next-btn{
        height: 28px;
        margin: 17px 0 0 19px;
    }
    .type-img{
        border:1px solid #bfbfbf;
    }

    input[type='radio'].radio {
        opacity:0;
        display:inline-block;
        width: 2px;
    }
    label.radio {
        background:url("/static/images/img/consloe/administration/radio2.png") 0px 12px no-repeat;
        height:46px;
        display:inline-block;
        padding-left: 28px;
        text-align: center;
        vertical-align: middle;;
    }
    input[type='radio'].radio:checked + .radio {
        background:url("/static/images/img/consloe/administration/green-radio2.png") 0px 12px no-repeat;
    }
    .wechat{
        margin-left: 24px;
    }
    .unionPay{
        margin-left: 29px;
    }


</style>
<script>
    const common = require('commonFunc')
    import rechargeTop from './recharge-step-top.vue'

    export default{
        data:function () {
            return{
                money:this.$route.params.money.split(":")[1],
                type:'',
                language:common.getStoreData('language'),
            }
        },
        components: {rechargeTop},
        mounted:function () {
            let _self=this;
            _self.$parent.setActive(1,"recharge_step1");
        },
        methods:{
            toStep3:function () {
                let _self=this;
                _self.type=$("input[name='type']:checked").val();
                if(_self.type=='' || _self.type==null){
                    common.WarningBox(_self,'RECHARGE_002');
                }else{
                    let params={
                        customerId:common.getStoreData('userinfo').customer_id,
                        amount:_self.money/100,
                        payChanel:_self.type,
                        status:0
                    }
                    params=JSON.stringify(params);
                    _self.$http.post('/api/sundry?method=InsertRecharge',params).then((response) => {
                        if(response.data.errno==0){
                            let rechargeId=response.data.info
                            this.$router.push({path: '/console/recharge_step3/:'+_self.money+"/:"+_self.type+"/:"+rechargeId});
                        }else{
                            common.dealErrorCommon(_self, response)
                        }
                    }, (response) => {
                        common.dealErrorCommon(_self, response)
                    })

//                    this.router.push({path:'/console'+url});
                }
            },


        }

    }


</script>