<template>
    <div class="info-relative" >
        <div class="info-position">
            <div class="info-title">
                {{$t('ChangePS.title')}}
            </div>
            <div>
                <div class="password-infor-content">
                    <div class="password-inline-height password-top-margin">
                        <span class="left-width"> {{$t('ChangePS.span1')}}</span>
                        <input  type="password" v-model="oldPassword" >
                        <span class="prompt"> {{$t('ChangePS.span1_1')}}</span>
                    </div>
                    <div class="password-inline-height">
                        <span class="left-width">{{$t('ChangePS.span2')}}</span>
                        <input  type="password" v-model="newPassword">
                        <span class="prompt"> {{$t('ChangePS.span2_1')}}合</span>
                    </div>
                    <div class="password-inline-height">
                        <span class="left-width">{{$t('ChangePS.span3')}}</span>
                        <input  type="password" v-model="sureNewPassword">
                        <span class="prompt"> {{$t('ChangePS.span3_1')}}</span>
                    </div>
                </div>
                <button class="btn password-btn-save" @click="postChangePassword">{{$t('ChangePS.saveBtn')}}</button>
            </div>
        </div>
    </div>
</template>

<style src="../../../css/console_change_password.css"></style>
<script src="../../../controller/console_change_password_controller.js"></script>