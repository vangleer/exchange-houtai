// 路由配置
export default [
  {
    path: '/member',
    icon: 'ant-design',
    name: '会员管理',
    children: [
      {
        path: '/memberList',
        icon: 'ant-design',
        name: '会员列表'
      },
      {
        path: '/memberBehavior',
        icon: 'ant-design',
        name: '会员行为'
      },
      {
        path: '/memberComplaint',
        icon: 'ant-design',
        name: '问题反馈'
      }
    ]
  }
]