import {
    RECEIVE_ADMIN_POSTS,
    RECEIVE_ADMIN_ARTICLE,
    RCOVER_ARTICLE,
    DELETE_ARTICLE
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
            const { posts: { list, hasNext, hasPrev }, page, pathname } = action
            return {
                ...state,
                posts: {
                    list,
                    page: parseInt(page, 10),
                    hasNext,
                    hasPrev,
                    pathname
                }
            }
        }
        case RECEIVE_ADMIN_ARTICLE: {
            const { json: { data }, pathname } = action
            return {
                ...state,
                article: {
                    data,
                    pathname
                }
            }
        }
        case RCOVER_ARTICLE: {
            let list = state.posts.list
            const obj = list.find(ii => action.id === ii._id)
            obj.is_delete = "0"
            return {
                ...state,
                posts: {
                    ...state.posts,
                    list
                }
            }
        }
        case DELETE_ARTICLE: {
            let list = state.posts.list
            const obj = list.find(ii => action.id === ii._id)
            obj.is_delete = "1"
            return {
                ...state,
                posts: {
                    ...state.posts,
                    list
                }
            }
        }
        default:
            return state
    }
}
