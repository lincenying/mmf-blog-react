import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import {propTypes} from '../decorators'
import {fetchPosts} from 'alias-store-actions'
import {MainItem} from "../components/main-item.jsx"
import {Footer} from '../components/footer.jsx'

function mapStateToProps(state) {
    return {
        posts: state.article.toJS().posts
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPosts}, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
@immutableRenderDecorator
@propTypes({
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.object
})
export class Main extends Component {
    constructor(props) {
        super(props)
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    componentWillMount() {
        const {pathname} = this.props.posts
        if (pathname !== this.props.location.pathname) this.handlefetchPosts()
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlefetchPosts()
    }
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
    }
    handleLoadMore() {
        const {page} = this.props.posts
        this.handlefetchPosts(page + 1)
    }
    render() {
        const {list, hasNext} = this.props.posts
        const lists = list.map(list => {
            return (
                <MainItem key={list._id} list={list} />
            )
        })
        const loadMore = hasNext ? <a onClick={this.handleLoadMore} href="javascript:;">加载更多</a> : <span>好厉害, 竟然翻到最后一页了...</span>
        return (
            <div className="g-mn">
                <div className="posts">
                    {lists}
                </div>
                <div className="box m-page box-do">
                    <div className="w-icon w-icon-2" />
                    <div className="w-icon w-icon-3" />
                    {loadMore}
                </div>
                <Footer />
            </div>
        )
    }
}
