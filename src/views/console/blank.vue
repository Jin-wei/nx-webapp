<template>
    <div>
        <div class="wxDiv" v-if="type==1">
            <section class="content img-content">
                <div class="box admin-home-box">
                    <div class="wx-gray-block">
                        <div class="wx-top-bk"></div>
                        <div class="wx-content">
                            <div class="wx-title">
                                <span>{{$t('wxApplay.title')}}</span>
                            </div>
                        </div>
                        <div class="wx-samll">
                            <span>{{$t('wxApplay.small1')}}</span>
                            <span class="red-span"> {{money}} {{$t('wxApplay.small2')}}</span>
                            <span>{{$t('wxApplay.small3')}}</span>
                            <button class="btx gree-btn" @click="getStatus()">{{$t('wxApplay.btn2')}}</button>
                        </div>
                        <div class="wx-yello-border">
                            <div class="wx-mark">
                                <div v-html="wxHtml">
                                   <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><path d="M1 1h7v7h-7zM10 1h1v2h1v-1h1v2h-1v1h2v6h-1v-2h-1v2h1v1h-2v-6h-1v3h-1v-6h1zM15 1h7v7h-7zM2 2v5h5v-5zM16 2v5h5v-5zM3 3h3v3h-3zM17 3h3v3h-3zM10 4v1h1v-1zM12 6v2h1v-2zM1 9h1v1h-1zM3 9h5v1h-4v1h1v2h-1v-1h-1v1h-1v-2h1zM15 9h5v1h2v3h-1v-1h-1v1h1v1h-2v-4h-2v1h-1v-1h-1zM9 10h1v1h-1zM7 11h2v1h-2zM14 11h1v1h-1zM17 11h1v3h-1v-1h-1v-1h1zM10 12h1v1h-1zM1 13h1v1h-1zM5 13h5v2h-1v-1h-4zM11 13h2v1h1v-1h1v1h1v1h1v1h-1v1h-2v2h-1v-2h-2v-1h2v-1h-2zM18 14h1v1h-1zM1 15h7v7h-7zM14 15v1h1v-1zM20 15h2v1h-2zM2 16v5h5v-5zM9 16h1v3h3v1h-1v1h-2v-1h-1zM18 16h1v1h-1zM3 17h3v3h-3zM16 17h1v2h-1zM19 17h1v3h1v1h-1v1h-3v-1h-1v-1h1v-1h2zM14 19h1v1h-1zM18 20v1h1v-1zM9 21h1v1h-1zM12 21h1v1h-1zM14 21h1v1h-1z"/></svg>-->
                                </div>
                            </div>
                            <div>
                                <button class="btx wx-yellow-btn">{{$t('wxApplay.btn')}}</button>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </div>
        <div v-if="type==2">
            <form id="payForm" name="payForm" method="post" action="https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0">
                <input type="hidden" name="MerBgUrl" v-model="unionPayArr.MerBgUrl" />
                <input type="hidden" name="MerId" v-model="unionPayArr.merId" />
                <input type="hidden" name="TranDate" v-model="unionPayArr.TranDate" />
                <input type="hidden" name="MerOrderNo" v-model="unionPayArr.MerOrderNo" />
                <input type="hidden" name="TranTime" v-model="unionPayArr.TranTime" />
                <input type="hidden" name="RemoteAddr" v-model="unionPayArr.RemoteAddr" />
                <input type="hidden" name="OrderAmt" v-model="unionPayArr.OrderAmt" />
                <input type="hidden" name="Signature" v-model="unionPayArr.signature" />
                <input type="hidden" name="BusiType" v-model="unionPayArr.BusiType" />
                <input type="hidden" name="Version" v-model="unionPayArr.Version" />
                <input type='submit' value='OK' style="display: none"/>
            </form>
        </div>
    </div>


