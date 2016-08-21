import api from '../api'

export const RECEIVE_ADMIN_POSTS = 'RECEIVE_ADMIN_POSTS'
export const RECEIVE_ADMIN_ARTICLE = 'RECEIVE_ADMIN_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const RCOVER_ARTICLE = 'RCOVER_ARTICLE'

function receiveAdminPosts(config) {
    return {
        type: RECEIVE_ADMIN_POSTS,
        ...config
    }
}

export function fetchAdminPosts(config) {
    return dispatch => {
        return api.getFromConfig(config).then(json => dispatch(receiveAdminPosts({posts: json.data, ...config})))
    }
}

function receiveAdminArticle(config) {
    return {
        type: RECEIVE_ADMIN_ARTICLE,
        ...config
    }
}

export function fetchAdminArticle(config) {
    return dispatch => {
        return api.getFromConfig(config).then(json => dispatch(receiveAdminArticle({json, ...config})))
    }
}

function deleteArticleAction(config) {
    return {
        type: DELETE_ARTICLE,
        ...config
    }
}

export function deleteArticle(config) {
    return dispatch => {
        return api.getFromConfig(config).then(() => dispatch(deleteArticleAction({...config})))
    }
}

function recoverArticleAction(config) {
    return {
        type: RCOVER_ARTICLE,
        ...config
    }
}

export function recoverArticle(config) {
    return dispatch => {
        return api.getFromConfig(config).then(() => dispatch(recoverArticleAction({...config})))
    }
}
