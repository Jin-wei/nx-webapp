<template>
    <div class="find-password-content" v-cloak>
        <div class="step-bk4">
            <!--<img src="/static/images/img/login/step1.png" alt="">-->
            <div class="step-img">
                <span>{{$t('fPStep1.title')}}</span>
                <span >{{$t('fPStep2.title')}}</span>
                <span class="step-middle">{{$t('fpStep4.title')}}</span>
                <span class="step-last  step-active">{{$t('fpStep4.title')}}</span>
            </div>
        </div>

        <div class="step4-content">
            <p>{{$t('fpStep4.successMessage')}}</p>
            <a @click="linkTo('/login')"> <button class="btn blue-btn3">{{$t('fpStep4.resigterBtn')}}</button></a>

        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import vue from 'vue'
    import common from 'commonFunc'
    import messageService from 'messageService'

    export default{
        data: function () {
            return {
            }
        },
        mounted: function () {
            let _self = this;

        },
        methods:{
            linkTo: function (url) {
                this.$router.push(url)
            },
        }
    }
</script>