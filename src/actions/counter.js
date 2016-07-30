import fetch from 'isomorphic-fetch'

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const INCREMENT_LOADING = 'INCREMENT_LOADING'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function increment() {
    return {
        type: INCREMENT_COUNTER
    }
}
export function setloading(config) {
    return {
        type: INCREMENT_LOADING,
        config
    }
}

function receivePosts(page, json) {
    return {
        type: RECEIVE_POSTS,
        page,
        posts: json,
        receivedAt: Date.now()
    }
}

export function fetchPosts(page) {
    return (dispatch, getState) => {
        if (page > 1 || getState().funcCounter.posts.length === 0) {
            return fetch('https://api.github.com/user/10840991/starred?page=' + page)
                .then(response => response.json())
                .then(json => dispatch(receivePosts(page, json)))
        }
    }
}
