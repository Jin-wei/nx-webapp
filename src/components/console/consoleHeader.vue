<template>
  <div class="header-fix">
    <div class="header-border">
      <header class="header-content">
        <div class="navbar-brand left-loglo">
          <a href="/login">
            <img src="/static/images/img/login/login-logo.png" alt="">
          </a>
        </div>
        <!--<div class="pull-right">
          <a class="console-language" @click="changeLanguage">{{$t('language')}}</a>
        </div>-->
        <div class="right-text">
          <div class="right-text-block myCount" @click="logout('console/basic_information')">
            <div class="text-margin">{{$t('consoelHeader.li1.cn')}}</div>
            <div class="small-English"><span>{{$t('consoelHeader.li1.en')}}</span></div>
          </div>

          <!--<div class="right-text-block devolpDoc" @click="newWindow('develop_doc')">
            <div class="text-margin">{{$t('consoelHeader.li2.cn')}}</div>
            <div class="small-English"><span>{{$t('consoelHeader.li2.en')}}</span></div>
          </div>

          <div class="right-text-block" @click="newWindow('home')">
            <div class="text-margin">{{$t('consoelHeader.li3.cn')}}</div>
            <div class="small-English"><span>{{$t('consoelHeader.li3.en')}}</span></div>
          </div>-->

        </div>
        <div class="clear"></div>

      </header>
    </div>
  </div>

</template>
<script>
    import $ from 'jquery'
    import common from 'commonFunc'
    export default {
        data: function () {
            return {
                userinfo: common.getStoreData('userinfo'),
            }
        },
        name: 'mainHeader',
        mounted:function () {
           if( common.getStoreData('token')==undefined){
               this.$router.push({ path: '/login'})
           }
        },
        methods: {
            logout: function (url) {
                this.$router.push({ path: '/'+url })
            },
            newWindow:function (url) {
                window.open('/system/'+url);
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
    }

    $('.dropdown-toggle').dropdown();
    $(window).scroll(function() {
        var scrollleft=$(window).scrollLeft()+"px";
        $(".header-fix").css("left","-"+scrollleft);

    });
</script>


<style>
  template{
    font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
    position: fixed;
    top:0;
    left:0;
  }

  p{
    margin: 0;
    padding: 0;
  }
  .clear{
    clear: both;
  }
  .header-fix{
    position: fixed;
    top:0;
    left:0;
    z-index: 1000;
    width: 100%;
    background: #ffffff;
  }
  .header-border{
    height: 80px;
    border-bottom: 1px solid #bfbfbf;
  }
  .header-content{
    position: relative;
    width: 1266px;
    height: 80px;
    margin: 0 auto;
  }
  .left-loglo{
    padding:17px 0 0 0;
  }
  .right-text{
    float: right;
  }
  .right-text-block{
    font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
    color: #333333;
    float: right;
    height: 33px;
    min-width: 80px;
    text-align: center;
    margin-top: 27px;
    cursor: pointer;
  }
  .right-text-block div{
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
  }
  .text-margin{
    padding: 2px 0 0 0;
  }
  .right-text-block .small-English{
    line-height: 10px;
    text-align: center;
  }
  .right-text-block .small-English span{
    display:inline-block;
    font-size: 10px;
    -webkit-transform: scale(0.80);
    line-height: 10px;
    padding:3px 0 0 0;
  }
  .myCount{
    padding-left:38px;
    padding-right: 6px;
    border-left: 1px solid #333333;
  }
  .devolpDoc{
    padding-left:29px;
    padding-right: 25px;
  }
  @media (max-width: 1267px) {
    .sidebar-mini {
      overflow-x: auto;
      width: 1266px;
    }

    .header-border {
      width: 1266px;
    }
  }
  .console-language{
    display: inline-block;
    color:#333333;
    padding: 30px  0 0 29px;
  }

</style>
