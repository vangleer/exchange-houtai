import React,{Component} from 'react'
import { Form, Input, Button, Table, Switch,message } from 'antd'
import {reqMemeberList} from '../../service/service'
import dayjs from 'dayjs'
const {Item} = Form
class MemberList extends Component {
  state = {
    memberList:[],
    page:1,
    pageInfo:{page: 1,total_count: 0,total_page: 0},
    searchForm:{},
    columns: [
      {title: '会员ID',dataIndex: 'id',key: 'id', width: 80},
      {title: '姓名',dataIndex: 'real_name',key: 'real_name', width: 100},
      {title: '会员账号',dataIndex: 'mobile',key: 'mobile', width: 120},
      {title: '会员邮箱',dataIndex: 'email',key: 'email', width: 200},
      {title: '会员昵称',dataIndex: 'nick_name',key: 'nick_name', width: 150},
      {title: '身份证号码',dataIndex: 'id_card',key: 'id_card', width: 200},
      {title: '注册时间',dataIndex: 'add_time',key: 'add_time', width: 150},
      {title: 'DTS',dataIndex: 'DTS',key: 'DTS', width: 150},
      {title: 'USDT',dataIndex: 'USDT',key: 'USDT', width: 150},
      {title: 'UBI',dataIndex: 'UBI',key: 'UBI', width: 150},
      {title: '是否冻结',dataIndex: 'is_lock',key: 'is_lock', width: 100,
        render:row=>(
          // <Switch defaultChecked onChange={this.onChange} checked={row.is_lock} />
          <Switch defaultChecked onChange={this.onChange}  />
        )
      },
      {title: '是否是服务商',dataIndex: 'is_service_provider',key: 'is_service_provider',width: 120,
        render:row=>(
          // <Switch defaultChecked onChange={this.onChange} checked={row.is_service_provider === 1} />
          <Switch defaultChecked onChange={this.onChange} />
        )
      },
      {title: '操作',width: 450,
        render:row=>(
          <div>
            <Button type="primary">修改</Button>
            <Button type="primary">划转</Button>
            <Button type="primary">查看财务日志</Button>
            <Button type="primary">实名认证</Button>
            <Button type="primary">修改收款信息</Button>
            <Button type="primary">注销账号</Button>
            <Button type="primary">解绑兼职/优贝账户</Button>
          </div>
        )
      },
    ]
  }
  componentDidMount() {
    this.getMemeberList()
  }
  // 会员信息列表
  getMemeberList  = async () => {
    const {page,searchForm} = this.state
    const res = await reqMemeberList({
      page: page,
      mobile: searchForm.mobile,
      userId: searchForm.userId,
      id_card: searchForm.idCard,
      real_name: searchForm.realName,
      email: searchForm.email,
      nick_name: searchForm.nickName,
      sort_by_currency_name: '',
      sort_by: '',
    })
    console.log(res)
    if(res.status === 1) {
      // 保存数据
      this.setState({memberList:res.data.list,pageInfo:res.data.page_info})
    } else {
      message.error(res.msg)
    }
  }
  // 修改分页
  changePage = (page) => {
    this.setState({page})
    // 获取列表
    this.getMemeberList()
  }
  onChange = (e) => {}
  handleSearch = (e) => {
    this.props.form.validateFields((err,values)=>{
      this.setState({searchForm:{...values}})
      console.log(this.state.searchForm)
      this.getMemeberList()
    })
    e.preventDefault()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const {total_count} = this.state.pageInfo
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    return (
      <div className="card">
        <div className="card-head">
        <Form layout="inline" onSubmit={this.handleSearch}>
          <Item label="会员ID">{getFieldDecorator('userId')(<Input placeholder="会员ID"/>)}</Item>
          <Item label="会员账号">{getFieldDecorator('mobile')(<Input placeholder="请输入会员账号"/>)}</Item>
          <Item label="真实姓名">{getFieldDecorator('realName')(<Input placeholder="真实姓名"/>)}</Item>
          <Item label="邮箱">{getFieldDecorator('email')(<Input placeholder="邮箱"/>)}</Item>
          <Item label="用户昵称">{getFieldDecorator('nickName')(<Input placeholder="用户昵称"/>)}</Item>
          <Item label="身份证">{getFieldDecorator('idCard')(<Input placeholder="请输入身份证"/>)}</Item>
          <Item><Button type="primary" htmlType="submit">搜索</Button></Item>
          <Item><Button type="primary">添加会员</Button></Item>
        </Form>
        </div>
        <div className="card-body">
          <Table 
            dataSource={this.state.memberList} 
            columns={this.state.columns} 
            scroll={{ x: 1500, y: '56vh' }}
            bordered
            rowKey="id"
            style={{height:'100%'}}
            pagination={{pageSize:10,total:total_count,onChange:this.changePage}}
          />
        </div>
      </div>
    )
  }
}

// Form.create()方法返回一个函数，需要一个组件作为参数，返回加工后的组件，最后暴露出去
export default Form.create()(MemberList)