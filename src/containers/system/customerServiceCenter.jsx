import React,{Component} from 'react'
import { Form, Input, Button, Table,message,Modal} from 'antd'
import {reqHotUpdateList,reqHotUpdateEdit} from '../../service/service'
import dayjs from 'dayjs'
const {Item} = Form
export default class CustomerServiceCenter extends Component {
  state = {
    list:[],
    loading:false,
    hotUpdateId:'',
    version:'',
    downloadAddr:'',
    content:'',
    editVisible:false,
    columns: [
      {title: '名称',dataIndex: 'name',key: 'name',align:'center', width: 150},
      {title: '版本号',dataIndex: 'version',key: 'version',align:'center', width: 200},
      {title: '下载地址',dataIndex: 'download_url',key: 'download_url',align:'center', width: 150},
      {title: '更新内容',dataIndex: 'content',key: 'content',align:'center', width: 150},
      {title: '更新时间',dataIndex: 'up_time',key: 'up_time',align:'center', width: 150,render:text=>dayjs(text*1000).format('YYYY-MM-DD HH:mm:ss')},
      {title: '操作',align:'center',width: 220,
        render:(text,record)=><Button type="primary" onClick={()=>this.setState({editVisible:true,version:record.version,downloadAddr:record.download_url,content:record.content,hotUpdateId:record.id})}>修改</Button>
      },
    ]
  }
  componentDidMount() {
    this.getList()
  }
  getList = async () => {
    this.setState({loading:true})
    const res = await reqHotUpdateList()
    if(res.status === 1) {
      this.setState({list:res.data,loading:false})
    } else {
      message.error(res.msg)
      this.setState({loading:false})
    }
  }
  handleEditOk = async () => {
    const {version,content,downloadAddr,hotUpdateId} = this.state
    if(version.length < 1) return message.error('请输入版本号')
    if(content.length < 1) return message.error('请输入下载地址')
    if(downloadAddr.length < 1) return message.error('请输入更新内容')
    const res = await reqHotUpdateEdit({
      hot_update_id:hotUpdateId,
      version,
      download_url:downloadAddr,
      content
    })
    if(res.status === 1) {
      message.success(res.msg)
      this.setState({version:'',content:'',downloadAddr:'',hotUpdateId:'',editVisible:false})
      this.getList()
    } else {
      message.error(res.msg)
    }
  }
  render() {
    const {list,loading,editVisible,version,content,downloadAddr} = this.state
    const formItemLayout = {labelCol: { span: 6 },wrapperCol: { span: 16 }}
    return (
      <div className="doc">
        <div className="card">
          <div className="card-body">
            <Table 
              dataSource={list} 
              columns={this.state.columns}
              bordered
              rowKey="id"
              loading={loading}
            />
          </div>
        </div>
         {/* 修改 */}
         <Modal
          title='修改'
          okText='修改'
          okType="primary"
          cancelText="取消"
          visible={editVisible}
          onOk={this.handleEditOk}
          onCancel={()=>this.setState({editVisible:false})}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item label="版本号" {...formItemLayout}>
              <Input value={version} onChange={(e)=> this.setState({version:e.target.value})}/>
            </Item>
            <Item label="下载地址" {...formItemLayout}>
              <Input value={downloadAddr} onChange={(e)=> this.setState({downloadAddr:e.target.value})}/>
            </Item>
            <Item label="更新内容" {...formItemLayout}>
              <Input  value={content} onChange={(e)=> this.setState({content:e.target.value})}/>
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}