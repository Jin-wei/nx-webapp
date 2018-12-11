<template>
    <div class="wrapper">
        <admin-header></admin-header>
        <admin-sidebar></admin-sidebar>
        <div class="content-wrapper"><router-view></router-view></div>
    </div>
</template>
<script>
    import $ from 'jquery'
    var common = require('commonFunc')
    var Store = require('store')
    import adminHeader from './admin/adminHeader'
    import adminSidebar from './admin/adminSidebar'
    export default {
        name: 'mainAdmin',
        components: { adminHeader, adminSidebar },
        mounted: function () {
            require('../assets/js/init.js')
        }
    }
</script>
<style src="../css/admin.css"></style>
<style scoped>
</style>
