<template>
    <div class="info-relative" >
        <div class="info-position">
            <div class="info-title">
                {{$t('auth.title')}}
            </div>
            <div class="auth-middlle">
                <p class="auth-count">
                    <span class="auth-span-left">{{$t('auth.span1')}}</span>
                    <span class="span-right">{{phone}}</span>
                </p>
                <p class="auth-status">
                    <span class="auth-span-left">{{$t('auth.span2')}}</span>
                    <button class="btn yellow-btn" :class="{'show':topBtn==6}">{{$t('auth.status.btn1')}}</button>
                    <button class="btn yellow-btn" :class="{'show':topBtn==0}">{{$t('auth.status.btn2')}}</button>
                    <button class="btn yellow-btn" :class="{'show':topBtn==2}">{{$t('auth.status.btn3')}}</button>
                    <button class="btn green-btn" :class="{'show':topBtn==1 && customerType2==0}">{{$t('auth.status.btn4')}}</button>
                    <button class="btn green-btn" :class="{'show':topBtn==1 && customerType2==1}">{{$t('auth.status.btn5')}}</button>
                </p>
            </div>
           <div class="auth-bottom">
               <div class="gray-margin" :class="{'hidden':personBlock,'gray-block':language=='zh_cn','gray-block2':language=='en'}">
                   <div class="black-border">
                       <img  :src="imgUrl"  :class="{'hidden':detailBtn}">
                       <span :class="{'hidden':applyBlock}">{{$t('auth.person.title')}}</span>
                   </div>
                    <p>{{$t('auth.person.p1')}}</p>
                    <div :class="{'hidden':applyBlock}">
                        <a @click="linkTo('auth_person')">
                            <button class="btn auth-blue-btn">{{$t('auth.person.btn1')}}</button>
                        </a>
                        <p class="small-gray">{{$t('auth.person.p2')}}</p>
                    </div>
                   <a @click="linkTo('auth_person')">
                       <button class="btn auth-blue-btn" :class="{'hidden':detailBtn}">{{$t('auth.person.btn2')}}</button>
                   </a>
               </div>
               <div  :class="{'hidden':companyBlock,'gray-block':language=='zh_cn','gray-block2':language=='en'}">
                   <div class="black-border">
                       <img :src="imgUrl" :class="{'hidden':detailBtn}">
                       <span :class="{'hidden':applyBlock}">{{$t('auth.company.title')}}</span>
                   </div>
                   <p>{{$t('auth.company.p1')}}</p>
                   <div :class="{'hidden':applyBlock}">
                       <a @click="linkTo('auth_company')">
                           <button class="btn auth-blue-btn">{{$t('auth.company.btn1')}}</button>
                       </a>
                       <p class="small-gray2">{{$t('auth.company.p2')}}</p>
                   </div>
                   <a @click="linkTo('auth_company')">
                       <button class="btn auth-blue-btn" :class="{'hidden':detailBtn}">{{$t('auth.company.btn2')}}</button>
                   </a>
               </div>
               <div class="clear"></div>
           </div>
        </div>
    </div>
</template>

<style src="../../../css/authentication_information.css"></style>
<script src="../../../controller/authentication_information_controller.js"></script>
