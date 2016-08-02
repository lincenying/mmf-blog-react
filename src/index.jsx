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
import {Article} from './components/article'
import {AdminArticleList} from './components/admin-list'

const store = configureCounterStore({}, thunk)
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route name="index" needLogin="0" path="/" component={App}>
                <IndexRoute component={Main} />
                <Route name="category" path="/category/:id" component={Main} />
                <Route name="search" path="/search/:qs" component={Main} />
                <Route name="article" path="/article/:id" component={Article} />
            </Route>
            <Route name="admin" needLogin="1" path="/admin" component={App}>
                <Route name="list" path="/admin/list(/:page)" component={AdminArticleList} />
                <Route name="post" path="/admin/post" component={Main} />
                <Route name="post" path="/admin/edit/:id/:page" component={Main} />
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('root')
)
