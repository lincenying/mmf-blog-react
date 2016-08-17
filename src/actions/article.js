import api from '../api'

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
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receivePosts({posts: json.data, ...config})))
    }
}

function receiveArticle(config) {
    return {
        type: RECEIVE_ARTICLE,
        ...config
    }
}

export function fetchArticle(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receiveArticle({json, ...config})))
    }
}

function receiveComment(config) {
    return {
        type: RECEIVE_COMMENT,
        ...config
    }
}

export function fetchComment(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receiveComment({
            json,
            ...config
        })))
    }
}

export function postComment(data) {
    return {
        type: POST_COMMENT,
        data
    }
}
