import React,{Component} from 'react'
import { Form, Input, Button, Table,message,Select,Modal} from 'antd'
import {reqCurrencyList,reqReplacementLogUpdate,reqCurrencyJournalList} from '../../service/service'
import dayjs from 'dayjs'
const {Item} = Form
const {Option} = Select
export default class CurrencyJournalList extends Component {
  state = {
    searchForm:{},
    page:1,
    pageInfo:{page: 1,total_count: 0,total_page: 0},
    typeList: [
      { value: '2',name: '支出',id:"2"},
      { value: '1',name: '收入',id:"1"}
    ],
    currencyList:[],
    currencyJournalList:[],
    loading:false,
    columns: [
      {title: '姓名',dataIndex: 'user_data.real_name',key: 'user_data.real_name', width: 150},
      {title: '会员账号',dataIndex: 'user_data.mobile',key: 'user_data.mobile', width: 200},
      {title: '币种',dataIndex: 'currency_name',key: 'currency_name', width: 150},
      {title: '金额',dataIndex: 'money',key: 'money', width: 200},
      {title: '余额',dataIndex: 'balance',key: 'balance', width: 200},
      {title: '类型',dataIndex: 'type',key: 'type', width: 100,render: (text) => {
        if (text === 2) return '支出'
        if (text !== 2) return '收入'
      }},
      {title: '内容',dataIndex: 'content',key: 'content', width: 200},
      {title: '交易时间 ',dataIndex: 'add_time',key: 'add_time',render:text=>dayjs(text*1000).format('YYYY-MM-DD HH:mm:ss'), width: 200}
    ]
  }
  componentDidMount() {
    this.getCurrencyJournalList()
    this.getCurrencyList()
  }
  // 收集表单信息
  handleChange = (type,e) => {
    let searchForm = {...this.state.searchForm}
    searchForm[type] = typeof e === 'object' ? e.target.value : e
    this.setState({searchForm})
  }
  // 获取列表
  getCurrencyJournalList = async () => {
    this.setState({loading:true})
    const {page,searchForm} = this.state
    const res = await reqCurrencyJournalList({
      page: page,
      content:searchForm.content,
      type: searchForm.type,
      currency_id: searchForm.currencyId,
      mobile: searchForm.mobile,
      realName: searchForm.realName
    })
    console.log(res)
    if(res.status === 1) {
      let pageInfo = res.data.page_info ? res.data.page_info : {page: 1,total_count: 0,total_page: 0}
      this.setState({currencyJournalList:res.data.list,pageInfo: pageInfo,loading:false})
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
    this.getCurrencyJournalList()
    e.preventDefault()
  }
  // 分页改变
  changePage = (page) => {
    this.setState({page})
    setTimeout(()=>{
      this.getCurrencyJournalList()
    },100)
  }
  render() {
    const {searchForm,typeList,currencyJournalList,currencyList,loading} = this.state
    const {total_count} = this.state.pageInfo
    return (
      <div className="member-behavior">
        <div className="card">
          <div className="card-head">
            <Form layout="inline" onSubmit={this.handleSearch}>
              <Item label="会员账号"><Input placeholder="会员账号" value={searchForm.mobile} onChange={(e)=>this.handleChange('mobile',e)}/></Item>
              <Item label="真实姓名"><Input placeholder="真实姓名" value={searchForm.realName} onChange={(e)=>this.handleChange('realName',e)}/></Item>
              <Item label="内容"><Input placeholder="内容" value={searchForm.content} onChange={(e)=>this.handleChange('content',e)}/></Item>
              <Item label="类型">
                <Select defaultValue="全部" style={{ width: 120 }} onChange={(value)=>this.handleChange('type',value)}>
                  {typeList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
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
              dataSource={currencyJournalList} 
              columns={this.state.columns}
              bordered
              rowKey="id"
              loading={loading}
              pagination={{pageSize:10,total:total_count,onChange:this.changePage}}
            />
          </div>
        </div>
      </div>
    )
  }
}