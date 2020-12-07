import React,{Component} from 'react'
import { Form, Input, Button, Table,message,Select,Modal} from 'antd'
import {reqCurrencyList,reqReplacementLogList,reqReplacementLogUpdate} from '../../service/service'
import dayjs from 'dayjs'
const {Item} = Form
const {Option} = Select
export default class ReplacementLogList extends Component {
  state = {
    searchForm:{},
    page:1,
    pageInfo:{page: 1,total_count: 0,total_page: 0},
    typeList: [
      {value: '1', name: '转入', id: '1'},
      {value: '2', name: '转出', id: '2'},
    ],
    stateList: [
      {value: '1', name: '成功', id: '1'},
      {value: '2', name: '发起中', id: '2'},
      {value: '3', name: '失败', id: '2'},
      {value: '4', name: '待审核', id: '2'},
    ],
    currencyList:[],
    replacementLogList:[],
    userId:'',
    columns: [
      {title: '订单号',dataIndex: 'order_num',key: 'order_num', width: 280},
      {title: '姓名',dataIndex: 'user_data.real_name',key: 'user_data.real_name', width: 120},
      {title: '会员账号',dataIndex: 'user_data.mobile',key: 'user_data.mobile', width: 200},
      {title: '币种',dataIndex: 'currency_name',key: 'currency_name', width: 150},
      {title: '数量',dataIndex: 'num',key: 'num', width: 200},
      {title: '类型',dataIndex: 'type',key: 'type', width: 100,render: (text) => {
        if (text === 1) return '转入'
        if (text !== 1) return '待回复'
      }},
      {title: '状态',dataIndex: 'status',key: 'status', width: 100,render: (text,record) => {
        if (text === 1) return '成功'
        if (text === 6) return '发起中'
        if (text === 0 && record.currency_id === 2) return '待审核'
      }},
      {title: '返回值',dataIndex: 'res',key: 'res', width: 200},
      {title: '交易时间 ',dataIndex: 'add_time',key: 'add_time',render:text=>dayjs(text*1000).format('YYYY-MM-DD HH:mm:ss'), width: 200},
      {title: '操作',width: 220,
        render:(text,record)=>(
          <div>
            {
              (record.currency_id === 2 && record.type === 2 && record.status === 0) ? <Button type="primary" onClick={()=>this.handleOperate(record,1)}>通过</Button> : ''
            }
            {
              (record.currency_id === 2 && record.type === 2 && record.status === 0) ? <Button type="danger" onClick={()=>this.handleOperate(record,2)}>拒绝</Button> : ''
            }
          </div>
        )
      },
    ]
  }
  componentDidMount() {
    this.getReplacementLogList()
    this.getCurrencyList()
  }
  // 收集表单信息
  handleChange = (type,e) => {
    let searchForm = {...this.state.searchForm}
    searchForm[type] = typeof e === 'object' ? e.target.value : e
    this.setState({searchForm})
  }
  // 获取列表
  getReplacementLogList = async () => {
    const {page,searchForm,userId} = this.state
    const res = await reqReplacementLogList({
      page: page,
      user_id: userId,
      type: searchForm.type,
      order_num: searchForm.orderNum,
      currency_id: searchForm.currencyId,
      mobile: searchForm.mobile,
      realName: searchForm.realName,
      status: searchForm.state,
      replacementAccount: searchForm.replacementAccount,
    })
    console.log(res)
    if(res.status === 1) {
      let pageInfo = res.data.page_info ? res.data.page_info : {page: 1,total_count: 0,total_page: 0}
      this.setState({replacementLogList:res.data.list,pageInfo: pageInfo})
    } else message.error(res.msg)
  }
  // 获取货币列表
  getCurrencyList = async () => {
    const res = await reqCurrencyList()
    console.log(res)
    if(res.status === 1) {
      this.setState({currencyList:res.data})
    }
  }
  // 搜索
  handleSearch = (e) => {
    console.log(this.state.searchForm)
    this.getReplacementLogList()
    e.preventDefault()
  }
  // 分页改变
  changePage = (page) => {
    this.setState({page})
    setTimeout(()=>{
      this.getReplacementLogList()
    },100)
  }
  // 操作
  handleOperate = (record,type) => {
    Modal.confirm({
      title: '提示',
      content: '是否确定通过服务商提币申请? ',
      okText: '确定',
      okType: 'primary',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqReplacementLogUpdate({id:record.id,type})
        if(res.status === 1) {
          message.success(res.msg)
          this.getReplacementLogList()
        }
        else message.error(res.msg)
      }
    })
  }
  render() {
    const {searchForm,typeList,replacementLogList,stateList,currencyList} = this.state
    const {total_count} = this.state.pageInfo
    return (
      <div className="member-behavior">
        <div className="card">
          <div className="card-head">
            <Form layout="inline" onSubmit={this.handleSearch}>
              <Item label="会员账号"><Input placeholder="会员账号" value={searchForm.mobile} onChange={(e)=>this.handleChange('mobile',e)}/></Item>
              <Item label="真实姓名"><Input placeholder="真实姓名" value={searchForm.realName} onChange={(e)=>this.handleChange('realName',e)}/></Item>
              <Item label="订单号"><Input placeholder="订单号" value={searchForm.orderNum} onChange={(e)=>this.handleChange('orderNum',e)}/></Item>
              <Item label="置换账号"><Input placeholder="置换账号" value={searchForm.replacementAccount} onChange={(e)=>this.handleChange('replacementAccount',e)}/></Item>
              <Item label="类型">
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value)=>this.handleChange('type',value)}>
                {typeList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
              </Item>
              <Item label="状态">
              <Select defaultValue="全部" style={{ width: 120 }} onChange={(value)=>this.handleChange('state',value)}>
                {stateList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
              </Item>
              <Item label="币种">
                <Select defaultValue="全部" style={{ width: 120 }} onChange={(value)=>this.handleChange('currencyId',value)}>
                  {currencyList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
                </Select>  
              </Item>
              <Item><Button type="primary" htmlType="submit">搜索</Button></Item>
            </Form>
          </div>
          <div className="card-body">
            <Table 
              dataSource={replacementLogList} 
              columns={this.state.columns}
              bordered
              rowKey="id"
              loading={replacementLogList.length === 0}
              pagination={{pageSize:10,total:total_count,onChange:this.changePage}}
            />
          </div>
        </div>
      </div>
    )
  }
}