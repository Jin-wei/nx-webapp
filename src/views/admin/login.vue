<template>
<div class="login-box">
    <div class="login-logo">
        <a href="/"><b>NX</b> Admin.</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
        <p class="login-box-msg">登录进入工作台</p>

        <div>
            <div class="alert alert-danger" v-bind:class="{ 'hidden': isA }">{{ errorMessage }}</div>
            <div class="form-group has-feedback">
                <input v-model="username" type="text" class="form-control admin-login-input" placeholder="用户名">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input v-model="password" type="password" class="form-control admin-login-input" placeholder="密码">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="login-img-check">
                <div class="form-group">
                    <input v-model="captchaText" placeholder="图像验证码" class="form-control">
                    <div class="write-block">
                        <img alt="" :src="captcha.data">
                    </div>
                    <a @click="refreshCaptcha">看不清 ?</a>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4">
                    <button v-on:click="login" class="btn btn-primary btn-block btn-flat">登录</button>
                </div>
                <!-- /.col -->
            </div>
        </div>

        <div class="social-auth-links text-center">
            <p></p>
        </div>
        <!-- /.social-auth-links -->

        <!--<a href="#">忘记密码</a><br>
        <a href="register.html" class="text-center">注册新账户</a>-->

    </div>
    <!-- /.login-box-body -->
</div>
<!-- /.login-box -->
</template>
<script>
import $ from 'jquery'
const common = require('commonFunc')

export default {
    name: 'login',
    data: function() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            captcha: {},
            captchaText: '',
            isA: true
        }
    },
    mounted: function() {
        let _self = this
        async function getCaptcha() {
            try {
                let response = await _self.$http.post('/api/captcha', {type:'login'});

                _self.captcha = $.extend(true, {}, response.data.info);

            } catch (error) {
                common.dealErrorCommon(_self, error)
            }
        }

        getCaptcha()
        $('body').removeClass()
        $('body').addClass('hold-transition')
        $('body').addClass('login-page')
    },
    methods: {
        login: function(event) {
            let _self = this

            let encInfo = common.aesEncryptModeCFB(this.username, this.password)
            this.$http.post('/api/auth', {
                username: this.username,
                identifyCode: encInfo[1],
                magicNo: encInfo[0],
                uuid: _self.captcha.uuid,
                captcha: _self.captchaText
            }).then((response) => {
                let token = response.headers.get('authorization')

                if (token) {
                    common.removeStoreData('token');
                    common.removeStoreData('userinfo');
                    common.setStoreData('token', token)
                    common.setStoreData('userinfo', response.data.info)
                    $('body').removeClass()
                    $('body').addClass('hold-transition')
                    $('body').addClass('skin-blue')
                    $('body').addClass('sidebar-mini')
                    this.$router.push({
                        path: '/admin/home'
                    })
                } else {
                    this.errorMessage = '系统错误'
                    this.isA = false
                    common.removeStoreData('token');
                    common.removeStoreData('uerinfo');
                }
            }, (response) => {
                // error callback
                this.errorMessage = response.data.msg
                this.isA = false
            })
        },
        refreshCaptcha: function(event) {
            let _self = this
            async function getCaptcha() {
                try {
                    let response = await _self.$http.post('/api/captcha', {type:'login'});
                    _self.captcha = $.extend(true, {}, response.data.info);
                    $('.hide-order-detail-desk').show();
                } catch (error) {
                    common.dealErrorCommon(_self, error)
                }
            }
            getCaptcha()
        }
    }
}
</script>
<style>
    a{
        cursor: pointer;
    }
    .admin-login-input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset!important;
        border-radius: 0;
        box-shadow: none;
        border: 1px solid #ccc;
        color:#555;
        text-fill-color:#555;
        -webkit-text-fill-color:#555;
    }
    .admin-login-input:focus{
        -webkit-box-shadow: 0 0 0px 1000px white inset!important;
        border-radius: 0;
        box-shadow: none;
        border: 1px solid #ccc;
        text-fill-color:#555;
        -webkit-text-fill-color:#555;
    }

</style>
