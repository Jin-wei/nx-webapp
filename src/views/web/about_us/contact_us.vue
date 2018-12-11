<template>
    <div>
        <div class="sub-title">
            {{$t('about.contactTitle')}}
        </div>
        <div class="sub-content col-xs-12">
            <div style="margin-top: 50px">
                <div class="col-xs-4" style="padding: 10px">
                    <div class="contact-div-1" id="div-1">
                        <img class="about-img-1" src="/static/images/img/about_us/about-us-1.png" alt="">
                        <h3 style="margin-top: 10px" v-html="$t('about.contactLI1.h3')"></h3>
                        <p style="margin-top: 30px">{{$t('about.contactLI1.p1')}}</p>
                        <p v-html="$t('about.contactLI1.p2')"></p>
                        <p v-html="$t('about.contactLI1.p3')"></p>
                        <p>{{$t('about.contactLI1.p4')}}</p>
                    </div>
                </div>
                <div class="col-xs-4" style="padding: 10px">
                    <div class="contact-div-1" id="div-2">
                        <img class="about-img-2" src="/static/images/img/about_us/about-us-9.png" alt="">
                        <h3 style="margin-top: 10px" v-html="$t('about.contactLI2.h3')"></h3>
                        <p style="margin-top: 30px">{{$t('about.contactLI2.p1')}}</p>
                        <p>{{$t('about.contactLI2.p2')}}</p>
                    </div>
                </div>
                <div class="col-xs-4" style="padding: 10px">
                    <div class="contact-div-1" id="div-3">
                        <img class="about-img-3" src="/static/images/img/about_us/about-us-3.png" alt="">
                        <h3 style="margin-top: 10px" v-html="$t('about.contactLI3.h3')"></h3>
                        <p style="margin-top: 30px">{{$t('about.contactLI3.p1')}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12" style="padding-top: 40px;padding-bottom: 70px">
            <div class="col-xs-7" style="padding:10px 10px 10px 30px">
                <div>
                    <img style="width: 100%" src="/static/images/img/about_us/about-us-12.png" alt="">
                </div>
            </div>
            <div class="col-xs-5" style="padding: 10px;">
                <div style="text-align: center;background-color: rgb(250,250,250);padding: 20px">
                    <img src="/static/images/img/about_us/about-us-5.png" alt="">
                    <h3 style="margin-top: 10px" v-html="$t('about.contactLI4.h3')"></h3>
                    <p style="margin-top: 30px">{{$t('about.contactLI4.p1')}}</p>
                    <p>{{$t('about.contactLI4.p2')}}</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('about.contactLI4.p3')}}</p>
                </div>
            </div>
        </div>
    </div>

</template>
<script src="../../../controller/contact_us_controller.js"></script>
<style src="../../../css/about_us.css"></style>
