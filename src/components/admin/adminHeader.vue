<template>
    <div>
        <header class="main-header">
            <!-- Logo -->
            <a href="/" class="logo">
                <!-- mini logo for sidebar mini 50x50 pixels -->
                <span class="logo-mini"><b>NX</b></span>
                <!-- logo for regular state and mobile devices -->
                <span class="logo-lg"><b>NX </b>Admin</span>
            </a>
            <!-- Header Navbar: style can be found in header.less -->
            <nav class="navbar navbar-static-top">
                <!-- Sidebar toggle button-->
                <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only">Toggle navigation</span>
                </a>

                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <!-- User Account: style can be found in dropdown.less -->
                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img :src="userinfo.avatar" class="user-image" alt="User Image">
                                <span class="hidden-xs">{{ userinfo.description }}</span>
                            </a>
                            <ul class="dropdown-menu">
                                <!-- User image -->
                                <li class="user-header">
                                    <img :src="userinfo.avatar" class="img-circle" alt="User Image">

                                    <p>
                                        {{ userinfo.description }}
                                        <small>Member since {{ userinfo.createdAt }}</small>
                                    </p>
                                </li>
                                <!-- Menu Footer-->
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <!--<router-link to="/system/userSetting" class="btn btn-default btn-flat">设置</router-link>-->
                                    </div>
                                    <div class="pull-right">
                                        <button class="btn btn-default btn-flat" v-on:click="logout">签退</button>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <!-- Control Sidebar Toggle Button
                <li>
                  <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                </li>
                -->
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>
<script>
    import $ from 'jquery'
    var common = require('commonFunc')
    export default {
        data: function() {
            return {
                userinfo: common.getStoreData('userinfo')
            }
        },
        name: 'adminHeader',
        methods: {
            logout: function(event) {
                common.removeStoreData('token');
                common.removeStoreData('userinfo');
                this.$router.push({
                    path: '/admin_login'
                })
            }
        }
    }
</script>
<style scoped>
    .navbar-custom-menu .navbar-nav,.navbar-custom-menu .navbar-nav a{
        height: 50px;
    }
</style>
