import React,{Component} from 'react'
import {reqCheckLogin} from '../service/service'
import {Switch,Redirect,Route,NavLink} from 'react-router-dom'
import { Layout, Button, Menu, Icon } from 'antd'
import ROUTES from '../config/routes.js'
import logo from '../static/imgs/logo.png'
import '../css/admin.less'

/** 导入路由组件 */
// 首页
import Home from './home.jsx'
// 会员管理
import MemberList from './member/memberList'
import MemberBehavior from './member/memberBehavior'
import MemberComplaint from './member/memberComplaint'
// 财务管理
import StatisticsSum from './fanacial/statisticsSum'
import ReplacementLogList from './fanacial/replacementLogList'
import CurrencyJournalList from './fanacial/currencyJournalList'
import BankList from './fanacial/bankList'
// 系统管理 
import SystemConfig from './system/systemConfig'
import CustomerServiceCenter from './system/customerServiceCenter'
// 交易管理
import Matching from './transaction_management/matching'
import ConversionList from './transaction_management/conversionList'
import Delegate from './transaction_management/delegate'
import DelegateList from './transaction_management/delegateList'
import ExchangeOrderList from './transaction_management/exchangeOrderList'
import ExchangeList from './transaction_management/exchangeList'
import ServiceProviderlist from './transaction_management/serviceProviderlist'
import Give from './transaction_management/give'
// 广告管理
import Swiper from './advertising_management/swiper'
// 内容管理
import ArticleClassification from './content_management/articleClassification'
import News from './content_management/news'
// 管理
import Administrator from './management/administrator'
import AdministratorLog from './management/administratorLog'
import AdministratorReplyStatistics from './management/administratorReplyStatistics'
import Nav from './management/nav'

const { Header, Footer, Sider, Content } = Layout
const { SubMenu,Item } = Menu
export default class Admin extends Component {
  state = {
    token: localStorage.getItem('token'),
    userInfo:{},
    isFullscreen:true,
    collapsed: false,
    currentKey:'home'
  }
  componentDidMount() {
    // 检查是否登录
    this.checkLogin()
    console.log(this.getParentKey())
  }
  // 获取当前路由下的 key
  getCurrentKey = () => this.props.location.pathname.split('/').reverse()[0]
  // 获取当前路由下的 key 的父标签的key
  getParentKey = () => {
    // 1.获取当前路由的key
    const currentKey = this.props.location.pathname.split('/').reverse()[0]
    // 2.循环遍历 ROUTES
    for(let i = 0; i < ROUTES.length;i++) {
      // 2.1 得到每一项
      let item = ROUTES[i]
      // 2.2声明一个变量
      let result = false
      // 2.3如果item有children并且children1的length大于0的话,去查找当前item是否有当前路由key
      if(item.children && item.children.length > 0) {
        result = item.children.some(item2 => item2.key === currentKey)
      } 
      // 如果找到了，直接返回父元素的key
      if(result) {
        return item.key
      }
    }
    // 没找到返回空字符串
    return '' 
  }
  // 检查是否登录方法
  checkLogin = async () => {
    if(!this.state.token) {
      this.props.history.replace('/login')
    } else {
      const res = await reqCheckLogin()
      if(res.status === -999 || res.status === -998) {
        localStorage.removeItem('token')
        this.props.history.replace('/login')
      }
      if(res.status === 1) this.setState({userInfo:res.data})
    }
  }
  // logout 退出登录
  logout = () => {
    // 1.清除本地存储的token
    localStorage.removeItem('token')
    // 2.跳转的 login
    this.props.history.replace('/login')
  }
  // 递归调用渲染导航函数
  randerRoutes = (item) => {
    if (item.children && item.children.length > 0) {
      return (
       <SubMenu
           key={item.key}
           title={
           <span>
             <Icon type={item.icon} />
             <span>{item.name}</span>
           </span>}
         >
           {item.children.map((item2)=>this.randerRoutes(item2))}
       </SubMenu>
      )
     } else {
       return (
        <Item key={item.key}>
          <NavLink to={'/admin' + item.path}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </NavLink> 
        </Item>
       )
     }
  }
  render() {
    const {isFullscreen,userInfo} = this.state
    return (
      <Layout className="admin">
        <Sider>
          <div className="logo-box">
            <img src={logo} alt="共享数据"/>
            <h1>共享数据后台</h1>
          </div>
          <Menu
            defaultSelectedKeys={[this.getCurrentKey()]}
            defaultOpenKeys={[this.getParentKey()]}
            mode="inline"
            theme="dark"
          >
            {ROUTES.map(item=>this.randerRoutes(item))}
           
          </Menu>
        </Sider>
        <Layout>
          <Header className="header" style={{display:isFullscreen?'block':'none',padding: 0,lineHeight:'30px'}}>
            <div className="header-box">
              <Button icon={isFullscreen?'fullscreen':'fullscreen-exit'} size="small" onClick={()=>this.setState({isFullscreen:!isFullscreen})}></Button>
              <span className="username">欢迎 {userInfo.user_name}</span>
              <Button type="link" onClick={this.logout}>退出</Button>
            </div>
            <div className="header-bom">
              <div className="title"><span>会员管理</span><div className="shanjiao"></div></div>
              <div className="time">2020-11-17 03:20:34</div>
            </div>
          </Header>
          <Button className="fullscreen-btn" style={{display:isFullscreen?'none':'block'}} icon={isFullscreen?'fullscreen':'fullscreen-exit'} size="small" onClick={()=>this.setState({isFullscreen:!isFullscreen})}></Button>
          <Content className="content">
            {/* 配置路由 */}
            <Switch>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/memberList" component={MemberList}/>
              <Route path="/admin/memberBehavior" component={MemberBehavior}/>
              <Route path="/admin/memberComplaint" component={MemberComplaint}/>
              <Route path="/admin/statisticsSum" component={StatisticsSum}/>
              <Route path="/admin/replacementLogList" component={ReplacementLogList}/>
              <Route path="/admin/currencyJournalList" component={CurrencyJournalList}/>
              <Route path="/admin/bankList" component={BankList}/>
              <Route path="/admin/systemConfig" component={SystemConfig}/>
              <Route path="/admin/customerServiceCenter" component={CustomerServiceCenter}/>
              <Route path="/admin/matching" component={Matching}/>
              <Route path="/admin/conversionList" component={ConversionList}/>
              <Route path="/admin/delegate" component={Delegate}/>
              <Route path="/admin/delegateList" component={DelegateList}/>
              <Route path="/admin/exchangeOrderList" component={ExchangeOrderList}/>
              <Route path="/admin/exchangeList" component={ExchangeList}/>
              <Route path="/admin/serviceProviderlist" component={ServiceProviderlist}/>
              <Route path="/admin/give" component={Give}/>
              <Route path="/admin/swiper" component={Swiper}/>
              <Route path="/admin/articleClassification" component={ArticleClassification}/>
              <Route path="/admin/news" component={News}/>
              <Route path="/admin/administrator" component={Administrator}/>
              <Route path="/admin/administratorLog" component={AdministratorLog}/>
              <Route path="/admin/administratorReplyStatistics" component={AdministratorReplyStatistics}/>
              <Route path="/admin/nav" component={Nav}/>
              <Redirect to="/admin/home"/>  
            </Switch> 
          </Content>
          <Footer className="footer">
            <span>在谷歌浏览器使用本系统，可以得到极致的用户体验</span>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}