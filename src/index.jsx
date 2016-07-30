import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import {configureCounterStore} from './store'
import {NotFound} from './pages/404'
import {App} from './pages/app'
import {Main} from './components/main'

const store = configureCounterStore({}, thunk)
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route name="index" path="/" component={App}>
                <IndexRoute component={Main} />
            </Route>
            <Route name="category" path="/category/:id" component={App}>
                <IndexRoute component={Main} />
            </Route>
            <Route name="search" path="/search/:qs" component={App}>
                <IndexRoute component={Main} />
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('root')
)
