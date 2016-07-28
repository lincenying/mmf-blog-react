import React from 'react'
import {Link} from 'react-router'
import {DevTools} from '../components/devtools'

export const App = React.createClass({
    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h1>App</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/inbox">Inbox</Link>
                    </li>
                </ul>
                {this.props.children}
                <DevTools/>
            </div>
        )
    }
})
