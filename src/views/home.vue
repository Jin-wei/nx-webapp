<template>
  <div style="position: relative">
      <!--{{ $t("home.hello") }}-->
      <div>
          <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
              <!-- Indicators -->
              <ol class="carousel-indicators">
                  <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="2"></li>
              </ol>

              <!-- Wrapper for slides -->
              <div class="carousel-inner" role="listbox">
                  <div class="item" v-for="banner in $t('home.banner')" :class="{'active':banner.active==1}">
                      <div :class=banner.img>
                          <div class="content">
                              <h3>{{banner.writeTitle}}<span>{{banner.blueTilte}}</span></h3>
                              <div class="banner-small">
                                  <img src="/static/images/img/home/banner-line.png" alt="">
                                  <div>
                                      <span>{{banner.subtitle}}</span>
                                  </div>
                              </div>
                              <div class="clear"></div>
                              <!--<div class="banner-btn">
                                  <a href="">{{banner.moreBtn}}</a>
                              </div>-->
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Controls -->
              <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                  <!--<span aria-hidden="true"><img src="/static/images/home/banner-left.png"></span>-->
                  <img class="banner-left" src="/static/images/img/home/banner-left.png" aria-hidden="true">
                  <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                  <img class="banner-right" src="/static/images/img/home/banner-right.png" aria-hidden="true">
                  <span class="sr-only">Next</span>
              </a>
          </div>
      </div>

      <!--product start-->
      <div class="product min-width">
            <div class="product-title">
                <div class="title-large">
                    <div class="product-text">
                        <hr class="title-line">
                        <span v-html="$t('home.productService.cnTitle')"></span>
                        <hr class="title-line">
                    </div>
                </div>
                <div class="title-small">
                    <span>{{ $t("home.productService.small") }}</span>
                </div>
            </div>
          <div class="home-product-content">
              <ul>
                  <li v-for="li in $t('home.productService.productLi')">
                      <div class="home-product-li">
                          <img :src=li.iconHref alt="">
                          <p>{{li.title}}</p>
                          <span>{{li.small1}}</span>
                          <span>{{li.small2}}</span>
                          <span :class="{'product-margin':language=='zh_cn','product-margin2':language=='en'}">{{li.small3}}</span>
                          <a @click="turnProduct(li.scroll)">{{li.moreBtn}}</a>
                          <div>
                          </div>
                      </div>
                  </li>
              </ul>

              <div class="clear"></div>
          </div>
      </div>
      <!--product end-->

      <!--application start-->
      <div class="application">
          <div class="application-bk">
              <div class="application-title">
                  <div>
                      <div class="product-write-text">
                          <hr class="title-write-line">
                          <span>{{$t('home.application.cnTitle')}}</span>
                          <hr class="title-write-line">
                      </div>
                  </div>
                  <div class="title-write-samll">
                      <span>{{ $t("home.application.small") }}</span>
                  </div>
              </div>
              <div class="advantage-content">
                  <div class="application-left-content">
                      <ul>
                          <li v-for="li in $t('home.application.li')">
                              <div class="application-li">
                                  <div class="application-div-li application-algin">
                                      <p>{{li.title}}</p>
                                      <span v-html="li.small"></span>
                                  </div>
                                  <div class="application-right-img">
                                      <img :src=li.iconHref alt="">
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
                  <div class="application-content">
                      <ul>
                          <li v-for="li in $t('home.application.li2')">
                              <div class="application-li">
                                  <div class="application-left-img">
                                      <img :src=li.iconHref alt="">
                                  </div>
                                  <div class="application-div-li">
                                      <p>{{li.title}}</p>
                                      <span v-html="li.small"></span>
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>

              </div>
              <div class="clear"></div>

          </div>
      </div>
      <!--application end-->

      <!--partner start-->
      <div class="partner min-width">
          <div class="practical-title">
             <div>
                 <div class="product-text">
                     <hr class="title-line">
                     <span>{{$t('home.partner.cnTitle')}}</span>
                     <hr class="title-line">
                 </div>
             </div>
              <div class="title-small">
                  <span>{{ $t("home.partner.small") }}</span>
              </div>
          </div>

          <div class="partnerSlider">
              <div class="slide" v-for="n in 8">
                  <div class="partner-img">
                      <img class="partner-hover-img" src="/static/images/img/home/message-img-hover.png" alt="">
                      <img :src="'/static/images/img/home/company' + n +'.png'" alt="">
                  </div>
              </div>
          </div>
      </div>
      <!--partner end-->

      <!--messge start-->
      <div class="application">
          <div class="message-bk">
              <div class="application-title">
                  <div class="message-title-margin">
                      <div class="product-write-text">
                          <hr class="title-write-line">
                          <span>{{$t('home.message.cnTitle')}}</span>
                          <hr class="title-write-line">
                      </div>
                  </div>
              </div>
              <div class="message-content">
                  <div class="message-input-div">
                      <label>{{$t('home.message.phone')}}</label>
                      <input class="phone-short-input" v-model="country" type="number" :placeholder="$t('home.message.phoneCountry')">
                      <input class="phone-long-input" v-model="phone" type="number" :placeholder="$t('home.message.phoneText')">
                  </div>
                  <div class="message-small">
                        <span>{{$t('home.message.samll')}}</span>
                  </div>
                  <div class="message-input-div">
                      <label>{{$t('home.message.nub')}}</label>
                      <input class="message-short-input" v-model="code" type="number" :placeholder="$t('home.message.nubText')">
                      <img @click="refreshCaptcha" class="nub-img" :src="captcha.data">
                  </div>
                  <div class="message-btn">
                      <button class="btn" @click="sendMessage">{{$t('home.message.btn')}}</button>
                  </div>
              </div>
          </div>
      </div>
      <!--messge end-->


  </div>
