import React,{Component} from 'react'
import { Form, Input, Button, Table, Switch,message,Modal } from 'antd'
import {reqMemberBehaviorList,reqUserProhibition} from '../../service/service'
const {Item} = Form
export default class MemberBehavior extends Component {
  state = {
    mobile:'',
    content:'',
    page:1,
    pageInfo:{page: 1,total_count: 0,total_page: 0},
    memberBehaviorList:[],
    visibleReason:false,
    reason:'',
    loading:false,
    currentUser:{},
    columns: [
      {title: '会员ID',dataIndex: 'id',key: 'id', width: 80},
      {title: '会员账号',dataIndex: 'mobile',key: 'mobile', width: 120},
      {title: '行为类型',dataIndex: 'type',key: 'type', width: 200},
      {title: '行为内容',dataIndex: 'content',key: 'content', width: 150},
      {title: '是否冻结',dataIndex: 'is_lock',key: 'is_lock', width: 100,
        render:(text,record)=>(
          <Switch  onChange={(value)=>this.handleSwitchChange(record,value)} checked={text} />
        )
      },
      {title: '参数列表',dataIndex: 'parameters',key: 'parameters', width: 200,ellipsis: true},
      {title: '管理员',dataIndex: 'admin_name',key: 'admin_name', width: 150},
      {title: '时间',dataIndex: 'timestamp',key: 'timestamp', width: 160},
    ]
  }
  componentDidMount() {
    this.getMemberBehaviorList()
  }
  // 获取列表
  getMemberBehaviorList = async () => {
    this.setState({loading:true})
    const {mobile,content,page} = this.state
    const res = await reqMemberBehaviorList({mobile,content,page})
    if(res.status === 1) {
      let pageInfo = res.data.page_info ? res.data.page_info : {page: 1,total_count: 0,total_page: 0}
      this.setState({memberBehaviorList:res.data.list,pageInfo: pageInfo,loading:false})
    } {
      message.error(res.msg)
      this.setState({loading:false})
    }
  }
  // 搜索
  handleSearch = (e) => {
    this.getMemberBehaviorList()
    e.preventDefault()
  }
  // 分页改变
  changePage = (page) => {
    this.setState({page})
    setTimeout(()=>{
      this.getMemberBehaviorList()
    },100)
  }
  // 解冻功能
  handleSwitchChange = (record,value) => {
    console.log(record)
    // 保存当前会员
    this.setState({currentUser:record,visibleReason:true})
  }
  handleReasonOk = async () => {
    const {currentUser,reason} = this.state
    const res = await reqUserProhibition({userId:currentUser.id,isLock:currentUser.is_lock?0:1,reason})
    if(res.status === 1) {
      message.success(res.msg)
      this.setState({visibleReason:false,reason:''})
      this.getMemberBehaviorList()
    } else message.error(res.msg)
  }
  render() {
    const {mobile,content,reason,visibleReason,currentUser,loading} = this.state
    const {total_count} = this.state.pageInfo
    return (
      <div className="doc">
        <div className="card">
          <div className="card-head">
            <Form layout="inline" onSubmit={this.handleSearch}>
              <Item label="会员账号"><Input placeholder="会员账号" value={mobile} onChange={(e)=>this.setState({mobile:e.target.value})}/></Item>
              <Item label="搜索内容"><Input placeholder="搜索内容" value={content} onChange={(e)=>this.setState({content:e.target.value})}/></Item>
              <Item><Button type="primary" htmlType="submit">搜索</Button></Item>
            </Form>
          </div>
          <div className="card-body">
          <Table 
            dataSource={this.state.memberBehaviorList} 
            columns={this.state.columns}
            bordered
            rowKey="id"
            loading={loading}
            pagination={{pageSize:10,total:total_count,onChange:this.changePage}}
          />
          </div>
        </div>
        {/* 是否冻结弹框 */}
        <Modal
          title="提示"
          visible={visibleReason}
          onOk={this.handleReasonOk}
          onCancel={()=>this.setState({visibleReason:false})}
        >
          <Input placeholder={currentUser.is_lock ? "请输入解冻的理由!":"请输入冻结的理由!"}  value={reason} onChange={(e)=>this.setState({reason:e.target.value})}/>
        </Modal>
      </div>
    )
  }
}