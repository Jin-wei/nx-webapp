<template>
    <div>
        <div class="sub-title">
            {{$t('about.Title')}}
        </div>
        <div class="sub-content col-xs-12" style="padding-top: 50px">
            <div class="col-xs-6">
                <p style="text-indent: 40px">{{$t('about.p1')}}</p>
                <p>{{$t('about.p2')}}</p>
            </div>
            <div class="col-xs-6">
                <img src="/static/images/img/about_us/about-us-8.png" alt="">
            </div>
            <div class="col-xs-12 margin-top-25">

                <p>{{$t('about.p3')}}</p>
                <p>{{$t('about.p4')}}</p>
                <p>{{$t('about.p5')}}</p>
            </div>
        </div>
    </div>

</template>
<style src="../../../css/about_us.css"></style>

<script>
    import $ from 'jquery'
    var common = require('commonFunc')
    export default {
        data: function () {
            return {
                about:{

                }

            }
        },
        mounted: function () {

        },
        methods: {}
    }
</script>