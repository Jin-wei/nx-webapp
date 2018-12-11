<template>
  <div>
    <main-header></main-header>
    <online-service></online-service>
    <!--<div class="content-wrapper"><router-view></router-view></div>-->
    <router-view class="mian-system"></router-view>
    <main-footer></main-footer>
  </div>
</template>
<script>
    import $ from 'jquery'
    import onlineService from '../components/product_service/online_service'
    var common = require('commonFunc')
    var Store = require('store')
    import mainHeader from './main/mainHeader'
    import mainFooter from './main/mainFooter'
    import Vuex from 'vuex'
    import {mapGetters,mapActions } from 'vuex'
    export default {
        name: 'mainSystem',
        components: { mainHeader, mainFooter,onlineService},
        mounted: function () {
//            require('../assets/js/app.js')
            require('../assets/js/init.js')
        }
    }
</script>
<style>
  @media (max-width: 1167px) {
    .sidebar-mini{
      overflow-x: auto;
      width: 1166px;
    }
  }
  .mian-system{
    min-height: 500px;
    margin-top:0px;
  }
</style>
<style src="../css/common.css"></style>
