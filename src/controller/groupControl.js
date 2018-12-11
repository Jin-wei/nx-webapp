import $ from 'jquery'
const common = require('commonFunc')
const apiUrl = '/api/system/groupcontrol?method='

export default {
  data: function () {
    return {
      pagePara: '',
      nameA: '',
      oldRow: ''
    }
  },
  name: 'groupControl',
  mounted: function () {
    let _self = this
    let $table = $('#table')
    function getData () {
      _self.$http.post(apiUrl + 'search', {}).then((response) => {
        let retdata = response.data.info
        $table.bootstrapTable('load', {
          data: retdata
        })
      }, (response) => {
        // error callback
        common.dealErrorCommon(_self, response)
      })
    }
    function initTable () {
      window.tableEvents = {
        'click .tableDelete': function (e, value, row, index) {
          common.rowDelete(_self, '用户组删除', apiUrl, row, 'id')
        }
      }
      $table.bootstrapTable({
        height: common.getTableHeight(),
        columns: [
          {
            field: 'id',
            visible: false
          },
          common.BTRowFormatEditable('name', '用户组名称'),
          common.BTRowFormatEdSelect(_self, 'state', '用户组状态', 'statusInfo'),
          common.actFormatter('act', common.operateFormatter, tableEvents)
        ],
        idField: 'id',
        uniqueId: 'id',
        toolbar: '#toolbar',
        clickToSelect: true,
        locale: 'zh-CN',
        onEditableShown: function (field, row, $el, editable) {
          _self.oldRow = $.extend(true, {}, row)
        },
        onEditableSave: function (field, row, oldValue, $el) {
          common.rowModify(_self, apiUrl, row, 'id')
        },
        onRefresh: function () {
          getData()
        }
      })
      common.changeTableClass($table)
    }

    function initPage () {
      _self.$http.post(apiUrl + 'init', {}).then((response) => {
        let retData = response.data.info
        _self.pagePara = $.extend(true, {}, retData)
        common.initSelect2($('#stateA'), retData['statusInfo'])
        initTable()
        getData()
        common.reSizeCall()
      }, (response) => {
        common.dealErrorCommon(_self, response)
      })
    }

    $(function () {
      initPage()
    })
  },
  methods: {
    addM: function (event) {
      this.nameA = ''
      $('#stateA').val(null).trigger('change')
      $('#AddModal').modal('show')
    },
    addGp: function (event) {
      let _self = this
      let workRow = {
        'id': '',
        'name': _self.nameA,
        'state': $('#stateA').val()[0]
      }
      _self.$http.post(apiUrl + 'add', workRow).then((response) => {
        let retData = response.data.info
        $('#table').bootstrapTable('insertRow', { index: 0, row: retData })
        _self.nameA = ''
        $('#stateA').val(null).trigger('change')
        common.dealSuccessCommon('增加成功')
      }, (response) => {
        common.dealErrorCommon(_self, response)
      })
    }
  }
}