<template>
    <div class="pdf-div">
        <div class="pdf-box" style="">
            <section class="content pdf-box">
               <!-- <embed class="pdf-size" width="100%" height="100%" name="plugin" id="plugin" :src=url type="application/pdf" internalinstanceid="7">
                    <div id="window-resizer-tooltip" style="display: none;"><a href="#" title="Edit settings"></a>
                        <span class="tooltipTitle">Window size: </span>
                        <span class="tooltipWidth" id="winWidth">1372</span> x <span class="tooltipHeight" id="winHeight">820</span><br>
                        <span class="tooltipTitle">Viewport size: </span><span class="tooltipWidth" id="vpWidth">1372</span> x
                        <span class="tooltipHeight" id="vpHeight">425</span>
                    </div>-->
                    <embed  width="100%" height="100%" name="plugin" :src=url> </embed>
            </section>
        </div>
    </div>
</template>
<script>
    const common = require('commonFunc')

    export default{
        data: function () {
            return {
                type: common.getUrlParams('type'),
                url:"",
                localUrl:window.location.protocol + '//' + window.location.host+'/public/doc/',

            }
        },
        mounted: function () {
            let _self = this;
            if (_self.type == 1) {
                _self.url = _self.localUrl+'SMS.pdf';
            }else if(_self.type == 2){
                _self.url = _self.localUrl+'VOICE.pdf';
            }else if(_self.type == 3){
                _self.url = _self.localUrl+'DATA.pdf';
            }else if(_self.type == 4){
                _self.url = _self.localUrl+'FLOW.pdf';
            }else if(_self.type == 5){
                _self.url = _self.localUrl+'DID.pdf';
            }

        },
        methods:{


        }

    }
</script>
<style>
    .pdf-div{
        position:absolute;
        z-index:1;
        width:100%;
        height:100%;
        top:0px;
        left:0px;
    }
    .pdf-box{
        position: relative;
        border-radius: 0;
        border-top:none;
        background-color: rgb(38, 38, 38);
        min-height: 600px;
        height: 100%;
        width: 100%;
        overflow: hidden;
        margin: 0px;
        padding: 0px;
    }
    .pdf-size{
        width: 100%;
        min-height: 600px;
        height: 100%;
    }
    .body{
        height: 100%;
        width: 100%;
    }
</style>