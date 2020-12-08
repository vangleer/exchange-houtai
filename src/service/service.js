import axios from './fetch'

export const reqLogin = ({username,password,code}) => {
  return axios.post("/Admin/Pub/Login/login", {
    user_name:username,
    password,
    verify_code:code
  })
}
// 检查是否登录
export const reqCheckLogin = () => axios.post("/Admin/Home/index")
// 会员列表信息
export const reqMemeberList = ({
  page,
  mobile,
  id_card,
  userId,
  real_name,
  nick_name,
  email,
  sort_by_currency_name,
  sort_by,
}) => {
  return axios.post("Admin/User/userList", {
    page,
    mobile,
    id_card,
    userId,
    real_name,
    nick_name,
    email,
    sort_by_currency_name,
    sort_by,
  })
}
// 是否冻结
export const reqUserProhibition = ({userId,isLock,reason}) => axios.post("/Admin/User/userProhibition", {userId,isLock,reason})
export const	reqChangeServiceProvider = ({userId,isp,money}) => {
  return axios.post("/Admin/User/changeServiceProvider", {
    userId,
    isp,
    money
  })
}
// 添加会员
export const reqUserAdd = ({type,account,password}) => {
  return axios.post("/Admin/User/userAdd", {
    type,
    account,
    password
  })
}
// 获取goldList
export const reqUserListOfGoldCoins = ({userId}) => axios.post("/Admin/User/userListOfGoldCoins", {userId})

//用户充值
export const reqUserTopUp = ({user_currency_id,money}) => axios.post("/Admin/User/userTopUp", {user_currency_id,money})
//用户划转
export const reqTransferCurrency = ({user_id,currency_id,money,note}) => axios.post("/Admin/User/transferCurrency", {user_id,currency_id,money,note})

//实名认证
export const reqAuthUser = ({user_id,id_card,real_name}) => axios.post("/Admin/User/authUser", {user_id,id_card,real_name})
// 是否冻结
export const reqCancelAccount = ({user_id,reason}) => axios.post("/Admin/User/cancelAccount", {user_id,reason})

// 会员行为信息
export const reqMemberBehaviorList = ({mobile,content,page}) => axios.post("/Admin/UserBehavior/userBehaviorList", {mobile,content,page})
//问题反馈列表
export const reqFeedbackList = ({id,page,status,mobile,feedback_type_id,realName}) => {
  return axios.post("/Admin/Feedback/feedbackList",{id,page,status,feedback_type_id,mobile,realName})
} 
// 会员行为信息
export const reqFeedbackDicList = () => axios.post("/Admin/Feedback/feedbackDicList")
// 问题反馈聊天列表
export const reqFeedbackDetails = ({feedbackId}) => axios.post("/Admin/Feedback/feedbackDetails", {feedbackId})
// 问题反馈聊天回复
export const reqFeedbackReply = ({content,feedbackId}) => axios.post("/Admin/Feedback/feedbackReply", {content,feedbackId})
// 删除问题反馈
export const reqFeedbackReplyDel = ({feedbackId}) => axios.post("/Admin/Feedback/feedbackReplyDel", {feedbackId})

// 财务系统, 获取财务统计数据
export const reqStatisticsSum = () => axios.post("/Admin/Statistics/StatisticsSun")
// 获取货币列表
export const reqCurrencyList = () => axios.post("/Admin/UserFinance/currencyList")
// 置换日志列表
export const reqReplacementLogList = ({page,user_id,replacementAccount,order_num,currency_id,status,type,mobile,realName}) => {
  return axios.post("/Admin/UserFinance/ReplacementLogList", {
    user_id,
    replacementAccount,
    order_num,
    currency_id,
    page,
    status,
    type,
    mobile,
    realName
  })
}

// 置换日志变更状态
export const reqReplacementLogUpdate = ({id,type}) => axios.post("/Admin/UserFinance/ReplacementLogUpdate", {id,type})

// 货币日志列表
export const reqCurrencyJournalList = ({page,content,currency_id,type,mobile,realName}) => {
  return axios.post("/Admin/UserFinance/CurrencyJournalList", {
    page,
    currency_id,
    content,
    type,
    mobile,
    realName
  })
}
// 获取银行列表
export const reqBankList = ({name,page}) => axios.post("/Admin/UserFinance/getBankList", {name,page})
// 添加修改银行
export const reqUpdateBank = ({name,logo,id}) => axios.post("/Admin/UserFinance/updateBank", {name,logo,id})

//删除银行
export const reqDeleteBank = ({id}) => axios.post("/Admin/UserFinance/deleteNBank", {id})

// 获取系统配置列表
export const reqConfigList = ({page}) => axios.post("/Admin/SystemConfig/ConfigList", {page})

// 添加系统配置
export const reqAddConfig = ({
  name,
  value,
  desc
}) => axios.post("/Admin/SystemConfig/addConfig", {name,value,desc})

// 修改系统配置
export const reqEditConfig = ({
  name,
  value,
  desc
}) => axios.post("/Admin/SystemConfig/configEdit", {name,value,desc})

export const reqDeleleConfig = ({name}) => axios.post("/Admin/SystemConfig/delConfig", {name})

//热更新
export const reqHotUpdateList = () => axios.post("/Admin/HotUpdate/HotUpdateList", {})
// 修改热更新
export const  reqHotUpdateEdit = ({
  hot_update_id,
  version,
  download_url,
  content
}) => axios.post("/Admin/HotUpdate/HotUpdateEdit", {hot_update_id,version,download_url,content})