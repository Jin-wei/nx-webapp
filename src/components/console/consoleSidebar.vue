<template>
  <!-- Left side column. contains the logo and sidebar -->
  <div class="fix--sidebar">
    <aside  :class="{'main-sidebar':language=='zh_cn','main-sidebar2':language=='en'}">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
          <div class="person">
            <img class="img-circle" src="/static/images/img/consloe/console-sidebar/person.png"  alt="User Image">
            <p>{{phone}}</p>
          </div>
        </div>
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
          <template v-for="item in menulist">
            <li class="treeview" @click="thisActive(item.id)">
              <template>
                <a :id=item.id :class="['id'+item.id,'left-block']" href="#">
                  <!--<img :src=imgPath+item.menu_img alt="">-->
                  <p> {{ item.menu_name }}</p>
                </a>
                <ul  :class="{'hidden':item.hidden,'detail-list':language=='zh_cn','detail-list2':language=='en'}">
                  <template v-for="sItem in item.children">
                    <div class="detail-title">{{sItem.menu_tile}}</div>
                    <a @click="linkTo(sItem.menu_path)" class="link-width" :class="{'router-link-active':secondName==sItem.menu_path}">
                        <li>
                          <img :src=imgPath+sItem.icon  alt="" class="pull-left detail-icon">
                          <span>{{ sItem.menu_name }}</span>
                        </li>
                     </a>


                  </template>
                </ul>
              </template>
            </li>
          </template>
        </ul>
        <div>
        </div>
      </section>
      <!-- /.sidebar -->
    </aside>
  </div>

</template>
<script>
import $ from 'jquery'
var common = require('commonFunc')

