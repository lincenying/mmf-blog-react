import React from 'react'

export const MenuAdmin = React.createClass({
    render() {
        return (
            <div className="box menu">
                <div className="m-nav">
                    <ul className="menuOpen">
                        <li className="tag-all"><a v-link="{ name: 'index', exact: true}"><i></i>All</a></li>
                        <li className="tag-life"><a v-link="{ name: 'adminList', params: { page: 1 }}"><i></i>List</a></li>
                        <li className="tag-study"><a v-link="{ name: 'adminPost'}"><i></i>Post</a></li>
                    </ul>
                </div>
            </div>
        )
    }
})
