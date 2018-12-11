/**
 * Created by BaiBin on 2017/5/15.
 */
import $ from 'jquery'
const common = require('commonFunc')
import Vue from 'vue';
const apiUrl = '/api/system/groupcontrol?method='

export default {
    data: function () {
        return {
            docList:'',
            nowPath:this.$route.path,
            /*id:this.$route.params.id.split(':')[1],*/
            path:'/system/develop_doc/develop_doc_sub/:',
            urlApi:'/api/console/DevelopDocSRV?method=',
            localUrl:window.location.protocol + '//' + window.location.host+'/public/doc/',

        }
    },
    name: 'developDocController',
    components: { },
    mounted: function () {
        this.$store.commit('changeHeaderActive',{firstMenu:"document"});
        let _self=this;


    },
    methods: {
        linkTo:function (interfaceId,id) {
          let _self=this;
          _self.$router.push({path:_self.path+interfaceId+'/:'+id});
        },
        turnPdf:function (type) {
            let _self=this;
           /* _self.$router.push({path:'/pdf_html',query:{type:type}});*/
            window.open('/pdf_html'+"?type="+type);
        },

    },
    watch:{
        '$route':function () {
            let _self=this;
            _self.id=this.$route.params.id.split(':')[1];
        }
    },

}