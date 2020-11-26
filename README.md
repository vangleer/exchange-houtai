# 共享数据后台管理系统

# React 项目 --- 开发环境的配置

## 初始化项目

- 下载脚手架： npm i -g create-react-app
- 使用脚手假初始化项目： create-react-app 项目名
- 切换到项目： cd 项目名
- 启动项目： npm start
- 删除一些不必要的文件

## ant-design 配置

- 下载 ant-design： npm i antd
- 配置按需加载
  1. 下载 npm i react-app-rewired customize-cra babel-plugin-import
  2. 修改 package.json

```javascript
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test"
}
```

3. 项目根目录创建一个 config-overrides.js 用于修改默认配置。

```javascript
const { override, fixBabelImports } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
)
```

4. 启动项目测试按需加载

## 自定义 antd 主题

- npm i less@2.7.3 less-loader5.0.0 --save (版本不要错了。。。,如果不行单独加载这两个, 先下载 less)
- 修改 config-overrides.js 文件

```javascript
const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // 设置为true
  }),
  // 添加loader
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': 'red' }, // 修改主题颜色
  })
)
```

## 配置 redux

- 下载： npm i react-redux redux redux-thunk
- 创建 redux 文件夹 文件目录
  ```
  redux -|
    action.js  -- 定义了一些操作类型，告诉store自己是干什么的
    store.js -- 一切操作还是基于Store 的。类似于中央集权
    reducers.js -- 操作state
    action_types.js -- 这写常量一般都定义在actionTpye文件中
  ```
- action.js

  ```javascript
  import { ADDCOUNT, MINUSCOUNT, SETNAME } from './action_types'

  //包含所有的action creator
  export const addCountCreater = (count) => ({ type: ADDCOUNT, data: count })
  export const minusCountCreater = (count) => ({
    type: MINUSCOUNT,
    data: count,
  })
  export const addCountAsync = (count) => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(addCountCreater(count))
      }, 2000)
    }
  }

  // 操作姓名
  export const setNameCreater = (name) => ({ type: SETNAME, data: name })
  ```

- store.js

  ```javascript
  import { createStore, applyMiddleware } from 'redux'
  import { finalReducer } from './reducers'
  import thunk from 'redux-thunk'
  //生成store对象
  const store = createStore(finalReducer, applyMiddleware(thunk)) //内部会第一次调用reducer函数，得到初始state

  export default store
  ```

- reducers.js

  ```javascript
  //包含n个reducer函数的模块
  import { ADDCOUNT, MINUSCOUNT, SETNAME } from './action_types'
  import { combineReducers } from 'redux'
  function addCount(state = 0, action) {
    //形参默认值
    console.log('reducers----' + action.data)
    let newState
    switch (action.type) {
      case ADDCOUNT:
        newState = state + action.data
        return newState
      case MINUSCOUNT:
        newState = state - action.data
        return newState
      default:
        return state
    }
  }
  function setName(state = '黄万通', action) {
    switch (action.type) {
      case SETNAME:
        return action.data
      default:
        return state
    }
  }

  export const finalReducer = combineReducers({
    addCount,
    setName,
  })
  ```

- action_types

  ```javascript
  export const ADDCOUNT = 'addCount'
  export const MINUSCOUNT = 'minusCount'
  export const SETNAME = 'setName'
  ```

- 在 index.js 里添加一些代码
  ```javascript
  import { Provider } from 'react-redux' // 导入react-redux为我们准备好的容器
  import store from './redux/store' // 导入store
  ReactDOM.render(
    /* 使用Provider把App包裹起来并把store传过去 */
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
  ```
- 创建容器组件文件夹 containers (count.jsx)

  ```javascript
  // 导入react
  import React from 'react'
  // 导入react-redux
  import { connect } from 'react-redux'
  // 导入action方法
  import {
    addCountCreater,
    addCountAsync,
    minusCountCreater,
    setNameCreater,
  } from '../redux/action'
  class Count extends React.Component {
    // 测试是否接收到属性
    componentWillMount() {
      console.log(this.props)
    }

    render() {
      // 获取count状态
      const { count } = this.props
      return <div>{count}</div>
    }
  }
  // 这一步是把普通组件变成容器组件的关键
  export default connect(
    // 使用connect方法，它接收的参数就是传到state中的状态
    (state) => ({
      count: state.addCount,
      name: state.setName,
    }),
    { addCountCreater, addCountAsync, minusCountCreater, setNameCreater }
  )(Count) // 把Count组件挂载上去
  ```
