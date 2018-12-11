exports.addEvent = function(obj, name, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + name, func);
    } else {
        obj.addEventListener(name, func, false);
    }
}

exports.convertBase64StrToArray = function(base64Str) {
    let bytes = window.atob(base64Str); //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return ab
}

exports.aesEncryptModeCFB = function(msg, pwd) {
    let magicNo = exports.generateRandomAlphaNum(32)

    let key = CryptoJS.enc.Hex.parse(CryptoJS.MD5(pwd).toString())
    let iv = CryptoJS.enc.Hex.parse(magicNo)

    let identifyCode = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
    return [magicNo, identifyCode]
}

exports.generateRandomAlphaNum = function(len) {
    let rdmString = ''
    // toSting接受的参数表示进制，默认为10进制。36进制为0-9 a-z
    for (; rdmString.length < len;) {
        rdmString += Math.random().toString(16).substr(2)
    }
    return rdmString.substr(0, len)
}

exports.centerModals = function(ele) {
    ele.each(function(i) {
        let $clone = $(this).clone().css('display', 'block').appendTo('body');
        let top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}

exports.daterangepickerlocale = {
    format: 'YYYY-MM-DD',
    applyLabel: '确定',
    cancelLabel: '取消',
    fromLabel: '起始时间',
    toLabel: '结束时间',
    customRangeLabel: '自定义',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    firstDay: 1
}

exports.daterangepickerlocaletime = {
    format: 'YYYY-MM-DD HH:mm',
    applyLabel: '确定',
    cancelLabel: '取消',
    fromLabel: '起始时间',
    toLabel: '结束时间',
    customRangeLabel: '自定义',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    firstDay: 1
}
exports.daterangepickerenglishtime = {
    format: 'YYYY-MM-DD HH:mm',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    fromLabel: 'From',
    toLabel: 'To',
    customRangeLabel: 'Custom',
    daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"
    ],
    firstDay: 1
}
exports.datePickerConfig = {
    language: "en",
    autoclose: true,
    clearBtn: true,
    todayBtn: false,
    format: "yyyy-mm-dd"
};

exports.monthPickerConfig = {
    // startView:2,
    language: "en",
    autoclose: true,
    clearBtn: true,
    todayBtn: false,
    format: "yyyy-mm",
    startView: 'year',
    minView:'year',
    maxView:'decade',
    minViewMode: 1,
    endDate:exports.todyMonth+'-'
};

exports.yearPickerConfig = {
    language: "en",
    autoclose: true,
    clearBtn: true,
    todayBtn: false,
    format: "yyyy",
    startView: 'year',
    minView:'year',
    maxView:'year',
    minViewMode:2,
    endDate:exports.todyYear+'-'
};

exports.timePickerConfig = {
    format: 'yyyy-mm-dd hh:ii:ss',
    weekStart: 1,
    autoclose: true,
    startView: 0,
    minView: 0,
    maxView:0,
    forceParse: false,
    language: 'zh-CN'

};


exports.clearStoreData = function(key, value) {
    store.clear()
}

exports.setStoreData = function(key, value) {
    store.set(key, value)
}

function getStoreData (key) {
    return store.get(key)
}
exports.getStoreData = getStoreData

exports.removeStoreData = function(key) {
    store.remove(key)
}
//admin 错误处理
exports.dealErrorCommon = function(obj, response) {
    if (response.status > 699 && response.status < 800) {
        console.log('700 error')
        BootstrapDialog.show({
            title: '<i class= "fa fa-fw fa-info-circle"></i><strong>错误信息</strong>',
            cssClass: 'modal-danger',
            message: '<i class="text-warning fa fa-fw fa-warning" style="font-size: 40px"></i>' + response.data.msg,
            buttons: [{
                label: '<i class= "fa fa-fw fa-close"></i>关闭',
                cssClass: 'btn-outline',
                action: function(dialogItself) {
                    dialogItself.close()
                }
            }]
        })
    } else if (response.status > 401) {
        obj.$router.push({
             path: '/admin/error'
        })
    }
    else if (response.status == 401) {
        obj.$router.push({
            path: '/admin_login'
        })
    }
    else if (response.status == 200) {

    }
    else {
        console.log('else error')
        console.log(response.data)
        obj.setError(response.status, response.data.description)
        obj.$router.push({
            path: '/admin/error'
        })
    }
}
//admin 处理表格错误
exports.dealTableError = function(obj,status,row){
    if (status > 699 && status < 800) {
        console.log('700 error')
        BootstrapDialog.show({
            title: '<i class= "fa fa-fw fa-info-circle"></i><strong>错误信息</strong>',
            cssClass: 'modal-danger',
            message: '<i class="text-warning fa fa-fw fa-warning" style="font-size: 40px"></i>' + row.responseJSON.msg,
            buttons: [{
                label: '<i class= "fa fa-fw fa-close"></i>关闭',
                cssClass: 'btn-outline',
                action: function(dialogItself) {
                    dialogItself.close()
                }
            }]
        })
    } else if (status > 401) {
        obj.$router.push({
            path: '/admin/error'
        })
    }
    else if (status == 401) {
        obj.$router.push({
            path: '/admin_login'
        })
    }
    else {
        console.log('else error')
        obj.$router.push({
            path: '/admin/error'
        })
    }
}
//控制台处理表格错误
exports.dealConsoleTableError = function(obj,status,row){
    if (status > 699 && status < 800) {
        console.log('700 error')
        BootstrapDialog.show({
            title: '<i class= "fa fa-fw fa-info-circle"></i><strong>错误信息</strong>',
            cssClass: 'modal-danger',
            message: '<i class="text-warning fa fa-fw fa-warning" style="font-size: 40px"></i>' + row.responseJSON.msg,
            buttons: [{
                label: '<i class= "fa fa-fw fa-close"></i>关闭',
                cssClass: 'btn-outline',
                action: function(dialogItself) {
                    dialogItself.close()
                }
            }]
        })
    } else if (status > 401) {
        obj.$router.push({
            path: '/console/error'
        })
    }
    else if (status == 401) {
        obj.$router.push({
            path: '/login'
        })
    }
    else {
        console.log('else error')
        obj.$router.push({
            path: '/console/error'
        })
    }
}

//web 错误
exports.dealWebError = function(obj, response,setting) {
    if (response.status > 699 && response.status < 800) {
        console.log('700 error')
        if (!setting.timeout)
            setting.timeout = 2000;
        _BaseBox(obj, 'RMSG.'+response.data.errno, setting);
    } else if (response.status > 401) {
        obj.$router.push({
            path: '/system/error401'
        })
    } else {
        console.log(response.data)
        obj.setError(response.status, response.data.description)
        obj.$router.push({
            path: '/system/error'
        })
    }
}

exports.dealConfrimCommon = function(message, callbackFunc) {
    BootstrapDialog.confirm({
        title: '<i class= "fa fa-fw fa-info-circle"></i><strong>确认信息</strong>',
        message: '<i class="text-warning fa fa-fw fa-question-circle" style="font-size: 40px"></i>' + message,
        cssClass: 'modal-primary',
        btnOKLabel: '<i class= "fa fa-fw fa-check"></i>确认',
        btnOKClass: 'btn-primary',
        btnCancelLabel: '<i class= "fa fa-fw fa-close"></i>取消',
        btnCancelClass: 'btn-warning',
        callback: function(result) {
            if (result) {
                callbackFunc()
            }
        }
    })
}

exports.dealSuccessCommon = function(message) {
    BootstrapDialog.show({
        title: '<i class= "fa fa-fw fa-info-circle"></i><strong>提示信息</strong>',
        cssClass: 'modal-success',
        message: '<i class="tex t-warning glyphicon glyphicon-ok" style="font-size: 40px"></i>' + message,
        buttons: [{
            label: '<i class= "fa fa-fw fa-close"></i>关闭',
            cssClass: 'btn-primary',
            action: function(dialogItself) {
                dialogItself.close()
            }
        }]
    })
}

exports.dealPromptCommon = function(message,time) {
    let dialog=BootstrapDialog.show({
        title: '<i class= "fa fa-fw fa-info-circle"></i><strong>提示信息</strong>',
        cssClass: 'msg-dialog',
        message: '<i class="text-warning fa fa-fw fa-warning" style="font-size: 40px"></i>' + message,
        buttons: [{
            label: '<i class= "fa fa-fw fa-close"></i>关闭',
            cssClass: 'btn-primary',
            action: function(dialogItself) {
                dialogItself.close()
            }
        }]
    })
    if(time!=undefined){
        setTimeout(function(){
            dialog.close();
        },time);
    }
}

exports.dealWarningCommon = function(message) {
    BootstrapDialog.show({
        title: '<i class= "fa fa-fw fa-info-circle"></i><strong>警告信息</strong>',
        cssClass: 'modal-warning',
        message: '<i class="text-warning fa fa-fw fa-warning" style="font-size: 40px"></i>' + message,
        buttons: [{
            label: '<i class= "fa fa-fw fa-close"></i>关闭',
            cssClass: 'btn-outline',
            action: function(dialogItself) {
                dialogItself.close()
            }
        }]
    })
}

exports.changeTableClass = function(tableObj) {
    tableObj.on('click-row.bs.table', function(e, row, $element) {
        $('.success').removeClass('success')
        $($element).addClass('success')
    })
}

exports.changeValidatorStatus = function(tableObj, columns, status) {
    for (let index = 0; index < columns.length; index++) {
        tableObj.data('bootstrapValidator').updateStatus(columns[index], status)
    }
}

exports.reSizeCall = function() {
    $('.fixed-table-container').resize(function() {
        $('#table').bootstrapTable('resetView')
    })
    $('.content-wrapper').trigger("resize")
    $('.content').height($(window).height() - 97)
    $('.content').show()
}

exports.getTableHeight = function() {
    let topOffset = 250
    let height = $(window).height()
    height = height - topOffset
    return height
}

exports.initCkeditor = function(textareaID) {
    CKEDITOR.replace(textareaID)
}

exports.initSelect2 = function(jqItem, sdata) {
    jqItem.select2({
        maximumSelectionLength: 1,
        language: 'zh-CN',
        tags: false,
        width: '100%',
        data: sdata,
        multiple: true
    })
}

exports.initSelect2Placeholder = function(jqItem, sdata, placeholder) {
    jqItem.select2({
        maximumSelectionLength: 1,
        language: 'zh-CN',
        placeholder: placeholder,
        tags: false,
        width: '200',
        data: sdata,
        multiple: true
    })
}

exports.initSelect2Single = function(jqItem, sdata) {
    jqItem.select2({
        minimumResultsForSearch: Infinity,
        language: 'zh-CN',
        tags: false,
        width: '100%',
        data: sdata
    })
    jqItem.val("")
}

exports.initSelect2SingleWithSearch = function(jqItem, sdata) {
    jqItem.select2({
        language: 'zh-CN',
        tags: false,
        data: sdata
    })
    jqItem.val("")
}

exports.initSelect2SingleWithSearchPlaceholder = function(jqItem, sdata, placeholder) {
    jqItem.select2({
        language: 'zh-CN',
        placeholder: placeholder,
        data: sdata
    })
}


exports.initDatepicker = function(jqItem) {
    jqItem.datepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        format: 'yyyy-mm-dd'
    })
}

