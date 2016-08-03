import api from '../api'

export const RECEIVE_ADMIN_POSTS = 'RECEIVE_ADMIN_POSTS'
export const RECEIVE_ADMIN_ARTICLE = 'RECEIVE_ADMIN_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const RCOVER_ARTICLE = 'RCOVER_ARTICLE'

function receiveAdminPosts(json, page, pathname) {
    return {
        type: RECEIVE_ADMIN_POSTS,
        posts: json,
        page,
        pathname
    }
}

export function fetchAdminPosts(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receiveAdminPosts(json.data, config.page, config.pathname)))
    }
}

function receiveAdminArticle(json, pathname) {
    return {
        type: RECEIVE_ADMIN_ARTICLE,
        json,
        pathname
    }
}

export function fetchAdminArticle(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receiveAdminArticle(json, config.config)))
    }
}

function deleteArticleAction(id) {
    return {
        type: DELETE_ARTICLE,
        id
    }
}

export function deleteArticle(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(deleteArticleAction(config.id)))
    }
}

function recoverArticleAction(id) {
    return {
        type: RCOVER_ARTICLE,
        id
    }
}

export function recoverArticle(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(recoverArticleAction(config.id)))
    }
}
