// 路由配置
export default [
  { // 会员管理
    path: '/member',
    key:'member',
    icon: 'ant-design',
    name: '会员管理',
    children: [
      {
        path: '/memberList',
        key: 'memberList',
        icon: 'ant-design',
        name: '会员列表'
      },
      {
        path: '/memberBehavior',
        key: 'memberBehavior',
        icon: 'ant-design',
        name: '会员行为'
      },
      {
        path: '/memberComplaint',
        key: 'memberComplaint',
        icon: 'ant-design',
        name: '问题反馈'
      }
    ]
  },
  { // 财务管理
    path: '/fanacial',
    key:'fanacial',
  	icon: 'el-icon-edit', // 图标样式class
  	name: '财务管理',
    children: [
      {
        path: '/statisticsSum',
        key: 'statisticsSum',
        icon: 'ant-design',
        name: '财务统计'
      },
      {
        path: '/replacementLogList',
        key: 'replacementLogList',
        icon: 'ant-design',
        name: '置换日志'
      },
      {
        path: '/currencyJournalList',
        key: 'currencyJournalList',
        icon: 'ant-design',
        name: '货币日志'
      },
      {
        path: '/banklist',
        key: 'banklist',
        icon: 'ant-design',
        name: '银行列表'
      }
    ]
  },
  { // 系统管理
    path: '/system',
    key: 'system',
  	icon: 'el-icon-edit', 
  	name: '系统管理',
    children: [
      {
        path: '/systemConfig',
        key: 'systemConfig',
        icon: 'ant-design',
        name: '系统配置'
      },
      {
        path: '/customerServiceCenter',
        key: 'customerServiceCenter',
        icon: 'ant-design',
        name: '热更新'
      }
    ]
  },
  { // 交易管理
    path: '/transactionManagement',
    key: 'transactionManagement',
  	icon: 'el-icon-edit', 
  	name: '交易管理',
    children: [
      {
        path: '/matching',
        key: 'matching',
        icon: 'ant-design',
        name: '挂单列表'
      },
      {
        path: '/conversionlist',
        key: 'conversionlist',
        icon: 'ant-design',
        name: '订单列表'
      },
      {
        path: '/delegate',
        key: 'delegate',
        icon: 'ant-design',
        name: '委托挂单列表'
      },
      {
        path: '/delegatelist',
        key: 'delegatelist',
        icon: 'ant-design',
        name: '委托订单列表'
      },
      {
        path: '/exchangeOrderList',
        key: 'exchangeOrderList',
        icon: 'ant-design',
        name: '划转挂单列表'
      },
      {
        path: '/exchangelist',
        key: 'exchangelist',
        icon: 'ant-design',
        name: '划转订单列表'
      },
      {
        path: '/serviceProviderlist',
        key: 'serviceProviderlist',
        icon: 'ant-design',
        name: '服务商订单统计'
      },
      {
        path: '/give',
        key: 'give',
        icon: 'ant-design',
        name: 'OMNI交易'
      }
    ]
  },
  { // 广告管理
    path: '/advertisingManagement',
    key: 'advertisingManagement',
  	icon: 'el-icon-edit', 
  	name: '广告管理',
    children: [
      {
        path: '/swiper',
        key: 'swiper',
        icon: 'ant-design',
        name: '轮播图列表'
      }
    ]
  },
  { // 内容管理
    path: '/contentManagement',
    key: 'contentManagement',
  	icon: 'el-icon-edit', 
  	name: '内容管理',
    children: [
      {
        path: '/articleClassification',
        key: 'articleClassification',
        icon: 'ant-design',
        name: '公告列表'
      },
      {
        path: '/news',
        key: 'news',
        icon: 'ant-design',
        name: '资讯管理'
      }
    ]
  },
  { // 管理
    path: '/management',
    key: 'management',
  	icon: 'el-icon-edit', 
  	name: '管理',
    children: [
      {
        path: '/administrator',
        key: 'administrator',
        icon: 'ant-design',
        name: '管理员'
      },
      {
        path: '/administratorLog',
        key: 'administratorLog',
        icon: 'ant-design',
        name: '管理员日志'
      },
      {
        path: '/AdministratorReplyStatistics',
        key: 'AdministratorReplyStatistics',
        icon: 'ant-design',
        name: '管理员回复统计'
      },
      {
        path: '/nav',
        key: 'nav',
        icon: 'ant-design',
        name: '菜单管理',
      }
    ]
  }
]