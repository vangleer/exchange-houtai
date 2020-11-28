import { init } from "echarts"

import {SAVE_USER} from './action-types.js'
const initUserState = {
  isLogin:false,
  user:{},
  token:''
}
export const saveUser = (preUserState = initUserState,action) => {
  const {type,data} = action
  let userState
  switch(type) {
    case SAVE_USER :
      userState = data
      return userState
    default :
      return preUserState
  }
}