import React from 'react'

export const SimpleClicker = React.createClass({
    getInitialState() {
        return {times: 0}
    },
    render() {
        return (
            <div>
                <span>You have clicked {this.state.times} times</span>
                <button onClick={this.handleIncrement}>+1</button>
            </div>
        )
    },
    handleIncrement() {
        this.setState({
            times: this.state.times + 1
        })
    }
})
