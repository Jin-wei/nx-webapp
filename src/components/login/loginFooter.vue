<template>
    <div>
        <div class="login-footer-position">
            <div class="login-footer col-lg-12 col-md-12">
                <p>{{$t('bottomFooter')}}</p>
            </div>
        </div>
    </div>
</template>
<style>
    template{
        margin: 0;
        padding: 0;
    }
    .login-footer-position{
        position: absolute;
        bottom: 0;
        width: 100%;

    }
    .login-footer{
        position: relative;
        height: 45px;
        text-align: center;
        vertical-align: middle;
        background: transparent;
        color:#ffffff;
        line-height:45px;
        font-size: 12px;
        font-weight: 600;
        margin: 0;
        padding: 0;
    }
    .login-footer p{
        margin: 0;
        padding: 0;
    }
    @media (max-width: 1166px) {
        .login-footer{
            width: 1166px;
        }

    }
</style>
<script>
    export default{
        name:'loginFooter',
        data:function () {
            return{

            }
        }
    }
</script>