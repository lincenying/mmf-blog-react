import {
    combineReducers
} from 'redux'
import {
    routerReducer
} from 'react-router-redux'
import {
    funcGlobal
} from './globals'
import {
    funcCounter
} from './counter'

export default combineReducers({
    funcGlobal,
    funcCounter,
    routing: routerReducer,
})
