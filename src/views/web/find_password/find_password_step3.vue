<template>
    <div v-cloak>
        <div class="step-bk3">
            <!--<img src="/static/images/img/login/step1.png" alt="">-->
            <div class="step-img">
                <span class="step-active">{{$t('fPStep1.title')}}</span>
                <span class="step-active">{{$t('fPStep2.title')}}</span>
                <span class="step-middle step-active">{{$t('fpStep3.title')}}</span>
                <span class="step-last">{{$t('fpStep4.title')}}</span>
            </div>
        </div>
        <div class="step-content">
            <input type="password" v-model="inputPassword.value" :placeholder="$t('fpStep3.passwordPlaceholder')" style="margin-top:35px" v-on:keyup="checkPassword(inputPassword.value)">
            <div class="warning-error">
                <div v-bind:class="{'hidden':inputPassword.error}">
                    <img src="/static/images/img/login/erro-icon.png" alt="">
                    <span>{{inputPassword.errorMessage}}</span>
                </div>
            </div>
            <div class="clear"></div>

            <input type="password" v-model="inputNewPassword.value" :placeholder="$t('fpStep3.newPasswordPlaceholder')" v-on:keyup="checkNewPassword(inputNewPassword.value)">

            <div class="warning-error">
                <div v-bind:class="{'hidden':inputNewPassword.error}">
                    <img src="/static/images/img/login/erro-icon.png" alt="">
                    <span>{{inputNewPassword.errorMessage}}</span>
                </div>
                <div v-bind:class="{'hidden':systemError}" style="display: inline-block">
                    <img src="/static/images/img/login/erro-icon.png" alt="">
                    <span>{{systemErrorMessage}}</span>
                </div>
            </div>
            <div class="clear"></div>

            <button class="btn blue-btn3" id="step3-btn" @click="step3Click">{{$t('fpStep3.nextBtn')}}</button>
        </div>
    </div>
</template>
<script src="../../../controller/find_password_step3_controller.js"></script>