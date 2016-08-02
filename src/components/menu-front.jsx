import React from 'react'
import {Link} from 'react-router'

export const MenuFront = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div className="box menu">
                <div className="m-sch">
                    <input onKeyUp={this.handleSearch} id="search_content" className="sch" type="text" name="q" placeholder="记得按回车哦" />
                </div>
                <div className="m-nav">
                    <ul className="menuOpen">
                        <li className="tag-all"><Link activeClassName="v-link-active" to="/" onlyActiveOnIndex={true}><i></i>All</Link></li>
                        <li className="tag-life"><Link activeClassName="v-link-active" to={`/category/1`}><i></i>Life</Link></li>
                        <li className="tag-study"><Link activeClassName="v-link-active" to={`/category/2`}><i></i>Study</Link></li>
                        <li className="tag-other"><Link activeClassName="v-link-active" to={`/category/3`}><i></i>Other</Link></li>
                    </ul>
                </div>
            </div>
        )
    },
    handleSearch(e) {
        var qs = e.target.value
        if (e.keyCode === 13 && qs !== '') {
            this.context.router.push('/search/'+qs)
        }
    }
})
