import {
    INCREMENT_MESSAGE
} from '../actions/globals'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    message: {
        type: '',
        content: '',
        title: ''
    }
})
export const globals = createReducer(initStates, {
    [INCREMENT_MESSAGE]: (state, action) => {
        let message = action.message
        if (typeof message === 'string') {
            message = {
                type: 'success',
                title: '',
                content: message
            }
        }
        return state.merge({
            message
        })
    }
})
