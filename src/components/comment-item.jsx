import React, {Component} from 'react'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'

@immutableRenderDecorator
export class CommentItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMore: 0
        }
    }
    handleReply(val) {
        $('#content').val('回复 '+ val +': ').focus()
    }
    render() {
        const {list} = this.props
        return (
            <li className="s-bd2 s-bg2">
                <div className="bcmtlsta clearfix">
                    <div className="bcmtlstb">
                        <a href="javascript:;"><img className="itag" src="http://ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" /></a>
                    </div>
                    <div className="bcmtlstc">
                        <div className="bcmtlstd clearfix">
                            <div className="bcmtlste clearfix">
                                <div className="bcmtlstg">
                                    <div className="bcmtlsti">
                                        <div className="bcmtlstj">
                                            <a className="s-fc2 itag bcmtlstk" href="javascript:;">{list.username}</a>
                                            <span className="bcmtlstf s-fc4">：</span>
                                            <span className="bcmtlstf s-fc4 itag">{list.content}</span></div>
                                    </div>
                                </div>
                                <div className="bcmtlsth">
                                    <a className="s-fc2 itag hidden" href="javascript:;">删除</a><a onClick={this.handleReply.bind(this, list.username)} className="s-fc2 itag" href="javascript:;">回复</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
