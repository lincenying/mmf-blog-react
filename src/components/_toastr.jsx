import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {ToastMessage, ToastContainer} from 'react-toastr'
import * as articleActions from '../actions/globals'
var ToastMessageFactory = React.createFactory(ToastMessage.animation)

class toastr extends Component {
    componentDidUpdate(prevProps) {
        const { message, setMessage } = this.props
        const oldMessage = prevProps.message
        if (message.type !== '' && oldMessage.type === '') {
            const toastrRefs = this.container
            toastrRefs[message.type](message.title, message.content, {
                timeOut: 3000
            })
            setMessage({
                title: '',
                type: '',
                content: ''
            })
        }
    }
    render() {
        return (
            <ToastContainer ref={r => { this.container = r }} toastMessageFactory={ToastMessageFactory} className="toast-top-center" />
        )
    }
}

toastr.propTypes = {
    message: PropTypes.object,
    setMessage: PropTypes.func
}

function mapStateToProps(state) {
    return {
        message: state.globals.toJS().message
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleActions, dispatch)
}

export const Toastr = connect(mapStateToProps, mapDispatchToProps)(toastr)
