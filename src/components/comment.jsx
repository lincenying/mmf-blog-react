import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as articleActions from '../actions/article'
import {CommentItem} from "./comment-item"
import api from '../api'

export const comment = React.createClass({
    propTypes: {
        fetchComment: PropTypes.func,
        postComment: PropTypes.func,
        comment: PropTypes.object
    },
    getInitialState: function() {
        return {
            username: '',
            content: ''
        };
    },
    componentDidMount() {
        this._fetchComment()
    },
    _fetchComment(page = 1) {
        const {fetchComment, id} = this.props
        fetchComment({
            action: 'comment',
            id,
            page
        })
    },
    handlePostComment() {
        const {postComment, id} = this.props
        api.getData({
            action: 'postComment',
            id,
            content: this.state.content,
            username: this.state.username
        }).then((json) => {
            postComment([json.data])
            this.setState({username: '', content: ''})
        })
    },
    handleLoadMore() {
        const {page} = this.props.comment
        this._fetchComment(page + 1)
    },
    handleChangeUsername(event) {
        this.setState({username: event.target.value})
    },
    handleChangeContent(event) {
        this.setState({content: event.target.value})
    },
    render() {
        const {list, hasNext} = this.props.comment
        const lists = list.map((list, index) => {
            return (
                <CommentItem key={list._id} list={list}></CommentItem>
            )
        })
        const more = hasNext ? (
            <div className="bcmtmore s-bd2">
                <div className="bcmtlsta"><a onClick={this.handleLoadMore} href="javascript:;" className="s-fc2 ztag">查看更多</a></div>
            </div>
        ) : ''
        return (
            <div className="box">
                <div className="comment">
                    <div className="nctitle">评论</div>
                    <div className="bcmt">
                        <div className="s-fc0 ztag ztag_tips">由于该用户的权限设置，您暂时无法进行评论...</div>
                        <div className="bcmtadd">
                            <input value={this.state.username} onChange={this.handleChangeUsername} type="text" className="form-control" placeholder="请输入昵称" />
                            <textarea value={this.state.content} onChange={this.handleChangeContent} id="content" className="form-control" placeholder="请输入评论内容"></textarea>
                            <div className="bcmtbtn">
                                <span className="ztag ztag_tips">提示</span>
                                <button onClick={this.handlePostComment} className="s-bd1 s-fc1 s-bg1 ztag">发布</button>
                                <div className="txt s-fc0"></div>
                            </div>
                        </div>
                        <div className="bcmtlst">
                            <ul className="clearfix ztag">
                                { lists }
                            </ul>
                        </div>
                        {more}
                    </div>
                </div>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        comment: state.article.comment
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleActions, dispatch)
}

export const Comment = connect(mapStateToProps, mapDispatchToProps)(comment)
