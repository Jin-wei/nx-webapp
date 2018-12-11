<template>
    <div class="find-password-content"  v-cloak>
        <div class="step-bk2">
            <!--<img src="/static/images/img/login/step1.png" alt="">-->
            <div class="step-img">
                <span class="step-active">{{$t('fPStep1.title')}}</span>
                <span class="step-active">{{$t('fPStep2.title')}}</span>
                <span class="step-middle">{{$t('fpStep3.title')}}</span>
                <span class="step-last">{{$t('fpStep4.title')}}</span>
            </div>
        </div>

        <div class="step-content">
            <p>{{$t('fPStep2.step2Title1')}}{{inputCheckCode.lastPhone}}{{$t('fPStep2.step2Title2')}}</p>
            <div class="div-inline2">
                <input type="number" v-model='inputCheckCode.value' :placeholder="$t('fPStep2.phoneCodePlaceholder')" v-on:keyup='checkPhoneCode(inputCheckCode.value)'>
                <span class="re-send gray-span" v-show="reSend==2" id="re-send">{{$t('fPStep2.reSend')}} {{countDown}}</span>
                <span class="re-send" v-show="reSend==1" @click="getMessageCode()">{{$t('fPStep2.reSend')}}</span>
            </div>
            <div class="clear"></div>

            <div class="warning-error">
                <div  v-bind:class="{'hidden':inputCheckCode.error}">
                    <img src="/static/images/img/login/erro-icon.png" alt="">
                    <span>{{inputCheckCode.errorMessage}}</span>
                </div>
                <div v-bind:class="{'hidden':systemError}" style="display: inline-block">
                    <img src="/static/images/img/login/erro-icon.png" alt="">
                    <span>{{systemErrorMessage}}</span>
                </div>
            </div>
            <div class="clear"></div>

            <button class="btn blue-btn2" id="step2-btn" @click="step2Click()">{{$t('fPStep2.nextBtn')}}</button>
        </div>
    </div>
</template>
<script src="../../../controller/find_password_step2_controller.js"></script>