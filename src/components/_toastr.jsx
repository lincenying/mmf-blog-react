import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {ToastMessage, ToastContainer} from 'react-toastr'
import * as articleActions from '../actions/globals'
var ToastMessageFactory = React.createFactory(ToastMessage.animation)

export const toastr = React.createClass({
    propTypes: {
        setMessage: PropTypes.func,
        message: PropTypes.object
    },
    componentDidUpdate(prevProps) {
        const { message, setMessage } = this.props
        const oldMessage = prevProps.message
        if (message.type !== '' && oldMessage.type === '') {
            this.refs.container[message.type](message.title, message.content, {
                timeOut: 3000
            })
            setMessage({
                title: '',
                type: '',
                content: ''
            })
        }
    },
    render() {
        return (
            <ToastContainer ref="container" toastMessageFactory={ToastMessageFactory} className="toast-top-center" />
        )
    }
})

function mapStateToProps(state) {
    return {
        message: state.globals.toJS().message
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleActions, dispatch)
}

export const Toastr = connect(mapStateToProps, mapDispatchToProps)(toastr)
