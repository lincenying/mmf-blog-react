import api from '../api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const POST_COMMENT = 'POST_COMMENT'

function receivePosts(page, pathname, json) {
    return {
        type: RECEIVE_POSTS,
        page,
        pathname,
        posts: json,
        receivedAt: Date.now()
    }
}

export function fetchPosts(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receivePosts(config.page, config.pathname, json.data)))
    }
}

function receiveArticle(json, pathname) {
    return {
        type: RECEIVE_ARTICLE,
        json,
        pathname
    }
}

export function fetchArticle(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receiveArticle(json, config.pathname)))
    }
}

function receiveComment(json, pathname, page) {
    return {
        type: RECEIVE_COMMENT,
        json,
        page,
        pathname
    }
}

export function fetchComment(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receiveComment(json, config.pathname, config.page)))
    }
}

export function postComment(data) {
    return {
        type: POST_COMMENT,
        data
    }
}
