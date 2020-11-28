import React,{Component} from 'react'
import {reqCheckLogin} from '../service/service'
import { Layout,Button } from 'antd'
import '../css/admin.less'
const { Header, Footer, Sider, Content } = Layout
export default class Admin extends Component {
  state = {
    token: localStorage.getItem('token'),
    userInfo:{},
    isFullscreen:true
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
  render() {
    const {isFullscreen,userInfo} = this.state
    return (
      <Layout className="admin">
        <Sider>Sider</Sider>
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