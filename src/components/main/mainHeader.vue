<template>
  <header id="home-header" class="navbar navbar-inverse header-home transparent-bk"  :class="[{ 'hidden' : firstMenu == 'erro'}]">
    <div class="header-container" id="app-2">
      <div class="navbar-header">
        <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="true" style="margin: 15px 0 0 0">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a @click="linkTo('/system/home')"  class="navbar-brand">
          <img  class="img-responsive" src="../../../public/static/images/img/new-logo.png" alt="">
          <!--<img v-if="firstMenu == 'home'" class="img-responsive" src="../../../public/static/images/img/logo.png" alt="">
          <img v-if="firstMenu != 'home'" class="img-responsive" src="../../../public/static/images/img/logo-gray.png" alt="">-->
        </a>
      </div>
      <nav id="bs-navbar" class="navbar-collapse collapse" role="navigation">
        <ul class="nav navbar-nav navbar-right">
          <li :class="{ 'active' : firstMenu == 'home'}">
            <a @click="linkTo('/system/home')" class="home">
              <div>{{$t('webHeader.li1.cn')}}</div>
            </a>
          </li>

          <li :class="{ 'active' : firstMenu == 'product'}">
            <a class=" product" @click="linkTo('/system/all_production')" role="button" aria-haspopup="true" aria-expanded="true">
              <div>{{$t('webHeader.li2.cn')}}</div>
            </a>
            <ul class="dropdown-menu dropdown-menu-left" role="menu">
              <li :class="{'product-ative':secondMenu=='voice'}"><a
                      @click="linkTo('/system/voice_service')">{{$t('webHeader.li2Child.p1')}}</a></li>
              <li :class="{'product-ative':secondMenu=='message'}"><a
                      @click="linkTo('/system/message_service')">{{$t('webHeader.li2Child.p2')}}</a></li>
              <li :class="{'product-ative':secondMenu=='data'}"><a
                      @click="linkTo('/system/data_service')">{{$t('webHeader.li2Child.p3')}}</a></li>
              <li :class="{'product-ative':secondMenu=='number'}"><a
                      @click="linkTo('/system/number_service')">{{$t('webHeader.li2Child.p4')}}</a></li>
            </ul>
          </li>
          <li :class="{ 'active' : firstMenu == 'price'}">
            <a @click="linkTo('/system/price_inquiry')" class="price">
              <div>{{$t('webHeader.li3.cn')}}</div>
            </a>
          </li>
          <li :class="{ 'active' : firstMenu == 'document'}">
            <a @click="linkTo('/system/develop_doc')" class="document">
              <div>{{$t('webHeader.li4.cn')}}</div>
            </a>
          </li>
          <!--<li>
            <a class="btn-language" @click="changeLanguage">
              <div> {{$t('language')}}</div>
            </a>
          </li>-->
          <!--<li :class="{ 'active' : firstMenu == 'problem'}">
            <a @click="linkTo('/system/seq/seq_sub/:0')" class="problem">
              <div>{{$t('webHeader.li5.cn')}}</div>
              <div class="line-height"><span>{{$t('webHeader.li5.en')}}</span></div>
            </a>
          </li>
          <li :class="{ 'active' : firstMenu == 'about'}">
            <a @click="linkTo('/system/about_us/company_info')" class="about">
              <div>{{$t('webHeader.li6.cn')}}</div>
              <div class="line-height"><span>{{$t('webHeader.li6.en')}}</span></div>
            </a>
          </li>-->
          <li class="button-bk">
            <div class="pull-left">
              <a @click="linkTo('/login')" ><button type="button" class="btn btn-primary btn-login">{{$t('webHeader.loginBtn')}}</button></a>
              <a @click="linkTo('/register')"><button type="button" class="btn btn-primary btn-register">{{$t('webHeader.registerBtn')}}</button></a>
            </div>
            <!--<div class="pull-left">
              <a class="btn-language" @click="changeLanguage">{{$t('language')}}</a>
            </div>-->
          </li>
          <li>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
    import $ from 'jquery'
    import Vue from 'vue'
    import Vuex from 'vuex'
    import common from 'commonFunc'
    import {mapState,mapGetters,mapActions } from 'vuex'

    export default {
        data: function () {
            return {
                userinfo: common.getStoreData('userinfo'),
                selected:'',
            }
        },
        name: 'mainHeader',
        methods: {
            linkTo: function (url) {
                this.$router.push(url)
            },
            changeLanguage:function () {
               if(common.getStoreData('language')=='zh_cn'){
                   common.setStoreData('language', 'en');
                   window.location.reload();

                }else if(common.getStoreData('language')=='en'){
                   common.setStoreData('language', 'zh_cn');
                   window.location.reload();
                }
            }

        },
        computed: mapGetters({
            firstMenu: 'firstMenu',
            secondMenu:'secondMenu'
        }),
        mounted:function () {
            $(function () {
                $(window).scroll(function () {
                    //检查对象的顶部是否在游览器可见的范围内
                      /*var scrollTop = $(window).scrollTop();
                      if (scrollTop>0){
                          $('#home-header').addClass('blue-bk');
                      }
                      else{
                          window.setTimeout(function(){
                              $('#home-header').removeClass('blue-bk');
                          },100)

                      }*/

                    /*var yAris = $("#home-header").offset().top;*/
                  var yAris = $(window).scrollTop();
                    if (yAris > 0) {
                        $('#home-header').addClass('blue-bk');
                    }else{
                        $('#home-header').removeClass('blue-bk');
                    }
                });
            })
        },
    }

    $('.dropdown-toggle').dropdown();
</script>


