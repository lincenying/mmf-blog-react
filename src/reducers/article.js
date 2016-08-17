import {
    RECEIVE_POSTS, RECEIVE_ARTICLE, RECEIVE_COMMENT, POST_COMMENT
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
            const {posts: { list, hasNext }, page, pathname} = action
            let lists = page === 1 ? [].concat(list) : state.posts.list.concat(list)
            return {
                ...state,
                posts: {
                    list: lists,
                    page,
                    hasNext,
                    pathname
                }
            }
        }
        case RECEIVE_ARTICLE: {
            const {json: { data, prev, next }, pathname} = action
            return {
                ...state,
                article: {
                    data,
                    prev,
                    next,
                    pathname
                }
            }
        }
        case RECEIVE_COMMENT: {
            const {json: { data: {list, hasNext} }, page, pathname} = action
            let lists = page === 1 ? [].concat(list) : state.posts.list.concat(list)
            return {
                ...state,
                comment: {
                    list: lists,
                    hasNext,
                    page,
                    pathname
                }
            }
        }
        case POST_COMMENT: {
            const lists = action.data.concat(state.comment.list)
            return {
                ...state,
                comment: {
                    ...state.comment,
                    list: lists
                }
            }
        }
        default:
            return state
    }
}
