import React,{Component} from 'react'
import { Form, Icon, Input,Button,message,Row,Col } from 'antd';
import '../css/login.less'
import logo from '../static/imgs/logo.png'
import {BASE_URL} from '../config/index'
import {reqLogin} from '../service/service.js'
const {Item} = Form
class Login extends Component {
  state = {
    captureImg: `${BASE_URL}/Admin/Pub/Login/getVerifyCode?time=${Date.now()}`,
    isLogin:false
  }
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.history.replace('/admin/home')
    }
  }
  // 验证密码的函数
  pwdValidator = (item,value,callback) => {
    // 密码不能为空
    if(value.length===0) return callback('请输入密码')
    // 判断密码只能在3到15位
    if(value.length <= 3 || value.length >= 15) return callback('密码必须在3~15之间')
    // 密码只能包含大小写字符、数组和下划线
    if(/[^a-zA-Z0-9_]/.test(value)) return callback('密码只能包含大小写字符和数组、下划线')
    // 如果都通过了返回callback
    return callback()
  }
  // 点击提交
  handleSubmit = (e) => {
    // 阻止表单提交默认事件
    e.preventDefault()
    // form.validateFields 进行表单的最终校验
    this.props.form.validateFields(async (err, values) => {
      // 如果没有错误
      if (!err) {
        // 在这里发起服务器请求
        const res = await reqLogin({...values})
        if(res.status === 1) {
          // 保存 token
          localStorage.setItem('token',res.data.token)
          // 跳转
          this.props.history.replace('/admin')
        } else {
          message.error(res.msg)
        }
        
      } 
    })
  }
  getCaptureImg = () => {
    this.setState({
      captureImg: `${BASE_URL}/Admin/Pub/Login/getVerifyCode?time=${Date.now()}`
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header>
          <img src={logo} alt="共享数据"/>
          <h1>共享数据管理后台</h1>
        </header>
        <div className="box">
          <h2>登录</h2>
          <Form  className="login-form" onSubmit={this.handleSubmit}>
            <Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' },{ min: 3, max:12, message: '用户名长度在3~12之间' }]})(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Item>

            <Item>
              {getFieldDecorator('password', {
                rules: [{validator: this.pwdValidator}]})(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
           
            <Item >
              <Row  type="flex"  align="middle">
                <Col span={12}>
                  {getFieldDecorator('code', {
                    rules: [{required: true, message: '请输入验证码'},{len: 4, message: '请输入合法验证码'}]})(
                    <Input 
                      prefix={<Icon type="code-sandbox" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="验证码"
                    />
                  )}
                </Col>
                <Col span={12}>
                  <img className="code" onClick={this.getCaptureImg} src={this.state.captureImg} alt="验证码" />
                </Col>
              </Row>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}
// Form.create()方法返回一个函数，需要一个组件作为参数，返回加工后的组件，最后暴露出去
export default Form.create()(Login)