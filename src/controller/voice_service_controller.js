/**
 * Created by BaiBin on 2017/5/5.
 */
import $ from 'jquery'
const common = require('commonFunc')
const apiUrl = '/api/system/groupcontrol?method='
import serviceHeader from '../components/product_service/product_service_header'
import onlineService from '../components/product_service/online_service'

export default {
    data: function () {
        return {
        }

    },
    name: 'voiceServiceController',
    components: { serviceHeader,onlineService},
    mounted: function () {
    },
    methods: {

    },
    created(){
        this.$store.commit('changeHeaderActive',{firstMenu:"product",secondMenu:"voice"})
    }
}