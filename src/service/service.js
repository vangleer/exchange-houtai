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