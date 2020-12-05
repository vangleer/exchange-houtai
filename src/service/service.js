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
//问题反馈聊天列表
export const reqFeedbackDetails = ({feedbackId}) => axios.post("/Admin/Feedback/feedbackDetails", {feedbackId})
//问题反馈聊天回复
export const reqFeedbackReply = ({content,feedbackId}) => axios.post("/Admin/Feedback/feedbackReply", {content,feedbackId})
// 删除问题反馈
export const reqFeedbackReplyDel = ({feedbackId}) => axios.post("/Admin/Feedback/feedbackReplyDel", {feedbackId})