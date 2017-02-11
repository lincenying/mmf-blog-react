import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    lists: [],
    item: {}
})

export const article = createReducer(initStates, {
    ['receiveCategoryList']: (state, action) => {
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
    ['receiveCategoryItem']: (state, action) => {
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
    ['insertCategoryItem']: (state, action) => {
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
    ['updateCategoryItem']: (state, action) => {
        const lists = action.data.concat(state.get('comment').toJS().list)
        return state.mergeDeep({
            comment: {
                list: lists
            }
        })
    }
})
