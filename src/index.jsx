import React from 'react'
import ReactDOM from 'react-dom'
import browserHistory from 'react-router/lib/browserHistory'
import IndexRoute from 'react-router/lib/IndexRoute'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {configureCounterStore} from 'alias-store'
import cookies from 'js-cookie'

import {NotFound} from './views/404.jsx'
import {App} from './views/app.jsx'
import {Main} from './pages/main.jsx'
import {Article} from './pages/article.jsx'
import {AdminArticleList} from './pages/admin-list.jsx'
import {AdminArticlePost} from './pages/admin-post.jsx'
import {AdminArticleEdit} from './pages/admin-edit.jsx'

const store = configureCounterStore()
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
            <Route name="admin" needLogin="1" path="/admin"
                onEnter={checkLogin}
                component={App}
            >
                <Route name="list" path="/admin/list(/:page)" component={AdminArticleList} />
                <Route name="post" path="/admin/post" component={AdminArticlePost} />
                <Route name="post" path="/admin/edit/:id/:page" component={AdminArticleEdit} />
            </Route>
            <Route component={NotFound} path="*" />
        </Router>
    </Provider>,
    document.getElementById('root')
)
