import React,{Component} from 'react'
import { Form, Input, Button, Table, Switch,message,Modal,Radio  } from 'antd'
import {
  reqMemeberList,
  reqUserProhibition,
  reqChangeServiceProvider,
  reqUserAdd,
  reqUserListOfGoldCoins,
  reqUserTopUp,
  reqTransferCurrency,
  reqAuthUser,
  reqCancelAccount} 
from '../../service/service'
import dayjs from 'dayjs'
const {Item} = Form
class MemberList extends Component {
  state = {
    memberList:[],
    page:1,
    pageInfo:{page: 1,total_count: 0,total_page: 0},
    searchForm:{},
    visibleReason:false,
    addVisible:false,
    editVisible:false,
    editType:1, // 1修改，2划转
    editReason:'',
    goldCoinList:[],
    goldMoney:'',
    reason:'',
    isServiceProvider:false,
    goldId:0,
    money:0,
    authVisible:false,
    destroyVisible:false,
    destroyReason:'',
    switchData:{},
    currentUser:{id:0,mobile:''},
    sortName:'',
    sortBy:'',
    loading:false,
    columns: [
      {title: '会员ID',dataIndex: 'id',key: 'id', width: 80},
      {title: '姓名',dataIndex: 'real_name',key: 'real_name', width: 100},
      {title: '会员账号',dataIndex: 'mobile',key: 'mobile', width: 120},
      {title: '会员邮箱',dataIndex: 'email',key: 'email', width: 200},
      {title: '会员昵称',dataIndex: 'nick_name',key: 'nick_name', width: 150},
      {title: '身份证号码',dataIndex: 'id_card',key: 'id_card', width: 200},
      {title: '注册时间',dataIndex: 'add_time',key: 'add_time', width: 160,render:text=>dayjs(text*1000).format('YYYY-MM-DD HH:mm:ss')},
      {title: 'DTS',dataIndex: 'DTS',key: 'DTS', width: 150, sorter:true},
      {title: 'USDT',dataIndex: 'USDT',key: 'USDT', width: 150,sorter:true},
      {title: 'UBI',dataIndex: 'UBI',key: 'UBI', width: 150,sorter:true},
      {title: '是否冻结',dataIndex: 'is_lock',key: 'is_lock', width: 100,
        render:(text,record)=>(
          <Switch  onChange={(value)=>this.handleSwitchChange(record,'is_lock',value)} checked={text === 1} />
        )
      },
      {title: '是否是服务商',dataIndex: 'is_service_provider',key: 'is_service_provider',width: 120,
        render:(text,record)=>(
          <Switch onChange={(value)=>this.handleSwitchChange(record,'is_service_provider',value)} checked={text === 1} />
        )
      },
      {title: '操作',width: 450,
        render:(text,record)=>(
          <div>
            <Button type="primary" onClick={()=>this.handleEditClick(record,1)}>修改</Button>
            <Button type="primary" onClick={()=>this.handleEditClick(record,2)}>划转</Button>
            <Button type="primary" onClick={()=>this.handleAuthClick(record)}>实名认证</Button>
            <Button type="danger" onClick={()=>this.setState({currentUser:record,destroyVisible:true})}>注销账号</Button>
          </div>
        )
      },
    ]
  }
  componentDidMount() {
    this.getMemeberList()
  }
  // 点击确认，提交修改
  handleReasonOk = async () => {
    const {reason,money,switchData} = this.state
    let res
    if(switchData.type === 'is_lock') {
      if(reason.length > 0) { // is_lock 
        res = await reqUserProhibition({userId:switchData.id,isLock:switchData.value ? 1 : 0,reason})
        this.setState({visibleReason:false,reason:''})
      } else return message.warning('请输入理由')
    } else { // is_service_provider
      res = await reqChangeServiceProvider({userId:switchData.id,isp:switchData.value? 1 : 0,money:money})
      this.setState({visibleMoney:false,money:0})
    }
    if(res.status === 1) {
      message.success(res.msg)
      // 初始化switchData
      this.setState({switchData:{}})
      this.getMemeberList()
    }  
    else message.error(res.msg)
  }
  handleSwitchChange = (row,type,value) => {
    console.log(row,type,value)
    if(type === 'is_lock') this.setState({visibleReason:true,switchData:{id:row.id,type,value}})
    else this.setState({visibleMoney:true,switchData:{id:row.id,type,value},isServiceProvider:value,currentUser:row})
  }
  // 会员信息列表
  getMemeberList  = async () => {
    this.setState({loading:true})
    const {page,searchForm,sortBy,sortName} = this.state
    const res = await reqMemeberList({
      page: page,
      mobile: searchForm.mobile,
      userId: searchForm.userId,
      id_card: searchForm.idCard,
      real_name: searchForm.realName,
      email: searchForm.email,
      nick_name: searchForm.nickName,
      sort_by_currency_name: sortName,
      sort_by: sortBy,
    })
    console.log(res)
    if(res.status === 1) {
      // 保存数据
      console.log(res.data)
      this.setState({memberList:res.data.list,pageInfo:res.data.page_info,loading:false})
    } else {
      message.error(res.msg)
      this.setState({loading:false})
    }
  }
  // 获取金币列表
  getUserListOfGoldCoins = async (id) => {
    const res = await reqUserListOfGoldCoins({userId:id})
    if(res.status === 1) {
      // 保存 goldCoinList
      this.setState({goldCoinList:res.data})
    }
    console.log(res)
  }
  // 修改分页
  changePage = (page) => {
    console.log(page)
    this.setState({page:page})
    setTimeout(()=>{ // 延时是为了调用this.getMemeberList()能接受到正确的page
      // 获取列表
      this.getMemeberList()
    },100)
  }
  handleChange = (type,e) => {
    let searchForm = {...this.state.searchForm}
    searchForm[type] = e.target.value
    this.setState({searchForm})
  }
  // 搜索
  handleSearch = (e) => {
    this.getMemeberList()
    e.preventDefault()
  }
  // 排序
  handleTableChange = (page,filter,sort) => {
    // 有排序
    if(Object.keys(sort).length > 0) {
      console.log(sort)
      let order = sort.order === 'descend' ? 'desc':'asc'
      this.setState({sortName:sort.field,sortBy:order})
      setTimeout(()=>this.getMemeberList(),100)
    }
  }
  // 添加会员
  handleAddOk = () => {
    this.props.form.validateFields(async (err, values)=>{
      if(!err) {
        const res = await reqUserAdd({type:1,account:values.mobile,password:values.password})
        if(res.status === 1) {
          // 提示
          message.success(res.msg)
          // 关闭弹窗
          this.setState({addVisible:false})
          // 重置表单
          this.props.form.resetFields()
        } else {
          message.error(res.msg)
        }
      }
    })
  }
  handleEditClick = (record,editType) => {
    console.log(record.id)
    this.setState({currentUser:record,editVisible:true,editType})
    this.getUserListOfGoldCoins(record.id)
  }
  handleEditOk = async () => {
    const {currentUser,goldMoney,goldId,editType,editReason} = this.state
    if(goldId === 0) return message.error('请选择货币')
    if(goldMoney.length < 1) return message.error('请输入金额')
    let res
    if(editType === 1) { // 修改
        res = await reqUserTopUp({user_currency_id:goldId,money:goldMoney})
    } else { // 划转
      if(editReason.length < 1) return message.error('请输入原因')
      res = await reqTransferCurrency({user_id: currentUser.id,currency_id: goldId,money: goldMoney,note:editReason})
    }
    if(res.status === 1) {
      this.setState({editVisible:false,goldMoney:'',goldId:0,editReason:''})
      this.getMemeberList()
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
  }
  // 点击实名认证
  handleAuthClick = (record) => {
    console.log(record)
    this.setState({authVisible:true,userId:record.id})
  }
  // 实名认证 
  handleAuthOk = async () => {
    const {userId} = this.state
    const authName = this.props.form.getFieldValue('authName')
    const authIdCard = this.props.form.getFieldValue('authIdCard')
    console.log(this.props.form)
    if(!authName) return
    if(!authIdCard) return
    const res = await reqAuthUser({user_id:userId,id_card:authIdCard,real_name:authName})
    if(res.status === 1) {
      // 提示
      message.success(res.msg)
      // 关闭弹窗
      this.setState({authVisible:false})
      // 重置表单
      this.props.form.resetFields()
       
    } else {
      message.error(res.msg)
    }
  }
  // 提交注销用户
  handleDestroyOk = async () => {
    const {destroyReason,currentUser} = this.state
    if(!destroyReason) return message.error('请输入理由')
    const res = await reqCancelAccount({user_id:currentUser.id,reason:destroyReason})
    if(res.status === 1) {
      message.success(res.msg)
      this.setState({destroyReason:'',destroyVisible:false})
      this.getMemeberList()
    } else message.error(res.msg)
  }
  render() {
    const {
      searchForm,
      reason,
      money,
      visibleReason,
      visibleMoney,
      currentUser,
      goldCoinList,
      goldMoney,
      goldId,
      editType,
      editReason,
      isServiceProvider,
      loading
    } = this.state
    const {getFieldDecorator} = this.props.form
    const {total_count} = this.state.pageInfo
    const formItemLayout = {labelCol: { span: 4 },wrapperCol: { span: 16 }}
    return (
      <div className="card">
        <div className="card-head">
        <Form layout="inline" onSubmit={this.handleSearch}>
          <Item label="会员ID"><Input placeholder="会员ID" value={searchForm.userId} onChange={(e)=>this.handleChange('userId',e)}/></Item>
          <Item label="会员账号"><Input placeholder="请输入会员账号" value={searchForm.mobile} onChange={(e)=>this.handleChange('mobile',e)}/></Item>
          <Item label="真实姓名"><Input placeholder="真实姓名" value={searchForm.realName} onChange={(e)=>this.handleChange('realName',e)} /></Item>
          <Item label="邮箱"><Input placeholder="邮箱" value={searchForm.email} onChange={(e)=>this.handleChange('email',e)}/></Item>
          <Item label="用户昵称"><Input placeholder="用户昵称" value={searchForm.nickName} onChange={(e)=>this.handleChange('nickName',e)}/></Item>
          <Item label="身份证"><Input placeholder="请输入身份证" value={searchForm.idCard} onChange={(e)=>this.handleChange('idCard',e)} /></Item>
          <Item><Button type="primary" htmlType="submit">搜索</Button></Item>
          <Item><Button type="primary" onClick={()=>this.setState({addVisible:true})}>添加会员</Button></Item>
        </Form>
        </div>
        <div className="card-body">
          <Table 
            dataSource={this.state.memberList} 
            columns={this.state.columns} 
            scroll={{ x: 1500}}
            bordered
            rowKey="id"
            loading={loading}
            onChange={this.handleTableChange}
            pagination={{pageSize:10,total:total_count,onChange:this.changePage}}
          />
        </div>
        {/* 是否冻结弹框 */}
        <Modal
          title="提示"
          visible={visibleReason}
          onOk={this.handleReasonOk}
          onCancel={()=>this.setState({visibleReason:false})}
        >
          <Input placeholder="请输入冻结的理由!" value={reason} onChange={(e)=>this.setState({reason:e.target.value})}/>
        </Modal>
        {/* 是否开起服务商弹窗 */}
        <Modal
          title="提示"
          visible={visibleMoney}
          onOk={this.handleReasonOk}
          onCancel={()=>this.setState({visibleMoney:false})}
        >
          {isServiceProvider ? (<Radio.Group onChange={(e)=>this.setState({money:e.target.value})} value={money}>
            <Radio value={0}>0</Radio>
            <Radio value={3000}>3000</Radio>
            <Radio value={10000}>10000</Radio>
          </Radio.Group>) : '确认关闭服务商（'+currentUser.mobile+')！'}
          
        </Modal>
        {/* 添加会员 */}
        <Modal
          title="添加会员"
          okText="添加会员"
          visible={this.state.addVisible}
          onOk={this.handleAddOk}
          onCancel={()=>this.setState({addVisible:false})}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item {...formItemLayout} label="会员账号">
              {getFieldDecorator('mobile', {
                rules: [{ required: true, message: '请填写手机号或者邮箱' }],
                })(<Input  placeholder="请填写手机号或者邮箱"/>)
              }
            </Item>
            <Item {...formItemLayout} label="登录密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '登录密码不能为空' }],
                })(<Input placeholder="请设置登录密码"/>)
              }
            </Item>
          </Form>
        </Modal>
        {/* 修改会员 */}
        <Modal
          title={editType === 1 ? '修改' : '划转'}
          okText={editType === 1 ? '修改' : '划转'}
          visible={this.state.editVisible}
          onOk={this.handleEditOk}
          onCancel={()=>this.setState({editVisible:false})}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item {...formItemLayout} label="会员账号">
              <Input disabled value={currentUser.mobile}/>
            </Item>
            <Item {...formItemLayout} label="账户">
              <Radio.Group onChange={(e)=>this.setState({goldId:e.target.value})} value={goldId}>
                {goldCoinList.map(item=><Radio value={item.id} key={item.id}>{item.currency_name}</Radio>)}
              </Radio.Group>
            </Item>
            <Item {...formItemLayout} label="金额">
              <Input placeholder="请输入金额" value={goldMoney} onChange={(e)=>this.setState({goldMoney:e.target.value})}/>
            </Item>
            {
              editType === 2 ?  
              (<Item {...formItemLayout} label="原因">
                <Input placeholder="请输入原因" value={editReason} onChange={(e)=>this.setState({editReason:e.target.value})}/>
              </Item>) : ''
            }
           