exports.imagesFileUpload = function(_self, obj, row, url, key) {
    let maxsize = 2 * 1024 * 1024; //2M
    let files = _self.files
    let oldRow = $.extend(true, {}, row)
    let fileTypes = new Array('jpg', 'jpeg', 'png', 'gif', 'bmp')
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let filename = files[i].name
            let nameSplit = filename.split('.')
            let postfix = nameSplit[nameSplit.length - 1]
            let fileTypeFlag = '0'
            for (let idx = 0; idx < fileTypes.length; idx++) {　　
                if (fileTypes[idx] === postfix) {　　　　
                    fileTypeFlag = '1'　　
                }
            }
            if (fileTypeFlag === '0') {　
                alert('图片文件必须是jpg、jpeg、png、gif、bmp')　
                return
            }
            if (files[i].size > maxsize) {　
                alert('最大只允许上传2M的文件')　
                return
            }
            let formData = new FormData();
            formData.append('file', files[i])

            obj.$http.post(url + 'upload', formData).then((response) => {
                let fileUrl = response.data['data']['uploadurl']
                row.images.push(fileUrl)
                obj.$http.post(url + 'modify', {
                    'old': oldRow,
                    'new': row
                }).then((response) => {
                    let uprow = response.data['data']
                    $('#table').bootstrapTable('updateByUniqueId', {
                        id: row[key],
                        row: uprow
                    })
                    console.log('modify success')
                }, (response) => {
                    console.log('modify error')
                    exports.dealErrorCommon(obj, response)
                })
            }, (response) => {
                // error callback
                exports.dealErrorCommon(obj, response)
            })
        }
    }
}

