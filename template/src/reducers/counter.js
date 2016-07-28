import {
    INCREMENT_COUNTER
} from '../actions/counter'

const states = {
    counter: 0,
}

export function funcCounter(state = states, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return Object.assign({}, state, {
                counter: state.counter + 1,
            })
        default:
            return state
    }
}
