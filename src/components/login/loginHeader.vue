<template>
    <div class="login-header-bk">
        <div class="longin-header">
            <div class="pull-left">
                <a href="/login">
                    <img src="/static/images/img/new-logo.png" alt="">
                </a>
            </div>
            <!--<div class="pull-right login-language">
                <a class="btn-language" @click="changeLanguage">{{$t('language')}}</a>
            </div>-->
        </div>

        <div class="clear"></div>
    </div>
</template>
<style>
    .login-header-bk{
        position: absolute;
        background: transparent;
        height: 70px;
        padding:0;
        margin:0;
        z-index: 98;
        width: 100%;
    }
    .longin-header{
        position: relative;
        width: 1166px;
        margin:0 auto;
        padding:0;
    }
    .login-header-bk .longin-header img{
        margin: 0;
        padding:20px 0 0 7px;

    }
    .login-language{
        line-height: 70px;
    }
    .login-language a{
        cursor: pointer;
        color: #ffffff!important;
    }
    @media (max-width: 1167px) {
        .sidebar-mini{
            overflow-x: auto;
            width: 1166px;
        }
    }
</style>
<style src="../../css/common.css"></style>
<script>
    import common from 'commonFunc'
    export default{
        name:'loginHeader',
        data:function () {
            return{

            }
        },
        methods: {
            logout: function (event) {
                this.$router.push({ path: '/' })
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
        mounted:function () {
        },
    }
</script>