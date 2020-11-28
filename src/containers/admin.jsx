import React,{Component} from 'react'
import {reqCheckLogin} from '../service/service'
export default class Admin extends Component {
  state = {
    token: localStorage.getItem('token'),
    userInfo:{}
  }
  componentDidMount() {
    // 检查是否登录
    this.checkLogin()
  }
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
    return (
      <h1>Admin</h1>
    )
  }
}