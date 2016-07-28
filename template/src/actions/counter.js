export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const INCREMENT_LOADING = 'INCREMENT_LOADING'

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
