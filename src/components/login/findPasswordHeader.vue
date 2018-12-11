<template>
    <div class="find-container">
        <header class="navbar navbar-inverse header-gray margin-bottom" >
            <div class="find-header-container" id="app-2">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="true" style="margin: 15px 0 0 0">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="/login" class="navbar-brand">
                        <img v-if="" class="img-responsive" src="/static/images/img/new-logo.png" alt="">
                    </a>
                </div>
                <div class="find-header-right">
                    <a @click="linkTo('/register')">{{$t('fPHeader.resigerBtn')}}</a>
                    <span>|</span>
                    <a class="find-return"  @click="linkTo('/login')">{{$t('fPHeader.returnHome')}}</a>
                </div>

                <div class="clear"></div>
            </div>
        </header>

        <div class="header-middle">
            <div class="min-width">

                <div>
                    <div class="title-border">
                        <div class="find-password-title">
                            <img class="lock" src="/static/images/img/login/lock.png" alt="">
                            <span>{{$t('fPHeader.findPasswordTitle')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
    @media (max-width: 1167px) {
        .sidebar-mini{
            overflow-x: auto;
            width: 1166px;
        }
    }
</style>
<script>
    export default{
        name:'findPasswordHeader',
        data: function () {
            return {
            }
        },
        methods:{
            linkTo:function (url) {
                this.$router.push(url)
            },
        }
    }
</script>