<template>
    <div>
        <div class="sub-title">
            {{$t('problem.messageList1.title')}}
        </div>
        <div class="sub-content col-xs-11">
            <h3>{{$t('problem.messageList1.h1')}}</h3>
            <p v-html="$t('problem.messageList1.p1')"></p>
            <!--<p>1、注册认证——填写注册信息，完成注册环节，成为开发者；</p>-->
            <!--<p>2、创建应用——结合产品需求，创建自己的应用使用平台提供的通讯能力（注册后已有1个应用，可根据需要创建多个）；</p>-->
            <!--<p>3、对接测试——调用云通讯平台免费开放接口，对接平台联调测试（注册即赠8元测试金额）；</p>-->
            <!--<p>3、上线运营——切换生产环境，完成应用上线</p>-->
            <h3>{{$t('problem.messageList1.h2')}}</h3>
            <h4>{{$t('problem.messageList1.h3')}}</h4>
            <p v-html="$t('problem.messageList1.p3')"></p>
            <h4>{{$t('problem.messageList1.h4')}}</h4>
            <p v-html="$t('problem.messageList1.p4')"></p>
            <!--<p>1、上传证件支持2M以内的PNG\JPG\GIF格式，一般打开审核平台显示证件空白或者左上角显示"X"即为上传失败，建议客户调整图片格式大小，如果多次上传失败，用户可使用注册邮箱将认证材料发送邮件到sh@yuntongxun.com售后同事协助处理。</p>-->
            <!--<p>2、客户输入的公司名称或者个人姓名不能出现空格，以防止客户再次认证</p>-->
            <!--<p>3、企业认证的公司地址不能过于简单，不能只写到一个区或者一个城市。</p>-->
            <!--<p>4、企业认证的证件为复印件的，需加公司红章，如果不是复印件，也需体现国家机关红章。</p>-->
            <!--<p>5、企业认证上传的证件的水印或者手写说明，需与云通许企业认证使用有关。</p>-->
            <!--<p>6、如果是政府机构或者办学机构，民营非企业，社会团体组织机构，没有营业执照，可以提供事业单位法人证书，办学机构或者社会组织登记证书等相关证件，同样选择三证合一（一照一码）上传证件，由于目前没有网站可以查询，可核对所填信息与证件信息是否一致。如果不足18位统一信用代码可以用数字0代替，超出的末尾可以不用输入。</p>-->
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue'
    import Vuex from 'vuex'
    import common from 'commonFunc'

    export default {
        data: function () {
            return {
                seqId:this.$route.params.id.split(":")[1],
                message:'',
//
            }
        },
        methods: {

        },
        mounted:function () {
            let _self=this;
            if(_self.seqId==0){

            }
        }
    }

    $('.dropdown-toggle').dropdown();
</script>
<style src="../../../css/seq.css"></style>
