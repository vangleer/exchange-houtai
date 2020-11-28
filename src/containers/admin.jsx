import React,{Component} from 'react'
import {reqCheckLogin} from '../service/service'
import { Layout, Button, Menu, Icon } from 'antd'
import ROUTES from '../config/routes.js'
import logo from '../static/imgs/logo.png'
import '../css/admin.less'
const { Header, Footer, Sider, Content } = Layout
const { SubMenu,Item } = Menu
export default class Admin extends Component {
  state = {
    token: localStorage.getItem('token'),
    userInfo:{},
    isFullscreen:true,
    collapsed: false,
  }
  componentDidMount() {
    // 检查是否登录
    this.checkLogin()
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
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
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
           <Icon type={item.icon} />
           <span>{item.name}</span>
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
            defaultSelectedKeys={['home']}
            defaultOpenKeys={['']}
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
              <Button type="link">退出</Button>
            </div>
            <div className="header-bom">
              <div className="title"><span>会员管理</span><div className="shanjiao"></div></div>
              <div className="time">2020-11-17 03:20:34</div>
            </div>
          </Header>
          <Button className="fullscreen-btn" style={{display:isFullscreen?'none':'block'}} icon={isFullscreen?'fullscreen':'fullscreen-exit'} size="small" onClick={()=>this.setState({isFullscreen:!isFullscreen})}></Button>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}