<style>
  template{
    font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  a{
    cursor: pointer;
  }
  .header-container{
    width: 1166px;
    margin: 0 auto;
    height: 80px;
  }
  .navbar{
    margin-bottom: 0;
    border-radius: 0;
    border:none;
  }
  .nav>li>a{

  }
  .navbar-brand{
    padding: 18px 7px 15px 7px;
  }
  .header-home{
    position: fixed;
    width: 100%;
    top:0px;
    z-index: 80;
  }
  .transparent-bk{
    background-color:transparent!important;
    border-color: transparent!important;
/*    background-color: none;*/
    box-shadow: none;
    position: fixed;
    top: 0;
    margin: 0;
    width: 100%;
    padding: 0px 0 0px 0;
    z-index: 1001;
    /*border-bottom: 1px solid #fff;*/
    transition:background-color 1s,box-shadow 1s;
    -moz-transition:background-color 1s,box-shadow 1s; /* Firefox 4 */
    -webkit-transition:background-color 1s,box-shadow 1s; /* Safari and Chrome */
    -o-transition:background-color 1s,box-shadow 1s; /* Opera */
  }
  .header-black{
    background:#303a42!important;
  }
  .blue-bk{
    background-color:#39afe5!important;
   /* border-color: #39afe5!important;*/
    padding: 0px 0;
    box-shadow: 0 0 10px 1px #666;
    transition:background-color 1s,box-shadow 1s,padding .5s;
    -moz-transition:background-color 1s,box-shadow 1s,padding .5s; /* Firefox 4 */
    -webkit-transition:background-color 1s,box-shadow 1s,padding .5s; /* Safari and Chrome */
    -o-transition:background-color 1s,box-shadow 1s,padding .5s; /* Opera */
  }
  .navbar-collapse{
    padding-right:0;
    text-align: center;
  }
  .navbar-inverse .navbar-nav>li>a {
    color: #f7f7f7;
    padding-top:31px;
    height: 80px;
    min-width: 30px;
    padding-right: 0px;
    padding-left: 0;
    margin-right: 35px;
    text-align: center;
    font-weight: 400;
    font-size: 18px!important;
  }
  .navbar-inverse .navbar-nav>li>a:focus, .navbar-inverse .navbar-nav>li>a:hover {
    color: #ffffff;
    background-color:transparent;
  }
  /*显示下拉框*/
  .nav > li:hover .dropdown-menu{
    /*display: block;*/
  }
  .nav > li:hover .dropdown-toggle{
    color: #ffffff;
    background-color: #39afe5;
  }
  .dropdown-active{
    color: #ffffff;
    background-color: #39afe5;
  }
  .navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:focus, .navbar-inverse .navbar-nav>.active>a:hover{
      color:#ffffff;
      background-color: transparent;
  }
  .navbar-nav>li>.active{

  }
  .navbar-nav>li>a{
    line-height: 18px;
  }
  .navbar-right li a{
    text-align: center;
  }
  .navbar-right li a div{
    font-size: 16px!important;
    font-weight: 600;
  }

  .navbar-right li a div span{
    diaplay:block;
    text-align: center;
    line-height: 10px;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.90);
    font-size: 10px!important;
  }
  /*.dropdown-menu > li > a:hover{
    background-color: #39afe5;
    color:#343098;
  }
  .dropdown-menu >.product-ative>a{
    background-color: #39afe5;
    color:#343098;
  }*/

  .line-height{
    line-height: 10px;
  }

  .btn-login{
    background: transparent;
    border:1px solid #ffffff;
    color: #ffffff;
    font-size: 16px;
    min-width: 70px;
    min-height:25px;
    padding: 0 18px;
    font-weight: 600;

  }
  .btn-login:hover{
    background: transparent;
    border:1px solid #ffffff;
    color: #ffffff;
  }
  .btn-register{
    background: transparent;
    border:1px solid #ffffff;
    color: #ffffff;
    font-size: 16px;
    min-width: 70px;
    min-height:25px;
    padding: 0 18px;
    margin-left: 10px;
    font-weight: 600;

  }
  .btn-register:hover{
    background: transparent;
    border:1px solid #ffffff;
    color: #ffffff;
  }
  .btn-sgin {
    background: #39afe5;
    color: white;
    font-size: 16px;
    min-width: 70px;
    max-height: 25px;
    padding: 0 17px;
    margin-left:18px;
    margin-right: 6px;
  }
  .dropdown-menu-left{
    background: #39afe5;
    color: #f7f7f7;
    min-width:107px;
    border-color: #028dbc;
    padding:0px;
    border:none;
    border-top:1px solid #028dbc;
    border-radius:0;
  }
  /*.dropdown-menu>li>a{
    color: #f7f7f7;
    min-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid  #028dbc;
    line-height:40px;
    padding: 3px 11px;
  }*/

  .button-bk {
    margin-top: 28px;
    margin-left:0px;
  }
  .navbar-inverse .navbar-nav>li>.home{
    min-width: 20px;
  }
  .navbar-inverse .navbar-nav>li>.product{
    min-width: 20px;
  }
  .navbar-inverse .navbar-nav>li>.price{
    min-width: 20px;
  }
  .navbar-inverse .navbar-nav>li>.document{
    min-width: 20px;
  }
  .navbar-inverse .navbar-nav>li>.problem{
    min-width: 20px;
  }
  .navbar-inverse .navbar-nav>li>.about{
    min-width: 20px;
  }
  @media(max-width: 1166px){
    .header-gray,.header-black{
      width: 1166px;
    }
  }
  @media (min-width: 768px){
    .navbar-right {
      float: right!important;
      margin-right: 0;
    }
  }
  .navbar-right li .btn-language{
    display: inline-block;
    margin: 0 33px 0 0!important;
    cursor:pointer;

  }


</style>
