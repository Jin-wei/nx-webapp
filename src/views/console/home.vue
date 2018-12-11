<template>
    <div class="positon">
        <!--top start-->
        <div class="top">
            <!--static start-->
            <div class="information">
                <div class="info-title">{{$t('conHome.leftTitle1')}}</div>
                <div class="info-content">
                    <div class="info-left">
                        <div class="info-price">
                            <span class="info-samll-title">{{$t('conHome.leftPrice.samllTitle')}}</span>
                            <div>
                                <a  @click="linkTo('recharge_list')"  :class="{'recharge-history':language=='zh_cn','recharge-history2':language=='en'}">{{$t('conHome.leftPrice.recharge')}}</a>
                                <a  @click="linkTo('invoice_request/:null/:null')">{{$t('conHome.leftPrice.invoice')}}</a>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="info-content-middle">
                            <div  class="info-text">
                                <p  class="info-content-large" style="padding-top: 10px">{{getLeft.balance}}</p>
                                <!--<span>{{$t('conHome.leftPrice.p1')}}：20 {{$t('conHome.leftPrice.unit')}}</span>-->
                            </div>
                            <div class="info-btn">
                                <button class="btn blue-tbn" @click="linkTo('recharge_step1')">{{$t('conHome.leftPrice.rechargeBtn')}}</button>
                                <button class="btn blue-tbn btn-margin" @click="showModel">{{$t('conHome.leftPrice.surplus')}}</button>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="info-attestation">
                            <span>{{$t('conHome.status.title')}}</span>
                            <button class="btn yello-btn" :class="{'show':status==null,'yello-btn':language=='zh_cn','yello-btn2':language=='en'}"  @click="linkTo('auth_information')">{{$t('auth.status.btn1')}}</button>
                            <button class="btn yello-btn" :class="{'show':status==0,'yello-btn':language=='zh_cn','yello-btn2':language=='en'}"  @click="linkTo('auth_information')">{{$t('auth.status.btn2')}}</button>
                            <button class="btn yello-btn" :class="{'show':status==2,'yello-btn':language=='zh_cn','yello-btn2':language=='en'}"  @click="linkTo('auth_information')">{{$t('auth.status.btn3')}}</button>
                            <button class="btn gree-btn" :class="{'show':status==3,'gree-btn':language=='zh_cn','gree-btn2':language=='en'}"  @click="linkTo('auth_information')">{{$t('auth.status.btn4')}}</button>
                            <button class="btn gree-btn" :class="{'show':status==4,'gree-btn':language=='zh_cn','gree-btn2':language=='en'}"  @click="linkTo('auth_information')">{{$t('auth.status.btn5')}}</button>
                        </div>
                    </div>
                    <div class="info-right">
                        <div class="info-right-title">{{$t('conHome.parameter.title')}}</div>
                        <p>{{$t('conHome.parameter.p1')}}</p>
                        <span>{{getLeft.account_sid}}</span>
                 <!--       <p>{{$t('conHome.parameter.p2')}}</p>
                        <span>hfskhfasjhdfaksjhfkjh</span>-->
                        <!--<p>{{$t('conHome.parameter.p3')}}</p>
                        <span>https://app.netele.com:8888</span>-->
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="clear"></div>
            <!--static end-->

            <!--static start-->
            <div class="static">
                <div class="info-title">{{$t('conHome.static.title')}}</div>
                <div class="static-border">
                    <div class="static-samll-title">{{$t('conHome.static.smallTitle')}}</div>
                    <div class="static-bottom">
                        <div  :class="{'static-price':language=='zh_cn','static-price2':language=='en'}">
                            <img src="/static/images/img/consloe/console-home/home-icon1.png" alt="">
                            <p>{{$t('conHome.static.p1')}}</p>
                            <p><span>{{rightData.totleCustomerPrice}}</span>{{$t('conHome.static.unit1')}}</p>
                        </div>
                        <div  :class="{'static-message':language=='zh_cn','static-message2':language=='en'}">
                            <img src="/static/images/img/consloe/console-home/home-icon2.png" alt="">
                            <p>{{$t('conHome.static.p2')}}</p>
                            <p><span>{{rightData.totleCustomerCount}} </span>{{$t('conHome.static.unit2')}}</p>
                        </div>

                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <!--static end-->
        </div>
        <!--top end-->

        <div class="clear"></div>

        <div class="bottom">
           <div class="bottom-position">
               <p class="bottom-title">{{$t('conHome.chart.title')}}</p>
               <div id="data-chart" class="chart-size"></div>
           </div>
        </div>
        <div class="modal fade" id="remindModal">
            <div class="modal-dialog" style="">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">{{$t('conHome.leftPrice.surplus')}}</h4>
                    </div>
                    <form  @submit.prevent="examinePost()" id="remindForm">
                        <div class="modal-body" style="min-height: 100px">
                            <div class="form-group col-md-12">
                                <label >{{$t('conHome.remind.title')}}</label>
                                <input v-model="remindPrice" type="number" class="form-control col-md-8"  maxlength="50" data-parsley-maxlength="50"  data-parsley-required="true">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">{{$t('conHome.remind.btn1')}} </button>
                            <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">{{$t('conHome.remind.btn2')}} </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../../controller/console_home.js"></script>
<style src="../../css/console-home.css"></style>
