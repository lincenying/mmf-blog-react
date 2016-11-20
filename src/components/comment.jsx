import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {propTypes} from '../decorators'
import {fetchComment, postComment, setMessage} from 'alias-store-actions'
import {CommentItem} from "./comment-item.jsx"
import api from '../api'

function mapStateToProps(state) {
    return {comment: state.article.toJS().comment}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchComment, postComment, setMessage}, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
@propTypes({
    comment: PropTypes.object,
    fetchComment: PropTypes.func.isRequired,
    postComment: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired
})
export class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            content: ''
        }
        this.handlePostComment = this.handlePostComment.bind(this)
        this.handleLoadMore = this.handleLoadMore.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentWillMount() {
        const {pathname} = this.props.comment
        if (pathname !== this.props.pathname) this.handleFetchComment()
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.pathname
        const prevPathname = prevProps.pathname
        if (pathname !== prevPathname) this.handleFetchComment()
    }
    handleChange(e) {
        const id = e.target.id,
            value = e.target.value
        const state = this.state
        state[id] = value
        this.setState(state)
    }
    handleFetchComment(page = 1) {
        const {fetchComment, id, pathname} = this.props
        fetchComment({id, page, pathname})
    }
    handleLoadMore() {
        const {page} = this.props.comment
        this.handleFetchComment(page + 1)
    }
    async handlePostComment() {
        const {postComment, setMessage, id} = this.props
        const {username, content} = this.state
        if (this.state.content === '') {
            setMessage({type: 'error', content: '请输入评论内容!'})
            return false
        }
        const json = await api.post('frontend/comment/post', {
            id,
            content,
            username: username || '匿名用户'
        })
        postComment([json.data])
        this.setState({username: '', content: ''})
        setMessage('发表评论成功!')
    }
    render() {
        const {list, hasNext} = this.props.comment
        const lists = list.map(list => {
            return (
                <CommentItem key={list._id} list={list} />
            )
        })
        const more = hasNext ?
            <div className="bcmtmore s-bd2">
                <div className="bcmtlsta">
                    <a onClick={this.handleLoadMore} href="javascript:;" className="s-fc2 ztag">查看更多</a>
                </div>
            </div> : ''
        return (
            <div className="box">
                <div className="comment">
                    <div className="nctitle">评论</div>
                    <div className="bcmt">
                        <div className="s-fc0 ztag ztag_tips">由于该用户的权限设置，您暂时无法进行评论...</div>
                        <div className="bcmtadd">
                            <input value={this.state.username} onChange={this.handleChange} id="username" type="text" className="form-control" placeholder="请输入昵称" />
                            <textarea value={this.state.content} onChange={this.handleChange} id="content" className="form-control" placeholder="请输入评论内容" />
                            <div className="bcmtbtn">
                                <span className="ztag ztag_tips">提示</span>
                                <button onClick={this.handlePostComment} className="s-bd1 s-fc1 s-bg1 ztag">发布</button>
                                <div className="txt s-fc0" />
                            </div>
                        </div>
                        <div className="bcmtlst">
                            <ul className="clearfix ztag">
                                {lists}
                            </ul>
                        </div>
                        {more}
                    </div>
                </div>
            </div>
        )
    }
}
