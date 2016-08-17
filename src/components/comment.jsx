import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as articleActions from '../actions/article'
import * as globalsActions from '../actions/globals'
import {CommentItem} from "./comment-item"
import api from '../api'

class comment extends Component {
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
        let {pathname} = this.props.comment
        if (pathname !== this.props.pathname) this._fetchComment()
    }
    componentWillUpdate(prevProps) {
        let pathname = this.props.pathname
        let prevPathname = prevProps.pathname
        if (pathname !== prevPathname) this._fetchComment()
    }
    _fetchComment(page = 1) {
        const {fetchComment, id, pathname} = this.props
        fetchComment({action: 'comment', id, page, pathname})
    }
    async handlePostComment() {
        const {postComment, setMessage, id} = this.props
        const {username, content} = this.state
        if (this.state.content === '') {
            setMessage({type: 'error', content: '请输入评论内容!'})
            return false
        }
        const json = await api.getData({
            action: 'postComment',
            id,
            content,
            username: username || '匿名用户'
        })
        postComment([json.data])
        this.setState({username: '', content: ''})
        setMessage('发表评论成功!')
    }
    handleLoadMore() {
        const {page} = this.props.comment
        this._fetchComment(page + 1)
    }
    handleChange(type, event) {
        this.setState({[type]: event.target.value})
    }
    render() {
        const {list, hasNext} = this.props.comment
        const lists = list.map((list, index) => {
            return (
                <CommentItem key={list._id} list={list}></CommentItem>
            )
        })
        const more = hasNext
            ? (
                <div className="bcmtmore s-bd2">
                    <div className="bcmtlsta">
                        <a onClick={this.handleLoadMore} href="javascript:;" className="s-fc2 ztag">查看更多</a>
                    </div>
                </div>
            )
            : ''
        return (
            <div className="box">
                <div className="comment">
                    <div className="nctitle">评论</div>
                    <div className="bcmt">
                        <div className="s-fc0 ztag ztag_tips">由于该用户的权限设置，您暂时无法进行评论...</div>
                        <div className="bcmtadd">
                            <input value={this.state.username} onChange={this.handleChange.bind(this, 'username')} type="text" className="form-control" placeholder="请输入昵称"/>
                            <textarea value={this.state.content} onChange={this.handleChange.bind(this, 'content')} id="content" className="form-control" placeholder="请输入评论内容"></textarea>
                            <div className="bcmtbtn">
                                <span className="ztag ztag_tips">提示</span>
                                <button onClick={this.handlePostComment} className="s-bd1 s-fc1 s-bg1 ztag">发布</button>
                                <div className="txt s-fc0"></div>
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

comment.propTypes = {
    fetchComment: PropTypes.func,
    postComment: PropTypes.func,
    comment: PropTypes.object
}
function mapStateToProps(state) {
    return {comment: state.article.toJS().comment}
}

function mapDispatchToProps(dispatch) {
    const _Action = Object.assign({}, articleActions, globalsActions)
    return bindActionCreators(_Action, dispatch)
}

export const Comment = connect(mapStateToProps, mapDispatchToProps)(comment)
