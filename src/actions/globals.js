export const INCREMENT_MESSAGE = 'INCREMENT_MESSAGE'

export function setMessage(message) {
    return {
        type: INCREMENT_MESSAGE,
        message
    }
}
