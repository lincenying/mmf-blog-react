import api from 'alias-api'
import { errConfig } from './globals'

export function getArticleList(config) {
    return async dispatch => {
        const { data: { data, code} } = await api.get('frontend/article/list', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveArticleList',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export function getArticleItem(config) {
    return async dispatch => {
        const { data: { data, code} } = await api.get('frontend/article/item', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveArticleItem',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export function getTrending(config) {
    return async dispatch => {
        const { data: { data, code} } = await api.get('frontend/trending', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveTrending',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}
