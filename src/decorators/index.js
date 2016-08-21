export function propTypes(param) {
    return function(clazz) {
        clazz.propTypes = Object.assign({}, clazz.propTypes || {}, param)
        return clazz
    }
}
export function contextTypes(param) {
    return function(clazz) {
        clazz.contextTypes = Object.assign({}, clazz.contextTypes || {}, param)
        return clazz
    }
}
