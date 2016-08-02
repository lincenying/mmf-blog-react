import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {globals} from './globals'
import {article} from './article'
import {admin} from './admin'

export default combineReducers({
    globals,
    article,
    admin,
    routing: routerReducer,
})
