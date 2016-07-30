import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as articleActions from '../actions/article'
import {MainPost} from "./main-post"

export const main = React.createClass({
    propTypes: {
        fetchPosts: PropTypes.func,
        posts: PropTypes.array,
        page: PropTypes.number,
        pathname: PropTypes.string,
    },
    componentDidMount() {
        let {pathname} = this.props
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
        const {page} = this.props
        this.handlefetchPosts(page + 1)
    },
    render() {
        const {posts, hasNext} = this.props
        const lists = posts.map((list, index) => {
            return (
                <MainPost key={list._id} list={list}></MainPost>
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
        posts: state.article.posts,
        page: state.article.page,
        hasNext: state.article.hasNext,
        pathname: state.article.pathname,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleActions, dispatch)
}

export const Main = connect(mapStateToProps, mapDispatchToProps)(main)
