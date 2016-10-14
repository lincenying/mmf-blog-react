import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import Link from 'react-router/lib/Link'
import {propTypes} from '../decorators'
import {fetchArticle} from 'alias-store-actions/article'
import {Comment} from '../components/comment.jsx'
import {Footer} from '../components/footer.jsx'

function mapStateToProps(state) {
    return {
        article: state.article.toJS().article
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchArticle}, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
@propTypes({
    article: PropTypes.object,
    fetchArticle: PropTypes.func.isRequired
})
@immutableRenderDecorator
export class Article extends Component {
    componentWillMount() {
        const {pathname} = this.props.article
        if (pathname !== this.props.location.pathname) this.handlefetchArticle()
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlefetchArticle()
    }
    handlefetchArticle() {
        const {fetchArticle, params: {id}, location: {pathname}} = this.props
        fetchArticle({
            action: 'article',
            id,
            pathname,
            markdown: 1
        })
    }
    render() {
        const {article, location: {pathname}, params: {id}} = this.props
        const prev = article.prev.prev_id ? <Link to={`/article/${article.prev.prev_id}`} className="prev">上一篇</Link> : <span className="prev">上一篇</span>
        const next = article.next.next_id ? <Link to={`/article/${article.next.next_id}`} className="next">下一篇</Link> : <span className="next">下一篇</span>
        return (
            <div className="g-mn">
                <div className="posts">
                    <div className="m-post box article">
                        <a href="javascript:;" className="w-icon w-icon-1">&nbsp;</a>
                        <a href="javascript:;" className="w-icon2">&nbsp;</a>
                        <div className="info">
                            <a href="javascript:;">{article.data.creat_date}</a>
                            <a href="javascript:;">浏览: {article.data.visit}</a>
                            <a href="javascript:;" className="comnum">{article.data.comment_count}</a>
                        </div>
                        <div className="cont cont-1">
                            <div className="text">
                                <h2><Link to={`/article/${article.data._id}`}>{article.data.title}</Link></h2>
                                <div className="markdown-body" dangerouslySetInnerHTML={{__html: article.data.content}} />
                            </div>
                        </div>
                        <div className="info info-1" />
                    </div>
                </div>
                <div className="box m-page box-do">
                    <div className="w-icon w-icon-2" />
                    <div className="w-icon w-icon-3" />
                    {prev}
                    {next}
                </div>
                <Comment pathname={pathname} id={id} />
                <Footer />
            </div>
        )
    }
}
