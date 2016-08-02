import api from '../api'

export const RECEIVE_ADMIN_POSTS = 'RECEIVE_ADMIN_POSTS'
export const RECEIVE_ADMIN_ARTICLE = 'RECEIVE_ADMIN_ARTICLE'

function receiveAdminPosts(page, pathname, json) {
    return {
        type: RECEIVE_ADMIN_POSTS,
        page,
        pathname,
        posts: json
    }
}

export function fetchAdminPosts(config) {
    return (dispatch, getState) => {
        return api.getFromConfig(config).then(json => dispatch(receiveAdminPosts(config.page, config.pathname, json.data)))
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
        return api.getFromConfig(config).then(json => dispatch(receiveAdminArticle(json, config.pathname)))
    }
}
