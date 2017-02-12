import {RECEIVE_POSTS, RECEIVE_ARTICLE, RECEIVE_COMMENT, POST_COMMENT} from 'alias-store-actions/article'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
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
})

export const article = createReducer(initStates, {
    [RECEIVE_POSTS]: (state, action) => {
        const {posts: { list, hasNext }, page, pathname} = action
        const lists = page === 1 ? [].concat(list) : state.get('posts').toJS().list.concat(list)
        return state.merge({
            posts: {
                list: lists,
                page,
                hasNext,
                pathname
            }
        })
    },
    [RECEIVE_ARTICLE]: (state, action) => {
        const {json: { data, prev, next }, pathname} = action
        return state.merge({
            article: {
                data,
                prev,
                next,
                pathname
            }
        })
    },
    [RECEIVE_COMMENT]: (state, action) => {
        const {json: { data: {list, hasNext} }, page, pathname} = action
        const lists = page === 1 ? [].concat(list) : state.get('comment').toJS().list.concat(list)
        return state.merge({
            comment: {
                list: lists,
                hasNext,
                page,
                pathname
            }
        })
    },
    [POST_COMMENT]: (state, action) => {
        const lists = action.data.concat(state.get('comment').toJS().list)
        return state.mergeDeep({
            comment: {
                list: lists
            }
        })
    }
})
