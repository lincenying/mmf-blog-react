import React from 'react'

export const Arrow = React.createClass({
    render() {
        return (
            <div className="arrow">
                <a className="go-top" href="javascript:;" onClick={this.handleGoTop}></a>
                <a className="go-back" href="javascript:;" onClick={this.handleGoBack}></a>
            </div>
        )
    },
    handleGoTop() {
        window.scrollTo(0, 0)
    },
    handleGoBack() {
        window.history.go(-1)
    }
})
