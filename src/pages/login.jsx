import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '../decorators'
import {DevTools} from '../components/devtools'
import {Toastr} from '../components/_toastr.jsx'
import * as globalsActions from '../actions/globals'
import api from '../api'

import '../html/css/login.css'
import '../html/css/nprogress.css'
import '../html/css/animate.min.css'
import '../html/css/toastr.min.css'

function mapDispatchToProps(dispatch) {
    return bindActionCreators(globalsActions, dispatch)
}

@propTypes({
    setMessage: React.PropTypes.func
})
@connect(null, mapDispatchToProps)
@immutableRenderDecorator
export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember_me: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        const id = e.target.name,
            value = e.target.value
        const state = this.state
        state[id] = value
        this.setState(state)
    }
    handleSubmit(event) {
        event.preventDefault()
        const {setMessage} = this.props
        const {username, password} = this.state
        if (username === '' || password === '') {
            setMessage({
                type: 'error',
                content: '请输入用户名和密码!'
            })
            return false
        }
        api.getData({
            action: 'login',
            ...this.state
        }).then(json => {
            if (json.code === 200) {
                setMessage('登录成功!')
                setTimeout( () => {
                    window.location.href = '/'
                }, 500)
            } else {
                setMessage({
                    type: 'error',
                    content: json.message
                })
            }
        })
    }
    render() {
        return (
            <section className="container">
                <div className="login">
                    <h1>后台管理</h1>
                    <form onSubmit={this.handleSubmit} id="shake-setting" action="/api/?action=login" method="post">
                        <p><input value={this.state.username} onChange={this.handleChange} type="text" id="username" name="username" placeholder="请输入用户名" /></p>
                        <p><input value={this.state.password} onChange={this.handleChange} type="password" id="password" name="password" placeholder="请输入密码" /></p>
                        <p className="remember_me">
                            <label>
                                <input checked={this.state.remember_me} onChange={this.handleChange} value="on" type="checkbox" id="remember_me" name="remember_me" />
                                保持登录
                            </label>
                        </p>
                        <p className="submit"><input type="submit" value="登录" /></p>
                    </form>
                </div>
                <DevTools />
                <Toastr />
            </section>
        )
    }
}