          </Form>
        </Modal>
        {/* 实名认证 */}
        <Modal
          title="实名认证"
          okText="提交"
          visible={this.state.authVisible}
          onOk={this.handleAuthOk}
          onCancel={()=>this.setState({authVisible:false})}
        >
          <Item {...formItemLayout} label="真实姓名">
            {getFieldDecorator('authName', {
              rules: [{ required: true, message: '请输入真实姓名' }],
              })(<Input  placeholder="请输入真实姓名" />)
            }
          </Item>
          <Item {...formItemLayout} label="身份证号">
            {getFieldDecorator('authIdCard', {
              rules: [{ required: true, message: '请输入身份证号' }],
              })(<Input placeholder="请输入身份证号" />)
            }
          </Item>
        </Modal>
         {/* 注销用户弹窗*/}
         <Modal
          title="注销账号"
          visible={this.state.destroyVisible}
          onOk={this.handleDestroyOk}
          onCancel={()=>this.setState({destroyVisible:false})}
        >
          <Input placeholder="请输入注销的理由!" value={this.state.destroyReason} onChange={(e)=>this.setState({destroyReason:e.target.value})}/>
        </Modal>
      </div>
    )
  }
}

// Form.create()方法返回一个函数，需要一个组件作为参数，返回加工后的组件，最后暴露出去
export default Form.create()(MemberList)