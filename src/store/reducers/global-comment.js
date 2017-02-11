import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    }
})

export const article = createReducer(initStates, {
    ['recevieCommentList']: (state, action) => {
        const {data} = action
        return state.merge({
            item: data
        })
    },
    ['insertCommentItem']: (state, action) => {
        const {data, pathname} = action
        return state.merge({
            trending: {
                data,
                pathname
            }
        })
    },
    ['deleteComment']: (state, action) => {
        const {payload} = action
        const lists = payload.concat(state.get('lists').toJS())
        return state.merge({
            lists
        })
    },
    ['recoverComment']: (state, action) => {
        const {payload} = action
        const obj = state.get('lists').toJS().find(ii => ii._id === payload.id)
        if (obj) {
            obj.cate_name = payload.cate_name
            obj.cate_order = payload.cate_order
        }
        return state.merge({
            lists: obj,
            item: {
                ...state.get('item').toJS(),
                ...payload
            }
        })
    }
})
