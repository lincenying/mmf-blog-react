import React from 'react'

export const CommentItem = React.createClass({
    getInitialState: function() {
        return {showMore: 0}
    },
    handleOpen() {
        this.setState({showMore: !this.state.showMore})
    },
    render() {
        const item = this.props.list
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
                                            <a className="s-fc2 itag bcmtlstk" href="javascript:;">{ item.username }</a>
                                            <span className="bcmtlstf s-fc4">：</span>
                                            <span className="bcmtlstf s-fc4 itag">{ item.content }</span></div>
                                    </div>
                                </div>
                                <div className="bcmtlsth">
                                    <a className="s-fc2 itag" href="javascript:;">删除</a><a className="s-fc2 itag" href="javascript:;">回复</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
})
