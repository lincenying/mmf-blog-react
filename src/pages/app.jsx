import React from 'react'
import {About} from '../components/about'
import {MenuFront} from '../components/menu-front'
import {Footer} from '../components/footer'
import {Arrow} from '../components/arrow'
import {DevTools} from '../components/devtools'
import '../html/css/style.css'
import '../html/css/hljs/googlecode.css'

export const App = React.createClass({
    componentDidMount() {

    },
    componentDidUpdate(prevProps) {

    },
    render() {
        return (
            <div className="g-doc">
                <div className="g-hd">
                    <About></About>
                    <MenuFront />
                </div>
                { this.props.children }
                <Footer />
                <Arrow />
                <DevTools />
            </div>
        )
    }
})