exports.modelImagesFileUpload = function(_self, obj, url) {
    let files = _self.files
    let maxsize = 2 * 1024 * 1024; //2M
    let fileTypes = new Array('jpg', 'jpeg', 'png', 'gif', 'bmp')
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let filename = files[i].name
            let nameSplit = filename.split('.')
            let postfix = nameSplit[nameSplit.length - 1]
            let fileTypeFlag = '0'
            for (let idx = 0; idx < fileTypes.length; idx++) {　　
                if (fileTypes[idx] === postfix) {　　　　
                    fileTypeFlag = '1'　　
                }
            }
            if (fileTypeFlag === '0') {　
                alert('图片文件必须是jpg、jpeg、png、gif、bmp')　
                return
            }
            if (files[i].size > maxsize) {　
                alert('最大只允许上传2M的文件')　
                return
            }
            let formData = new FormData();
            formData.append('file', files[i])

            obj.$http.post(url + 'upload', formData).then((response) => {
                obj.imgSrc = response.data['data'].uploadurl
            }, (response) => {
                // error callback
                exports.dealErrorCommon(_self, response)
            })
        }
    }
}

exports.fileFileUpload = function(_self, obj, row, url, key) {
    let files = _self.files
    let maxsize = 2 * 1024 * 1024; //2M
    let oldRow = $.extend(true, {}, row)
    let fileTypes = new Array('pdf')
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > maxsize) {　
                alert('最大只允许上传2M的文件')　
                return
            }

            let formData = new FormData();
            formData.append('file', files[i])

            obj.$http.post(url + 'upload', formData).then((response) => {
                let fileUrl = response.data['data']['uploadurl']
                row.files.push(fileUrl)
                obj.$http.post(url + 'modify', {
                    'old': oldRow,
                    'new': row
                }).then((response) => {
                    let uprow = response.data['data']
                    $('#table').bootstrapTable('updateByUniqueId', {
                        id: row[key],
                        row: uprow
                    })
                    console.log('modify success')
                }, (response) => {
                    console.log('modify error')
                    exports.dealErrorCommon(this, response)
                })
            }, (response) => {
                // error callback
                exports.dealErrorCommon(_self, response)
            })
        }
    }
}

