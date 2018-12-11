/**
 * Created by Cici on 2017/5/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state  = {
    firstMenu: "",
    secondMenu:"",
};

const mutations ={
    changeHeaderActive(state,item) {
        state.firstMenu =item.firstMenu;
        state.secondMenu = item.secondMenu;
    },
};
export default {
    state,
    mutations
}
