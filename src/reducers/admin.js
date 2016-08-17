import {
    RECEIVE_ADMIN_POSTS,
    RECEIVE_ADMIN_ARTICLE,
    RCOVER_ARTICLE,
    DELETE_ARTICLE
} from '../actions/admin'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
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
})
export const admin = createReducer(initStates, {
    [RECEIVE_ADMIN_POSTS]: (state, action) => {
        const { posts: { list, hasNext, hasPrev }, page, pathname } = action
        return state.merge({
            posts: {
                list,
                hasNext,
                hasPrev,
                page: parseInt(page, 10),
                pathname
            }
        })
    },
    [RECEIVE_ADMIN_ARTICLE]: (state, action) => {
        const { json: { data }, pathname } = action
        return state.merge({
            article: {
                data,
                pathname
            }
        })
    },
    [RCOVER_ARTICLE]: (state, action) => {
        let list = state.get('posts').toJS().list
        const obj = list.find(ii => action.id === ii._id)
        obj.is_delete = "0"
        return state.mergeDeep({
            posts: {
                list
            }
        })
    },
    [DELETE_ARTICLE]: (state, action) => {
        let list = state.get('posts').toJS().list
        const obj = list.find(ii => action.id === ii._id)
        obj.is_delete = "1"
        return state.mergeDeep({
            posts: {
                list
            }
        })
    }
})
