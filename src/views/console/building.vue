<template>
    <div class="info-relative " v-cloak>
        <div class="new-sin-position ">
            <div align="center" style="margin-top: 10%;margin-bottom: 28%">
                <img src="/static/images/img/consloe/33.png"/>
                <span style="font-size: 20px;margin-left: 20px;">模块建设中,敬请期待......</span>
            </div>
        </div>

    </div>
</template>
<style src="../../css/common.css"></style>
<script>
    import $ from 'jquery'
    const common = require('commonFunc')
    export default{
        data:function () {
            return{
                money:this.$route.params.id.split(":")[1],
                urlApi:'/api/console/AuthInformationSRV?method=getAuthInfo',
                status:'',
                statusText:'',
            }
        },
        name:'rechargeTop',
        mounted:function () {
            let _self=this;
            _self.$parent.setActive(2,"building");
            _self.getStatus();
        },
        methods:{

        }

    }
</script>
<style>

</style>