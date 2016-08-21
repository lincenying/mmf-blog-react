import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as articleActions from '../actions/article'
import {MainItem} from "./main-item"

const main = React.createClass({
    propTypes: {
        fetchPosts: PropTypes.func,
        posts: PropTypes.object
    },
    componentWillMount() {
        let {pathname} = this.props.posts
        if (pathname !== this.props.location.pathname) this.handlefetchPosts()
    },
    componentDidUpdate(prevProps) {
        let pathname = this.props.location.pathname
        let prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlefetchPosts()
    },
    handlefetchPosts(page = 1) {
        const {fetchPosts, params: {id, qs}, location: {pathname}} = this.props
        fetchPosts({
            action: 'getArticleList',
            id,
            qs,
            pathname,
            page,
            limit: 10,
            markdown: 1
        })
    },
    handleLoadMore() {
        const {page} = this.props.posts
        this.handlefetchPosts(page + 1)
    },
    render() {
        const {list, hasNext} = this.props.posts
        const lists = list.map((list, index) => {
            return (
                <MainItem key={list._id} list={list}></MainItem>
            )
        })
        const loadMore = hasNext ? <a onClick={this.handleLoadMore} href="javascript:;">加载更多</a> : <span>好厉害, 竟然翻到最后一页了...</span>
        return (
            <div className="g-mn">
                <div className="posts">
                    {lists}
                </div>
                <div className="box m-page box-do">
                    <div className="w-icon w-icon-2"></div>
                    <div className="w-icon w-icon-3"></div>
                    { loadMore }
                </div>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        posts: state.article.toJS().posts
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleActions, dispatch)
}

export const Main = connect(mapStateToProps, mapDispatchToProps)(main)
