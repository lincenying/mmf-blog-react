import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {DevTools} from '../components/devtools'
import {Toastr} from '../components/_toastr.jsx'
import * as globalsActions from '../actions/globals'
import api from '../api'

import '../html/css/login.css'
import '../html/css/nprogress.css'
import '../html/css/animate.min.css'
import '../html/css/toastr.min.css'

export class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember_me: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(type, event) {
        this.setState({[type]: event.target.value})
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
                        <p><input value={this.state.username} onChange={this.handleChange.bind(this, 'username')} type="text" name="username" placeholder="请输入用户名" /></p>
                        <p><input value={this.state.password} onChange={this.handleChange.bind(this, 'password')} type="password" name="password" placeholder="请输入密码" /></p>
                        <p className="remember_me">
                            <label>
                                <input checked={this.state.remember_me} onChange={this.handleChange.bind(this, 'remember_me')} value="on" type="checkbox" name="remember_me" id="remember_me" />
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(globalsActions, dispatch)
}

export const Login = connect(null, mapDispatchToProps)(login)
