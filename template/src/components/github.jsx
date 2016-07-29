import React, {PropTypes} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CounterActions from '../actions/counter'

const github = React.createClass({
    propTypes: {
        fetchPosts: PropTypes.func,
        posts: PropTypes.array,
        page: PropTypes.number,
    },
    componentDidMount() {
        const {fetchPosts} = this.props
        fetchPosts(1)
    },
    handleFetchPosts() {
        const {page, fetchPosts} = this.props
        fetchPosts(page + 1)
    },
    render() {
        const {posts} = this.props
        const lists = posts.map((list, index) => {
            return (
                <li key={list.id}><h2>{list.full_name}</h2></li>
            )
        })
        return (
            <div>
                <ul>{lists}</ul>
                <a href='javascript:;' onClick={this.handleFetchPosts}>继续加载</a>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        posts: state.funcCounter.posts,
        page: state.funcCounter.page,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}

export const Github = connect(mapStateToProps, mapDispatchToProps)(github)
