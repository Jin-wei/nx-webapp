/**
 * Created by Cici on 2017/6/19.
 */
module.exports = {
    /*web*/
    language:'中文',
    name:' Unknown',
    //图片
    rightFix:{
        span1:'QQ',
        span2:'Telephone consultation',
        span3:'Join the collection',
        span4:'Back top',
    },
    bottomFooter:'浙公网安备 33020302000376 号 浙 ICP 备 16041108号 -1',
    webHeader:{
        li1:{cn:'Home page', en:''},
        li2:{cn:'Product service', en:''},
        li3:{cn:'Price inquiry', en:''},
        li4:{cn:'Develop document', en:''},
        li5:{cn:'Common problem', en:''},
        li6:{cn:'About us', en:''},
        li2Child:{
            p1:'International voice',
            p2:'International Short Message',
            p3:'International Data',
            p4:'International number'
        },
        loginBtn:'Login',
        registerBtn:'Registered',
    },
    webFooter:{
        Li1:{
            h4:'产品服务',
            p1:'全球短信',
            p2:'全球语音',
            p3:'全球loT',
            p4:'全球号码'
        },
        Li2:{
            h4:'开发者服务',
            p1:'API开发文档',
            p2:'常见问题',

        },
        Li3:{
            h4:'联系我们',
            p1:'热线电话：0574-27701111',
            p2:'业务咨询：info@nxtele.com',
            p3:'客服 QQ： 1930381177 ',
            p4:'更多...'
        },
        right:{
            p1:'About us',
            p2:'Niu letter network technology official micro letter',
            nub:'nxtele-ytx'
        }
    },
    home: {
        banner:[
            {
                writeTitle:'NXTELE.云通信为您提供全面的',
                blueTilte:'出海通讯服务',
                subtitle:'通过集成接口低成本轻松实现出海',
                moreBtn:'了解更多',
                active:1,
                img:'banner-img1'
            },
            {
                writeTitle:'全面提升企业国际',
                blueTilte:'通信服务能力',
                subtitle:'中国领先的移动即时通信平台',
                moreBtn:'了解更多',
                active:0,
                img:'banner-img2'
            },
            {
                writeTitle:'我们用通讯帮您',
                blueTilte:'解决业务难题',
                subtitle:'成本低、 质量佳、 稳定的高技术能力',
                moreBtn:'了解更多',
                active:0,
                img:'banner-img3'
            }
        ],
        //图片
        prodecueTap:[
            {
                cn_p:'国际语音服务',
                en_p:'International VC',
                index:1,
                active:'voice_service',
            },
            {
                cn_p:'国际短信服务',
                en_p:'International SMS',
                index:2,
                active:'message_service',
            },
            {
                cn_p:'国际数据服务',
                en_p:'International DS',
                index:3,
                active:'data_service',
            },
            {
                cn_p:'国际号码服务',
                en_p:'International NS',
                index:4,
                active:'number_service',
            }
        ],
        productService:{
            cnTitle:'我们的产品',
            small:"专注于出海的全球云通信服务平台",
            enTiTile:'Product service',
            productLi:[
                {
                    iconHref:'/static/images/img/home/blue-vocie.png',
                    title:'全球短信',
                    small1: '全球覆盖，通道直达',
                    small2: '即发即收',
                    small3: '',
                    moreBtn: '了解更多',
                    scroll:'0'
                },
                {
                    iconHref: '/static/images/img/home/blue-message.png',
                    title: '全球语音',
                    small1: '一点接入，通达全球',
                    small2: '清晰稳定',
                    small3: '',
                    moreBtn: '了解更多',
                    scroll:'950'
                },
                {
                    iconHref: '/static/images/img/home/blue-number.png',
                    title: '全球大号',
                    small1: '全球覆盖，一键申请',
                    small2: '灵活使用 ',
                    small3: '',
                    moreBtn: '了解更多',
                    scroll:'1300'
                },
                {
                    iconHref: '/static/images/img/home/blue-data.png',
                    title: '全球IOT',
                    small1: '全球漫游，灵活部署',
                    small2: '流量共享',
                    small3: '',
                    moreBtn: '了解更多',
                    scroll:'1800'
                },
            ]
        },
        application:{
            cnTitle:'我们的优势',
            small:'NXTELE，用一个平台让您与世界进行沟通',
            enTiTile:'Application scenarios',
            contentTitle:'无论你身处哪个行业， 我们都能满足您的需求',
            moreBtn:'了解更多',
            li:[
                {
                    iconHref:'/static/images/img/home/app-li1.png',
                    title:'资源优势',
                    small:'覆盖200+国家，选择更全面；运营商<br>直连，通讯更稳定；'
                },
                {
                    iconHref:'/static/images/img/home/app-li2.png',
                    title:'技术优势',
                    small:'API简单易用，接入更快速；免切换<br>环境，使用更安心'
                },
                /*{
                 iconHref:'/static/images/img/home/app-li3.png',
                 title:'API接入服务',
                 small:'开发出便捷易用的API接口，零门槛调用，完善的<br>API接口介绍文档'
                 },*/
            ],
            li2:[
                {
                    iconHref:'/static/images/img/home/app-li6.png',
                    title:'价格优势',
                    small:'直达运营商，价格更优惠；免中间<br>环节，资费更实在；'
                },
                {
                    iconHref:'/static/images/img/home/app-li4.png',
                    title:'服务优势',
                    small:'提供7*24技术支持，使用更放心；提供<br>全球测试号码，服务更贴'
                },
                /*{
                 iconHref:'/static/images/img/home/app-li5.png',
                 title:'价格优势',
                 small:'支持主流的HTTP安全协议，操作简单，信息处理全程加密，<br>为企业快速地在平台上配置最佳的运营商通道'
                 },*/

            ]
        },
        partner:{
            cnTitle:'我们的合作伙伴',
            enTiTile:'Cooperative partner',
            small:'因为信赖 · 所以选择'
        },
        message:{
            cnTitle:'短信试发',
            phone:'手机号：',
            phoneCountry:"国码",
            phoneText:"请输入电话号码",
            samll:'（ 注：一天内同个手机号最多试发三条 ）',
            nub:'验证码：',
            nubText:'请输入验证码',
            btn:'立即发送',

        }
    },


    //voice
    voice:{
        banner:{
            cnTitle:'国际语音服务',
            enTitle:'International &nbsp;voice &nbsp;services',
            p:'Low rates &nbsp;&nbsp;high concurrency &nbsp;&nbsp;global coverage'
        },
        business: {
            title: '[Business characteristic]',
            li: [
                {imgHref:'/static/images/img/32.png', p1: 'Self platform with high controllability', p2: 'step by step monitoring',},
                {imgHref:'/static/images/img/33.png', p1: 'All-in-one data analysis', p2: 'all checks',},
                {imgHref:'/static/images/img/42.png', p1: 'Access mode of simple operation', p2: 'seconds and seconds docking',},

            ]

        },
        produce:{
            title: '[Product characteristic]',
            prodCharacterArr:[
                {'title':'Global coverage','description':'Covering 226 countries and regions worldwide, access to one point, access to the world','img':'/static/images/img/2.png'},
                {'title':'High concurrency','description':'Thousands of calls are high concurrent','img':'/static/images/img/35.png'},
                {'title':'Low rate','description':'Far below the rates of carrier ','img':'/static/images/img/36.png'},
                {'title':'Professional operation and maintenance team','description':'Efficient operation of the professional maintenance team','img':'/static/images/img/37.png'}
            ]
        },
        actual:{
            title: '[Actual case]',
            li: [
                {imgHref:'/static/images/img/38.png', p1: 'Social network', p2: 'Network chat, free',},
                {imgHref:'/static/images/img/39.png', p1: 'Headhunting', p2: 'Efficient address, direct talent',},
                {imgHref:'/static/images/img/40.png', p1: 'Family fairy tale', p2: 'At any time to communicate, speak their minds',},

            ]
        }
    },

    //data
    data:{
        banner:{
            cnTitle:'国际数据服务',
            enTitle:'International &nbsp;Data &nbsp;services',
            p:'To create a global network of things (LOT) platform -NX cloud communication platform'
        },
        business: {
            title: '[Business characteristic]',
            li: [
                {imgHref:'/static/images/img/21.png', p1: 'Rapid deployment, flexible expansion',p2:'Help enterprises to market things faster',p3:'to the market to shorten the business',p4:'organization of the Internet business cycle'},
                {imgHref:'/static/images/img/29.png', p1: 'Automatic management, real-time visible',p2:'Continuous monitoring of network conditions Device behavior',p3:'and Internet of Things service status'},
                {imgHref:'/static/images/img/20.png', p1: 'Timely response, reliable service',p2:'Through real-time diagnosis and active',p3:'monitoring of the connection state',p4:'to ensure high reliability of service'},
                {imgHref:'/static/images/img/28.png', p1: 'Control costs, growth gains',p2:'Easy access to business data, easy to control costs,',p3:'reduce expenses and increase profitability',offset:true,},
                {imgHref:'/static/images/img/22.png', p1: 'Once configured, globally expanded',p2:'Quickly enter more than 150 countries and regions of the market',p3:'grasp the new revenue opportunities'},
            ]

        },
        produce:{
            title: '[产品特性]',
            rightTitle:'Product characteristic',
            content:'Niuxin network and the rest of the world operators to maintain good relations of cooperation, with rich bandwidth and fiber resources, on this basis, Ni Xin network to create a global Internet of Things (IOT) platform -NX cloud communication platform to help Chinese enterprises to use the Internet of things To achieve business transformation and the introduction of innovative interconnection services, enterprises of all sizes can use the NX cloud communication platform. Rapid and cost-effective deployment on a global scale. Manage and benefit from the Internet of Things.',
        },
        actual:{
            title: '[Practical case]',
            li: [
                {imgHref:'/static/images/img/25.png', p1: 'Traffic logistics industry', p2: 'Item tracking, security system',},
                {imgHref:'/static/images/img/26.png', p1: 'Industrial manufacturing industry', p2: 'Smart home appliances, automatic meter reading',},
                {imgHref:'/static/images/img/27.png', p1: 'Out of the sea construction real estate industry control', p2: 'Remote security monitoring',},

            ]
        },
    },

    //message
    message:{
        banner:{
            cnTitle:'国际短信服务',
            enTitle:'International &nbsp;Short &nbsp;Message &nbsp;services',
            p:'Provide professional、 &nbsp;&nbsp;fast、 &nbsp;&nbsp;low-cost messaging platform'
        },
        business: {
            title: '[Business characteristic]',
            li: [
                {imgHref:'/static/images/img/10.png', p1: 'Covering more than 220', p2: 'operators in 150 countries',},
                {imgHref:'/static/images/img/11.png', p1: 'Hold Hong Kong and US', p2: 'operator licenses',},
                {imgHref:'/static/images/img/1.png', p1: 'Retail enterprise customer service', p2: 'experience',},

            ]

        },
        produce:{
            title: '[Product characteristic]',
            prodCharacterArr:[
                {'title':'Global coverage','description':'Covering 226 countries and regions worldwide, access to global access','img':'/static/images/img/2.png'},
                {'title':'Fast and efficient','description':'Serving 95% of the worldwide end users, the arrival rate of up to 95%, 3 seconds to arrive in real time','img':'/static/images/img/4.png'},
                {'title':'Multiple access methods','description':'Support the domestic mainstream HTTP protocol','img':'/static/images/img/5.png'},
                {'title':'Terminal management','description':'Independent research and development of Short Message business systems, multi-media login, multi-terminal management','img':'/static/images/img/6.png'}
            ]
        },
        actual:{
            title: '[Practical case]',
            li: [
                {imgHref:'/static/images/img/7.png', p1: 'Overseas marketing promotion', p2: 'All the goods arrived',},
                {imgHref:'/static/images/img/8.png', p1: 'APP overseas verification', p2: 'Minutes in position',},
                {imgHref:'/static/images/img/9.png', p1: 'Missed call receipt', p2: 'There are reminders',},

            ]
        },
    },
    //number
    number:{
        banner:{
            cnTitle:'国际号码服务',
            enTitle:'International &nbsp;number &nbsp;services',
            p:'Global 400 free payment number &nbsp;&nbsp;multi-audio support platform &nbsp;&nbsp;the global virtual Sim card service'
        },
        business: {
            title: '[Business characteristic]',
            li: [
                {imgHref:'/static/images/img/19.png', p: 'Global 400 free payment number'},
                {imgHref:'/static/images/img/18.png', p: 'multi-audio support platform'},
                {imgHref:'/static/images/img/12.png', p: 'the global virtual Sim card service'},

            ]

        },
        produce:{
            title: '[Product characteristic]',
            rightTitle:'Product characteristics',
            content:'Glory global number system, the integration of more than 150 countries around the carrier resources of country, communications outlets all cover, focus on the small and medium enterprises to provide remote communication services, the number of adequate resources for short-term overseas travel travel knowledge to provide international roaming virtual sim service , For the overseas c-side customers to provide efficient and low-cost customers with the same hotline call service, comprehensively enhance the level of communication between the parties, a substantial increase in business efficiency.',
        },
        actual:{
            title: '[Practical case]',
            li: [
                {imgHref:'/static/images/img/16.png', p1: 'Enterprise teleconferencing system', p2: 'One access, global response',},
                {imgHref:'/static/images/img/15.png', p1: 'Global customer service center response', p2: 'Local team, overseas customer',},
                {imgHref:'/static/images/img/14.png', p1: 'Exclusive APP roaming number', p2: 'A machine trip, double Unicom',},

            ]
        },
    },
    //produce tap
    prodecueTap:[
        {
            cn_p:'国际语音服务',
            en_p:'International VC',
            index:1,
            active:'voice_service',
        },
        {
            cn_p:'国际短信服务',
            en_p:'International SMS',
            index:2,
            active:'message_service',
        },
        {
            cn_p:'国际数据服务',
            en_p:'International DS',
            index:3,
            active:'data_service',
        },
        {
            cn_p:'国际号码服务',
            en_p:'International NS',
            index:4,
            active:'number_service',
        }
    ],
    all_produce:{
        banner:{
            title:'我们的产品',
            content:'提供专业 ，&nbsp;快速 ，&nbsp;低成本的云通讯服务平台',
        },
        messageVoice:[
            {
                title:'全球短信',
                small:'全球覆盖，直达通道，即收即发',
                ul:[
                    {
                        icon:'message-icon1.png',
                        title:'全球覆盖',
                        small:'覆盖200+国家和地区',
                    },
                    {
                        icon:'message-icon2.png',
                        title:'快速高效',
                        small:'国际短信，瞬息到达;智能分</br>流，拒绝拥堵',
                    },
                    {
                        icon:'message-icon3.png',
                        title:'多种接入方式',
                        small:'支持HTTP或SMPP协议的API对接，提供网页登陆',
                    },
                    {
                        icon:'message-icon4.png',
                        title:'后台管理方便<br>',
                        small:'发送状态报告实时返回，管理后台功能齐全',
                    }
                ],
            },
            {
                title:'全球语音',
                small:'一点接入，通达全球，清晰稳定',
                ul:[
                    {
                        icon:'message-icon1.png',
                        title:'权威认证',
                        small:'拥有香港和美国电讯管理局颁发</br>的运营牌照，专业可靠，</br>值得信赖',
                    },
                    {
                        icon:'message-icon5.png',
                        title:'运营直连',
                        small:'合作布点遍及全球，直达各国</br>运营商，通讯清晰，</br>资费透明；',
                    },
                    {
                        icon:'message-icon-money.png',
                        title:'平台支持',
                        small:'拥有自主研发平台，全自动</br>实时有效掌握消费及</br>呼叫动态；',
                    },
                    {
                        icon:'message-icon-tream.png',
                        title:'技术支持',
                        small:'专业的技术团队，7*24小时专业维护，轻松对接，</br>安心体验。',
                    }
                ],
            }
        ],
        data:{
            title:'全球IOT',
            small:'全球漫游，灵活部署，流量共享',
            text:'NETELE 全球物联网（IoT）平台-NX云通信平台，整合全球数据漫游服务，为<br>中国出海中小型企业提供数据服务；一张sim 卡，通达全球，自主使用，高效部署，灵活定制。',
            ul:[
                {
                    icon:'data-icon-fly.png',
                    title:'快速部署 灵活扩展',
                    small:'帮助企业将产品更快地推向市场，缩短<br>企业部署业务的周期',
                },
                {
                    icon:'data-icon-k.png',
                    title:'一次配置 全球扩展',
                    small:'快速进军150多个国家/地区的市场，<br>把握新的机会;',
                },
                {
                    icon:'data-icon-heart.png',
                    title:'及时响应 可靠服务',
                    small:'通过实时诊断和对连接状态的主动<br>监控，确保服务的高可靠性',
                },
                /*{
                 icon:'message-icon-ball.png',
                 title:'控制成本 增长收益',
                 small:'通过实时诊断和对连接状态的<br>轻松获得商业数据方便控制成<br>本减少开支提升利润水平',
                 },
                 {
                 icon:'data-icon-add.png',
                 title:'一次配置 全球扩展',
                 small:'快速进军150多个国家地区的<br>市场把握新的收入机会',
                 }*/
            ]
        },
        number:{
            title:'全球大号',
            small:'全球覆盖，一键申请，灵活定制',
            text:'NXTELE全球号码系统，整合全球200+国家的运营商资源，通信网点全覆盖。为出海中小企业提供远程通信服务、电话会议服务、全球呼叫中心服务。高效低价，灵活自主。',
            ul:[
                {
                    icon:'nub-icon-phone.png',
                    title:'全球覆盖',
                    small:'覆盖200+个国家及地区，选择范围更广',
                },
                {
                    icon:'nub-icon-voice.png',
                    title:'一键申请',
                    small:'自助下单，按需申请，<br>一步到位',
                },
                {
                    icon:'nub-icon-sim.png',
                    title:'灵活自主',
                    small:'量身定制，灵活贴心；全自动账单，高效安心；',
                },
            ]
        },

    },
    searchPrice:{
        search:{
            title:'International Short Message price inquiry',
            inputPlaceholder:'Please enter: 国码 / national English name / national Chinese name',
            searchBtn:'Search',
            resultSpan:'International Short Message market quotation',
            strip:'strip',
        },
        downTitle:'Download the complete global pricing table',
        reminder:{
            title:'Cozy point',
            p1:'Details of the rates above are for reference only and are subject to adjustments in accordance with changes in the exchange rate',
            p2:'To learn more about national tariffs, please contact us at 0574-27701111',
        }
    },
    develop:{
        title:'API 开发文档',
        ul:[
            {
                id:'1',
                icon:'dev-message.png',
                title:'短信文档',
                small:'实现国内／国际短信业务',
                btn:'查看文档',
                pdf:'SMS.pdf',
            },
            {
                id:'2',
                icon:'dev-phone.png',
                title:'语音文档',
                small:'业务即将开放',
                pdf:'VOICE.pdf',
            },
            {
                id:'3',
                icon:'dev-static.png',
                title:'数据文档',
                small:'业务即将开放',
                pdf:'DATA.pdf',
            },
            {
                id:'4',
                icon:'dev-ling.png',
                title:'流量文档',
                small:'业务即将开放',
                pdf:'FLOW.pdf',
            },
            {
                id:'5',
                icon:'dev-document.png',
                title:'DID 文档',
                small:'业务即将开放',
                pdf:'DID.pdf',
            },
        ]
    },
    //problem
    problem:{
        nav_cn_title:'常见问题',
        nav_en_title:'common problem',
        left_nav_lis:[
            {
                title:'Access and authentication',
                href:'/system/seq/seq_sub/:0',
                value:'1',
            },
            {
                title:'XXXX',
                href:'#',
                value:'2',
            },
            {
                title:'XXXX',
                href:'#',
                value:'3',
            },
            {
                title:'XXXX',
                href:'#',
                value:'4',
            },
        ],
        messageList1:{
            title:'Access and authentication',
            h1:'How to make fast access？',
            p1:'1.registration certification - fill out the registration information, complete the registration link, become a developer;<br> ' +
            '2.create applications - combined with product needs, to create their own applications using the platform to provide communication capabilities (after registration has an application, according to the need to create multiple);<br>'+
            '3.Docking test - call the cloud communication platform free open interface, docking platform FBI test (registration that is presented 8 yuan test amount);<br>'+
            '4.On-line operation - switch production environment, complete application on-line<br>',
            h2:'Information for enterprise developer certification',
            h3:'(1)How to submit a review?',
            p3:'Log in to the console (console - account - account management - authentication information) to submit enterprise certification information. Support three card one, three card separation (need business license, tax registration certificate 2 documents',
            h4:'(2)Auditing matters',
            p4:'1、Upload documents to support within 2M PNG \ JPG \ GIF format, generally open the audit platform to show the blank or the upper left corner shows "X" is the upload failed, it is recommended that customers adjust the image format size, if multiple upload failed, the user can use the registered mailbox Send the certified materials to sh@yuntongxun.com Post-sale colleagues to help deal with.<br>'+
            '2、The company name or personal name entered by the customer can not be blank so as to prevent the customer from re authentication <br>'+
            '3、Enterprise certified company address can not be too simple, can not only write to a district or a city.<br>'+
            '4、Enterprise certification documents for the copy, the need to add the company red chapter, if not a copy, but also to reflect the state organs red chapter.<br>'+
            '5、Enterprise certification Upload documents of the watermark or handwritten instructions, with the cloud to allow the use of enterprise certification.<br>'+
            '6、If the government agencies or institutions, private non enterprise organizations, social organizations, no business license, can provide a certificate of legal institutions, educational institutions or social organizations registration certificate and other relevant documents, choose the same cards one (by a code) to upload documents, because there is no website can query, check in the information and documents information consistent. If less than 18 bits of uniform credit code can be replaced by number 0, the end of the extension can be entered without input.'
        }

    },
    about:{
        leftNav:{
            cnTitle:'关于我们',
            enTitle:'About us',
            about:'Company introduction',
            content:'Contact us',
        },
        contactTitle:'Contact us',
        contactLI1:{
            h3:'Hotline',
            p1:'China：0574-27701111',
            p2:'Hong &nbsp;Kong：852-30699997',
            p3:'Tai&nbsp;wan：886-277054303',
            p4:'USA：886-277054303'
        },
        contactLI2:{
            h3:'Contact email',
            p1:'Business consulting：info@nxtele.com',
            p2:'Product support：cs@nxtele.com'
        },
        contactLI3:{
            h3:'Join us',
            p1:'Email：hr@nxtele.com'
        },
        contactLI4:{
            h3:'Contact address',
            p1:'Company：0574-27701111',
            p2:'Address：Ningbo City, through the 1811,',
            p3:'wearing financial management of the Silicon Valley 11 Building, 35 floor',
        },
        Title:'Company introduction',
        p1:'宁波牛信网络科技有限公司是一家能够在全球进行网络部署，服务保障，产品提供的云通信业务提供者。是国际领先的云通讯服务商，负责中国大陆的运营、客户拓展以及技术支持。我们通过互联网云计算的方式，为企业提供面向全球的云通信服务，助力中国企业出海。业务涵盖全球短信、 全球语音、全球DID号码服务、国际IOT。',
        p2:'我们的宗旨是：致力NXTELE云通信---为国内中小企业出海提供技术服务。',
        p3:'我们致力于打通各国运营商的通讯资源，目前在美国、新加坡、香港均设有分公司，并领取当地的运营牌照，与世界主要发达国家的知名电信运营商建立了直达关系，覆盖全球200多个国家。在东南亚，中东，欧美具有良好的网络覆盖。',
        p4:'NXTELE云通信平台将传统复杂的电信网络通过云端开放的API方式提供给企业和开发者，为企业提供短信、智能呼叫／通话、呼叫中心、一动IM、会议、数据等六大功能服务。依托互联网，以云计算的方式，为企业客户提供通讯平台服务（PaaS）和通讯软件服务（SaaS），助理企业提升与客户的沟通效率。用更稳定的服务和更迅速的反应，向走出国门的中国企业提供适合全球商业需要的个性化，多样化，高性价比的综合通信解决方案和电信服务。',
        p5:'我们的愿景是：成为中国最大的提供出海通讯服务企业，为中国企业出海助力',
    },
    application:{
        banner:{
            cnTittle:'场景应用广泛',
            enTittle:'Extensive&nbsp;application&nbsp;scenarios',
            p:'Comprehensive support for the needs of the domestic small and medium enterprises to provide communications services',
        },
        content1:{
            title:'Electricity supplier industry',
            p1:'Promotional information global mass、 orders reminders Short Message reminder、 real-time reminder logistics status、<br>Short Message collection of customer feedback',
            p2:'Global room, to improve the speed of customer visits around the world',
            p3:'The establishment of local telephone call center, DID number binding machine, do not go abroad can also master the global customers',
        },
        content2:{
            title:'Service industry',
            p1:'Support the global number of registration verification to become a member, free trial shop Wifi, but also one-stop<br>collection of customer numbers for post-promotion',
        },
        content3:{
            title:'Emerging APP',
            p1:'Global Short Message registration verification、  real-time status Short Message push、  global member service promotion',
            p2:'The global operator room node, the time zone visit the peak of fear'
        },
        content4:{
            title:'Multinational corporations',
            p1:'Employees use the overseas number to log in to the housekeeping system and verify the information in real time',
            p2:'Green and other private data transmission, and effectively guarantee the company confidential information',
            p3:'Low cost， high quality， colleagues and colleagues can enjoy the details of the work， employees<br>and customers can contact the supply and demand at any time',
            p4:'Global conference system， multi-country parallel， with low domestic and international tariffs， up to high efficiency<br>of the multimodal call'
        }
    },
    /*login*/
    fPHeader:{
        resigerBtn:'registered',
        returnHome:'Return home page',
        findPasswordTitle:'Retrieve the password',
    },
    login:{
        loginTitle:'User login',
        usernamePlaceholder:'Please enter your email address / 国码 + mobile number',
        passwordPlaceholder:'Please enter your password',
        imgNubPlaceholder:'Image verification code',
        notSee:'Not clear?',
        forgePassword:'forget password ?',
        loginBtn:'Login',
        registerBtn:'Sign up now',
        pictureText:'用一个平台让您与世界上的任何一个人进行通信'
    },
    register:{
        resgiterTitle:'User registration',
        areaCode:'请输入国码',
        phonePlaceholder:'Please enter your mobile number',
        passwordPlaceholder:'The password consists of 8-16 digits and letters',
        emailPlaceholder:'Set mailbox',
        phoneNumberPlaceholder:'Mobile verification code',
        sendPhoneNubBtn:'Get verification code',
        checkboxRemember1:'Read and agree to the',
        checkboxRememberSpan:'"Niu letter open platform user agreement"',
        checkboxRemember2:'and related terms of service',
        registerBtn:'Sign up now',
        loginBtn:'<span>Has an account already?</span> login immediately',
        registerSuccess:{
            p1:'registration success',
            p2:'The page is about to jump to the user login',
        },
        service:{
            title:'宁波牛信网络科技有限公司 通信能力开放平台服务协议',
            content:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为使用宁波牛信网络科技有限公司（以下简称“本公司”）平台服务，您应当阅读并遵守《本公司通信能力开放平台服务协议》（以下简称“本协议”）。' +
            '在接受本协议之前，请您务必仔细阅读本协议的全部内容，特别是免除或者限制责任的条款以及管辖法院的选择条款等， 限制、免责条款可能以加粗形式提示您注意。' +
            '无论是否实际阅读本协议，您通过网络页面点击确认本协议或实际使用平台服务，均表示您与本公司方已就本协议达成一致并同意接受本协议的全部约定内容。' +
            '如果您不同意本协议的任意内容，或者无法准确理解本公司方对条款的解释，请不要同意本协议或使用本协议项下的服务。否则，表示您已接受了以下所述的条款和条件，同意受本协议约束。本协议由本公司与您签署。</br>'+
            '<p>第一条 定义</p>'+
            '1.1 本公司通信能力开放平台：是本公司提供的， 面向开发者为主的互联网合作伙伴，提供融合通信能力的开放平台。 开发者可利用平台，通过公众通信网或互联网， 向用户提供以短信通道服务、语音呼叫服务等内容为主的技术服务， 以下简称“开放平台”或“平台”。</br>' +
            '1.2API接口： API （Application Programming Interface,应用程序编程接口） 提供给开发人员的实现某一特定功能的接口，以下简称“接口”。</br>'+
            '1.3 开发者：调用平台通信能力接口进行应用开发合作的主体，包括公司和个人， 经过本公司审核通过后成为本协议的开发者，以下简称“您”。</br>'+
            '<p>第二条 服务内容</p>'+
            '本公司将通信能力以API接口的形式或者直接发送的形式提供给您调用，您根据自己的业务需要选择需要的服务，具体可选服务见网站页面。</br>'+
            '<p>第三条 服务费用</p>'+
            '3.1 服务单价</br>'+
            '3.1.1本公司将根据不同服务种类收取技术服务费用，具体费用标准以网站页面展示为准.</br>'+
            '3.1.2本公司有权根据经营需要随时变更费用标准，并提前7天公示在网站上，自公示之日起7日后生效，如您不同意变更后的费用标准应立即停止使用，继续使用将视为同意并接受变更后费用标准。</br>'+
            '3.1.3本服务的任何免费试用或免费功能和服务不应视为本公司放弃后续收费的权利。本公司有权提前7天以公告形式通知您收费标准，若您继续使用则需按平台公布的收费标准支付费用。</br>'+
            '3.2 账单服务</br>'+
            '3.2.1 本公司向您提供使用本服务的账单，并根据账单计算和收取费用。 </br>'+
            '3.3 付款方式</br>'+
            '3.3.1本协议项下技术服务费的支付主要采用预充值方式。您通过支付宝、微信、银联向您的本公司通信账户预存使用费，本公司根据您所选择的服务进行计费，按实际使用量实时扣费，本公司将根据您的预存账户余额情况进行费用预警，为了避免出现 API调用的中止或中断，您需及时补充预存费用，否则因账户余额不足而导致的一切风险及责任，均由您自行承担</br>'+
            '3.3.2未尽事宜请见官网各个通信能力服务内容及报价说明。</br>'+
            '<p>第四条 您的权利及义务</p>'+
            '4.1.1您确认，在您完成注册程序或以其他平台允许的方式实际使用服务时，您应当是具备完全民事权利能力和与所从事的民事行为相适应的行为能力的自然人、法人或其他组织。若您不具备前述主体资格，请勿使用服务，否则您及您的监护人应承担因此而导致的一切后果，且本公司有权注销（永久冻结）您的账户，并向您及您的监护人索偿。如您代表一家公司或其他法律主体进行注册或以其他平台允许的方式实际使用本服务，则您声明和保证，您有权使该公司或该法律主体受本协议“条款“的约束。</br>'+
            '4.1.2您应按照平台要求提交注册信息，并保证其提交注册信息真实、有效。您的相关注册信息发生变化时，应当在变更后10个工作日内修改相关注册信息。由于您提交虚假注册信息、提交信息不准确或未及时更新，本公司有权停止您服务，导致的任何损失或责任由您自行承担。</br>'+
            '4.1.3您承诺注册的账号名称、标识和简介等信息中不得出现违法和不良信息，不得冒充他人，不得未经许可为他人注册，不得以可能导致其他用户误认的方式注册账号，不得使用可能侵犯他人权益的用户名（包括但不限于涉嫌商标权、名誉权侵权等），否则本公司有权不予注册或停止服务并收回账号，因此产生的损失由您自行承担。</br>'+
            '4.1.4您了解并同意，注册账号所有权归属于本公司，注册完成后，您仅获得账号使用权。账号使用权仅归属于初始申请注册人，不得以任何方式转让或被提供予他人使用，否则，本公司有权立即不经通知收回该账号，由此带来的因您使用本服务产生的全部数据、信息等被清空、丢失等的损失，您应自行承担。</br>'+
            '4.1.5在您成功注册后，本公司将根据账号和密码确认您的身份。您应妥善保管您的终端及账户和密码，并对利用该账户和密码所进行的一切活动负全部责任。您承诺，在密码或账户遭到未获授权的使用，或者发生其他任何安全问题时，将立即通知平台，且您同意并确认，本公司不对上述情形产生的任何直接或间接的遗失或损害承担责任。除非有法律规定或司法裁定，且征得本公司的同意，否则，您的账户、密码不得以任何方式转让、赠与或继承（与账户相关的财产权益除外）。</br>'+
            '4.1.6您了解并同意，如您注册账号后连续超过12个月未登录，本公司为网站优化管理之目的有权回收该账号，相关问题及责任均由您自行承担。</br>'+
            '4.1.7本公司根据本协议收回或取消账号后，有权自行对账号相关内容及信息以包括但不限于删除等方式进行处理，且无需就此向用户承担任何责任。</br>'+
            '4.1.8短信合作协议有效期为1年，协议到期后，您应使用完毕已购买的短信或者缴纳未支付的短信费用。如您在中断服务后重新签订协议，则重新签订协议后订购的短信为有效期内短信。 </br>'+
            '4.1.9在协议解除归责于本公司的情况下，本公司将短信套餐费用的余额退还甲方，在其他情况下解除的，本公司不予退还短信费用。</br>'+
            '4.2入驻和开通服务</br>'+
            '4.2.1入驻：您需注册本公司，并根据平台要求提交相关资料，方可完成开发者入驻，入驻成功即自动开户。</br>'+
            '4.2.2开通服务：您需选择、申请相应的通信能力API调用权限，并确认相应的服务条款，在审核通过获得相应通信能力权限后，您可登陆管理控制台进行服务管理等操作。</br>'+
            '4.3使用规范</br>'+
            '4.3.1您应当具备使用本服务的相关资质，您使用通信能力接口用于应用开发的，应同时具备相关开发的资质以及该应用提供服务应当具备的资质，并具备履行其基于本协议项下之义务的能力，您保证履行相关义务不违反任何对其有约束力的法律文件。您自行负责其应用的创作、开发、编辑、加工、修改、测试、运营及维护，并且自行承担相应的成本。</br>'+
            '4.3.2您在使用平台服务时，必须遵守中华人民共和国相关法律法规的规定，您承诺将不会利用本服务进行任何违法或不正当的活动，否则本公司有权停止向您提供服务。包括但不限于：</br>'+
            '· 反对宪法所确定的基本原则的；</br>'+
            '· 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</br>'+
            '· 损害国家荣誉和利益的；</br>'+
            '· 煽动民族仇恨、民族歧视，破坏民族团结的；</br>'+
            '· 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</br>'+
            '· 侮辱或者诽谤他人，侵害他人合法权益的；</br>'+
            '· 未经他人同意传递商业等信息；</br>'+
            '· 从事欺诈或诈骗行为的；</br>'+
            '· 含有法律、行政法规禁止的其他内容的。</br>'+
            '· 本公司认为属于不正当的活动。</br>'+
            '4.3.3您应采取有效措施，防止黑客攻击、盗用密码、非法调用页面等危害通信业务信息安全的非法行为。您应妥善保管使用本服务的接口、账号密码并保证自用终端和网络的安全性，使用账号密码从事的一切行为均视为您的行为，因账号密码丢失或被盗以及网络不安全产生的后果由您自行承担。</br>'+
            '4.3.4您保证不得以任何方式或企图修改或干扰平台或其他本公司网站及系统以及本公司提供给您的网站、系统或代码的任何部分、功能。您违反上述条款，本公司有权根据其情节，对您实施警告、限制服务、应用下线、应用删除、中止或终止服务等措施。</br>'+
            '4.3.5您对自己在使用平台服务过程中的行为及与其客户之间的权利义务承担法律责任，您自主开发、独立运营其应用成果，本公司不参与您应用的运营活动，您应依法进行应用的运营活动并独立承担相应的法律责任。您违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，您同意赔偿本公司及其关联公司和合作公司，并使之免受损害。</br>'+
            '4.3.6您应满足本公司对接口的各项技术和商务规范要求。</br>'+
            '4.3.7您不得将本协议服务、接口、数据等全部或部分出售或进行任何利益交换行为，也不得向任何第三方转借、转租或转授权等。</br>'+
            '4.3.8您同意遵守本公司制定的平台规则、规范等，并根据所选择服务遵守相应的附件中的使用规范。</br>'+
            '4.3.9除符合适用法律的基本规定之外，本公司应用或服务未经用户同意不得擅自收集用户数据，不得违反法律或约定超出范围使用用户数据，应向用户提供隐私保护政策。</br>'+
            '4.3.10您同意和理解：</br>'+
            '· 1）本平台融合通信能力开放均基于运营商能力和资源，由于通信能力、系统、网络和资源的不确定性，平台尽可能的维护能力的安全稳定，但对此不做任何保证；</br>'+
            '· 2）您自主开发、独立运营其应用成果，平台不参与您应用的运营活动，您应依法进行应用的运营活动并独立承担相应的法律责任。</br>'+
            '4.3.11您开发的应用及服务应当重视用户体验，尊重用户知情权、选择权，应用服务应当坚持诚信原则，不误导、欺诈、混淆用户，尊重用户的隐私，不骚扰用户，不制造垃圾信息。如果因违反本条给用户造成的损害赔偿，应由您独立承担，若由此给平台造成任何损失的，您应当承担赔偿责任。平台有权自行判断和决定您的应用是否违反本协议约定、平台规则规范或侵犯用户合法权益，并对应用作出包括但不限于中止、限制或终止服务的处罚。</br>'+
            '4.3.12除符合适用法律的基本规定之外，使用者应用或服务需要收集用户数据的应当符合以下条件：</br>'+
            '· 使用者的应用或服务需要收集用户数据的，必须事先获得用户的授权，且仅可以收集为应用程序运行及功能实现目的而必要的用户数据。使用者应当告知用户相关数据收集的目的、范围及使用方式，保障用户知情权；</br>'+
            '· 使用者应当就其应用向用户提供隐私保护政策，告知用户该应用收集哪些用户数据，如何使用，是否会将用户数据传播或提交他人等，保障用户的知情权及选择权。隐私政策在应用的界面上应当显示给用户；</br>'+
            '· 使用者应当向用户提供修改、删除用户数据的方式，确保用户要求删除其用户数据时可通过该方式自行操作完成，并确保相关数据被完全删除；</br>'+
            '· 使用者不得收集用户的隐私信息数据及其他平台认为属于敏感信息范畴的数据，包括但不限于不得收集或要求用户提供任何账号、密码，不得搜集或要求用户提供用户关系链、好友列表数据等；</br>'+
            '· 使用者应当仅获取为应用程序运行及功能实现目的必要的数据；使用者在特定应用中收集的用户数据仅可以在该特定应用中使用，不得将收集的用户数据转移或使用在该特定应用之外</br>'+
            '· 未经平台授权，使用者不得使用平台提供的数据作为自身资源进行其它商业行为，包括但不限于收集、分享及对外宣传等；</br>'+
            '· 使用者不得以任何形式将平台数据提供给任何非平台的第三方使用，使用者不得将用户数据出售、转让等；</br>'+
            '· 如果平台认为使用者使用用户数据的方式，会损害用户体验，平台有权要求您删除相关数据并不得再以该方式使用用户数据；</br>'+
            '· 平台在您违反协议时有权限制或阻止您获取用户数据及平台数据；</br>'+
            '· 使用者应当遵守平台关于用户数据的其他管理规则。</br>'+
            '4.3.13平台运营数据的全部权利，均归属本公司。未经本公司事先书面同意，您不得为本协议约定目的外使用相关数据；</br>'+
            '4.3.14一旦您停止使用平台或平台基于任何原因终止对您开放平台的服务，您必须立即停止使用并删除从平台中获得的全部服务和数据。</br>'+
            '4.3.15您不得违约或违法使用平台的所有资源；您不得向任何单位或个人出售、转让、转授权平台的代码、API接口（Application Programming Interface,应用程序编程接口）、开发工具以及其他平台服务资源等；您仅拥有依照本协议约定合法使用平台各项服务的权利。</br>'+
            '4.3.16您不得利用平台从事以下活动：</br>'+
            '· 未经允许，进入受保护的计算机信息网络或者使用计算机信息网络资源的；</br>'+
            '· 未经允许，对计算机信息网络功能进行删除、修改或者增加的；</br>'+
            '· 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</br>'+
            '· 故意制作、传播计算机病毒等破坏性程序的；</br>'+
            '· 其他危害计算机信息网络安全的行为。</br>'+
            '<p>第五条 平台权利义务</p>'+
            '5.1平台如遇网络或系统维护或升级，需要暂停服务或要求您做出配合的，应当提前1个工作日告知您；</br>'+
            '5.2本公司向您提供可以实现统计查询、账单、详细话单、短信发送状态、呼叫状态等功能服务；</br>'+
            '5.3本公司有权对平台进行修改、升级等各项操作，并有权制定并修改平台及服务规范，规范一经发布在本公司及其关联公司网站上即构成本协议的一部分，您应当予以遵守，否则您应当停止使用本服务，本协议自动终止。</br>'+
            '5.4本公司有权为预防、发现和调查欺诈、危害安全、非法或违反与您或其关联公司协议、政策或规则的行为对您服务进行检查监督。本公司有权根据最终用户或第三方的投诉以及本公司对您服务的监督检查，自行决定您及其客户是否利用本服务从事不正当活动，并以此中止或终止向您提供服务。</br>'+
            '5.5本公司有权在必要时变更部分或全部的服务功能，如功能变更可能引起日常服务的中断或终止，本公司应当通知您，并尽快完成基本功能的修复。您可以选择继续使用调整后的服务功能，或终止使用平台服务。</br>'+
            '5.6 本公司有权根据中国法律法规的调整、行政执法机关的命令和社会伦理道德的变化调整平台服务的标准。</br>'+
            '5.7在适用法律所允许的最大范围内，平台有权对整个平台用户数据库进行分析并将用户数据库用于其他用途，包括但不限于对用户数据进行用户行为分析以及一系列的用户数据挖掘和数据深度分析。</br>'+
            '5.8 平台有权在必要时变更部分或全部的服务功能，如功能变更可能引起日常服务的中断或终止，本公司应当在变更一个月之前事先通知您，并尽快完成基本功能的修复。您可以选择继续使用调整后的服务功能，或终止使用平台服务。</br>'+
            '5.9您的应用及您所从事的经营业务不得对本公司及其关联公司的利益构成任何现实或潜在的损害或冲突，否则本公司有权立即通知您并终止平台向使用者提供的所有服务，而无需承担任何法律责任和费用补偿，同时本公司保留追究您相应责任的权利。</br>'+
            '<p>第六条 保密条款</p>'+
            '6.1本协议所称保密信息，是指一方（以下简称“接受方”）从对方（以下简称“披露方”）取得的、获知的、或因双方履行本协议而共同创造且具有不可分割性的商业秘密（包括财务秘密）、技术秘密、经营诀窍和（或）其他应予保密的信息和资料，无论上述信息和资料以何种形式或载于何种载体，无论披露方在披露时是否以口头、图像或书面等方式表明其具有保密性。</br>'+
            '6.2本协议有效期内及其终止后五年内，任何一方均不应向任何第三方披露、泄漏或提供保密信息。</br>'+
            '6.3甲乙双方应采取适当措施妥善保存对方提供的保密信息，措施的审慎程度不少于其保护自身的保密信息时的审慎程度。甲乙双方仅能将保密信息用于与本协议项下的有关用途或目的。</br>'+
            '6.4双方保证保密信息仅可在各自一方从事该业务的负责人和雇员范围内知悉。在双方上述人员知悉该保密信息前，应向其提示保密信息的保密性和应承担的义务，并以可证明的方式表明上述人员确实承担本协议项下的保密责任。</br>'+
            '6.5如确有必要，接受方应按照保密信息披露方的指示将含有保密资料的所有文件或其他资料归还给披露方，或按其指示予以销毁。</br>'+
            '6.6本条上述限制条款不适用于以下情况：</br>'+
            '· 在签署本协议之时或之前，该保密信息已以合法方式属接受方所有；</br>'+
            '· 保密信息在通知给接受方时，已经公开或能从公开领域获得；</br>'+
            '· 保密信息是接受方从与其没有保密或不透露义务的第三方获得的；</br>'+
            '· 在不违反本协议项约定责任的前提下，该保密信息已经公开或能从公开领域获得；</br>'+
            '· 该保密信息是接受方或其关联或附属公司独立开发，而且未从通知方或其关联或附属公司获得的信息中获益；</br>'+
            '· 接受方应法院或其它法律、行政管理部门要求披露的信息（通过口头提问、询问、要求资料或文件、传唤、民事或刑事调查或其他程序）因而透露保密信息，在该种情况发生时，接受方应立即向披露方发出通知，并作出必要说明。</br>'+
            '6.7甲乙双方亦对本协议的具体内容负有保密责任。</br>'+
            '6.8甲乙双方为了履行本协议而进行的沟通、通知、告知等文件传递或文件交换，应由双方妥善保存，不得用于不利于双方开展业务的目的。双方不得诋毁诽谤对方，亦不得在公开场合以攻击对方为目的发布不利于双方的言论。</br>'+
            '<p>第七条 知识产权</p>'+
            '7.1平台上所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计，均由本公司或其他权利人依法拥有其知识产权。非经本公司或其他权利人书面同意任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表平台程序或内容。</br>'+
            '7.2未经本公司同意，您不得擅自使用您或其关联公司的商标、名称以及本公司相关商标及其标识。</br>'+
            '7.3开发者独立开发的应用的知识产权归其该所有人所有；权利人同意授予本公司及其关联公司在全球范围内享有免费的、永久性的、不可撤消的、非独家的、可转让、可分许可的许可，许可本公司应用开发平台使用、调用、演示产品等。该许可不受双方合作终止以及本协议终止的影响。</br>'+
            '7.4本协议项目合作涉及的系统、代码、数据、品牌等，均由双方各自依法拥有知识产权，未经权利拥有一方的书面同意，另一方不得擅自使用、修改、复制、公开传播、发行，否则，权利拥有一方有权立即终止本协议并要求对方赔偿全部损失（包括但不限于调查取证费用、公证费用、律师费等）。</br>'+
            '7.5您不得将本公司基于本项目合作开放的技术接口、源代码及算法等进行反向工程、反汇编、重构、反编译、翻译、修改、复制，或者在未经明确允许的情况下创作衍生作品。</br>'+
            '<p>第八条 免责条款</p>'+
            '8.1您充分理解，使用本公司的通信通道涉及到因特网、电信运营商的网络服务，可能会受到各个环节不稳定因素的影响，因此您同意，对因停电、计费系统故障、传输线路故障、通信故障及通信线路故障、检修升级、计算机错误或病毒、黑客攻击、信息损坏、数据丢失或其它在本公司合理控制范围之外的原因所造成的中断、延迟或停顿等服务问题，本公司不承担责任；为防止发生意外，请您不要仅依靠网络作为重要情况下使用的唯一通信工具，对于您利用本公司服务开展活动而造成的损失，双方同意本公司不向您或任何第三方承担责任。</br>'+
            '8.2本公司有权定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成网络服务在合理时间内的中断或暂停，本公司无需为此承担任何责任。</br>'+
            '8.3如发生下述任一情况而导致服务中断及您损失的，本公司不承担责任：</br>'+
            '· 发生不可抗力情形的；</br>'+
            '· 黑客攻击、计算机病毒侵入或发作的；</br>'+
            '· 计算机系统遭到破坏、瘫痪或无法正常使用的；</br>'+
            '· 因政府管制而造成中止或终止服务的；</br>'+
            '· 其它非因本公司的过错而引起的。</br>'+
            '8.4在任何情况下，本公司均不就因使用本公司平台提供的服务所发生的任何间接性、后果性、惩戒性、偶然性、特殊性的损害，包括您使用本公司平台服务而遭受的利润损失承担责任（即使您已事先被告知该等损害发生的可能性）。</br>'+
            '<p>第九条 不可抗力</p>'+
            '因不可抗力或者其他意外事件，使得本协议的履行不可能、不必要或者无意义的，遭受不可抗力、意外事件的一方不承担责任。不可抗力、意外事件是指不能预见、不能克服并不能避免且对一方或双方当事人造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行等以及社会事件如战争、动乱、政府行为、电信主干线路中断、黑客、网路堵塞、电信部门技术调整和政府管制等。</br>'+
            '<p>第十条 协议的终止</p>'+
            '10.1如您违反本协议约定或平台规则、规范时，本公司有权随时暂停或终止向您提供平台服务。如您后续再直接或间接或以他人名义注册并登录平台的，本公司有权直接单方面暂停或终止提供本协议下服务。</br>'+
            '10.2如本协议服务终止，本公司有权保留或删除您账号中的任何信息和全部相关数据，包括服务终止前您尚未完成的任何数据。</br>'+
            '10.3因法律法规或政策原因导致平台业务无法继续运营的，双方合同自动解除，互不承担违约责任。</br>'+
            '10.4由于客观原因，致使您不能使用服务时，本公司不承担任何责任，包括但不限于</br>'+
            '· 自然灾害，如台风、洪水、冰雹等；</br>'+
            '· 政府行为，如征收、征用等；</br>'+
            '· 社会异常事件，如罢工、骚乱等；</br>'+
            '· 计算机病毒或黑客攻击、互联网络、通信线路等原因造成服务中断。</br>'+
            '10.5鉴于通信服务的特殊性和不可控性，本公司可能随时中断或终止部分或全部的服务。如出现以上情形，除本协议所述不可抗拒因素外，本公司将以合理的方式通知您。</br>'+
            '<p>第十一条 违约责任</p>'+
            '11.1任何一方未履行本协议项下的任何一项条款均被视为违约。违约方应按照本协议的相关约定，依法承担相应的违约责任。</br>'+
            '11.2除本协议另有约定外，任何一方违反其于本协议项下的陈述、承诺、保证或义务，而使另一方遭受任何诉讼、纠纷、索赔、处罚等的，违约方应负责解决，使另一方发生任何费用、额外责任或遭受经济损失的，应当负责赔偿。如一方发生违约行为，守约方可以书面通知方式要求违约方在指定的时限内停止违约行为，要求其消除影响。如违约方未能按时停止违约行为，则守约方有权立即终止本协议。</br>'+
            '11.3如果因您违反本协议，而导致任何其他第三方遭受任何损失并引起纠纷，且该等纠纷解决的结果最终导致本公司承担了任何责任，则您全额赔偿本公司受到的损失和本公司已经垫付的费用。涉及第三方纠纷时,本公司应及时知会您,双方共同协商,本着友好互谅的原则进行处理。</br>'+
            '<p>第十二条 争议解决</p>'+
            '本协议履行中若发生争议，双方应当本着互谅互让的原则，协商解决。协商不成的，任何一方均有权向宁波市鄞州区人民法院提起诉讼。</br>'+
            '第十三条 协议的生效、续签及其他</br>'+
            '13.1本协议内容包括协议正文及所有本公司已经发布的或将来可能发布的平台相关规则。上述规则为本协议不可分割的一部分，与本协议正文具有同等法律效力</br>'+
            '13.2双方未行使或未执行本协议任何权利或规定，不构成对前述权利之放弃。</br>'+
            '13.3本协议项下本公司对开发者所有的通知均可通过网页公告、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人</br>'+
            '13.4本协议如有的调整和更新会提前7天在本网站做网页公告，如果您不接受更新后的内容，可以在7天之内邮件或书面告知平台并履行终止服务相应的责任。如果7天之内平台未收到终止服务的申请，默认您同意协议的调整和更新。</br>'+
            '13.5若本协议中部分条款因任何原因而被认定无效，此种无效条款并不影响其他条款的有效性，且此种无效条款应自始视为不存在。</br>'+
            '13.6本公司有权根据业务调整情况将本协议项下的全部权利义务一并转移给其关联公司，转让将以本协议规定的方式通知您。</br>'+
            '13.7协议终止后，有关知识产权、数据信息保密的条款不因协议的终止而终止。</br>'

        }
    },
    fPStep1:{
        step1Title:'Please fill in your account number',
        phonePlaceholder:'请输入您注册时的国码+手机号',
        imgNubPlaceholder:'please enter verification code',
        notClear:'Not clear?',
        nextBtn:'Next step',
        title:'Confirm account'
    },
    fPStep2:{
        step2Title1:'The verification code has been sent to your mobile phone with a tail number of ',
        step2Title2:'Please pay attention',
        phoneCodePlaceholder:'please enter verification code',
        reSend:'Resend',
        nextBtn:'Next step',
        title:'SMS verification',

    },
    fpStep3:{
        passwordPlaceholder:'The password consists of 8-16 digits and letters',
        newPasswordPlaceholder:'Please enter your password again',
        nextBtn:'Next step',
        title:'Reset password'

    },
    fpStep4:{
        successMessage: 'Password reset succeeded!',
        resigterBtn: 'login immediately',
        title:'Complete reset'
    },

    /*console*/
    consoelHeader:{
        li1:{cn:'我的账号',en:'My    Account'},
        li2:{cn:'开发文档',en:'Develop    document'},
        li3:{cn:'牛信首页',en:'Home    Page'},
    },

    menulist:[
        {
            id: 0,
            menu_name: 'Administration',
            menu_img: 'administration.png',
            active_img: 'administration2.png',
            hidden: true,
            children: [
                {
                    menu_tile:'Console',
                    menu_name: 'Console home page',
                    menu_path: 'home',
                    icon:'icon-home.png',

                },
                {
                    menu_tile:'Application management',
                    menu_name: 'Application list',
                    menu_path: 'application_list',
                    icon:'icon-application.png',
                },
                {
                    menu_name: 'Create application',
                    menu_path: 'new_application/:null',
                    icon:'icon-establish.png',
                },
                {
                    menu_tile:'Short Message signature',
                    menu_name: 'Signature list',
                    menu_path: 'signature_list',
                    icon:'icon-autographList.png',
                },
                {
                    menu_name: 'Create new signature',
                    menu_path: 'new_signature/:null',
                    icon:'icon-pen.png',
                },
                {
                    menu_tile:'Short Message template',
                    menu_name: 'Template list',
                    menu_path: 'template_list',
                    icon:'icon-template.png',
                },
                {
                    menu_name: 'Create new template',
                    menu_path: 'new_template/:null',
                    icon:'icon-template2.png',
                },
                {
                    menu_tile:'Send Message',
                    menu_name: 'WEB send Message',
                    menu_path: 'sms_sending',
                    icon:'icon-web.png',
                },


            ]
        },
        {
            id: 1,
            menu_name: 'Finance',
            hidden: true,
            menu_img: 'finance.png',
            active_img: 'finance2.png',
            children: [
                {
                    menu_tile:'Financial information',
                    menu_name: 'Monthly bill',
                    menu_path: 'monthly_bill',
                    icon:'icon-bill.png',

                },
                {
                    menu_tile:'Recharge service',
                    menu_name: 'User recharge',
                    menu_path: 'recharge_step1',
                    icon:'icon-recharge.png',

                },
                {
                    menu_name: 'Recharge list',
                    menu_path: 'recharge_list',
                    icon:'icon-recharge2.png',

                },
                {
                    menu_tile:'Invoice service',
                    menu_name: 'Invoice request',
                    menu_path: 'invoice_request/:null/:null',
                    icon:'icon-invoice.png',
                },
                {
                    menu_name: 'Billing record',
                    menu_path: 'billing_list',
                    icon:'icon-invoice2.png',
                },
            ]
        },
        {
            id: 2,
            menu_name: 'Statistics',
            hidden: true,
            menu_img: 'statistics.png',
            active_img: 'statistics2.png',
            children: [
                {
                    menu_tile:'Bill statistics',
                    menu_name: 'Year bill statistics',
                    menu_path: 'chart_statistics/:0',
                    icon:'icon-years.png',

                },
                {
                    menu_name: 'Monthly billing statistics',
                    menu_path: 'chart_statistics/:1',
                    icon:'icon-month.png',

                },
                /*{
                 menu_name: 'Apply billing statistics',
                 menu_path: 'chart_statistics/:2',
                 icon:'icon-appliationbill.png',

                 },*/
                {
                    menu_tile:'Report statistics',
                    menu_name: 'Day Short Message Detail Report',
                    menu_path: 'day_message',
                    icon:'icon-day.png',

                },
                {
                    menu_name: '队列报表',
                    menu_path: 'queue_list',
                    icon:'icon-day.png',

                },
                {
                    menu_name: 'SMS record query',
                    menu_path: 'message_list',
                    icon:'icon-appliationbill.png',
                },
            ]
        },
        {
            id: 3,
            menu_name: 'User',
            hidden: true,
            menu_img: 'user.png',
            active_img: 'user2.png',
            children: [
                {
                    menu_tile:'Account management',
                    menu_name: 'Basic information',
                    menu_path: 'basic_information',
                    icon:'icon-information.png',

                },
                {
                    menu_name: 'Authentication information',
                    menu_path: 'auth_information',
                    icon:'icon-information2.png',

                },
                {
                    menu_name: 'Change password',
                    menu_path: 'console_change_password',
                    icon:'icon-password.png',

                },
                {
                    menu_tile:'Price inquiry',
                    menu_name: 'Short Message price inquiry',
                    menu_path: 'consoel_price_search',
                    icon:'icon-message.png',

                },
            ]
        },

    ],

    //console home
    conHome:{
        leftTitle1:'Account information',
        leftPrice:{
            samllTitle:'Account balance(yuan)',
            recharge:'Recharge record',
            invoice:'Draw a bill',
            p1:'Vouchers',
            unit:"yuan",
            rechargeBtn:'Recharge',
            balanceBtn:'Balance',
            surplus:'余额提醒',

        },
        status:{
            title:'Niu letter certification status',
            btn1:'Not certified',
            btn2:'In the certification',
            btn3:'Certified',
        },
        parameter:{
            title:'Access parameter:',
            p1:'ACCOUNT SID:',
            p2:'AUTH TOKEN:',
            p3:'Rest URL:'
        },
        static:{
            title:'Data statistics',
            smallTitle:'The data of yesterday',
            p1:'Total spending',
            unit1:'yuan',
            p2:'send messages',
            unit2:'Strip'
        },
        chart:{
            title:'Last month data',
            yTitle:"yuan",
            day:'day',
        },
        remind:{
            title:'提醒金额',
            btn1:' 提  交 ',
            btn2:' 返  回 ',
        }

    },
    auth:{
        title:'Authentication information',
        span1:'Certified account：',
        span2:'Current authentication status：',
        status:{
            btn1:'Not certified',
            btn2:'In authentication',
            btn3:'Has been dismissed',
            btn4:'Personal developer',
            btn5:'Enterprise developer',
        },
        person:{
            title:'Personal identification',
            p1:'Personal developer',
            btn1:'Apply for personal certification',
            btn2:'View details',
            p2:'* Can apply for application on the line, the official commodity products',
        },
        company:{
            title:'Business license',
            p1:'Enterprise developer',
            btn1:'Apply for enterprise certification',
            btn2:'View details',
            p2:'* Can apply for application on the line, and after the application on-line can enjoy the second on-line service',
        }
    },
    personAuth:{
        title:'Personal developer certification',
        count:'Certified account：',
        reject:'Turn down the cause：',
        realName:'Real name：',
        span1:'After the authentication is successful, it defaults as an invoice',
        type:'Type of certificate：',
        radio1:'ID card',
        radio2:'Passport',
        nub:'Identification number：',
        img:'ID photo：',
        lookBtn:'Browse',
        span2:'请上传真实有效的身份证及护照扫描件、照片的正面,确保证件内容清晰可见，文件仅支持2M以内的jpg， jpeg， png或gif',
        saveBtn:'Save',
        cancelBtn:'Return',
        editBtn:'Edit',
        //图片
        p1:'Please note:',
        p2:'The following information in the photo must be true',
        p3:'and clearly visible',
        p4:'1.Hand hold the facial features of the officer',
        p5:'2.All information on the ID card',
    },
    companyAuth:{
        title:'Enterprise developer certification',
        count:'Certified account：',
        reject:'Turn down the cause：',
        companyName:'Company name：',
        span1:'After the authentication is successful, it defaults as an invoice',
        adress:'Company registered address：',
        span2:'The company address must be the same as the business license',
        business:'Business license account：',
        span3:' digits',
        photo:'Business license photo：',
        lookBtn:'Browse',
        span4:'Copy the original or stamp copy, take pictures after uploading, the file only supports less than 2M jpg, jpeg, png or gif, Mac Apple users please use firefox Firefox browser to upload, you can also contact the customer to help upload',
        saveBtn:'Save',
        cancelBtn:'Return',
        editBtn:'Edit',
    },
    base:{
        title:'Basic information',
        span1:'Register e-mail：',
        span2:'Registered mobile phone number：',
        span3:'QQ account:',
        span4:'Contact address:',
        span5:'Other contacts:',
        span6:'In case of emergency can not be linked to the initial registration number, we will contact you with the emergency contact, please fill out.',
        changeBtn:'Modify',
        editBtn:'Edit',
        saveBtn:'Save',
        phone:{
            title:'Modify the phone',
            p1:'New phone number will replace the old phone number, the relevant message will be changed after the success of the new phone',
            span1:'New mobile phone number',
            inputP:'Please enter mobile phone number',
            areCode:'请输入国码',
            span2:'Short Message verification code：',
            inputP2:'please enter verification code',
            getMessage:'Obtain Short Message verification code',
            sureBtn:'Determine',
            cancelBtn:'Cancel',
        },
        email:{
            title:'Modify email',
            p1:'In the process of changing the mailbox, only the new mailbox is re-certified to enable, not verified before using the old mailbox login',
            span1:'New email：',
            inputP:'Please enter the email account number',
            span2:'E-mail verification code：',
            inputP2:'please enter verification code',
            getMessage:'Send email verification link',
            p3:'Please go to your new mailbox for a verification link and click on the link to verify',
            sureBtn:'Determine',
            cancelBtn:'Cancel',
        },
    },
    ChangePS:{
        title:'Change password',
        span1:'Original password',
        span2:'New password ：',
        span3:'Confirm the new password :',
        span1_1:'Please enter your current password',
        span2_1:'Please enter a new password by 8-16 digits and letters',
        span3_1:'Please enter the new password again :',
        saveBtn:'Save',
    },
    conPrice:{
        title:'Short Message price inquiry',
        inputP:'Country code / name',
        searchBtn:'inquiry',
        table:{
            th1:'Country name',
            th2:'Country code',
            th3:'price',
            td1:'Operator name',
            td2:'Section No.',
            td3:'price',
        }
    },
    signatureList:{
        title:'Signature list',
        new:'Create new signature',
        table:{
            th1:'Signature ID',
            th2:'Signature content',
            th3:'Application time',
            th4:'Audit status',
            th5:'Operate',
            td_a1:'View',
            td_a2:'Modify',
            td_a3:'Delete'
        },
        detail:{
            title:'Signature details',
            span1:'Signature Key：',
            span2:'Signature content：',
            span3:'Approval status：',
            span4:'Application time：',
            span5:'Approver：',
            span6:'Approval time：',
            span7:'审批结果：',
            returnBtn:'Return'
        }
    },
    appList:{
        title:'Application list',
        new:'New application',
        table:{
            th1:'Application name',
            th2:'AppKey',
            th3:'Product service',
            th4:'Status',
            th5:'Operate',
            td_a1:'Set up',
            td_a2:'View',
            td_a3:'Test',
            td_a4:'Report form',
            td_a5:'Delete'
        },
        detail:{
            title:'Application details',
            span1:'Application name：',
            span2:'Product service：',
            span3:'Approval status：',
            span4:'AppKey：',
            span5:'Appsecret：',
            span6:'Approval result description：',
            span7:'Approver：',
            returnBtn:'Return'
        }
    },
    templateList:{
        title:'Template list',
        new:'Create new template',
        type0:"验证码短信",
        type1:"通知短信",
        type2:"推广短信",
        table:{
            th1:'Template ID',
            th2:'Template type',
            th3:'Template name',
            th4:'Template content',
            th5:'Application time',
            th6:'Audit status',
            th7:'Operate',
            td_a1:'View',
            td_a2:'Modify',
            td_a3:'Delete'
        },
        detail:{
            title:'Template details',
            span1:'Template type',
            span2:'Template name',
            span3:'Approval status',
            span4:'Template content',
            span5:'Approver',
            span6:'Application time',
            span7:'Approval time',
            span8:'Approval result description',
            span9:'template content description',
            returnBtn:'Return'
        }
    },
    billList:{
        title:'Billing record',
        table:{
            th1:'Application time',
            th2:'Invoice amount (yuan)',
            th3:'Invoice type',
            th4:'Status',
            th5:'Courier services company',
            th6:'Courier number',
            th7:'Operate',
            td_a1:'View',
            td_a2:'Resume',
        },
        detail:{
            title:'Billing details',
            span1:'Billing name',
            span2:'Product service',
            span3:'Approval status',
            span4:'AppKey',
            span5:'Appsecret',
            span6:'Approval result description',
            span7:'Approver',
            returnBtn:'Return'
        },
        type0:'Ordinary invoice',
        type1:'VAT invoice',
        status0:'Request',
        status1:'Examination passed',
        status2:'Review rejected',
        status3:'The invoice has been sent',
    },
    MSG: {
        SYSTEM: 'Can not connect to the server, please check your network!',
        //login registration prompt
        USER_001: 'User name can not be empty',
        USER_002: 'Sorry, the phone is out of format',
        USER_003: 'Sorry, the email format is wrong',
        USER_004: 'Password can not be empty',
        USER_005: 'The verification code cannot be empty',
        USER_006: 'Verification code error',
        USER_007: 'Picture loading failed, change one',
        USER_008: 'E-mail can not be empty',
        USER_009: 'The phone can not be empty',
        USER_010: 'Sorry, the password format is not correct',
        USER_012: 'Sorry, the format of the verification code is wrong',
        USER_013: 'Validation failed. Please try again later',
        USER_014: 'Congratulations on your successful registration!',
        USER_015: 'Sorry, the password is inconsistent!',
        USER_016: 'Sorry, 国码不能为空!',
        USER_017: '对不起，证件号格式不正确',
        USER_018: '对不起，文件过大！请上传2M以内的图片',

        //priceSearch
        PRICE_001: 'The query condition can not be empty!',
        PRICE_002: 'No data!',
        PRICE_003: 'No exchange rate!',

        //console iformation
        SAVE_SUCESS: 'Save successfully',
        USER_SEND_SUCESS: 'Send successfully!',
        DELETE_SUCESS:'Delete successfully',

        //console price
        CON_PRICE_001: 'All data is required, please check the information!',

        // console change password
        CHANGE_PASSWORD_001: 'The original password can not be empty!',
        CHANGE_PASSWORD_002: 'New password can not be empty!',
        CHANGE_PASSWORD_003: 'Make sure the new password is not empty!',
        CHANGE_PASSWORD_004: 'Enter the new password is inconsistent!',
        CHANGE_PASSWORD_005: 'New password format is incorrect, combined by 8-16 digits and letters!',



        /*************/
        RECHARGE_001:'Recharge amount can not be empty!',
        RECHARGE_002:'Please choose a payment method!',
        RECHARGE_003:'Amount is wrong format!',

        SIN_01:'Application is not online, can not submit template',
        SIN_02:'ID exists',
        SIN_03:'Content is too long',

        TEM_01:'Please fill in the template name',
        TEM_02:'Please select Short Message signature',

        IMG_01:'No pictures uploaded!',
        SMS_01:'Once the template is selected, the signature can not be used',
        SMS_02:'号码数量不能最多为1万个！',

        NEWAPP_01:'Length limit 2 - 10 words',

        APP_01:"Please choose a product service!",
        APP_02:"Application name can not be empty!",
        APP_03:"Whitelist input format is incorrect!",
        APP_04:"Application name length limit 2-10 words!",

        SIN_01:'Please select a attribution application',
        SIN_02:'The signature ID can not be empty',
        SIN_03:'Signature content cannot be empty',
        SIN_04:'Not certified, please go to certification!',
        SIN_05:'Submit the signature to be charged up to 500 yuan',
        SIN_06:'Signature name length limit 2-10 characters',
        SIN_07:'Account is in the certification, can not operate!',

        TEM_01:'Please select a text message signature',
        TEM_02:'Template name can not be empty!',
        TEM_03:'Template content can not be empty!',
        TEM_04:'Please select a template type!',

        INV_01:'The amount is incorrect, check the amount based on the invoice description!',
        INV_02:'This account is a personal account, can apply for an ordinary invoice> 200 yuan and <remaining billing amount',
        INV_03:'This account is a personal account and can not apply for VAT invoices',
        INV_04:'This account is a corporate account, you can apply for an ordinary invoice> 200 yuan and <remaining billing amount',
        INV_05:'This account is a corporate account, you can apply for value-added tax invoices> 1,000 yuan and <remaining billing amount',
        INV_06:'The remaining billing amount of less than 200 yuan',
        INV_07:'The remaining billing amount of less than 1,000 yuan',

        SMS_01:'Send number can not be empty!',
        SMS_02:'Send the number format is not correct, comma is comma in English!',
        SMS_03:'Please select an application',
        SMS_04:'上传文件失败，请重新上传',
        SMS_05:'上传成功！',
        SMS_06:'发送成功！',
        SMS_07:"每次发送的号码数量不能超过一万个",

        WX_01:'Payment not completed, please continue to pay!',
    },
    RMSG:{
        '-1':'Internal Error',
        common_01: 'Method does not support',
        domain_01: 'Organization already exists',
        group_01: 'The user group already exists',
        group_02: 'The user group does not exist',
        group_03: 'Leaf nodes have no path',
        group_04: 'User exists under user group',
        usersetting_01: 'Password error',
        usersetting_02: 'User does not exist',
        operator_01: 'Group does not exist',
        operator_02: 'User already exists',
        operator_03: 'User does not exist',

        operator_04: 'The phone number has been registered',
        operator_05: 'The email has been registered',

        customer_01: 'The customer group does not exist',
        customer_02: 'The customer already exists',
        customer_03: 'The customer does not exist',
        menu_01: 'The menu already exists',
        menu_02: 'The menu does not exist',
        menu_03: 'There are subkeys under the menu',
        menu_04: 'Unconfigured path',
        auth_01: 'domain is missing',
        auth_02: 'username is missing',
        auth_03: 'identifyCode is missing',
        auth_04: 'magicNo is missing',
        auth_05: 'User does not exist or password error',
        auth_06: 'The phone does not exist',
        auth_07: 'Type does not exist',
        auth_08: 'Failed to send verification code',
        auth_09: 'Verification code error',
        auth_10: 'The user group does not exist',
        auth_11: 'User type does not exist',
        auth_12: 'Verification code error',
        auth_13: 'uuid does not exist',
        auth_14: 'captcha does not exist',
        auth_15: 'usertype does not exist',

        auth_16: 'The mailbox does not exist',

        fee_01:'The customer has no quotation',

        /*************/
        basic_01:'The phone already exists',
        basic_02:'The mailbox already exists',

        Authen_01:'The user has been authenticated',
        Authen_02:'The user is not authenticated',
        application_01:'The application name already exists',
        signature_01:'Key already exists',
        pay_01:"Payment Fail",
        quotation_01:"Lack of type",
        signature_02:'已经有模板使用该签名，请先删除模板，再删除签名',

        sms_01:"您的短信包含非法关键字",
        sms_02:"每次发送的号码数量不能超过一万个",
        sms_03:"您当前的余额不足",
        sms_04:"发送的号码不正确",
        signature_03:'签名已经存在',
        //nx
        sms_error_00:'请求成功',
        sms_error_01:'应用app_key或secret_key错误',
        sms_error_02:'客户被删除',
        sms_error_03:'参数错误或为空',
        sms_error_04:'余额不足',
        sms_error_05:'非法关键字',
        sms_error_06:'短信内容为空',
        sms_error_07:'短信字节数不允许超过250',
        sms_error_08:'号码有误',
        sms_error_09:'时间戳异常',
        sms_error_10:'sign不正确',
        sms_error_11:'模板和内容不能同时为空',
        sms_error_12:'模板不可用',
        sms_error_13:'签名不可用',
        sms_error_14:'中国短信必须使用带签名的模板',
        sms_error_15:'变量参数个数与模板变量个数不符',
        sms_error_16:'单个变量长度不得超过30',
        sms_error_17:'群发号码数量不得超过100个',
        sms_error_88:'请求失败',
        sms_error_99:'系统错误',
        sms_error_100:'未知错误',
        operator_06: '没有默认路由，请联系管理员',
    },
    /*************************************************************************/
    filters:{
        appStatus0:'Not audited',
        appStatus1:'On-line running',
        appStatus2:'Refuse',
    },
    recharge:{
        top:{
            title:'User recharge',
            p1:'Recharge instructions:<br>' +
            '1. We provide online recharge service (Alipay, UnionPay, WeChat)<br>' +
            '2. Please try to protect the balance of the account is greater than the amount of money you set in the package to limit the amount of packages, to avoid the lack of balance caused by business interruption',
        },
        bottom:{
            step1:{
                title:'Enter the amount',
                samllTitle:'1. Enter the amount',
                span1:'Recharge amount:',
                span2:' yuan',
            },
            step2:{
                title:'Choose recharge method',
                samllTitle:'2. Choose the recharge method',
            },
            step3:{
                title:'Confirm order',
                samllTitle:'3. Confirm order',
                span1:'Order number:',
                span2:'Payment amount:',
                span2_2:'yuan',
                span3:'Payment method:',
                span4:'Order status:',
                type0:'Alipay',
                type1:'WeChat',
                type2:'UnionPay',
                type8:'业务员代充',
                type9:'Gift',
                status0:'Pending payment',
                status1:'Payment completed',
                p1:'The payment interface will be opened for you at the new window. Follow the prompts.',
                applyBtn:'Payment',
                btn1:'Completed payment',
                btn2:'View order',
            },
            step4:{
                title:'Make payment',
                samllTitle:'4. Make payment',
                applyBtn0:'Payment',
                applyBtn1:'Completed payment',
            },
            step5:{
                title:'Complete',
                samllTitle:'5. Complete',
                applyBtn:'View order',
            },
            nextBtn:'Next step',
        }

    },
    newSin:{
        title1:'Create a new signature',
        title2:'Modify the signature',
        p1:'Use rules:<br>' +
        '1. If the signature content violates the third party rights and interests must obtain a third party real authorization. After the signature is approved, it can be invoked by the operator.<br>'+
        '2. Signature name (length of 2-10 characters, recommended for the user real application name / site name / company name).<br>'+
        '3. 可以包含中文、数字、英文，须自己添加【】或[]符号。',
        p2:{
            span1:'Certification Information: Your account number',
            a:' Immediately certified',
            status3:'Not yet passed personal / business certification,',
            status0:'Being authenticated',
            status1:'Authentication success',
            status2:'The certification has been rejected',
        },
        p3:{
            span1:'Recharge limit: submit the signature to be charged up to {0} yuan,',
            a:'  Immediate recharge',
        },
        p4:{
            span1:'Attribution application:',
            a:'Apply on the line',
            option1:'Application 01',
            erro:''
        },
        p5:'Signature:',
        p6:'Signature content:',
        btn1:'Submit review',
        btn2:'Reset',
        btn3:'Return',


    },
    newTem:{
        title1:'Create a new template',
        title2:'Modify the template',
        p1:'Use rules:<br>' +
        '1. 模板内容格式为：您的验证码为{1},请在{2}分钟内处理完毕；<br>'+
        '2. 其中{1}、{2}为变量，内容中如果出现‘{}’，请用其他符号代替；<br>'+
        '3. 一个模板最多有8个变量，并且每个变量内容不得超过30个字符；<br>'+
        '4. 模板审核通过后才能使用，早9点-晚6点提交审核，当天审批；晚6点后提交审核的隔天审批；',
        p2:{
            span1:'Certification Information: Your account number',
            a:' Immediately certified',
            status3:'Not yet passed personal / business certification,',
            status0:'Being authenticated',
            status1:'Authentication success',
            status2:'The authentication has been rejected',
        },
        p3:{
            span1:'Recharge limit: submit template to be accumulated recharge to {0} yuan,',
            a:'  Immediate recharge',
        },
        p4:{
            span1:'Attribution application:',
            a:'Application on-line',
            option1:'Application 01',
        },
        p5:{
            span:'Template type:',
            option0:'Select the template type',

        },
        p6:{
            span:'Template name:',
            small:'Limited to 6 Chinese characters or 20 numbers, the English symbol is only used to identify the use of notes.',
        },
        p7:{
            span:"SMS signature",
            option0:'Niuxin technology',
        },
        p8:'Template content:',
        p9:'Application Description:',
        btn1:'Submit review',
        btn2:'Reset',
        btn3:'Return'
    },
    sms:{
        title:'WEB Short Message send',
        p1:{
            span:'Select application:',
            option:'NX Service Notification',
        },
        p2:{
            span:'Select template:',
            option:'00001 ',
        },
        p3:{
            span:'Select signature:',
            option:'00001 ',
        },
        p4:{
            span:'Send number:',
            small:'请在框内输入国码+号码， 如国码为86，号码为13988889999,则需输入8613988889999',
        },
        p5:{
            span:'Batch Import:',
            small:'Only support XX format, please wrap the number',
            a1:'Browse',
            a2:'Upload',
            a3:'Template download'
        },
        p6:{
            span:"Send time:",
            small:'Send it by default',
            a1:'Choose time',
        },
        p7:{
            span:'Short Message content:',
            small:"enter a total of {hCharacter} characters",
            rule:'1：计费标准：中国短信：70字符/条（不分中英文），支持长短信，字数包含签名；国际短信：英文和数字：140字符/条，支持长短信（超出140字符按134字符/条 计费）。 短信中出现非ASCII编码字符（如中文、日文、韩文等），以国内短信计费。</br>'+
            '2：发中国短信，必须使用带签名的模板；发国际短信，可以不使用模板，内容可自由编辑；如果使用了带变量的模板，请在变量框中填入值，否则短信内容不完整。</br>'+
            '3：多个号码请用英文逗号隔开；如果号码需要文件导入，请下载模板（模板格式为一个号码一行，csv文件），一次最多提交1万个号码。</br>'+
            '4：发送号码必须为：国码+手机号；比如：8613888888888、821022411111（其中86为中国国码、82为韩国国码）。',
            small2:'短信内容中的每个输入框最多可输入8个字符',
        },
        btn1:'Send',
        btn2:'Reset',
        sure:'Are you sure you want to send the current message?',
    },
    newApp:{
        title1:'Create an application',
        title2:'Modify the application',
        p1:'Application name:',
        p2:{
            span:'Server whitelist:',
            small:'Please enter IP (one per line) in the box, such as 74.125.71.10',
        },
        p3:{
            span:'Batch Import:',
            a1:'Browse',
            a2:'Upload',
            a3:'Template download',
            small:'Only support XX format, please wrap IP'
        },
        p4:{
            span:'Product service:',
            option:[
                {
                    span:'SMS',
                    value:'1',
                },
                {
                    span:'Voice',
                    value:'2',
                },
                {
                    span:'DID',
                    value:'3',
                },
                {
                    span:'Data',
                    value:'4',
                }
            ],
            plac:'Return address',
        },
        p5:'Product service:',
        p6:'上行地址',
        btn1:'Submit review',
        btn2:'Reset',
        btn3:'Return',
        btn4:'Change',
    },
    rechList:{
        title:'Recharge list',
        span1:'Recharge amount',
        price_option:'100',
        span2:'Recharge method',
        type_option:'All',
        span3:'Start end time:',
        btn1:'Inquire',
        type0:'Alipay',
        type1:'WeChat',
        type2:'UnionPay',
        type8:'业务员代充',
        type9:'Gift',
        table:{
            th1:'Order number',
            th2:'Generate time',
            th3:'Recharge method',
            th4:'Amount / Yuan',
            th5:'Status',
        },
        detail:{
            title:'Electronic bill details',
            span1:'Recharge type',
            span2:'Serial number',
            span3:'Recharge account',
            span4:'Recharge amount: RMB (lowercase) ',
            span4_1:'RMB (lowercase)  ',
            span5:'Recharge method',
            span6:'Trading status',
            date:'Bill generation date',
            type:'Alipay',
            status:'Transaction complete'
        },
    },
    dayMessage:{
        title:'SMS daily report',
        span1:'Application name',
        price_option:'100',
        span2:'Customer',
        type_option:'All',
        span3:'Send date:',
        btn1:'Inquire',
        table:{
            th1:'Serial number',
            th2:'Application name',
            th3:'Send date',
            th4:'Send the total number',
            th5:'Total number of successes',
            th6:'Total number of failures',
            th7:'Total amount',
        },
    },
    dayMessage:{
        title:'短信日报表',
        span1:'应用名称',
        price_option:'100',
        span2:'客户',
        type_option:'全部',
        span3:'发送日期：',
        btn1:'查询',
        table:{
            th1:'序号',
            th2:'应用名称',
            th3:'发送日期',
            th4:'发送总数',
            th5:'成功总数',
            th6:'失败总数',
            th7:'总金额',
        },
    },
    messageList:{
        title:'SMS record query',
        span1:'Application name',
        price_option:'100',
        span2:'Number',
        type_option:'All',
        span3:'Send date:',
        span4:'Destination:',
        span5:'Type:',
        span6:'Status:',
        type0:'Instant messaging',
        type1:'Timed SMS',
        typenull:'',
        status0:'failure',
        status1:'Success',
        btn1:'Inquire',
        table:{
            th1:'Serial number',
            th2:'Application name',
            th3:'Number',
            th4:'Destination country',
            th5:'Content',
            th6:'Submit time',
            th7:'Send time',
            th8:'单价',
            th9:'Type',
            th10:'Status',
            th11:'Receipt status',
            th12:'Prompt information',
            th13:'计费条数',
            th14:'计费总价',
        },
    },
    monthlyBill:{
        title:'Monthly bill',
        span1:'Select month',
        span2:'Select application:',
        option:'All',
        down:'Download the details of the month',
        btn1:'Inquire',
        table:{
            th1:'Serial number',
            th2:'Application name',
            th3:'All Cost ',
            th4:'Duration / times',
            th5:'Cost',
        },
        moneyUint:'yuan',
        timeUint:'minute',

    },
    newInvoice:{
        title:'Invoice request',
        title2:'View invoice',
        title3:'Reopen invoice',
        p1:"Invoice description<br>" +
        "1、 Billing conditions: individual developers can apply for ordinary invoices (200 yuan), business developers can apply for ordinary invoices (200 yuan) or value-added tax invoices (1,000 yuan)<br>" +
        "2、 Due to the reasons for the accounting settlement of the tax authorities, the application for invoicing submitted before the 25th of each month is accepted and the application is postponed until next month<br>" +
        "3、 Please check the invoice header, the amount, the tax number, the address and other relevant information carefully, because the information fill in the error caused by the invoice issued, mail error, will not be able to reopen<br>" +
        "4、 After invoicing, in addition to the occurrence of billing is wrong, invoice deduction, invoice can not be certified, etc., not returned<br>",
        p2:'Remaining invoice amount:',
        p2_1:' yuan',
        span1:'Invoice Amount:',
        span2:'Invoice header information:',
        span3:'Invoice type:',
        span4:'Invoice content:',
        span5:'Taxpayer Identification number:',
        span3_radio1:'Ordinary invoice',
        span3_radio2:'VAT invoice',
        span4_radio1:'Information service fee',
        span4_radio2:'Technical service fee',
        span4_radio3:'Information technology service fee',
        span5:'Taxpayer Identification number:',
        span6:'Bank card number:',
        span7:'Bank:',
        span7_samll:'Specific to the branch',
        span8:'Registered address:',
        span8_samll:'Specifically to fill in the tax registration address',
        span9:'Enterprise Phone:',
        span10:'Received address:',
        span10_samll:'Please fill in the specifications: provinces and cities (counties) and other information',
        span11:'Recipient name:',
        span12:'Contact number:',
        btn1:'VAT invoice',
        btn2:'Ordinary invoice',
        saveBtn:'Submit',
        clearBtn:'Reset',
    },
    yearStatic:{
        title:'Year bill statistics',
        span1:'Year:',
        btn1:'Inquire',
        title:'Year data',
        yTitle:"yuan",
        day:'Month',
        app:'Application:'
    },
    monthStatic:{
        title:'Monthly billing statistics',
        span1:'Month:',
        btn1:'Inquire',
        title:'Month data',
        yTitle:"yuan",
        day:'Day',
        app:'Application:'
    },

    appStatic:{
        title:'Apply bill statistics',
        span1:'Month:',
        span2:'Select application:',
        span2_option:'All',
        btn1:'Inquire',
    },
    wxApplay:{
        title:'Your order is submitted successfully. Please pay as soon as possible.',
        small1:'Immediate payment',
        small2:'yuan',
        small3:'to complete the order, please complete the payment within 24 hours.',
        btn:'Please use WeChat to scan the QR code for payment.',
        btn2:'   Payment completed  '
    },

}