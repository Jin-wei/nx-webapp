<template>
    <div class="service-header">
        <div class="container all-min-width">
            <ul class="horizontal-list">
                <li v-for="li in $t('prodecueTap')" :class="{ 'service-active' : li.index ==  index}" @click="clickTab(li.active)">
                    <div>
                        <p class="chinese-p">{{li.cn_p}}</p>
                        <p class="en-p">{{li.en_p}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    var common = require('commonFunc')
    export default {
        data: function () {
            return {

            }
        },
        props:['index'],
        name: 'serviceHeader',
        mounted: function () {

        },
        methods: {
            clickTab:function (url) {
                this.$router.push(url)
            }
        }
    }
</script>
<style src="../../css/product_service.css"></style>