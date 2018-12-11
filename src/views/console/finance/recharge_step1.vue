<template>
    <div>
        <recharge-top></recharge-top>
        <div class="recharge-bottom">
           <div class="recharge-step-border">
               <div  :class="{'recharge-bk-step1':language=='zh_cn','recharge-bk-step1-en':language=='en'}">
                   <div class="step-padding">
                       <span class="active recharge-step1" >{{$t('recharge.bottom.step1.title')}}</span>
                       <span class="recharge-step2">{{$t('recharge.bottom.step2.title')}}</span>
                       <span class="recharge-step3">{{$t('recharge.bottom.step3.title')}}</span>
                       <span class="recharge-step4">{{$t('recharge.bottom.step4.title')}}</span>
                       <span class="recharge-step5">{{$t('recharge.bottom.step5.title')}}</span>
                   </div>
               </div>
           </div>
            <div class="recharge-step1-content">
                <p>{{$t('recharge.bottom.step1.samllTitle')}}</p>
                <div class="recharge-content-gray">
                    <div class="recharge-form-padding">
                        <span>{{$t('recharge.bottom.step1.span1')}}</span>
                        <input v-model="money" type="number" step="0.01">
                        <span>{{$t('recharge.bottom.step1.span2')}}</span>
                    </div>
                </div>
            </div>
            <button class="btn blue-btn recharge-next-btn" @click="toStep2()">{{$t('recharge.bottom.nextBtn')}}</button>
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
    .recharge-bk-step1,.recharge-bk-step1-en{
        margin-top: 2px;
        width: 806px;
        height: 36px;
        background: url("/static/images/img/consloe/administration/p-step1.png") 100% 100% no-repeat;
    }
    .step-padding{
        padding-left: 43px;
    }
    .recharge-bk-step1  span{
        display: inline-block;
        font-size: 16px;
        color: #333333;
        line-height:36px;
        font-weight: 400;
        width:142px;
    }
    .recharge-bk-step1-en  span{
        display: inline-block;
        font-size: 12px;
        color: #333333;
        line-height:36px;
        font-weight: 400;
        min-width:142px;
    }
    .recharge-bk-step1 .active,.recharge-bk-step1-en .active{
        color:#f7f7f7 ;
    }
    .recharge-bk-step1 .recharge-step1,.recharge-bk-step1-en  .recharge-step1{
        min-width:130px;
    }
    .recharge-bk-step1 .recharge-step2,.recharge-bk-step1-en  .recharge-step2{
        width:173px;
    }
    .recharge-bk-step1 .recharge-step3,.recharge-bk-step1-en .recharge-step3{
        width:157px;
    }
    .recharge-bk-step1 .recharge-step4,.recharge-bk-step1-en .recharge-step4{
        width:135px;
    }
    .recharge-bk-step1 .recharge-step5,.recharge-bk-step1-en .recharge-step5{
        width:60px;
    }
    .recharge-step-border{
        width: 100%;
        height: 52px;
        border-bottom:1px solid #dddddd;
    }
    .recharge-step1-content p{
        font-size: 14px;
        line-height: 45px;
        padding-left: 19px;
    }

    .recharge-step1-content span {
        font-size: 14px;
        line-height: 20px;
    }
    .recharge-step1-content input {
        width: 123px;
        height: 20px;
        background: #f7f7f7;
        border: 1px solid #808080;
        padding-left: 5px;
        margin-right: 7px;

    }

    .recharge-content-gray {
        width: 100%;
        height: 98px;
        background:#f7f7f7;
    }

    .recharge-form-padding {
        padding: 37px 0 0 35px;
    }
    .recharge-next-btn{
        height: 28px;
        margin: 16px 0 0 19px;
    }
</style>
<script>
    const common = require('commonFunc')
    import rechargeTop from './recharge-step-top.vue'

    export default{
        data:function () {
            return{
                money:'',
                language:common.getStoreData('language'),
            }
        },
        components: {rechargeTop},
        mounted:function () {
            let _self=this;
            _self.$parent.setActive(1,"recharge_step1");
        },
        methods:{
            checkMoney:function (value) {
                let temp = /^\d+\.?\d{0,2}$/;
                if (temp.test(value)) {
                    return true
                } else {
                   return false
                }
            },
            toStep2:function () {
                let _self=this;
                if(common.getStoreData('status').status!=1){
                    common.WarningBox(_self, 'SIN_04');
                    return;
                }
                if(_self.money=='' || _self.money==null){
                     common.WarningBox(_self,'RECHARGE_001');
                     return
                }else if(_self.checkMoney(_self.money)==false){
                    common.WarningBox(_self,'RECHARGE_003');
                    return
                }
                else{
//                    this.router.push({path:'/console/recharge-step2'});
                    this.$router.push({path: '/console/recharge_step2/:'+_self.money*100});
//                    this.router.push({path:'/console'+url});
                }
            },

        }

    }


</script>