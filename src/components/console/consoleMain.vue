<template>
    <div>
        <console-header></console-header>
        <!--<div class="content-wrapper"><router-view></router-view></div>-->
        <console-sidebar :firstName="firstName" :secondName="secondName"></console-sidebar>
        <router-view class="console-main" :class="{'ch_marigin':language=='zh_cn','en_margin':language=='en'}"  style=""></router-view>
        <console-footer></console-footer>
    </div>
</template>
<style>
    @media (max-width: 1167px) {
        .sidebar-mini{
            overflow-x: auto;
            width: 1166px;
        }
    }

    .ch_marigin{
        min-height: 765px;
        padding:80px 0 0 230px;
    }

    .en_margin{
        min-height: 765px;
        padding:80px 0 0 270px;
    }
</style>
<style src="../../css/common.css"></style>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    import consoleHeader from './consoleHeader.vue'
    import consoleFooter from './consoleFooter.vue'
    import consoleSidebar from './consoleSidebar.vue'
    export default {
        name: 'consoleMain',
        components: { consoleHeader, consoleFooter,consoleSidebar},
        data:function () {
            return{
                firstName: '',
                secondName:'',
                language:common.getStoreData('language')
            }
        },
        watch:function () {
//            alert($("#leftHeight").height());
        },
        methods:{
            setActive: function(a, b, event) {
                this.firstName = a;
                this.secondName = b;
            }

        },
    }
</script>