exports.urlsUpload = function(_self, url) {
    $(".urlsupload").change(function() {
        let files = this.files
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                let formData = new FormData();
                formData.append('file', files[i])
                _self.$http.post(url + 'upload', formData).then((response) => {
                    let fileUrl = response.data['data'].uploadurl
                    _self.urlsA.push(fileUrl)
                    _self.$nextTick(function() {
                        $('.urls-detail').thumbox({
                            thumbs: 3,
                            keyboardNavigation: false,
                            openImageEffect: 'easeOutBack',
                            closeImageEffect: 'easeInBack',
                            scrollDockEffect: 'easeInOutBack'
                        })
                    })
                }, (response) => {
                    // error callback
                    exports.dealErrorCommon(_self, response)
                })
            }
        }
    })
}

exports.rowModify = function(_self, apiUrl, row, key) {
    _self.$http.post(apiUrl + 'modify', {
        'old': _self.oldRow,
        'new': row
    }).then((response) => {
        let updaterow = response.data.info
        console.log('modify success')
    }, (response) => {
        console.log('modify error')
        exports.dealErrorCommon(this, response)
    })
}

exports.rowDelete = function(_self, msg, apiUrl, row, key) {
    exports.dealConfrimCommon(msg, function() {
        _self.$http.post(apiUrl + 'delete', row).then((response) => {
            $('#table').bootstrapTable('remove', {
                field: key,
                values: [row[key]]
            })
            exports.dealSuccessCommon('删除成功')
            console.log('delete success')
        }, (response) => {
            console.log('delete error')
            exports.dealErrorCommon(_self, response)
        })
    })
}

//两端去空格函数
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

