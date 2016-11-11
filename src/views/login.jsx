import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '../decorators'
import {DevTools} from '../components/devtools.jsx'
import {Toastr} from '../components/_toastr.jsx'
import {renderInput} from '../components/_renderField.jsx'
import {setMessage} from 'alias-store-actions/globals'
import api from '../api'

import '../assets/css/login.css'
import 'nprogress/nprogress.css'
import 'animate.css/animate.min.css'
import 'toastr/build/toastr.min.css'

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setMessage}, dispatch)
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = '请输入用户名'
    }
    if (!values.password) {
        errors.password = '请输入密码'
    }
    return errors
}

@propTypes({
    setMessage: React.PropTypes.func,
    handleSubmit: React.PropTypes.func
})
@connect(null, mapDispatchToProps)
@reduxForm({
    form:'login',
    validate
})
@immutableRenderDecorator
export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember_me: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(values) {
        const {setMessage} = this.props
        api.getData({
            action: 'login',
            ...values
        }).then(json => {
            if (json.code === 200) {
                setMessage('登录成功!')
                setTimeout( () => {
                    window.location.href = '/admin/list/1'
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
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <section className="container">
                <div className="login">
                    <h1>后台管理</h1>
                    <form onSubmit={handleSubmit(this.handleSubmit)} id="shake-setting" action="/api/?action=login" method="post">
                        <Field component={renderInput} type="text" id="username" name="username" label="请输入用户名" />
                        <Field component={renderInput} type="password" id="password" name="password" label="请输入密码" />
                        <p className="remember_me">
                            <label>
                                <Field component="input" value="on" type="checkbox" id="remember_me" name="remember_me" />
                                保持登录
                            </label>
                        </p>
                        <p className="submit"><input disabled={pristine || submitting} type="submit" value="登录" /></p>
                    </form>
                </div>
                <DevTools />
                <Toastr />
            </section>
        )
    }
}
