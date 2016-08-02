import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as adminActions from '../actions/admin'
import * as globalsActions from '../actions/globals'

export const admin_article_list = React.createClass({
    propTypes: {
        fetchAdminArticle: PropTypes.func,
        posts: PropTypes.object
    },
    componentDidMount() {
        let {pathname} = this.props.posts
        if (pathname !== this.props.location.pathname) this.handlefetchAdminArticlePosts()
    },
    componentDidUpdate(prevProps) {
        let pathname = this.props.location.pathname
        let prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlefetchAdminArticlePosts()
    },
    handlefetchAdminArticlePosts() {
        const {fetchAdminPosts, params: {page}, location: {pathname}} = this.props
        fetchAdminPosts({
            action: 'getAdminArticle',
            page,
            pathname,
            limit: 20
        })
    },
    handleDeleteArticle(id) {

    },
    handleRecoverArticle(id) {

    },
    render() {
        const { posts } = this.props
        const lists = posts.list.map((item, index) => {
            return (
                <li key={item._id} className="list-group-item">
                    <Link to={`/article/${item._id}`} target="_blank">{item.title}</Link>
                    {
                        item.is_delete === "0" ?
                        <a onClick={this.handleDeleteArticle.bind(this, item._id)} href="javascript:;" className="badge badge-danger">删除</a> :
                        <a onClick={this.handleRecoverArticle.bind(this, item._id)} href="javascript:;" className="badge badge-info">恢复</a>
                    }
                    <Link to={`/admin/edit/${item._id}/${posts.page}`} className="badge badge-success">编辑</Link>
                </li>
            )
        })
        return (
            <div className="g-mn">
                <div className="box">
                    <ul className="list-group">
                        {lists}
                    </ul>
                </div>
                <div className="box m-page box-do">
                    <div className="w-icon w-icon-2"></div>
                    <div className="w-icon w-icon-3"></div>
                    {
                        posts.hasPrev ? <Link to={`/admin/list/${posts.page - 1}`} className="prev">上一页</Link> : ''
                    }
                    {
                        posts.hasNext ? <Link to={`/admin/list/${posts.page + 1}`} className="next">下一页</Link> : ''
                    }
                </div>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        posts: state.admin.posts
    }
}

function mapDispatchToProps(dispatch) {
    const _Action = Object.assign({}, adminActions, globalsActions)
    return bindActionCreators(_Action, dispatch)
}

export const AdminArticleList = connect(mapStateToProps, mapDispatchToProps)(admin_article_list)
