import React, {PropTypes} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CounterActions from '../actions/counter'

const clicker = React.createClass({
    propTypes: {
        increment: PropTypes.func,
        counter: PropTypes.number,
        setloading: PropTypes.func,
        loading: PropTypes.number,
        message: PropTypes.string,
    },
    componentDidMount() {
        const {setloading} = this.props
        setTimeout(() => {
            setloading(1)
        }, 100)
    },
    handleSetLoadingShow() {
        const {setloading} = this.props
        setloading(1)
    },
    handleSetLoadingHide() {
        const {setloading} = this.props
        setloading(0)
    },
    render() {
        const {increment, counter, loading, message} = this.props
        return (
            <div>
                <span>! You have clicked {counter}
                    times, loading {loading} | {message}</span>
                <button onClick={increment}>+1</button>
                <button onClick={this.handleSetLoadingShow}>修改状态(11)</button>
                <button onClick={this.handleSetLoadingHide}>修改状态(00)</button>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        counter: state.funcCounter.counter,
        loading: state.funcGlobal.loading,
        message: state.funcGlobal.message
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}

export const Clicker = connect(mapStateToProps, mapDispatchToProps)(clicker)
