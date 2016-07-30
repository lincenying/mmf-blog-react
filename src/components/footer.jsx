import React from 'react'
import {Link} from 'react-router'

export const Footer = React.createClass({
    render() {
        return (
            <div className="g-ft">
                <span className="copy"><span title="Copyright">©</span> <Link to="index">M·M·F 小屋</Link> 2016.06</span>
                <span className="beian"><i></i> <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602003638">浙公网安备 33010602003638号</a></span>
            </div>
        )
    }
})
