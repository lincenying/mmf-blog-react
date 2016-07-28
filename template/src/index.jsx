import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import {configureCounterStore} from './store'
import {NotFound} from './pages/404'
import {App} from './pages/app'
import {Main} from './pages/main'
import {About} from './pages/about'
import {Inbox} from './pages/inbox'

const store = configureCounterStore({}, thunk)
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                {/* 当 url 为/时渲染 Main */}
                <IndexRoute component={Main} />
                <Route path="/about" component={About}/>
                <Route path="/inbox" component={Inbox}/>
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('root')
)
