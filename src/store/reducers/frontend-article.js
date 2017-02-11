import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    item: {
        data: {},
        path: '',
        isLoad: false
    },
    trending: []
})

export const article = createReducer(initStates, {
    ['receiveArticleList']: (state, action) => {
        const {data: { list, hasNext }, page, pathname} = action
        const lists = page === 1 ? [].concat(list) : state.get('lists').toJS().data.concat(list)
        return state.merge({
            lists: {
                list: lists,
                page,
                hasNext,
                pathname
            }
        })
    },
    ['receiveArticleItem']: (state, action) => {
        const {data, pathname} = action
        return state.merge({
            item: {
                data,
                pathname
            }
        })
    },
    ['receiveTrending']: (state, action) => {
        const {data, pathname} = action
        return state.merge({
            trending: {
                data,
                pathname
            }
        })
    }
})
