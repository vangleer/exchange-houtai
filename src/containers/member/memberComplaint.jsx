import React,{Component} from 'react'
import { Form, Input, Button, Table,message,Modal,Select  } from 'antd'
import {reqFeedbackList,reqFeedbackDetails,reqFeedbackDicList,reqFeedbackReply,reqFeedbackReplyDel} from '../../service/service'
import dayjs from 'dayjs'
const {Item} = Form
const {Option} = Select
export default class MemberComplaint extends Component {
  state = {
    searchForm:{},
    page:1,
    pageInfo:{page: 1,total_count: 0,total_page: 0},
    feedbackTypeList: [],
    visibleReply :false,
    reply:'',
    currentData:{},
    currentFeedbackList:[],
    recoilState: [
      {value: '1', name: '已回复', id: '1'},
      {value: '2', name: '待回复', id: '2'},
    ],
    columns: [
      {title: 'ID',dataIndex: 'id',key: 'id', width: 120},
      {title: '用户账号',dataIndex: 'user_data.mobile',key: 'user_data.mobile', width: 120},
      {title: '反馈者',dataIndex: 'user_data.real_name',key: 'user_data.real_name', width: 200},
      {title: '问题反馈类型',dataIndex: 'currency_name',key: 'currency_name', width: 150},
      {title: '问题反馈内容',dataIndex: 'content',key: 'content', width: 200},
      {title: '反馈图片',dataIndex: 'pic',key: 'pic', width: 150,render: (text,record) => text ? <img src={text} onClick={()=>this.handleLookImg(record)} alt="图片"/> : ''},
      {title: '回复状态',dataIndex: 'status',key: 'status', width: 160,render: (text,record) => {
        if(text === 1) return '已回复'
        if(text === 2) return '待回复'
        if(text === 3) return '已完成'
      }},
      {title: '人工状态',dataIndex: 'chatbot',key: 'chatbot', width: 160,render: (text,record) => {
        if(text === 0) return '已转人工'
        if(text === 1) return '未转人工'
      }},
      {title: '添加时间',dataIndex: 'add_time',key: 'add_time', width: 200},
      {title: '操作',width: 300,
      render:(text,record)=>(
        <div>
          <Button type="primary" onClick={()=>this.getFeedbackDetail(record)}>去回复</Button>
          <Button type="danger" onClick={()=>this.handleDelete(record)}>删除反馈</Button>
        </div>
      )
    },
    ]
  }
  componentDidMount() {
    this.geFeedbackList()
    this.getFeedbackTypeList()
  }
  // 收集表单信息
  handleChange = (type,e) => {
    let searchForm = {...this.state.searchForm}
    searchForm[type] = typeof e === 'object' ? e.target.value : e
    this.setState({searchForm})
  }
  // 获取列表
  geFeedbackList = async () => {
    const {page} = this.state
    const res = await reqFeedbackList({page,...this.state.searchForm})
    console.log(res)
    if(res.status === 1) {
      let pageInfo = res.data.page_info ? res.data.page_info : {page: 1,total_count: 0,total_page: 0}
      this.setState({feedbackTypeList:res.data.list,pageInfo: pageInfo})
    } else message.error(res.msg)
  }
  // 获取反馈列表
  getFeedbackTypeList = async () => {
    const res = await reqFeedbackDicList()
    if(res.status === 1) {
      this.setState({feedbackTypeList:res.data})
    }
  }
  getFeedbackDetail = async (record) => {
    this.setState({currentData:record,visibleReply:true})
    const res = await reqFeedbackDetails({feedbackId:record.id})
    if(res.status === 1) {
      this.setState({currentFeedbackList:res.data})
    }
    console.log(res)
  }
  // 搜索
  handleSearch = (e) => {
    console.log(this.state.searchForm)
    this.geFeedbackList()
    e.preventDefault()
  }
  // 分页改变
  changePage = (page) => {
    this.setState({page})
    setTimeout(()=>{
      this.geFeedbackList()
    },100)
  }
  // 回复反馈
  handleReplySend = async () => {
    const {currentData,reply} = this.state
    if(reply.trim().length < 1) return
    const res = await reqFeedbackReply({content:reply,feedbackId:currentData.id})
    if(res.status === 1) {
      this.setState({reply:''})
      this.getFeedbackDetail(currentData)
    } else message.error(res.msg)
  }
  // 删除反馈
  handleDelete = (record) => {
    Modal.confirm({
      title: '提示',
      content: '是否确定删除?',
      onOk:async () => {
        const res = await reqFeedbackReplyDel({feedbackId:record.id})
        if(res.status === 1) {
          message.success(res.msg)
          this.geFeedbackList()
        } else message.error(res.msg)
      }
    })
  }
  handleLookImg = (record) => {
    Modal.success({
      title: '预览图片',
      content: <img style={{width:'100%'}} src={record.pic} alt="大图"/>,
      width:'500px',
      onOk: () => {
       console.log('啦啦啦啦')
      }
    })
  } 
  render() {
    const {searchForm,visibleReply,currentFeedbackList,recoilState,feedbackTypeList,reply} = this.state
    const {total_count} = this.state.pageInfo
    return (
      <div className="member-behavior">
        <div className="card">
          <div className="card-head">
            <Form layout="inline" onSubmit={this.handleSearch}>
              <Item label="反馈id"><Input placeholder="反馈id" value={searchForm.id} onChange={(e)=>this.handleChange('id',e)}/></Item>
              <Item label="用户姓名"><Input placeholder="用户姓名" value={searchForm.realName} onChange={(e)=>this.handleChange('realName',e)}/></Item>
              <Item label="用户账号"><Input placeholder="用户账号" value={searchForm.mobile} onChange={(e)=>this.handleChange('mobile',e)}/></Item>
              <Item label="回复状态">
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value)=>this.handleChange('status',value)}>
                {recoilState.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
              </Item>
              <Item label="反馈类型">
                <Select defaultValue="全部" style={{ width: 120 }} onChange={(value)=>this.handleChange('feedback_type_id',value)}>
                  {feedbackTypeList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
                </Select>  
              </Item>
              <Item><Button type="primary" htmlType="submit">搜索</Button></Item>
            </Form>
          </div>
          <div className="card-body">
          <Table 
            dataSource={this.state.feedbackTypeList} 
            columns={this.state.columns}
            bordered
            rowKey="id"
            pagination={{pageSize:10,total:total_count,onChange:this.changePage}}
          />
          </div>
        </div>
        {/* 反馈详情*/}
        <Modal
          title="回复详情"
          visible={visibleReply}
          okText="返回"
          cancelText=""
          onCancel={()=>this.setState({visibleReply:false})}
          onOk={()=>this.setState({visibleReply:false})}
        >
          <div className="reply">
            <div className="reply-content">
              {currentFeedbackList.map(item=>(
                <div className="reply-item" key={item.id}>
                  <div className="reply-item-time">{dayjs(item.add_time*1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                  {
                    item.send_user_id === 0 ? (
                      <div className="reply-item-box left">
                        <div className="reply-item-text" dangerouslySetInnerHTML={{__html:item.content}}></div>
                      </div>) : ''
                  }
                  {
                    item.send_user_id !== 0 ? (
                    <div className="reply-item-box right">
                      <div className="reply-item-text" dangerouslySetInnerHTML={{__html:item.content}}></div>
                    </div>) : ''
                  }
                </div>
              ))}
              
            </div>
            <div className="reply-box">
              <Input value={reply} onChange={(e)=>this.setState({reply:e.target.value})}/>
              <Button type="primary" onClick={this.handleReplySend}>发送</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
