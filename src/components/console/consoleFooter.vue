<template>
  <div>
    <div class="container-fluid console-footer-bottom">
      <div class="row">
        <div class="console-footer-bottom-text col-lg-12 col-md-12">
          <p>{{$t('bottomFooter')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>
<style>

  .console-footer-bottom{
    background: #d9d9d9;
    min-width: 1166px;
    width: 100%;
  }
  .console-footer-bottom-text{
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    background: #d9d9d9;
    font-size: 12px;
    color: #323232;
    font-weight: 500;
    text-align: center;
    height: 40px;
    line-height:40px;
    width: 100%;
    position:absolute;
    bottom:0px;
    left:0px;
    z-index: 950;
  }
  .console-footer-bottom-text p{
    margin: 0;
  }
  .code-margin h4{
    margin:11px 40px 17px 0;

  }
  .code-margin img{
    margin:0 24px 12px 0;
  }
  @media (max-height: 820px) {
    .console-footer-bottom-text{
      position:relative;
    }
  }
  @media (min-height: 820px) {
    .console-footer-bottom-text{
      position:absolute;
    }
  }

</style>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    export default {
        name: 'consoleMain',
        data:function () {
            return{
                language:common.getStoreData('language'),
                consoleMainHeigth: $(window).height()
            }
        },
        mounted: function () {
            let _self=this;
            _self.getHeight();
            $(window).resize(function(){
                _self.getHeight()
            });
        },
        methods:{
          getHeight:function () {
              let _self = this;
              let leftHeigth='';
              window.setTimeout(function () {
                  leftHeigth= $(".console-main").height();
                  _self.consoleMainHeigth= $(window).height()
                  if(leftHeigth>_self.consoleMainHeigth-120){
                      $(".console-footer-bottom-text").css("position","relative");
                  }else {
                      $(".console-footer-bottom-text").css("position","absolute");
                  }
              },100)
          }
        },
        watch:{
            '$route': function () {
                let _self = this;
                _self.getHeight();
            },


        },
    }
</script>
