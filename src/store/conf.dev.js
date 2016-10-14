import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'
import {DevTools} from '../components/devtools.jsx'

const logger = createLogger()
export function configureCounterStore() {
    const finalCreateStore = compose(
        applyMiddleware(thunk, logger),
        DevTools.instrument()
    )(createStore)
    return finalCreateStore(reducers)
}
