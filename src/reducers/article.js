import {
    RECEIVE_POSTS
} from '../actions/article'

const states = {
    posts: [],
    hasNext: 0,
    page: 1,
    pathname: ''
}

export function article(state = states, action) {
    switch (action.type) {
        case RECEIVE_POSTS: {
            let posts
            if (action.page === 1) {
                posts = [].concat(action.posts.list)
            } else {
                posts = state.posts.concat(action.posts.list)
            }
            return Object.assign({}, state, {
                posts,
                page: action.page,
                hasNext: action.posts.hasNext,
                pathname: action.pathname
            })
        }
        default:
            return state
    }
}