</template>
<style src="../../css/common.css"></style>
<script>
    const common = require('commonFunc')

    export default{
        data:function () {
            return{
                type:this.$route.params.type.split(":")[1],//0支付宝 1微信 2银联
                id:this.$route.params.id.split(':')[1],
                money:this.$route.params.money.split(':')[1]/100,
                wxHtml:'',
                status:'',
                unionPayArr:{},
                unionPayUrl:'https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0'
            }
        },
        mounted:function () {
            let _self=this;
            if(_self.type==0){
                this.$http.post('/pay/aliPay',{payId:_self.id,amount:_self.money}).then((response)=>{
                    console.log(response.body.html);
                    document.write(response.body.html)

                },(response)=>{
                    common.LoginWarningBox(_self,response);
                });
            }else if(_self.type==1){
                this.$http.post('/pay/wxPay',{payId:_self.id,amount:_self.money*100}).then((response)=>{
                    _self.wxHtml=response.data.info.wxqrsvg;

                },(response)=>{
                    common.LoginWarningBox(_self,response);
                });
            }else if (_self.type==2){
                console.log('银联支付begin。。。');
                this.$http.post('/pay/unionPay',{payId:_self.id,amount:_self.money*100}).then((response)=>{
                    if(response.data.success){
                        _self.unionPayArr=response.data.html;
                        console.log(_self.unionPayArr);
                        window.setTimeout(function () {
                            document.getElementById("payForm").submit();
                        },1000)
                    }
                },(response)=>{
                    common.LoginWarningBox(_self,response);
                });
            }
        },
        methods:{
            getStatus:function () {
                let _self=this;
                _self.$http.post('/api/console/RechargeListSRV?method=getRecharge',{payId:_self.id}).then((response)=>{
                    if(response.data.errno==0){
                        if(response.data.info.length>0){
                            _self.status=response.data.info[0].status
                            if(_self.status==0){
                                common.WarningBox(_self,'WX_01');
                            }else if(_self.status==1){
                                _self.$router.push({path:'/console/recharge_list'});
                            }
                        }
                    }else{
                        common.LoginWarningBox(_self,response);
                    }
                },(response)=>{
                    common.LoginWarningBox(_self,response);
                });
            },

        }

    }
</script>
<style>
    .img-content {
        height: 100%;
        width:100%;
    }
    .admin-home-box{
        width:95%;
        height: 95%;
        position: relative;
        border-radius: 0;
        background: #ffffff;
        border-top:none;
        margin: 20px auto;
    }

    .wx-gray-block{
        width: 100%;
        height:100%;
        text-align: center;
        position: relative;
        border: 1px solid #e9e8e9;
       /* border:2px solid #e9e8e9;*/
    }
    body {
        position:absolute;
        background-color:#ffffff;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }

    .wxDiv {
        height:100%;
        width:100%;
        position:absolute;
        background:#ffffff;
    }
    .wx-top-bk{
        height: 30px;
        position: relative;
        background: #f3f3f3;
        border-bottom: 1px solid #e9e8e9;
    }
    .wx-title{
        text-align: center;
        margin-top: 40px;
    }
    .wx-title span{
        display: inline-block;
        background:url("/static/images/img/seq/wx-01.png") no-repeat;
        font-size: 20px;
        position: relative;
        color:#524d5e;
        line-height: 33px;
        padding-left: 40px;


    }
    .wx-samll{
        text-align: left;
        margin: 40px 0 0 50px;
    }
    .wx-samll span{
        font-size: 14px;
        color:#afb0a7;

    }
    .wx-samll .red-span{
        color:#7a1300;
        font-size: 18px;
    }
    .wx-yello-border{
        width:94%;
        height: 68%;
        border-radius: 0;
        background: #ffffff;
        margin: 20px auto;
        border: 1px solid #eff1e2;
        box-shadow:0px 0px 9px #fffff7;
        text-align: center;
    }
    .wx-mark{
        width: 20%;
        height: 20%;
        display: inline-block;
        margin-top: 50px;
    }
    .wx-yellow-btn{
        width: 216px;
        min-height: 60px;
        color: #ffffff;
        border: 1px solid #bf6b00;
        border-radius: 3px;
        background:#e48600 url("/static/images/img/seq/wx-02.png") no-repeat 5px 5px;
        font-size: 14px;
        padding-left: 60px;
        margin-top: 20px;
        text-align: left;
        outline:none;
    }
    .gree-btn{
        min-width: 100px;
        color: #ffffff;
        border: 1px solid #6aa561;
        border-radius: 3px;
        background:#00ae72;
        font-size: 14px;
        padding-left:15px;
        text-align: left;
        margin: 20px 0 0 15px;
        outline:none;
    }
    .wx-samll .left-icon{
        font-size: 17px;
        color: #ffffff;
    }
</style>