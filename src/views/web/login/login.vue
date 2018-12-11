<template>
  <div v-cloak>
    <login-header></login-header>

    <div class="longin-bk">
      <div class="text-picture">
        <div class="text-picture-middle"><span>{{$t('login.pictureText')}}</span></div>
      </div>
      <div class="longin-content">
        <h4>{{$t('login.loginTitle')}}</h4>

        <div class="input-group login-input"  v-bind:class="{'red-border':isA ==false}" >
          <span class="input-group-addon">
            <img class="person-icon" src="/static/images/img/login/person-icon.png" alt="">
          </span>
          <input  v-model="username" type="text" class="form-control input-lg " :placeholder="$t('login.usernamePlaceholder')" v-on:keyup="checkPhoneEmail"/>
        </div>

        <div class="warning-error">
          <div  v-bind:class="{ 'hidden': isA }">
            <img src="/static/images/img/login/erro-icon.png" alt="">
            <span>{{errorUserName}}</span>
          </div>
        </div>

        <div class="input-group login-input"  v-bind:class="{'red-border':isB ==false}">
          <span class="input-group-addon">
            <img class="password-icon" src="/static/images/img/login/password-icon.png" alt="">
          </span>
          <input v-model="password" type="password" class="form-control input-lg" :placeholder="$t('login.passwordPlaceholder')" v-on:keyup="checkPassword" />
        </div>

        <div class="warning-error">
          <div  v-bind:class="{ 'hidden': isB }">
            <img src="/static/images/img/login/erro-icon.png" alt="">
            <span>{{errorPassword}}</span>
          </div>
        </div>

        <div class="login-img-check">
          <div class="input-group login-input picture-with" id="imgCode">
            <span class="input-group-addon">
              <img class="password-icon" src="/static/images/img/login/picture-icon.png" alt="">
            </span>
            <input type="number"  id="imgNub" v-model="captchaText" class="form-control input-lg" :placeholder="$t('login.imgNubPlaceholder')" v-on:keyup="checkImgNub(captchaText)"/>
          </div>
          <div class="write-block">
            <img  :src="captcha.data" alt="">
          </div>
          <span class="login-samll" @click="refreshCaptcha">{{$t('login.notSee')}}</span>
        </div>
        <div class="clear"></div>

        <div class="warning-error">
          <div id="Img-error"  v-bind:class="{ 'hidden': isC}">
            <img src="/static/images/img/login/erro-icon.png" alt="">
            <span>{{errorImgNub}}</span>
          </div>
          <div v-bind:class="{ 'hidden': systemError }" style="display: inline-block">
            <img src="/static/images/img/login/erro-icon.png" alt="">
            <span >{{systemErrorMessage}}</span>
          </div>
        </div>

        <div class="text-small">
          <div class="remember-checkbox">
            <div class="checkbox-div">
              <!--<input type="checkbox" class="checkbox-forget" v-model="rememberMe" id="checkboxRemember" value="option1">-->
              <!--<label for="checkboxRemember">记住我</label>-->
            </div>
          </div>
          <div class="forget">
            <a @click="linkTo('/find_password/step1')">{{$t('login.forgePassword')}}</a>
          </div>
          <div class="clear"></div>
        </div>

        <button class="btn login-input login-btn" id="login" v-on:click="login">{{$t('login.loginBtn')}}</button>
        <div class="login-register">
          <p><a  @click="linkTo('/register')" >{{$t('login.registerBtn')}}</a></p>
          <!--<p><a @click="getImgCode">立即注册</a></p>-->
        </div>
      </div>
    </div>

    <login-footer></login-footer>
  </div>
</template>

<script src="../../../controller/login_controller.js"></script>
<style src="../../../css/login.css"></style>
