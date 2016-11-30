export const INCREMENT_MESSAGE = 'INCREMENT_MESSAGE'
export const errConfig = {
    type: 'INCREMENT_MESSAGE',
    message: {
        type: 'error',
        content: 'api 接口错误'
    }
}

export function setMessage(message) {
    return {
        type: INCREMENT_MESSAGE,
        message
    }
}
