import React, {Component} from 'react'
import Link from 'react-router/lib/Link'
import {contextTypes} from '../decorators'

@contextTypes({
    router: React.PropTypes.object.isRequired
})
export class MenuFront extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(e) {
        var qs = e.target.value
        if (e.keyCode === 13 && qs !== '') {
            this.context.router.push('/search/'+qs)
        }
    }
    render() {
        return (
            <div className="box menu">
                <div className="m-sch">
                    <input onKeyUp={this.handleSearch} id="search_content" className="sch" type="text" name="q" placeholder="记得按回车哦" />
                </div>
                <div className="m-nav">
                    <ul className="menuOpen">
                        <li className="tag-all"><Link activeClassName="v-link-active" to="/" onlyActiveOnIndex><i></i>All</Link></li>
                        <li className="tag-life"><Link activeClassName="v-link-active" to={`/category/1`}><i></i>Life</Link></li>
                        <li className="tag-study"><Link activeClassName="v-link-active" to={`/category/2`}><i></i>Study</Link></li>
                        <li className="tag-other"><Link activeClassName="v-link-active" to={`/category/3`}><i></i>Other</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}
