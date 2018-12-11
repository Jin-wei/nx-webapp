/**
 * Created by BaiBin on 2017/5/16.
 */
import $ from 'jquery'
const common = require('commonFunc')
const apiUrl = '/api/system/groupcontrol?method='

export default {
    data: function () {
        return {
        }
    },
    name: 'contactUsController',
    components: { },
    mounted: function () {

        $("#div-1").hover(function(){
            $(".about-img-1").attr("src","/static/images/img/about_us/about-us-2.png");
            $("#div-1 span").css('border-bottom','2px solid #009be3')
        },function(){
            $("#div-1 span").css('border-bottom','2px solid #333333')
            $(".about-img-1").attr("src","/static/images/img/about_us/about-us-1.png");
        });

        $("#div-2").hover(function(){
            $(".about-img-2").attr("src","/static/images/img/about_us/about-us-10.png");
            $("#div-2 span").css('border-bottom','2px solid #009be3')
        },function(){
            $("#div-2 span").css('border-bottom','2px solid #333333')
            $(".about-img-2").attr("src","/static/images/img/about_us/about-us-9.png");
        });

        $("#div-3").hover(function(){
            $(".about-img-3").attr("src","/static/images/img/about_us/about-us-4.png");
            $("#div-3 span").css('border-bottom','2px solid #009be3')
        },function(){
            $("#div-3 span").css('border-bottom','2px solid #333333')
            $(".about-img-3").attr("src","/static/images/img/about_us/about-us-3.png");
        });
    },
    methods: {

    }
}