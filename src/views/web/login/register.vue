<template >
    <div v-cloak>
        <login-header></login-header>

        <div class="register-bk">
            <div class="text-picture">
                <div class="text-picture-middle"><span>{{$t('login.pictureText')}}</span></div>
            </div>
            <div class="register-content"  v-bind:class="{'hidden':registerfrom}">
                <h4>{{$t('register.resgiterTitle')}}</h4>
                <div class="input-group register-input" v-bind:class="{'red-border':phoneError ==false}">
                  <span class="input-group-addon img-size">
                    <img class="phone-icon" src="/static/images/img/login/register-phone.png" alt="">
                  </span>
                    <input type="number" id="countryInput" v-model="areaCode" class="form-control input-lg areaCode" :placeholder="$t('register.areaCode')"  v-on:keyup="getNation" @blur="checkAreCode(areaCode)"/>
                    <input type="number" v-model="inputphone" class="form-control input-lg input_phone" :placeholder="$t('register.phonePlaceholder')" v-on:keyup="checkPhone(inputphone)"/>
                </div>

                <div class="warning-error">
                    <div id="phone-error" v-bind:class="{'hidden':phoneError}">
                        <img src="/static/images/img/login/erro-icon.png" alt="">
                        <span>{{phoneErrorMessage}}</span>
                    </div>
                </div>

                <div class="input-group register-input" v-bind:class="{'red-border':passwordError ==false}">
                  <span class="input-group-addon img-size">
                    <img class="password-icon" src="/static/images/img/login/register-password.png" alt="">
                  </span>
                    <input type="password" v-model="inputPassword" class="form-control input-lg" :placeholder="$t('register.passwordPlaceholder')" v-on:keyup="checkPassword(inputPassword)"/>
                </div>

                <div class="warning-error">
                    <div id="password-error" v-bind:class="{'hidden':passwordError}">
                        <img src="/static/images/img/login/erro-icon.png" alt="">
                        <span>{{passwordErrorMessage}}</span>
                    </div>
                </div>

                <div class="input-group register-input"  v-bind:class="{'red-border':emailError ==false}">
                  <span class="input-group-addon  img-size">
                    <img class="person-icon" src="/static/images/img/login/register-email.png" alt="">
                  </span>
                    <input type="text" v-model="inputEmail" class="form-control input-lg" :placeholder="$t('register.emailPlaceholder')" v-on:keyup="checkEmail(inputEmail)"/>
                </div>

                <div class="warning-error">
                    <div id="email-error" v-bind:class="{'hidden':emailError}">
                        <img src="/static/images/img/login/erro-icon.png" alt="">
                        <span>{{emailErrorMessage}}</span>
                    </div>
                </div>

                <div class="register-img-check">
                    <div class="input-group register-input picture-with"  v-bind:class="{'red-border':phoneCodeError ==false}">
                        <span class="input-group-addon img-size">
                          <img class="password-icon" src="/static/images/img/login/register-shield.png" alt="">
                        </span>
                        <input type="number" v-model="phoneNumber" class="form-control input-lg" :placeholder="$t('register.phoneNumberPlaceholder')" v-on:keyup="checkPhoneCode(phoneNumber)"/>
                    </div>
                    <div class="get-code">
                        <button id="getPhone" class="btn register-input register-code-btn" @click="getPhoneCode">{{$t('register.sendPhoneNubBtn')}}</button>
                    </div>
                </div>

                <div class="warning-error">
                    <span  v-bind:class="{'hidden':phoneCodeError}" style="">
                        <img src="/static/images/img/login/erro-icon.png" alt="">
                        <span>{{phoneCodeErrorMessage}}</span>
                    </span>
                    <span  v-bind:class="{'hidden':systemError}" style="">
                        <img src="/static/images/img/login/erro-icon.png" alt="">
                        <span>{{systemErrorMessage}}</span>
                    </span>
                </div>

                <div class="clear"></div>
                <div class="register-text-small">
                    <div class="register-checkbox">
                        <div class="checkbox-register">
                            <input type="checkbox"  class="checkbox-forget" id="checkboxRemember" value="option1" v-model="Remembercheckbox" @click="checkSevice">
                            <label for="checkboxRemember">
                                {{$t('register.checkboxRemember1')}}
                                <span @click="showModel">{{$t('register.checkboxRememberSpan')}}</span>
                                {{$t('register.checkboxRemember2')}}
                            </label>

                        </div>
                    </div>
                    <div class="clear"></div>
                </div>

                <button class="btn register-input regsiter-btn" id="resigterBtn" @click="clickRegister">{{$t('register.registerBtn')}}</button>
                <div class="login-register">
                    <p><a @click="linkTo('/login')" v-html="$t('register.loginBtn')"></a></p>
                </div>
            </div>
        </div>

        <div class="successWarn"  v-bind:class="{'hidden':successWarn}">
             <div class="warn-content">
                 <h4>{{$t('register.registerSuccess.p1')}}</h4>
                 <p>{{$t('register.registerSuccess.p2')}} <span>({{successWarnCont}})</span></p>
             </div>
        </div>

        <login-footer></login-footer>

        <div class="modal fade" id="serveModal">
            <div class="modal-dialog" style="width: 900px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">{{$t('register.service.title')}}</h4>
                    </div>
                    <form  id="serveForm">
                        <div class="modal-body" style="min-height: 500px;height: 500px;overflow:auto">
                            <div class="form-group col-md-12 serve-content" v-html="$t('register.service.content')">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">{{$t('conHome.remind.btn2')}} </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style src="../../../css/register.css"></style>
<script src="../../../controller/register_controller.js"></script>
