import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {article} from './article'
import {globals} from './globals'

export default combineReducers({
    article,
    globals,
    routing: routerReducer,
})