exports.DateFormat = function(date, fmt) {
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

exports.bootstrapTableAjaxConfig = function() {
    let headers = {};
    headers.authorization = exports.getStoreData('token');
    return {
        headers: headers,
        beforeSend: function () {
            exports.importLoading('show');
        },
        complete: function () {
            exports.importLoading();
        }
    }
}
exports.escapeHTML = function (value, row) {
    if (typeof value === 'string') {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/`/g, '&#x60;');
    }
    return value;
};

exports.remarkFormatter = function(value, row, index) {
    var stringValue=exports.escapeHTML(value);
    if (stringValue) {
        let displayName = (stringValue.length > 10) ? (stringValue.substring(0, 7) + '...') : stringValue
        return [
            '<a role="button" data-toggle="popover" data-trigger="click" data-placement="left" data-html="true" data-content="' +
            '<div class=&quot;box&quot;>' +
            '<div class=&quot;box-body&quot;>' +
            '<div class=&quot;form-group&quot;>' +
            '<div class=&quot;&quot;><span>' + stringValue + '</span></div>' +
            '</div>' +
            '</div>' +
            '</div>">' + displayName + '</a>'
        ].join('')
    }
}

exports.imagesFormatterNoA = function(value, row, index) {
    let retString = '<div class="form-inline" role="form">'
    if (value.length > 0) {
        retString += '<div class="form-group image-set">'
        for (let key in value) {
            retString += '<a class="box-image-link" href="' + value[key] + '" data-lightbox="' + index + '">'
            retString += '<img class="box-image" src="' + value[key] + '"></a>'
        }
        retString += '</div">'
    }
    retString += '</div>'
    return retString
}

exports.imagesFormatter = function(value, row, index) {
    let retString = '<div class="form-inline" role="form">'
    if (value.length > 0) {
        retString += '<div class="form-group image-set">'
        for (let key in value) {
            retString += '<a class="box-image-link" href="' + value[key] + '" data-lightbox="' + index + '">'
            retString += '<img class="box-image" src="' + value[key] + '"></a>'
        }
        retString += '</div>'
    }
    retString += '<span class="form-group fileupload-button">'
    retString += '<i class="glyphicon glyphicon-plus"></i>'
    retString += '<input class="imageupload" type="file" name="file">'
    retString += '</span></div>'
    return retString
}

exports.filesFormatterNoA = function(value, row) {
    if (value.length > 0) {
        let retString = '<div class="form-inline" role="form">'
        retString += '<div class="btn-group">'
        retString += '<button type="button" class="btn btn-xs btn-success dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>'
        retString += '<ul class="dropdown-menu" style="min-width: 0; border:2px solid #3c8dbc;">'
        for (let key in value) {
            retString += '<li><a href="' + value[key] + '"><i class="glyphicon glyphicon-save-file"></i>'
            retString += '</a></li>'
        }
        retString += '</ul></div></div>'
        return retString
    } else {
        return ''
    }
}

exports.fileFormatter = function(value, row) {
    let retString = '<div class="form-inline" role="form">'
    if (value.length > 0) {
        retString += '<div class="btn-group">'
        retString += '<button type="button" class="btn btn-xs btn-success dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>'
        retString += '<ul class="dropdown-menu" style="min-width: 0; border:2px solid #3c8dbc;">'
        for (let key in value) {
            retString += '<li><a href="' + value[key] + '" target="_blank"><i class="glyphicon glyphicon-save-file"></i>'
            retString += '</a></li>'
        }
        retString += '</ul></div>'
    }
    retString += '<span class="form-group fileupload-button">'
    retString += '<i class="glyphicon glyphicon-plus"></i>'
    retString += '<input class="fileupload" type="file" name="file">'
    retString += '</span></div>'
    return retString
}


exports.pdfFileFormatterNoA = function(value, row) {
    if (value.length > 0) {
        let retString = '<div class="form-inline" role="form">'
        retString += '<div class="btn-group">'
        retString += '<button type="button" class="btn btn-xs btn-success dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>'
        retString += '<ul class="dropdown-menu" style="min-width: 0; border:2px solid #3c8dbc;">'
        for (let key in value) {
            retString += '<li><a class="pdf-print" href="#"><i class="glyphicon glyphicon-save-file"></i>'
            retString += '<iframe style="display:none" src="' + value[key] + '"></iframe>'
            retString += '</a></li>'
        }
        retString += '</ul></div></div>'
        return retString
    } else {
        return ''
    }
}

exports.pdfFileFormatter = function(value, row) {
    let retString = '<div class="form-inline" role="form">'
    if (value.length > 0) {
        retString += '<div class="btn-group">'
        retString += '<button type="button" class="btn btn-xs btn-success dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>'
        retString += '<ul class="dropdown-menu" style="min-width: 0; border:2px solid #3c8dbc;">'
        for (let key in value) {
            retString += '<li><a class="pdf-print" href="#"><i class="glyphicon glyphicon-save-file"></i>'
            retString += '<iframe style="display:none" src="' + value[key] + '"></iframe>'
            retString += '</a></li>'
        }
        retString += '</ul></div>'
    }
    retString += '<span class="form-group fileupload-button">'
    retString += '<i class="glyphicon glyphicon-plus"></i>'
    retString += '<input class="fileupload" type="file" name="file">'
    retString += '</span></div>'
    return retString
}

exports.operateFormatter = function(value, row, index) {
    return [
        '<a class="tableDelete" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('')
}


exports.BTRowFormat = function(rowid, rowname) {
    return {
        field: rowid,
        title: rowname,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle'
    }
}
exports.BTRowFormatFooter = function(rowid, rowname,footerForamte) {
    return {
        field: rowid,
        title: rowname,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        footerFormatter:footerForamte,
    }
}

exports.BTRowFormatEditable = function(rowid, rowname) {
    return {
        field: rowid,
        title: rowname,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'text',
            emptytext: '无'
        }
    }
}

exports.BTRowFormatEditableWF = function(rowid, rowname, width) {
    return {
        field: rowid,
        title: rowname,
        class: 'over-hide',
        width: width,
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'text',
            emptytext: '无'
        }
    }
}

exports.BTRowFormatEdSelect = function(_self, rowid, rowname, paraIndex) {
    return {
        field: rowid,
        title: rowname,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'select',
            emptytext: '无',
            source: _self.pagePara[paraIndex],
            display: function(value, sourceData) {
                let showText = ''
                $(sourceData).each(function() {
                    if (typeof(this.id) === typeof(value)) {
                        if (this.id === value) {
                            showText = this.text
                            return false
                        }
                    } else {
                        if (parseInt(this.id) === parseInt(value)) {
                            showText = this.text
                            return false
                        }
                    }
                })
                $(this).html(showText)
            }
        }
    }
}

exports.BTRowFormatEditableW = function(rowid, rowname, width) {
    return {
        field: rowid,
        title: rowname,
        width: width,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'text',
            mode: 'inline',
            emptyclass: 'form-control',
            emptytext: '',
            showbuttons: false,
            onblur: 'submit',
            clear: false,
            display: function(value, sourceData) {
                $(this).html('<div class="form-control">' + value + '</div>')
            }
        }
    }
}

exports.BTRowFormatEnumberW = function(rowid, rowname, width) {
    return {
        field: rowid,
        title: rowname,
        width: width,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'number',
            mode: 'inline',
            emptyclass: 'form-control',
            emptytext: '',
            showbuttons: false,
            onblur: 'submit',
            clear: false,
            display: function(value, sourceData) {
                $(this).html('<div class="form-control">' + value + '</div>')
            }
        }
    }
}

exports.BTRowFormatEdSelectW = function(_self, rowid, rowname, paraIndex, width) {
    return {
        field: rowid,
        title: rowname,
        width: width,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'select',
            mode: 'inline',
            emptyclass: 'form-control',
            emptytext: '',
            unsavedclass: null,
            showbuttons: false,
            source: _self.pagePara[paraIndex],
            display: function(value, sourceData) {
                let showText = ''
                $(sourceData).each(function() {
                    if (typeof(this.id) === typeof(value)) {
                        if (this.id === value) {
                            showText = this.text
                            return false
                        }
                    } else {
                        if (parseInt(this.id) === parseInt(value)) {
                            showText = this.text
                            return false
                        }
                    }
                })
                $(this).html('<div class="form-control">' + showText + '</div>')
            }
        }
    }
}

exports.BTRowFormatEdSelect2 = function(_self, rowid, rowname, paraIndex, width = 200) {
    return {
        field: rowid,
        title: rowname,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'select2',
            emptytext: '无',
            select2: {
                data: _self.pagePara[paraIndex],
                width: width
            },
            display: function(value) {
                let showText = ''
                $(_self.pagePara[paraIndex]).each(function() {
                    if (typeof(this.id) === typeof(value)) {
                        if (this.id === value) {
                            if (this.name) {
                                showText = this.name
                            } else {
                                showText = this.text
                            }
                            return false
                        }
                    } else {
                        if (parseInt(this.id) === parseInt(value)) {
                            if (this.name) {
                                showText = this.name
                            } else {
                                showText = this.text
                            }
                            return false
                        }
                    }
                })
                $(this).html(showText)
            }
        }
    }
}

exports.BTRowFormatEdNum = function(rowid, rowname) {
    return {
        field: rowid,
        title: rowname,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'text',
            validate: function(value) {
                value = $.trim(value)
                if (!value) {
                    return '请输入金额'
                }
                if (!/^\d+\.\d{2}$|^\d+$/.test(value)) {
                    return '请输入正确的金额格式如: 0.00.'
                }

                return ''
            }
        }
    }
}

exports.BTRowFormatEdTextarea = function(rowid, rowname) {
    return {
        field: rowid,
        title: rowname,
        class: 'auto-line',
        width: 80,
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'textarea',
            disabled: false,
            emptytext: '无',
            display: function(value, sourceData) {
                let ele = value.toString()
                if (ele) {
                    let displayName = (ele.length > 10) ? (ele.substring(0, 7) + '...') : ele
                    $(this).html(displayName)
                }
            }
        }
    }
}

exports.BTRowFormatWidth = function(rowid, rowname, width) {
    return {
        field: rowid,
        title: rowname,
        class: 'text-nowrap',
        width: width,
        align: 'center',
        valign: 'middle'
    }
}

exports.BTRowFormatWithFormatter = function(rowid, rowname, rFormatter) {
    return {
        field: rowid,
        title: rowname,
        formatter: rFormatter,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle'
    }
}
exports.BTRowFormatWithFooter = function(rowid, rowname, rFormatter) {
    return {
        field: rowid,
        title: rowname,
        formatter: rFormatter,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle'
    }
}

exports.BTRowFormatWithFW = function(rowid, rowname, rFormatter, width) {
    return {
        field: rowid,
        title: rowname,
        formatter: rFormatter,
        width: width,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle'
    }
}

exports.BTRowFormatWithFE = function(rowid, rowname, rFormatter, e) {
    return {
        field: rowid,
        title: rowname,
        formatter: rFormatter,
        events: e,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle'
    }
}

exports.BTRowFormatWithFEW = function(rowid, rowname, rFormatter, e, width) {
    return {
        field: rowid,
        title: rowname,
        formatter: rFormatter,
        events: e,
        width,
        width,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle'
    }
}

exports.actFormatter = function(rowid, rFormatter, e) {
    return {
        field: rowid,
        events: e,
        formatter: rFormatter,
        align: 'center',
        valign: 'middle',
        class: 'text-nowrap'
    }
}
exports.actFormatterTitle= function(rowid, rowname,rFormatter, e) {
    return {
        field: rowid,
        title: rowname,
        events: e,
        formatter: rFormatter,
        align: 'center',
        valign: 'middle',
        class: 'text-nowrap'
    }
}

exports.BTRowFormatWithFormatterWidth = function(rowid, rowname, rFormatter, width) {
    return {
        field: rowid,
        title: rowname,
        formatter: rFormatter,
        width: width,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        width: '60px'
    }
}

exports.BTRowFormatEditableDatePicker = function(rowid, rowname) {
    return {
        field: rowid,
        title: rowname,
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        editable: {
            type: 'date',
            emptytext: '无'
        }
    }
}

exports.rowDeleteWithApi = function(_self, msg, apiUrl, table, row, key) {
    exports.dealConfrimCommon(msg, function() {
        _self.$http.post(apiUrl, row).then((response) => {
            table.bootstrapTable('remove', {
                field: key,
                values: [row[key]]
            })
            exports.dealSuccessCommon('删除成功')
            console.log('delete success')
        }, (response) => {
            console.log('delete error')
            exports.dealErrorCommon(_self, response)
        })
    })
}

exports.rowModifyWithT = function(_self, act, row, key, tb) {
    console.log(11)
    let params=JSON.stringify(row)
    _self.$http.post(act,params
        /*{
        'old': _self.oldRow,
        'new': row
    }*/
    ).then((response) => {

        let updaterow = response.data.info
        tb.bootstrapTable('updateByUniqueId', {
            id: row[key],
            row: updaterow
        })
        tb.bootstrapTable('resetView')
        console.log('modify success')
    }, (response) => {
        console.log('modify error')
        exports.dealErrorCommon(this, response)

        tb.bootstrapTable('updateByUniqueId', {
            id: row[key],
            row: _self.oldRow
        })
        tb.bootstrapTable('resetView')

    })
}

function _BaseBox(obj,msg,setting) {
    var  systemPrompt =
        '<div class="system-alert-main-warp">' +
        '<div class="system-alert-main">' +
        '<div class="system-alert-head">' +
        '<span class="system-alert-head-text">提示：</span>' +
        '</div>' +
        '<div class="system-alert-content">' +
        '<span class="system-alert-content-text">' + obj.$t(msg) + '</span>' +
        '</div>' +
        '<div class="system-alert-bottom">' +
        '<button class="btn system-alert-bottom-but">确定</button>' +
        '</div>' +
        '</div>' +

        '</div>';

    $(document).find('body').append(systemPrompt);
    $('.system-alert-main-warp').css('display','none');
    $('.system-alert-main-warp').fadeIn("slow");
   /* $(document).scrollTop(0);*/
    // $(document).find('body').css('overflow','hidden');

    if(typeof(setting)!= "undefined"){
        if(setting.timeout>0){
            window.setTimeout(function(){
                $('.system-alert-main-warp').fadeOut("slow",function(){
                    if(typeof($('.system-alert-main-warp')) != undefined && $('.system-alert-main-warp').length>0){
                        $('.system-alert-main-warp')[0].parentNode.removeChild($('.system-alert-main-warp')[0]);
                        $(document).find('body').css('overflow','auto');
                    }
                });
            },setting.timeout)
        }
    }
    $(document).on('click',' .system-alert-bottom-but',function(){
        $('.system-alert-main-warp').fadeOut("slow",function(){
            if(typeof($('.system-alert-main-warp')) != undefined && $('.system-alert-main-warp').length>0){
                $('.system-alert-main-warp')[0].parentNode.removeChild($('.system-alert-main-warp')[0]);
                $(document).find('body').css('overflow','auto');
            }
        });
    })
}
exports.WarningBox=function(obj,msg,setting){
    setting = setting || {};
    if(!setting.timeout)
        setting.timeout = 2000;
    _BaseBox(obj,'MSG.'+msg,setting);
}

//控制台 处理错误
exports.dealConsolError = function (obj,response) {
    let setting = {};
    if (response.status >= 699 && response.status < 800) {
        console.log('700 error')
        if (!setting.timeout)
            setting.timeout = 2000;
             _BaseBox(obj, 'RMSG.'+response.data.errno, setting);
    } else if (response.status > 401) {
        obj.$router.push({
            path: '/console/error'
        })
    }else if (response.status == 401) {
        obj.$router.push({
            path: '/login'
        })
    }
    else if (response.status ==200) {

    }
    else {
        console.log('else error')
        console.log(response.data)
        obj.setError(response.status, response.data.description)
        obj.$router.push({
            path: '/console/error'
        })
    }

}
//控制台 登录处理错误
exports.LoginWarningBox=function(obj,response){
    if (response.status >= 699 && response.status < 800) {
        console.log('700 error')
        obj.systemErrorMessage=obj.$t('RMSG.'+response.data.errno);
        obj.systemError=false;
    } else if (response.status > 401) {
        obj.$router.push({
            path: '/system/error'
        })
    }
    else if (response.status ==200) {

    }else {
        console.log('else error')
        console.log(response.data)
        obj.setError(response.status, response.data.description)
        obj.$router.push({
            path: '/system/error'
        })
    }
}

exports.todyDate=function (dateStr){
    let newTime = new Date();
    let Year = newTime.getFullYear();
    let Month = newTime.getMonth()+1;
    let myDate = newTime.getDate();
    if(myDate<10){
        myDate="0"+myDate;
    }
    if(Month<10){
        Month="0"+Month;
    }
    var time = Year+"-"+Month+"-"+myDate;
    return time;
}
exports.todyYear=function (dateStr){
    let newTime = new Date();
    let Year = newTime.getFullYear();
    return Year;
}
exports.todyMonth=function (dateStr){
    let newTime = new Date();
    let Year = newTime.getFullYear();
    let Month = newTime.getMonth()+1;
    if(Month<10){
        Month="0"+Month;
    }
    var time = Year+"-"+Month;
    return time;
}

exports.selectCheck = function(_self, key, msg) {
    let item = $('#' + key).val()
    if (!item) {
        alert(msg);
        return false
    } else {
        _self.workRow[key] = item[0]
        return true
    }
}
exports.getReportFormUrl=function(url) {
    return 'http://106.15.34.94' + url;
}

exports.getSelect2Val = function(key) {
    let item = $('#' + key).val()
    if (!item||item.length != 1) {
        return ''
    } else {
        return item[0]
    }
}

exports.BTRowFormatWithIndex = function(rowname) {
    return {
        field: 'Number',
        title: rowname,
        formatter: function(value, row, index) {
            return index + 1;
        },
        width: '30px',
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle'

    }
}
exports.BTRowFormatWithIndexFooter = function(rowname) {
    return {
        field: 'Number',
        title: rowname,
        formatter: function(value, row, index) {
            return index + 1;
        },
        width: '30px',
        class: 'text-nowrap',
        align: 'center',
        valign: 'middle',
        footerFormatter:'总计'
    }
}
exports.initDatepicker = function(jqItem) {
    jqItem.datepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        format: 'yyyy-mm-dd'
    })
}
exports.initStartDatepicker = function(start,end) {
    start.datepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate',function(e){
        var startTime = e.date;
        end.datepicker('setStartDate',startTime);
    });
}
exports.initEndDatepicker = function(end,start) {
    end.datepicker({
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate',function(e){
        var endTime = e.date;
        start.datepicker('setEndDate',endTime);
    })
}

//取浏览器参数值
exports.getUrlParams = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//下载文件
exports.downFile=function (obj,url,params) {
    let downUrl='';
    obj.$http.post(url, params).then((response) => {
        if(response.data.errno==0){
            downUrl=response.data.info;
            window.location.href =  window.location.protocol + '//' + window.location.host+downUrl;
        }else{
            exports.dealErrorCommon(obj, response)
        }
    }, (response) => {
        exports.dealErrorCommon(obj, response)
    })
}



exports.consoleDownFile=function (obj,url,params) {
    let downUrl='';
    obj.$http.post(url, params).then((response) => {
        if(response.data.errno==0){
            downUrl=response.data.info;
            window.location.href =  window.location.protocol + '//' + window.location.host+downUrl;
        }else{
            exports.dealConsolError(obj, response)
        }
    }, (response) => {
        exports.dealConsolError(obj, response)
    })
}

//格式化金额
exports.priceFormat=function (number) {
    if (isNaN(number) || number == "") return "";
    number = Math.round(number * 100) / 100;
    if (number < 0)
        return '-' + exports.outputdollars(Math.floor(Math.abs(number) - 0) + '') + exports.outputcents(Math.abs(number) - 0);
    else
        return exports.outputdollars(Math.floor(number - 0) + '') + exports.outputcents(number - 0);
}


exports.outputdollars=function (number){
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (var i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}

exports.outputcents=function (amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}

function importLoading (status) {
    if(status=='show'){
        if($('body  *').hasClass("loading-model")){
            $('.loading-model').css('display','block');
        }else{
            let retString ='<div class="loading-model">';
            retString+='<div class="overlay" style="">'
            retString+='<i class="fa fa-refresh fa-spin"></i>'
            retString+='</div>  </div>'
            $(document).find('body').append(retString);
        }
    }else{
        $('.loading-model').css('display','none');
    }

}
exports.importLoading = importLoading

//admin 模糊查询
exports.fuzzySearch=function (obj,id,url,params) {
    var arr = [];
    $("#"+id).autocomplete({
        minLength: 0,
        source: arr,
        scrollHeight:300,
        source: function(request, response) {
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: params,
                beforeSend: function(request) {
                    request.setRequestHeader("authorization",exports.getStoreData('token'));
                },
                success: function( data ) {
                    response(data.info );
                },
                error:function (data) {
                    var res={
                        data:"",
                        status:"",
                    };
                    console.log(data)
                    res.data=data.responseJSON;
                    res.status=data.status;
                    exports.dealErrorCommon(obj, res)
                }
            });
        },
        select: function( event, ui ) {
            $('#'+id).val(ui.item.name);
            $('#'+id).attr('name',ui.item.id);
            return false

        }
        }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        ul.css({
            'z-index':'9999',
            'position':'absolute'
        })
        return $( '<li>' )
            .append( "<div><p>" + item.name +"</p></div>" )
            .appendTo( ul );

    };


};

//console 模糊查询
exports.consoleFuzzySearch=function (obj,id,url,params) {
    var arr = [];
    $("#"+id).autocomplete({
        minLength: 0,
        source: arr,
        scrollHeight:300,
        source: function(request, response) {
            $.ajax({
                url: url,
                type: 'POST',
                dataType: "json",
                data: params,
                beforeSend: function(request) {
                    request.setRequestHeader("authorization",exports.getStoreData('token'));
                },
                success: function( data ) {
                    response(data.info );
                },
                error:function (data) {
                    var res={
                        data:"",
                        status:"",
                    };
                    console.log(data)
                    res.data=data.responseJSON;
                    res.status=data.status;
                    exports.dealConsolError(obj, res)
                }
            });
        },
        select: function( event, ui ) {
            $('#'+id).val(ui.item.name);
            $('#'+id).attr('name',ui.item.id);
            return false

        }
    }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        ul.css({
            'z-index':'9999',
            'position':'absolute'
        })
        return $( '<li>' )
            .append( "<div><p>" + item.name +"</p></div>" )
            .appendTo( ul );

    };


};

exports.formateTimeDate=function (value) {
    if (value==='' || value===null) {
        return '';
    }
    var newTime = new Date(value);
    var Year = newTime.getFullYear();
    var Month = newTime.getMonth()+1;
    var myDate = newTime.getDate();
    var minute = newTime.getMinutes();
    if(minute<10){
        minute="0"+minute;
    }
    if(myDate<10){
        myDate="0"+myDate;
    }
    if(Month<10){
        Month="0"+Month;
    }
    var hour = newTime.getHours()+":"+minute;

    var time = Year+"-"+Month+"-"+myDate+" "+hour;

    return time;
};

exports.formateDate=function (value) {
    if (value==='' || value===null) {
        return '';
    }
    var newTime = new Date(value);
    var Year = newTime.getFullYear();
    var Month = newTime.getMonth()+1;
    var myDate = newTime.getDate();

    if(myDate<10){
        myDate="0"+myDate;
    }
    if(Month<10){
        Month="0"+Month;
    }

    var time = Year+"-"+Month+"-"+myDate;

    return time;
};

