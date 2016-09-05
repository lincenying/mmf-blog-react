import {DevTools} from '../components/devtools'
import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import reducers from './reducers'

const logger = createLogger()
export function configureCounterStore(initialState, ...middlewares) {
    const finalCreateStore = compose(
        applyMiddleware(...middlewares, logger),
        DevTools.instrument()
    )(createStore)
    return finalCreateStore(reducers, initialState)
}
