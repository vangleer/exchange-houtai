import {createStore} from 'redux'
import {saveUser} from './reducers'

export default createStore(saveUser)