export default {
    props: ['firstName', 'secondName'],
    name: 'mainMenu',
    data: function () {
        return {
            phone: '',
            imgPath: '/static/images/img/consloe/console-sidebar/',
            nowPath: this.$route.path,
            currentClass: '',
            menulist: this.$t('menulist'),
            activePath:'',
            urlPath:'/console/',
            urlCommon:'/api/sundry?method=',
            language:common.getStoreData('language'),
            token:common.getStoreData('token'),
            user:common.getStoreData('userinfo')
        }
    },
    mounted: function () {
        let _self = this;

        if (_self.user == undefined || _self.token==undefined) {
            this.$router.push({ path: '/login'})
        } else {
            _self.phone = common.getStoreData('userinfo').name;
        }
        if(_self.user.menulist!="" ){
            this.$router.push({
                path: '/login'
            })
        }
        _self.getStatus();

    },
    watch: {
        firstName: function () {
            let _self = this;
            _self.thisActive(this.firstName);

        },
        secondName: function () {
            let _self = this;
            _self.activePath=_self.secondName;

        },
        '$route':'getStatus'
    },
    methods: {
        linkTo: function (url) {
            this.$router.push({ path: '/console/'+ url})
        },
        thisActive: function (id) {
            let _self = this;
            for (var i = 0; i < _self.menulist.length; i++) {
                _self.menulist[i].hidden = true;
                $('#' + i).removeClass('c_active' + i);
            }
            ;
            _self.menulist[id].hidden = false;
            $('#' + id).addClass('c_active' + id);
        },
        getStatus:function (method) {
            let _self=this;
            this.$http.post(_self.urlCommon+'getCustomerAuthInfo',{customerId:common.getStoreData('userinfo').customer_id}).then((response)=>{
                if(response.data.errno==0){
                    if(response.data.info.length>0){
                        _self.status=response.data.info[0];
                        common.setStoreData('status',_self.status)
                    }else{
                        _self.status="";
                    }
                }else{
                    common.dealConsolError(_self,response);
                }
            },(response)=>{
                common.dealConsolError(_self,response);
            });
        },
    }
}
</script>
<style>
  .fix--sidebar{
    position:fixed;
    height:100%;
    z-index: 900;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    /*padding-top: 80px;*/
  }
  a{
    cursor: pointer;
  }
  .main-sidebar, .left-side {
    position: fixed;
    width: 80px;
    height: 100%;
    background: #2d3640;
    color:#f7f7f7;
    float: left;
    z-index: 900;
    top:50px;
    left:0;
    font-size: 16px;
    text-align: center;
  }
  .main-sidebar2, .left-side2 {
    position: fixed;
    width: 90px;
    height: 100%;
    background: #2d3640;
    color:#f7f7f7;
    float: left;
    z-index: 900;
    top:80px;
    left:0;
    font-size: 12px;
    text-align: center;
  }

  .sidebar-menu li.header{
    font-size: 16px;
    color: #f7f7f7;
  }
  .sidebar-menu li>a{
    /*color: #f7f7f7;*/
    padding: 0;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  .person{
    font-size: 16px;
    color: #f7f7f7;
  }
  .person p{
    padding:5px 0 16px 2px;
    width:54px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .id0{
    background: url(/static/images/img/consloe/console-sidebar/administration.png)  no-repeat 22px 11px!important;
    color:#f7f7f7!important;
  }
  .c_active0,.c_active0:hover,.c_active0:focus,.c_active0:active,.c_active0 span{
    background:#abbfd0 url(/static/images/img/consloe/console-sidebar/administration2.png)no-repeat 22px 11px  !important;
    color:#333333!important;
  }
  .id1{
    background: url(/static/images/img/consloe/console-sidebar/finance.png) no-repeat 22px 11px!important;
    color:#f7f7f7!important;
  }
  .c_active1,.c_active1:hover,.c_active1:focus,.c_active1:active,.c_active1 span{
    background:#abbfd0 url(/static/images/img/consloe/console-sidebar/finance2.png)no-repeat 22px 11px  !important;
    color:#333333!important;
  }
  .id2{
    background: url(/static/images/img/consloe/console-sidebar/statistics.png) no-repeat 22px 11px!important;
    color:#f7f7f7!important;
  }
  .c_active2,c_active2:hover,.c_active2:focus,.c_active:active,.c_active2  span{
    background:#abbfd0 url(/static/images/img/consloe/console-sidebar/statistics2.png) no-repeat 22px 11px !important;
    color:#333333!important;
  }
  .id3{
    background: url(/static/images/img/consloe/console-sidebar/user.png) no-repeat 22px 11px !important;
    color:#f7f7f7!important;
  }
  .c_active3,.c_active3:hover,.c_active3:focus,.c_active3:active,.c_active3  span{
    background:#abbfd0 url(/static/images/img/consloe/console-sidebar/user2.png) no-repeat 22px 11px !important;
    color:#333333!important;
  }
  .left-block{
    position: relative;
    background-position:22px 12px;
    background-repeat:no-repeat;
    height: 80px;
    padding: 0;
    position: relative;
  }
  .left-block p{
    position:relative;
    padding-top:49px;
    font-weight:bolder;
  }
  .id1:hover,.id1:focus,.id1:active,.id1 span,
  .id2:hover,.id2:focus,.id2:active,.id2 span,
  .id0:hover,.id0:focus,.id0:active,.id0 span,
  .id3:hover,.id3:focus,.id3:active,.id3 span{
    color:#f7f7f7
  }

  .detail-list{
    position: fixed;
    width: 140px;
    height: 100%;
    background: #abbfd0;
    color:#333333;
    float: left;
    z-index: 900;
    top:80px;
    left:80px;
    font-size: 16px;
    list-style: none;
    padding: 44px 0 0 0;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    border-right: 1px solid #758692;
    text-align: left;

  }
  .detail-list2{
    position: fixed;
    width: 166px;
    height: 100%;
    background: #abbfd0;
    color:#333333;
    float: left;
    z-index: 900;
    top:80px;
    left:90px;
    font-size: 12px;
    list-style: none;
    padding: 44px 0 0 0;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    border-right: 1px solid #758692;
    text-align: left;

  }
  .sidebar-menu .treeview .detail-list a{
    color: #333333;
  }
  .detail-list li{
    font-size: 12px;
    line-height: 30px;
    padding: 0 0 0 21px;
    margin: 2px 0;
    position: relative;
    color:#333333;
  }

  .detail-list2 li{
    font-size: 12px;
    line-height: 30px;
    padding: 0 0 0 9px;
    margin: 2px 0;
    position: relative;
    width: 166px;
    color:#333333;
  }
  .detail-list .active{
    background:#ffffff;
  }
  .detail-list2 .active{
    background:#ffffff;
  }
  .detail-list .detail-title{
    line-height: 34px;
    padding: 0 0 0 21px;
    font-weight: bolder;
    /*letter-spacing: 1px;*/
  }
  .detail-list2 .detail-title{
    line-height: 34px;
    padding: 0 0 0 9px;
    font-weight: bolder;
    /*letter-spacing: 1px;*/
  }
  .detail-icon{
   padding:9px 5px 0 0;
  }
  .detail-list .router-link-active li{
    background: #ffffff;
    width: 140px;
  }
  .detail-list2 .router-link-active li{
    background: #ffffff;
    width: 166px;
  }
  .detail-list .link-width{
    max-width: 140px;
    min-height: 30px;
  }
  .detail-list2 .link-width{
      width: 150px;
      min-height: 30px;
  }
  .link-width li span{
    display: inline-block;
    width: 126px;
    word-wrap:break-word;
    word-break:break-all;
    white-space:pre-wrap;

  }
  @media (max-width: 767px) {
    .main-sidebar, .left-side {
      -webkit-transform: none;
      -ms-transform: none;
      -o-transform: none;
      transform: none;
    }
  }
  .skin-blue .wrapper, .skin-blue .main-sidebar, .skin-blue .left-side{

  }



</style>
