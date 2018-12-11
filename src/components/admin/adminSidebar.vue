<template>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img :src="userinfo.avatar" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{ userinfo.description }}</p>
          <a href="#"><i class="fa fa-circle text-success"></i> {{ userinfo.name }}</a>
        </div>
      </div>
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">主菜单</li>
        <template v-for="item in userinfo.menulist">
          <li class="treeview">
            <template v-if="item.menu_type === '01'">
              <router-link to="item.menuPath">
                <i v-bind:class="'fa ' + item.menu_icon "></i> <span>{{ item.menu_name }}</span>
                <span class="pull-right-container">
                  <small class="label pull-right bg-green">new</small>
                </span>
              </router-link>
            </template>
            <template v-if="item.menu_type === '00'">
              <a href="#">
                <i :class="'fa ' + item.menu_icon"></i> <span> {{ item.menu_name }}</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <template v-for="sItem in item.sub_menu">
                  <li v-if="sItem.show_flag === '1'"><router-link :to="sItem.menu_path"><i class="fa fa-circle-o"></i> {{ sItem.menu_name }}</router-link></li>
                </template>
              </ul>
            </template>
          </li>
        </template>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import $ from 'jquery'
var common = require('commonFunc')
export default {
  name: 'adminSidebar',
  data: function () {
    return {
      userinfo: common.getStoreData('userinfo')
    }
  },
  mounted: function () {
      if(this.userinfo==undefined || this.userinfo.menulist==undefined){
          this.$router.push({
              path: '/admin_login'
          })
      }
      if(this.userinfo.menulist==""){
          this.$router.push({
              path: '/admin_login'
          })
      }
  },
  watch:{
      '$route': function () {
          let _self = this;
          common.removeStoreData('customer');
          common.removeStoreData('vendorName');
          common.removeStoreData('appName');
          common.removeStoreData('startDate');
          common.removeStoreData('endDate');
          common.removeStoreData('sale');

      },
  },
}
</script>
<style>

</style>
