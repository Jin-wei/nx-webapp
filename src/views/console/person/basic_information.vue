<template>
    <div class="info-relative" v-cloak>
        <div class="info-position">
            <div class="info-title">
                {{$t('base.title')}}
            </div>
            <div class="phone-and-email">
               <div class="inline-height top-margin">
                   <span class="left-width">{{$t('base.span1')}}</span>
                   <span class="phone-width">{{userData.email}}</span>
                   <button  class="btn tbn-samll" @click="showChangeEmail" >{{$t('base.changeBtn')}}</button>
               </div>
                <div class="inline-height">
                    <span class="left-width">{{$t('base.span2')}}</span>
                    <span class="phone-width">{{userData.phone}}</span>
                    <button class="btn tbn-samll" @click="showChangePhone">{{$t('base.changeBtn')}}</button>
                </div>
            </div>
            <div class="infor-content">
                <div class="inline-height2 top-margin2">
                    <span class="left-width">{{$t('base.span3')}}</span>
                    <input  type="number" v-model="userData.qq" :disabled='inputDisable==true' oninput="if(value.length>20)value=value.slice(0,20)">
                </div>
                <div class="inline-height2">
                    <span class="left-width">{{$t('base.span4')}}</span>
                    <input  type="text" v-model="userData.address" :disabled='inputDisable==true' oninput="if(value.length>100)value=value.slice(0,100)">
                </div>
                <div class="inline-height2">
                    <span class="left-width">{{$t('base.span5')}}</span>
                    <input id="5" type="number" v-model="userData.urgent_contact" :disabled='inputDisable==true' oninput="if(value.length>20)value=value.slice(0,20)">
                    <span class="prompt">{{$t('base.span6')}}</span>
                </div>
            </div>
            <button class="btn btn-save" :class="{'hidden':editBtnHidden}" @click="showSaveBtn">{{$t('base.editBtn')}}</button>
            <button class="btn btn-save" :class="{'hidden':saveBtnHidden}" @click="saveOtherData">{{$t('base.saveBtn')}}</button>
        </div>

        <div class="console-alert-warp" :class="{'hidden':phone.hidden}" @click="phone.hidden=true"></div>
        <div class="console-alert-content change-phone" :class="{'hidden':phone.hidden}">
            <div class="alert-wide-title">
                {{$t('base.phone.title')}}
            </div>
            <div class="alert-content">
                <p>{{$t('base.phone.p1')}}</p>
                <div class="alert-content-block">
                    <span>{{$t('base.phone.span1')}}</span>
                    <input class="alert-are-input" v-model="phone.areCode" type="text" :placeholder="$t('base.phone.areCode')">
                    <input class="alert-long-input" v-model="phone.newPhone" type="text" :placeholder="$t('base.phone.inputP')" >
                    <span class="email-error" :class="{'hidden':phoneError.hidden}">! {{phoneError.errorMessage}}</span>
                </div>
                <div class="alert-content-block">
                    <span>{{$t('base.phone.span2')}}</span>
                    <input type="text" v-model="phone.inputCode" :placeholder="$t('base.phone.inputP2')">
                    <button class="btn send-message" @click="sendMessage">{{$t('base.phone.getMessage')}}</button>
                    <span class="email-error" :class="{'hidden':phoneCodeError.hidden}">! {{phoneCodeError.errorMessage}}</span>
                </div>
                <div class="alert-btn">
                    <button class="btn sure-btn" @click="phoneSure">{{$t('base.phone.sureBtn')}}</button>
                    <button class="btn cancel-btn" @click="phone.hidden=true">{{$t('base.phone.cancelBtn')}}</button>
                </div>
            </div>
        </div>

        <div class="console-alert-warp" :class="{'hidden':email.hidden}"  @click="email.hidden=true"></div>
        <div class="console-alert-content change-email" :class="{'hidden':email.hidden}">
            <div class="alert-wide-title">
                {{$t('base.email.title')}}
            </div>
            <div class="alert-content">
               <!-- <p class="phone-padding"> {{$t('base.email.p1')}}</p>-->
                <div class="alert-content-block" style="margin-top: 20px">
                    <span>{{$t('base.email.span1')}}</span>
                    <input class="alert-long-input" v-model="email.newEmail" type="text" :placeholder="$t('base.email.inputP')">
                    <span class="email-error" :class="{'hidden':emailError.hidden}">! {{emailError.errorMessage}}</span>
                </div>
                <div class="alert-content-block">
                    <span>{{$t('base.email.span2')}}</span>
                    <input class="alert-long-input" v-model="email.inputCode" type="text" :placeholder="$t('base.email.inputP2')">
                    <span class="email-error" :class="{'hidden':emailCodeError.hidden}">! {{emailCodeError.errorMessage}}</span>
                </div>
                <div class="clear"></div>
                <div class="send-email-middle">
                    <button class="btn send-email" @click="sendEmail">{{$t('base.email.getMessage')}}</button>
                    <p>{{$t('base.email.p3')}}</p>
                </div>
                <div class="alert-btn">
                    <button class="btn sure-btn" @click="emailSure">{{$t('base.email.sureBtn')}}</button>
                    <button class="btn cancel-btn" @click="email.hidden=true">{{$t('base.email.cancelBtn')}}</button>
                </div>
            </div>
        </div>
        <!--</div>-->


    </div>
</template>

<style src="../../../css/console_information.css"></style>
<script src="../../../controller/console-infromation_controller.js"></script>