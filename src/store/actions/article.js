import api from 'alias-api'
import { errConfig } from './globals'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const POST_COMMENT = 'POST_COMMENT'

function receivePosts(config) {
    return {
        type: RECEIVE_POSTS,
        ...config
    }
}

export function fetchPosts(config) {
    return dispatch => {
        return api.get('frontend/topics', config).then(
            json => dispatch(receivePosts({posts: json.data, ...config})),
            () => dispatch(errConfig)
        )
    }
}

function receiveArticle(config) {
    return {
        type: RECEIVE_ARTICLE,
        ...config
    }
}

export function fetchArticle(config) {
    return dispatch => {
        return api.get('frontend/article', config).then(json => dispatch(receiveArticle({json, ...config})), () => dispatch(errConfig))
    }
}

function receiveComment(config) {
    return {
        type: RECEIVE_COMMENT,
        ...config
    }
}

export function fetchComment(config) {
    return dispatch => {
        return api.get('frontend/comment/list', config).then(json => dispatch(receiveComment({
            json,
            ...config
        })), () => dispatch(errConfig))
    }
}

export function postComment(data) {
    return {
        type: POST_COMMENT,
        data
    }
}
