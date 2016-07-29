import {
    INCREMENT_COUNTER, RECEIVE_POSTS
} from '../actions/counter'

const states = {
    counter: 0,
    posts: [],
    page: 0
}

export function funcCounter(state = states, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return Object.assign({}, state, {
                counter: state.counter + 1,
            })
        case RECEIVE_POSTS: {
            let posts
            if (action.page === 1) {
                posts = [].concat(action.posts)
            } else {
                posts = state.posts.concat(action.posts)
            }
            return Object.assign({}, state, {
                posts,
                page: action.page
            })
        }
        default:
            return state
    }
}
