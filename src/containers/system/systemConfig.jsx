import React,{Component} from 'react'
import { Form, Input, Button, Table,message,Modal} from 'antd'
import {reqDeleleConfig,reqEditConfig,reqConfigList,reqAddConfig} from '../../service/service'
const {Item} = Form
export default class SystemConfig extends Component {
  state = {
    searchForm:{},
    page:1,
    pageInfo:{page: 1,total_count: 0,total_page: 0},
    configList:[],
    loading:false,
    addVisible:false,
    currentConfig:{},
    configValue:'',
    addConfigName:'',
    configDesc:'',
    operType:'add',
    columns: [
      {title: 'ID',dataIndex: 'name',key: 'name',align:'center', width: 150},
      {title: '配置的val值',dataIndex: 'value',key: 'value',align:'center', width: 200},
      {title: '描述',dataIndex: 'desc',key: 'desc',align:'center', width: 150},
      {title: '操作',align:'center',width: 220,
        render:(text,record)=>(
          <div>
            <Button type="primary" onClick={
              ()=>this.setState({
                  currentConfig:record,
                  addConfigName:record.name,
                  configValue:record.value,
                  configDesc:record.desc,
                  addVisible:true,
                  operType:'edit'})}
                >
                  修改
                </Button>
            <Button type="danger" onClick={()=>this.handleDelete(record,2)}>删除</Button>
          </div>
        )
      },
    ]
  }
  componentDidMount() {
    this.getConfigList()
  }
  // 获取列表
  getConfigList = async () => {
    this.setState({loading:true})
    const {page} = this.state
    const res = await reqConfigList({page: page})
    if(res.status === 1) {
      let pageInfo = res.data.page_info ? res.data.page_info : {page: 1,total_count: 0,total_page: 0}
      this.setState({configList:res.data.list,pageInfo: pageInfo,loading:false})
    } else {
      message.error(res.msg)
      this.setState({loading:false})
    }
  }
  // 分页改变
  changePage = (page) => {
    this.setState({page})
    setTimeout(()=>{
      this.getConfigList()
    },100)
  }
  // 点击添加
  handleAddOk = async () => {
    const {configValue,configDesc,addConfigName,operType} = this.state
    if(addConfigName.length < 1) return message.error('请输入配置ID')
    if(configValue.length < 1) return message.error('请输入配置的val值')
    if(configDesc.length < 1) return message.error('请输入配置描述')
    let res
    if(operType === 'add') { // 添加
      res = await reqAddConfig({name:addConfigName,value:configValue,desc:configDesc})
    } else { // 修改
      res = await reqEditConfig({name:addConfigName,value:configValue,desc:configDesc})
    }
    if(res.status === 1) {
      message.success(res.msg)
      this.setState({configValue:'',configDesc:'',addConfigName:{},addVisible:false})
      this.getConfigList()
    } else message.error(res.msg)
  }
  // 点击删除
  handleDelete = (record) => {
    Modal.confirm({
      title: '提示',
      content: '是否继续删除?',
      okText: '确定',
      okType: 'warning',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleleConfig({name:record.name})
        if(res.status === 1) {
          message.success(res.msg)
          this.getConfigList()
        } else message.error(res.msg)
      }
    })
  }
  render() {
    const {configList,loading,addVisible,configValue,configDesc,addConfigName,operType} = this.state
    const {total_count} = this.state.pageInfo
    const formItemLayout = {labelCol: { span: 6 },wrapperCol: { span: 16 }}
    return (
      <div className="doc">
        <div className="card">
          <div className="card-head">
            <Button type="primary" onClick={()=>this.setState({addConfigName:'',configValue:'',configDesc:'',addVisible:true,operType:'add'})}>添加银行</Button>
          </div>
          <div className="card-body">
            <Table 
              dataSource={configList} 
              columns={this.state.columns}
              bordered
              rowKey="id"
              loading={loading}
              pagination={{pageSize:10,total:total_count,onChange:this.changePage}}
            />
          </div>
        </div>
        {/* 添加银行 */}
        <Modal
          title={operType!=='add'?'修改':'添加'}
          okText={operType!=='add'?'修改':'添加'}
          okType="primary"
          cancelText="取消"
          visible={addVisible}
          onOk={this.handleAddOk}
          onCancel={()=>this.setState({addVisible:false})}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item label="ID" {...formItemLayout}>
              <Input disabled={operType!=='add'} placeholder="ID" value={addConfigName} onChange={(e)=> this.setState({addConfigName:e.target.value})}/>
            </Item>
            <Item label="配置的val值" {...formItemLayout}>
              <Input placeholder="配置的val值" value={configValue} onChange={(e)=> this.setState({configValue:e.target.value})}/>
            </Item>
            <Item label="描述" {...formItemLayout}>
              <Input placeholder="描述" value={configDesc} onChange={(e)=> this.setState({configDesc:e.target.value})}/>
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}