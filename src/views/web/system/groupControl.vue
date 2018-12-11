<template>
  <div id="YHZWH">
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 系统管理</a></li>
        <li class="active">用户组维护</li>
      </ol>
    </section>
    <section class="content" style="display:none;">
      <div class="col-lg-12">
        <div class="box box-info">
          <div class="box-body">
            <div id="toolbar" class="pull-right">
              <div class="form-inline" role="form">
                <div class="form-group">
                  <div class="form-group">
                    <button id="addM" class="btn btn-info" v-on:click="addM">
                      <i class="glyphicon glyphicon-plus"></i> 增加
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <table id="table"></table>
          </div>
        </div>
      </div>
    </section>
    <div class="modal fade" id="AddModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document" style="width: 300px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title"><i class="fa fa-pencil-square-o big-blue"></i>增加用户组</h4>
          </div>
          <div class="modal-body"  id="formA">
            <div class="form-group" id="name">
              <label>用户组名称</label>
              <input class="form-control" v-model="nameA">
            </div>
            <div class="form-group">
              <label>用户组状态</label>
              <select class="form-contro select2" multiple style="width:100%" id='stateA'>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="addGp"><i class="fa fa-fw fa-plus"></i>增加</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!--<script>-->
  <!--const _script = require('../../controller/groupControl')-->
  <!--console.log(_script)-->
  <!--export default _script-->
<!--</script>-->
<!--<style>-->
  <!--@import '../../css/groupControl.css';-->
<!--</style>-->
<script src="../../../controller/groupControl.js"></script>
<style src="../../../css/groupControl.css">
</style>