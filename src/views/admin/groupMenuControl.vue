<template>
<div>
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 系统管理</a></li>
        <li class="active">组菜单维护</li>
      </ol>
    </section>
    <section class="content hidedesk" style="display:none;">
      <div class="col-lg-12">
        <div class="box box-info">
          <div class="box-body" style="min-height: 576px">
              <div id="toolbar">
                  <div class="form-inline">
                      <div class="form-group" style="width:200px">
                          <select class="form-control select2" multiple id="userGroupID"> </select>
                      </div>
                      <div class="form-group">
                          <button id="modify" class="btn btn-success" v-on:click="modify" disabled>
                              <i class="glyphicon glyphicon-saved"></i> 提交
                          </button>
                      </div>
                  </div>
              </div>
              <table id="menuTable" style="min-height: 479px"></table>
          </div>
        </div>
      </div>
    </section>
</div>
</template>
<script>
import $ from 'jquery'
const common = require('commonFunc')
const apiUrl = '/api/admin/groupMenuControl?method='

export default {
    data: function() {
        return {
            pagePara: {},
            tableData: {}
        }
    },
    name: 'groupMenuControl',
    mounted: function() {
        let _self = this
        let $menuTable = $('#menuTable')

        function initTable() {
            window.tableEvents = {
                'click .showChild': function(e, value, row, index) {
                    let iconTarget = $(e.currentTarget)
                    let parentMenuID = iconTarget.find('i').first().text()
                    let tableData = $menuTable.bootstrapTable('getData')
                    if (iconTarget.hasClass('glyphicon-minus')) {
                        iconTarget.removeClass('glyphicon-minus').addClass('glyphicon-plus')
                        for (let indexH = 0; indexH < tableData.length; indexH++) {
                            if (tableData[indexH].f_menu_id === parseInt(parentMenuID)) {
                                $menuTable.bootstrapTable('hideRow', {
                                    index: indexH
                                })
                            }
                        }
                    } else {
                        iconTarget.removeClass('glyphicon-plus').addClass('glyphicon-minus')
                        for (let indexE = 0; indexE < tableData.length; indexE++) {
                            if (tableData[indexE].f_menu_id === parseInt(parentMenuID)) {
                                $menuTable.bootstrapTable('showRow', {
                                    index: indexE
                                })
                            }
                        }
                    }
                    $menuTable.bootstrapTable('resetView')
                }
            }

            function menuNameFormatter(value, row) {
                var formatValue = ''
                if (row.menu_type === '00') {
                    formatValue = '<span class="glyphicon glyphicon-minus showChild"><i class="hidden">' + row.menu_id + '</i></span>' + value
                } else {
                    formatValue = '<span class="indent"></span><span class="indent"></span>' + value
                }
                return formatValue
            }

            $menuTable.bootstrapTable({
                height: common.getTableHeight(),
                columns: [{
                        field: 'state',
                        checkbox: true
                    },
                    {
                        field: 'menu_name',
                        align: 'left',
                        title: '菜单名',
                        formatter: menuNameFormatter,
                        events: tableEvents
                    },
                    common.BTRowFormat('menu_path', '功能路径'),
                    common.BTRowFormat('menu_icon', '菜单图标'),
                    common.BTRowFormat('menu_index', '显示序号')
                ],
                idField: 'menu_id',
                uniqueId: 'menu_id',
                toolbar: '#toolbar',
                striped: true,
                onCheckAll: function(rows) {
                    for (let i = 0; i < _self.tableData.length; i++) {
                        _self.tableData[i].state = true
                    }
                    $('#menuTable').bootstrapTable('load', {
                        data: _self.tableData
                    })
                },
                onUncheckAll: function(rows) {
                    for (let i = 0; i < _self.tableData.length; i++) {
                        _self.tableData[i].state = false
                    }
                    $('#menuTable').bootstrapTable('load', {
                        data: _self.tableData
                    })
                },
                onCheck: function(row, $element) {
                    if (row.menu_type === '01') {
                        for (let i = 0; i < _self.tableData.length; i++) {
                            if (_self.tableData[i].menu_id === row.f_menu_id) {
                                _self.tableData[i].state = true
                            }
                            if (_self.tableData[i].menu_id === row.menu_id) {
                                _self.tableData[i].state = true
                            }
                        }
                    }
                    $('#menuTable').bootstrapTable('load', {
                        data: _self.tableData
                    })
                },
                onUncheck: function(row, $element) {
                    if (row.menu_type === '00') {
                        for (let i = 0; i < _self.tableData.length; i++) {
                            if (_self.tableData[i].f_menu_id === row.menu_id) {
                                _self.tableData[i].state = false
                            }
                            if (_self.tableData[i].menu_id === row.menu_id) {
                                _self.tableData[i].state = false
                            }
                        }
                    }
                    $('#menuTable').bootstrapTable('load', {
                        data: _self.tableData
                    })
                }
            });
            common.changeTableClass($menuTable)
        }

        function initPage() {
            _self.$http.post(apiUrl + 'init', {}).then((response) => {
                let retData = response.data.info;
                for (let i = 0; i < retData.menuInfo.length; i++) {
                    retData.menuInfo[i].state = false;
                }
                let groupSelector = $('#userGroupID');
                _self.pagePara = JSON.parse(JSON.stringify(retData));
                _self.tableData = JSON.parse(JSON.stringify(retData.menuInfo));
                common.initSelect2(groupSelector, retData['groupInfo']);
                groupSelector.on('select2:select', function(evt) {
                    getCheckData();
                    $('#modify').prop('disabled', false)
                });

                initTable();

                $('#menuTable').bootstrapTable('load', {
                    data: retData.menuInfo
                });

                common.reSizeCall();
            }, (response) => {
                common.dealErrorCommon(_self, response)
            })
        }

        function getCheckData() {
            let userGroupID = $('#userGroupID').val();
            _self.$http.post(apiUrl + 'search', {
                usergroup_id: userGroupID[0]
            }).then((response) => {
                let retData = response.data.info
                let menuInfo = JSON.parse(JSON.stringify(_self.pagePara.menuInfo));
                for (let i = 0; i < retData.groupMenu.length; i++) {
                    for (let j = 0; j < menuInfo.length; j++) {
                        if (retData.groupMenu[i] === menuInfo[j].menu_id) {
                            menuInfo[j].state = true
                        }
                    }
                }
                _self.tableData = JSON.parse(JSON.stringify(menuInfo));
                $('#menuTable').bootstrapTable('load', {
                    data: menuInfo
                })
            }, (response) => {
                // error callback
                common.dealErrorCommon(_self, response)
            })
        }

        $(function() {
            initPage()
        })
    },
    methods: {
        modify: function(event) {
            let userGroupID = $('#userGroupID').val()
            if (!userGroupID) {
                common.dealPromptCommon('未选定用户组，不能分配菜单')
            } else {
                let menuTableData = $('#menuTable').bootstrapTable('getSelections')
                let params={
                    'usergroup_id': userGroupID[0],
                    'userGroupMenu': menuTableData
                }
                params=JSON.stringify(params);
                this.$http.post(apiUrl + 'modify', params).then((response) => {
                    common.dealPromptCommon('选定用户组的菜单已分配，请重新登录查看')
                }, (response) => {
                    // error callback
                    common.dealErrorCommon(this, response)
                })
            }
        }
    }
}
</script>
<style scoped>
</style>
