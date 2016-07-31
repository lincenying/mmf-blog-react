import {
    RECEIVE_POSTS, RECEIVE_ARTICLE, RECEIVE_COMMENT
} from '../actions/article'

const states = {
    posts: {
        list: [],
        hasNext: 0,
        page: 1,
        pathname: ''
    },
    article: {
        data: {},
        next: {},
        prev: {},
        pathname: ''
    },
    comment: {
        list: [],
        hasNext: 0,
        page: 1,
        pathname: ''
    }
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
                posts: {
                    list: posts,
                    page: action.page,
                    hasNext: action.posts.hasNext,
                    pathname: action.pathname
                },
            })
        }
        case RECEIVE_ARTICLE: {
            return Object.assign({}, state, {
                article: {
                    data: action.json.data,
                    prev: action.json.prev,
                    next: action.json.next,
                    pathname: action.pathname
                },
            })
        }
        case RECEIVE_COMMENT: {
            return Object.assign({}, state, {
                comment: {
                    list: action.json.data.list,
                    hasNext: action.json.data.hasNext,
                    page: action.page,
                    pathname: action.pathname
                },
            })
        }
        default:
            return state
    }
}