</template>
<style src="../css/home.css"></style>

<script>
const common = require('commonFunc')
import $ from 'jquery'
export default {
    name: 'home',
    data: function() {
        return {
            captcha: {},
            captchaText: '',
            language:common.getStoreData('language'),
            country:'',
            phone:'',
            code:'',
            urlApi:'/api/console/HomeNewSRV?method=',
            sendCount:0,
        }

    },
    created () {
        this.$store.commit('changeHeaderActive',{"firstMenu":"home","secondMenu": ""});
    },
    mounted:function(){
        $(document).ready(function(){
            $('.partnerSlider').bxSlider({
                slideWidth: 240,
                minSlides: 4,
                maxSlides: 4,
                moveSlides: 1,
                slideMargin: 30
            });


        });
        let _self = this;
        _self.refreshCaptcha();

    },
    methods:{
        linkTo: function (url) {
            this.$router.push(url)
        },
        turnProduct:function (higth) {
            this.$router.push({ path: '/system/all_production',query:{scroll:higth}})
        },
        refreshCaptcha: function(event) {
            let _self = this
            async function getCaptcha() {
                try {
                    let response = await _self.$http.post('/api/captcha', {type:'sendSmsTryout'});
                    _self.captcha = $.extend(true, {}, response.data.info);
                } catch (error) {
                    common.dealConsolError(_self,error);
                }
            }
            getCaptcha()
        },
        sendMessage:function () {
            let _self=this;
            if(_self.country=="" || _self.country==null){
                common.WarningBox(_self, 'USER_016');
                return;
            }
            if(_self.phone=="" || _self.phone==null){
                common.WarningBox(_self, 'USER_009');
                return;
            }
            if(_self.code=="" || _self.code==null){
                common.WarningBox(_self, 'USER_005');
                return;
            }
            let params={}
            params.phone=_self.country+_self.phone;
            params.uuid=_self.captcha.uuid;
            params.captcha=_self.code;
            params=JSON.stringify(params);
            if( _self.sendCount==0){
                _self.sendCount++;
            }else{
                return
            }
            this.$http.post(_self.urlApi + 'sendSmsTryOut', params).then((response) => {
                if (response.data.errno == 0) {
                    common.WarningBox(_self, 'USER_SEND_SUCESS');
                    _self.code="";
                    _self.phone="";
                    _self.country='';
                    _self.sendCount=0
                    _self.refreshCaptcha();
                } else {
                    common.dealConsolError(_self, response);
                }
            }, (response) => {
                common.dealConsolError(_self, response);
                _self.sendCount=0;
            });
        },
    }
}

</script>
