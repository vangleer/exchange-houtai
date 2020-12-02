import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Admin from './containers/admin.jsx'
import Login from './containers/login.jsx'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Route path="/login" component={Login}/>
        <Redirect to="/admin/home"/>  
      </Switch>
    </div>
  )
}
export default App
