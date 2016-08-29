import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import {configureCounterStore} from './store'
import {Login} from './pages/login'

const store = configureCounterStore({}, thunk)
ReactDOM.render(
    <Provider store={store}>
        <Login />
    </Provider>,
    document.getElementById('root')
)
