import api from 'alias-api'
import { errConfig } from './globals'

export function getCategoryList(config) {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/category/list', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveCategoryList',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export function getCategoryItem(config) {
    return async dispatch => {
        const { data: { data, code} } = await api.get('backend/category/item', config)
        if (code === 200) {
            return dispatch({
                type: 'receiveCategoryItem',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}

export function insertCategoryItem(payload) {
    return dispatch => {
        return dispatch({
            type: 'insertCategoryItem',
            payload
        })
    }
}

export function updateCategoryItem(payload) {
    return dispatch => {
        return dispatch({
            type: 'updateCategoryItem',
            payload
        })
    }
}
