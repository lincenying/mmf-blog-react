import {
    INCREMENT_MESSAGE
} from '../actions/globals'

const _globals = {
    message: {
        type: '',
        content: '',
        title: ''
    }
}

export function globals(state = _globals, action) {
    switch (action.type) {
        case INCREMENT_MESSAGE: {
            let message = action.message
            if (typeof message === 'string') {
                message = {
                    type: 'success',
                    title: '',
                    content: message
                }
            }
            return {
                ...state,
                message
            }
        }
        default:
            return state
    }
}
