import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import Link from 'react-router/lib/Link'
import {propTypes} from '../decorators'
import {deleteArticle, recoverArticle, fetchAdminPosts} from 'alias-store-actions/admin'

function mapStateToProps(state) {
    return {
        posts: state.admin.toJS().posts
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteArticle, recoverArticle, fetchAdminPosts}, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
@propTypes({
    deleteArticle: PropTypes.func.isRequired,
    recoverArticle: PropTypes.func.isRequired,
    fetchAdminPosts: PropTypes.func.isRequired,
    posts: PropTypes.object
})
@immutableRenderDecorator
export class AdminArticleList extends Component {
    constructor(props) {
        super(props)
        this.handleDeleteArticle = this.handleDeleteArticle.bind(this)
        this.handleRecoverArticle = this.handleRecoverArticle.bind(this)
    }
    componentWillMount() {
        this.handlefetchAdminArticlePosts()
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlefetchAdminArticlePosts()
    }
    handlefetchAdminArticlePosts() {
        const {fetchAdminPosts, params: {page}, location: {pathname}} = this.props
        fetchAdminPosts({
            page,
            pathname,
            limit: 20
        })
    }
    handleDeleteArticle(id) {
        const {deleteArticle} = this.props
        deleteArticle({
            id
        })
    }
    handleRecoverArticle(id) {
        const {recoverArticle} = this.props
        recoverArticle({
            id
        })
    }
    render() {
        const { posts } = this.props
        const lists = posts.list.map(item => {
            return (
                <li key={item._id} className="list-group-item">
                    <Link to={`/article/${item._id}`} target="_blank" rel='noopener noreferrer'>{item.title}</Link>
                    {
                        item.is_delete === "0" || item.is_delete === 0 ?
                            <a onClick={this.handleDeleteArticle.bind(this, item._id)} href="javascript:;" className="badge badge-danger">删除</a> : <a onClick={this.handleRecoverArticle.bind(this, item._id)} href="javascript:;" className="badge badge-info">恢复</a>
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
                    <div className="w-icon w-icon-2" />
                    <div className="w-icon w-icon-3" />
                    {posts.hasPrev ? <Link to={`/admin/list/${posts.page - 1}`} className="prev">上一页</Link> : ''}
                    {posts.hasNext ? <Link to={`/admin/list/${posts.page + 1}`} className="next">下一页</Link> : ''}
                </div>
            </div>
        )
    }
}
