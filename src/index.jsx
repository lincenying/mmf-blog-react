import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {configureCounterStore} from './store'
import cookies from 'js-cookie'

import {NotFound} from './pages/404'
import {App} from './pages/app'
import {Main} from './components/main'
import {Article} from './components/article'
import {AdminArticleList} from './components/admin-list'
import {AdminArticlePost} from './components/admin-post'
import {AdminArticleEdit} from './components/admin-edit'

const store = configureCounterStore({}, thunk)
const history = syncHistoryWithStore(browserHistory, store)
const checkLogin = (nextState, replace, callback) => {
    var token = cookies.get('user')
    if (!token) {
        replace('/')
    }
    callback()
}
const goScrollTop = () => {
    window.scrollTo(0, 0)
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route name="index" needLogin="0" path="/" component={App}>
                <IndexRoute component={Main} />
                <Route name="category" path="/category/:id" component={Main} />
                <Route name="search" path="/search/:qs" component={Main} />
                <Route name="article" path="/article/:id" component={Article} onEnter={goScrollTop} />
            </Route>
            <Route onEnter={checkLogin} name="admin" needLogin="1" path="/admin" component={App}>
                <Route name="list" path="/admin/list(/:page)" component={AdminArticleList} />
                <Route name="post" path="/admin/post" component={AdminArticlePost} />
                <Route name="post" path="/admin/edit/:id/:page" component={AdminArticleEdit} />
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('root')
)
