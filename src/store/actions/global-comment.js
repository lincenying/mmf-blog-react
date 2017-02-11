import api from 'alias-api'
import { errConfig } from './globals'

export function getCommentList(config) {
    return async dispatch => {
        const { data: { data, code} } = await api.get('frontend/comment/list', config)
        if (code === 200) {
            return dispatch({
                type: 'recevieCommentList',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}
