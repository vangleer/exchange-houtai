import React,{Component} from 'react'
import { Form, Input, Button, Table,message,Modal,Upload,Icon} from 'antd'
import {reqDeleteBank,reqUpdateBank,reqBankList} from '../../service/service'
const {Item} = Form
export default class BankList extends Component {
  state = {
    searchForm:{},
    page:1,
    pageInfo:{page: 1,total_count: 0,total_page: 0},
    bankList:[],
    loading:false,
    addVisible:false,
    currentBank:{},
    imageUrl:'',
    addBankName:'',
    token:localStorage.getItem('token'),
    operType:'add',
    columns: [
      {title: '银行ID',dataIndex: 'id',key: 'id',align:'center', width: 150},
      {title: '银行名称',dataIndex: 'name',key: 'name',align:'center', width: 200},
      {title: '图片',dataIndex: 'logo',key: 'logo',align:'center', width: 150,render: (text) => <img src={text} alt="图片"/>},
      {title: '操作',align:'center',width: 220,
        render:(text,record)=>(
          <div>
            <Button type="primary" onClick={()=>this.setState({currentBank:record,addBankName:record.name,imageUrl:record.logo,addVisible:true,operType:'edit'})}>修改</Button>
            <Button type="danger" onClick={()=>this.handleDelete(record,2)}>删除</Button>
          </div>
        )
      },
     
    ]
  }
  componentDidMount() {
    this.getBankList()
  }
  // 收集表单信息
  handleChange = (type,e) => {
    let searchForm = {...this.state.searchForm}
    searchForm[type] = typeof e === 'object' ? e.target.value : e
    this.setState({searchForm})
  }
  // 获取列表
  getBankList = async () => {
    this.setState({loading:true})
    const {page,searchForm} = this.state
    const res = await reqBankList({
      page: page,
      name:searchForm.bankName,
    })
    if(res.status === 1) {
      let pageInfo = res.data.data ? res.data.data : {page: 1,total_count: 0,total_page: 0}
      this.setState({bankList:res.data.list,pageInfo: pageInfo,loading:false})
    } else message.error(res.msg)
  }
  // 搜索
  handleSearch = (e) => {
    console.log(this.state.searchForm)
    this.getBankList()
    e.preventDefault()
  }
  // 分页改变
  changePage = (page) => {
    this.setState({page})
    setTimeout(()=>{
      this.getBankList()
    },100)
  }
  // 上传文件状态改变
  handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      this.setState({imageUrl:info.file.response.data.url})
    }
  }
  // 点击添加
  handleAddOk = async () => {
    const {imageUrl,addBankName,currentBank} = this.state
    if(addBankName.length < 1) return message.error('请输入银行名称')
    if(imageUrl.length < 1) return message.error('请上传银行logo')
    const res = await reqUpdateBank({name:addBankName,logo:imageUrl,id:currentBank.id})
    if(res.status === 1) {
      message.success(res.msg)
      this.setState({addBankName:'',imageUrl:'',currentBank:{},addVisible:false})
      this.getBankList()
    } else message.error(res.msg)
  }
  handleDelete = (record) => {
    Modal.confirm({
      title: '提示',
      content: '是否继续删除?',
      okText: '确定',
      okType: 'warning',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleteBank({id:record.id})
        if(res.status === 1) {
          message.success(res.msg)
          this.getBankList()
        } else message.error(res.msg)
      }
    })
  }
  render() {
    const {searchForm,bankList,loading,addVisible,imageUrl,addBankName,token,operType} = this.state
    const {total_count} = this.state.pageInfo
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="member-behavior">
        <div className="card">
          <div className="card-head">
            <Form layout="inline" onSubmit={this.handleSearch}>
              <Item label="银行名称"><Input placeholder="银行名称" style={{width:'300px'}} value={searchForm.bankName} onChange={(e)=>this.handleChange('bankName',e)}/></Item>
              <Item><Button type="primary" htmlType="submit">搜索</Button></Item>
              <Item><Button type="primary" onClick={()=>this.setState({addVisible:true,operType:'add'})}>添加银行</Button></Item>
            </Form>
          </div>
          <div className="card-body">
            <Table 
              dataSource={bankList} 
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
          title={operType!=='add'?'修改银行':'添加银行'}
          okText={operType!=='add'?'修改':'添加'}
          okType="primary"
          cancelText="取消"
          visible={addVisible}
          onOk={this.handleAddOk}
          onCancel={()=>this.setState({addVisible:false})}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item label="银行名称">
              <Input  placeholder="请填写银行名称" value={addBankName} onChange={(e)=> this.setState({addBankName:e.target.value})}/>
            </Item>
            <Item label="银行logo">
              <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={'http://exchangen.52jzsj.com/admin/CommonApi/addOss'}
                  data={{token:token}}
                  onChange={this.handleUploadChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}