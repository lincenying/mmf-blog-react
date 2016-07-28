import {
    INCREMENT_LOADING
} from '../actions/counter'

const globals = {
    loading: 9,
    message: '',
}

export function funcGlobal(state = globals, action) {
    switch (action.type) {
        case INCREMENT_LOADING:
            return Object.assign({}, state, {
                loading: action.config === 1 ? 10 : 9,
                message: action.config === 1 ? '显示' : '隐藏',
            })
        default:
            return state
    }
}
