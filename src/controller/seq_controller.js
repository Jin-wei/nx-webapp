/**
 * Created by BaiBin on 2017/5/15.
 */
import $ from 'jquery'
const common = require('commonFunc')
const apiUrl = '/api/system/groupcontrol?method='

export default {
    data: function () {
        return {
        }
    },
    name: 'seqController',
    components: { },
    mounted: function () {
        this.$store.commit('changeHeaderActive',{firstMenu:"problem"});
        $(".left-nav-list li").click(function(){
            let li = $(this)
            $(".left-nav-list li").each(function(){
                if(li.val() == $(this).val()){
                    $(this).attr('class','active')
                }else{
                    $(this).attr('class','')
                }
            });
        });
    },
    methods: {

    }
}