var Vue = require('vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        // { path: '/',                redirect: '/login' },
        { path: '/admin_login',           component: resolve => require(['./views/admin/login'], resolve) },
         { path: '/admin',          component: resolve => require(['./components/mianAdmin'], resolve),
           children: [

             { path: 'error',                  component: resolve => require(['./components/errpage'], resolve) },
             { path: 'error401',               component: resolve => require(['./components/err401'], resolve) },
             { path: 'home',                   component: resolve => require(['./views/admin/home'], resolve) },
             { path: 'userSetting',            component: resolve => require(['./views/admin/userSetting'], resolve) },
             { path: 'operatorControl',        component: resolve => require(['./views/admin/operatorControl'], resolve) },
             { path: 'groupControl',           component: resolve => require(['./views/admin/groupControl'], resolve) },
             { path: 'menuControl',            component: resolve => require(['./views/admin/menuControl'], resolve) },
             { path: 'groupMenuControl',       component: resolve => require(['./views/admin/groupMenuControl'], resolve) },
             { path: 'domainControl',          component: resolve => require(['./views/admin/domainControl'], resolve) },
             { path: 'domainMenuControl',      component: resolve => require(['./views/admin/domainMenuControl'], resolve) },
             { path: 'resetPassword',          component: resolve => require(['./views/admin/userResetPassword'], resolve) },
             { path: 'allCustomer',          component: resolve => require(['./views/admin/allCustomer'], resolve) },
             { path: 'ownedCountry',          component: resolve => require(['./views/admin/ownedCountry'], resolve) },
             { path: 'priceOperatorControl',          component: resolve => require(['./views/admin/priceOperatorControl'], resolve) },
             { path: 'companyCustomer',          component: resolve => require(['./views/admin/companyCustomer'], resolve) },
             { path: 'personCustomer',          component: resolve => require(['./views/admin/personCustomer'], resolve) },
             { path: 'applicationCustomer',          component: resolve => require(['./views/admin/applicationCustomer'], resolve) },
             { path: 'invoicesCustomer',          component: resolve => require(['./views/admin/invoicesCustomer'], resolve) },
             { path: 'templateCustomer',          component: resolve => require(['./views/admin/templateCustomer'], resolve) },
             { path: 'rechargeListCustomer',          component: resolve => require(['./views/admin/rechargeListCustomer'], resolve) },
             { path: 'rechargeCustomer',          component: resolve => require(['./views/admin/rechargeCustomer'], resolve) },
             { path: 'messageCustomer',          component: resolve => require(['./views/admin/messageCustomer'], resolve) },
             { path: 'messageListCustomer',          component: resolve => require(['./views/admin/messageListCustomer'], resolve) },
             { path: 'appMessageCustomer',          component: resolve => require(['./views/admin/appMessageCustomer'], resolve) },
             { path: 'appMessageListCustomer',          component: resolve => require(['./views/admin/appMessageListCustomer'], resolve) },
             { path: 'chart_year',             component: resolve => require(['./views/admin/chart_year'], resolve),},
             { path: 'dayMessageCustomer',             component: resolve => require(['./views/admin/dayMessageCustomer'], resolve),},
             { path: 'nowMessageCustomer',             component: resolve => require(['./views/admin/nowMessageCustomer'], resolve),},
             { path: 'signatureCustomer',             component: resolve => require(['./views/admin/signatureCustomer'], resolve),},
             { path: 'quotationSheet',             component: resolve => require(['./views/admin/quotationSheet'], resolve),},
             { path: 'quotationEditSheet',             component: resolve => require(['./views/admin/quotationEditSheet'], resolve),},
             { path: 'quotationDetailSheet',             component: resolve => require(['./views/admin/quotationDetailSheet'], resolve),},
             { path: 'rateCustomer',             component: resolve => require(['./views/admin/rateCustomer'], resolve),},
             { path: 'rateDetailCustomer',             component: resolve => require(['./views/admin/rateDetailCustomer'], resolve),},
             { path: 'supplierCustomer',             component: resolve => require(['./views/admin/supplierCustomer'], resolve),},
             { path: 'supplierDetailCustomer',             component: resolve => require(['./views/admin/supplierDetailCustomer'], resolve),},
             { path: 'supplierRate',             component: resolve => require(['./views/admin/supplierRate'], resolve),},
             { path: 'supplierRateDetail',             component: resolve => require(['./views/admin/supplierRateDetail'], resolve),},
             { path: 'chart_month',             component: resolve => require(['./views/admin/chart_month'], resolve),},
             { path: 'supplierManage',             component: resolve => require(['./views/admin/supplierManage'], resolve),},
             { path: 'dayMessageSupplier',             component: resolve => require(['./views/admin/dayMessageSupplier'], resolve),},
             { path: 'dayMessageApplication',             component: resolve => require(['./views/admin/dayMessageApplication'], resolve),},
             { path: 'profitStatement',             component: resolve => require(['./views/admin/profitStatement'], resolve),},
             { path: 'salesProfitStatement',             component: resolve => require(['./views/admin/salesProfitStatement'], resolve),},
             { path: 'routingManage',             component: resolve => require(['./views/admin/routingManage'], resolve),},
             { path: 'quequeCustomer',             component: resolve => require(['./views/admin/quequeCustomer'], resolve),},
             { path: 'operatorCustomer',             component: resolve => require(['./views/admin/operatorCustomer'], resolve),},

         ]},
        { path: '/',                redirect: '/login' },
        { path: '/login',           component: resolve => require(['./views/web/login/login'], resolve) },
        { path: '/pdf_html',             component: resolve => require(['./views/web/pdf_html'], resolve),},
        { path: '/register',           component: resolve => require(['./views/web/login/register'], resolve) },
        { path: '/blank/:type/:id/:money',             component: resolve => require(['./views/console/blank'], resolve),},
        { path: '/find_password',           component: resolve => require(['./views/web/find_password/find_password'], resolve),
            children:[
                { path: 'step1',                  component: resolve => require(['./views/web/find_password/find_password_step1'], resolve) },
                { path: 'step2/:phone',                  component: resolve => require(['./views/web/find_password/find_password_step2'], resolve) },
                { path: 'step3/:phone',                  component: resolve => require(['./views/web/find_password/find_password_step3'], resolve) },
                { path: 'step4',                  component: resolve => require(['./views/web/find_password/find_password_step4'], resolve) },
            ]
        },
        /*{ path: '/system',          component: resolve => require(['./components/mainSystem'], resolve),
            children: [
                { path: 'error',                  component: resolve => require(['./components/errpage'], resolve) },
                { path: 'error401',               component: resolve => require(['./components/err401'], resolve) },
                { path: 'home',                   component: resolve => require(['./views/home'], resolve) },
                { path: 'groupControl',           component: resolve => require(['./views/web/system/groupControl'], resolve) },
                { path: 'voice_service',          component: resolve => require(['./views/web/production_service/voice_service'], resolve) },
                { path: 'message_service',        component: resolve => require(['./views/web/production_service/message_service'], resolve) },
                { path: 'data_service',           component: resolve => require(['./views/web/production_service/data_service'], resolve) },
                { path: 'number_service',         component: resolve => require(['./views/web/production_service/number_service'], resolve) },
                { path: 'price_inquiry',          component: resolve => require(['./views/web/price_inquiry/price_inquiry'], resolve) },
                { path: 'application',          component: resolve => require(['./views/web/system/application'], resolve) },
                { path: 'all_production',          component: resolve => require(['./views/web/production_service/all_production'], resolve) },
                { path: 'develop_doc',            component: resolve => require(['./views/web/develop_doc/develop_doc'], resolve),
                   /!* children: [
                        { path: 'develop_doc_sub/:interfaceId/:id',         component: resolve => require(['./views/web/develop_doc/dev_doc_sub'], resolve) },
                    ]*!/
                },
                { path: 'seq',                    component: resolve => require(['./views/web/seq/seq'], resolve),
                    children: [
                        { path: 'seq_sub/:id',               component: resolve => require(['./views/web/seq/seq_sub'], resolve) },
                    ]
                },
                { path: 'about_us',                    component: resolve => require(['./views/web/about_us/about_us'], resolve),
                    children: [
                        { path: 'company_info',               component: resolve => require(['./views/web/about_us/company_info'], resolve) },
                        { path: 'contact_us',               component: resolve => require(['./views/web/about_us/contact_us'], resolve) },
                    ]
                },
            ]},*/
        { path: '/console',                                      component: resolve => require(['./components/console/consoleMain'], resolve),
            children: [
                {path: 'error',                  component: resolve => require(['./components/errpage'], resolve) },
                {path:'home',                          component: resolve => require(['./views/console/home'], resolve)},
                {path:'basic_information',             component: resolve => require(['./views/console/person/basic_information'], resolve)},
                {path:'auth_information',             component: resolve => require(['./views/console/person/authentication_information'], resolve),},
                {path:'auth_person/:status',             component: resolve => require(['./views/console/person/auth_person'], resolve),},
                {path:'auth_company/:status',             component: resolve => require(['./views/console/person/auth_company'], resolve),},
                {path:'consoel_price_search',             component: resolve => require(['./views/console/person/consoel_price_search'], resolve),},
                {path:'console_change_password',             component: resolve => require(['./views/console/person/console_change_password'], resolve),},
                {path:'signature_list',             component: resolve => require(['./views/console/administration/signature_list'], resolve),},
                {path:'new_signature/:id',             component: resolve => require(['./views/console/administration/new_signature'], resolve),},
                {path:'sms_sending',             component: resolve => require(['./views/console/administration/sms_sending'], resolve),},
                {path:'template_list',             component: resolve => require(['./views/console/administration/template_list'], resolve),},
                {path:'new_template/:id',             component: resolve => require(['./views/console/administration/new_template'], resolve),},
                {path:'application_list',             component: resolve => require(['./views/console/administration/application_list'], resolve),},
                {path:'new_application/:id',             component: resolve => require(['./views/console/administration/new_application'], resolve),},
                {path:'billing_list',             component: resolve => require(['./views/console/finance/billing_list'], resolve),},
                {path:'recharge_step1',             component: resolve => require(['./views/console/finance/recharge_step1'], resolve),},
                {path:'recharge_step2/:money',             component: resolve => require(['./views/console/finance/recharge_step2'], resolve),},
                {path:'recharge_step3/:money/:type/:id',             component: resolve => require(['./views/console/finance/recharge_step3'], resolve),},
                {path:'recharge_list',             component: resolve => require(['./views/console/finance/recharge_list'], resolve),},
                {path:'monthly_bill',             component: resolve => require(['./views/console/finance/monthly_bill'], resolve),},
                {path:'invoice_request/:id/:type',             component: resolve => require(['./views/console/finance/invoice_request'], resolve),},
                {path:'chart_statistics/:status',             component: resolve => require(['./views/console/statistics/chart_statistics'], resolve),},
                {path:'building',             component: resolve => require(['./views/console/building'], resolve),},
                {path:'day_message',             component: resolve => require(['./views/console/statistics/day_message'], resolve),},
                {path:'message_list',             component: resolve => require(['./views/console/statistics/message_list'], resolve),},
                {path:'queue_list',             component: resolve => require(['./views/console/statistics/queue_list'], resolve),},

            ]
        },
    ]
})