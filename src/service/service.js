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