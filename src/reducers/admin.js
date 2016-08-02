import {
    RECEIVE_ADMIN_POSTS, RECEIVE_ADMIN_ARTICLE
} from '../actions/admin'

const states = {
    posts: {
        list: [],
        hasNext: 0,
        hasPrev: 0,
        page: 1,
        pathname: ''
    },
    article: {
        data: {},
        pathname: ''
    }
}

export function admin(state = states, action) {
    switch (action.type) {
        case RECEIVE_ADMIN_POSTS: {
            let posts
            if (action.page === 1) {
                posts = [].concat(action.posts.list)
            } else {
                posts = state.posts.list.concat(action.posts.list)
            }
            return Object.assign({}, state, {
                posts: {
                    list: posts,
                    page: parseInt(action.page, 10),
                    hasNext: action.posts.hasNext,
                    hasPrev: action.posts.hasPrev,
                    pathname: action.pathname
                },
            })
        }
        case RECEIVE_ADMIN_ARTICLE: {
            return Object.assign({}, state, {
                article: {
                    data: action.json.data,
                    pathname: action.pathname
                },
            })
        }
        default:
            return state
    }
}
