import api from '../api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

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
        //if (config.page > 1 || getState().article.posts.length === 0) {
            return api.getFromConfig(config).then(json => dispatch(receivePosts(config.page, config.pathname, json.data)))
        //}
    }
}
