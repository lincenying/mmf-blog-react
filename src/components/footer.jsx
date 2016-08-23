import React from 'react'
import Link from 'react-router/lib/Link'

export class Footer extends React.Component {
    shouldComponentUpdate () {
        return false
    }
    render() {
        return (
            <div className="g-ft">
                <span className="copy"><span title="Copyright">©</span> <Link to="index">M·M·F 小屋</Link> 2016.06</span>
                <span className="beian"><i></i> <a target="_blank" rel="noopener noreferrer" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=00000000000000">浙公网安备 00000000000000号</a></span>
            </div>
        )
    }
}
