import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as articleActions from '../actions/article'
import {CommentItem} from "./main-item"

export const comment = React.createClass({
    propTypes: {
        fetchComment: PropTypes.func,
        comment: PropTypes.object
    },
    componentDidMount() {
        console.log(this.props)
        this.handlefetchComment()
    },
    handlefetchComment(page = 1) {
        const {fetchComment} = this.props
        fetchComment({
            action: 'comment',
            id: 1,
            page
        })
    },
    handleLoadMore() {
        const {page} = this.props.comment
        this.handlefetchComment(page + 1)
    },
    render() {
        const {list} = this.props.comment
        const lists = list.map((list, index) => {
            return (
                <CommentItem key={list._id} list={list}></CommentItem>
            )
        })
        return (
            <div className="box">
                <div className="comment">
                    <div className="nctitle">评论</div>
                    <div className="bcmt">
                        <div className="s-fc0 ztag ztag_tips">由于该用户的权限设置，您暂时无法进行评论...</div>
                        <div className="bcmtadd">
                            <input type="text" className="form-control" placeholder="请输入昵称" />
                            <textarea id="content" className="form-control" placeholder="请输入评论内容"></textarea>
                            <div className="bcmtbtn">
                                <span className="ztag ztag_tips">提示</span>
                                <button className="s-bd1 s-fc1 s-bg1 ztag">发布</button>
                                <div className="txt s-fc0"></div>
                            </div>
                        </div>
                        <div className="bcmtlst">
                            <ul className="clearfix ztag">
                                { lists }
                            </ul>
                        </div>
                        <div className="bcmtmore s-bd2 ztag">
                            <div className="bcmtlsta"><span className="s-fc4">正在载入中...</span></div>
                        </div>
                        <div className="bcmtmore s-bd2">
                            <div className="bcmtlsta"><a href="javascript:;" className="s-fc2 ztag">查看更多</a></div>
                        </div>
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
