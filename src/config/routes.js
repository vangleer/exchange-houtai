// 路由配置
export default [
  {
    path: '/home',
    key: 'home',
    icon: 'home',
    name: '首页'
  },
  { // 会员管理
    path: '/member',
    key:'member',
    icon: 'appstore',
    name: '会员管理',
    children: [
      {
        path: '/memberList',
        key: 'memberList',
        icon: 'appstore',
        name: '会员列表'
      },
      {
        path: '/memberBehavior',
        key: 'memberBehavior',
        icon: 'appstore',
        name: '会员行为'
      },
      {
        path: '/memberComplaint',
        key: 'memberComplaint',
        icon: 'appstore',
        name: '问题反馈'
      }
    ]
  },
  { // 财务管理
    path: '/fanacial',
    key:'fanacial',
  	icon: 'money-collect', // 图标样式class
  	name: '财务管理',
    children: [
      {
        path: '/statisticsSum',
        key: 'statisticsSum',
        icon: 'money-collect',
        name: '财务统计'
      },
      {
        path: '/replacementLogList',
        key: 'replacementLogList',
        icon: 'money-collect',
        name: '置换日志'
      },
      {
        path: '/currencyJournalList',
        key: 'currencyJournalList',
        icon: 'money-collect',
        name: '货币日志'
      },
      {
        path: '/bankList',
        key: 'bankList',
        icon: 'money-collect',
        name: '银行列表'
      }
    ]
  },
  { // 系统管理
    path: '/system',
    key: 'system',
  	icon: 'setting', 
  	name: '系统管理',
    children: [
      {
        path: '/systemConfig',
        key: 'systemConfig',
        icon: 'setting',
        name: '系统配置'
      },
      {
        path: '/customerServiceCenter',
        key: 'customerServiceCenter',
        icon: 'setting',
        name: '热更新'
      }
    ]
  },
  { // 交易管理
    path: '/transactionManagement',
    key: 'transactionManagement',
  	icon: 'safety-certificate', 
  	name: '交易管理',
    children: [
      {
        path: '/matching',
        key: 'matching',
        icon: 'safety-certificate',
        name: '挂单列表'
      },
      {
        path: '/conversionList',
        key: 'conversionList',
        icon: 'safety-certificate',
        name: '订单列表'
      },
      {
        path: '/delegate',
        key: 'delegate',
        icon: 'safety-certificate',
        name: '委托挂单列表'
      },
      {
        path: '/delegateList',
        key: 'delegateList',
        icon: 'safety-certificate',
        name: '委托订单列表'
      },
      {
        path: '/exchangeOrderList',
        key: 'exchangeOrderList',
        icon: 'safety-certificate',
        name: '划转挂单列表'
      },
      {
        path: '/exchangeList',
        key: 'exchangeList',
        icon: 'safety-certificate',
        name: '划转订单列表'
      },
      {
        path: '/serviceProviderlist',
        key: 'serviceProviderlist',
        icon: 'safety-certificate',
        name: '服务商订单统计'
      },
      {
        path: '/give',
        key: 'give',
        icon: 'safety-certificate',
        name: 'OMNI交易'
      }
    ]
  },
  { // 广告管理
    path: '/advertisingManagement',
    key: 'advertisingManagement',
  	icon: 'idcard', 
  	name: '广告管理',
    children: [
      {
        path: '/swiper',
        key: 'swiper',
        icon: 'idcard',
        name: '轮播图列表'
      }
    ]
  },
  { // 内容管理
    path: '/contentManagement',
    key: 'contentManagement',
  	icon: 'read', 
  	name: '内容管理',
    children: [
      {
        path: '/articleClassification',
        key: 'articleClassification',
        icon: 'read',
        name: '公告列表'
      },
      {
        path: '/news',
        key: 'news',
        icon: 'read',
        name: '资讯管理'
      }
    ]
  },
  { // 管理
    path: '/management',
    key: 'management',
  	icon: 'code-sandbox', 
  	name: '管理',
    children: [
      {
        path: '/administrator',
        key: 'administrator',
        icon: 'code-sandbox',
        name: '管理员'
      },
      {
        path: '/administratorLog',
        key: 'administratorLog',
        icon: 'code-sandbox',
        name: '管理员日志'
      },
      {
        path: '/administratorReplyStatistics',
        key: 'administratorReplyStatistics',
        icon: 'code-sandbox',
        name: '管理员回复统计'
      },
      {
        path: '/nav',
        key: 'nav',
        icon: 'code-sandbox',
        name: '菜单管理',
      }
    ]
  }
]