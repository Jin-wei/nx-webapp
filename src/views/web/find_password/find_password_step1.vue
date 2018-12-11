<template>
    <div  v-cloak>
        <div class="middle">
            <div class="min-width">
                <div class="find-password-content">
                    <div class="step-bk1">
                        <!--<img src="/static/images/img/login/step1.png" alt="">-->
                        <div class="step-img">
                            <span class="step-active">{{$t('fPStep1.title')}}</span>
                            <span >{{$t('fPStep2.title')}}</span>
                            <span class="step-middle">{{$t('fpStep3.title')}}</span>
                            <span class="step-last">{{$t('fpStep4.title')}}</span>
                        </div>
                    </div>

                    <div class="step-content">
                        <p>{{$t('fPStep1.step1Title')}}</p>
                        <input type="number" v-model="inputPhone.phone" :placeholder="$t('fPStep1.phonePlaceholder')" v-on:keyup="checkPhone(inputPhone.phone)">

                        <div class="warning-error">
                            <div id="count-error" v-bind:class="{'hidden':inputPhone.error}">
                                <img src="/static/images/img/login/erro-icon.png" alt="">
                                <span>{{inputPhone.errorMessage}}</span>
                            </div>
                        </div>
                        <div class="clear"></div>
                        <div class="div-inline">
                            <input type="number" v-model="inputCheckImg.value"  :placeholder="$t('fPStep1.imgNubPlaceholder')" v-on:keyup="checkImgCode(inputCheckImg.value)">
                            <div class="write-block">
                                <img :src="captcha.data" alt="">
                            </div>
                            <span @click="refreshCaptcha">{{$t('fPStep1.notClear')}}</span>
                        </div>
                        <div class="clear"></div>

                        <div class="warning-error">
                            <div v-bind:class="{'hidden':inputCheckImg.error}">
                                <img src="/static/images/img/login/erro-icon.png" alt="">
                                <span>{{inputCheckImg.errorMessage}}</span>
                            </div>
                            <div v-bind:class="{'hidden':systemError}" style="display: inline-block">
                                <img src="/static/images/img/login/erro-icon.png" alt="">
                                <span>{{systemErrorMessage}}</span>
                            </div>
                        </div>
                        <div class="clear"></div>

                        <button class="btn blue-btn" id="step1-btn" @click="step1Click">{{$t('fPStep1.nextBtn')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script src="../../../controller/find_password_step1_controller.js"></script>