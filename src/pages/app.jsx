import React from 'react'
import {About} from '../components/about'
import {MenuFront} from '../components/menu-front'
import {MenuAdmin} from '../components/menu-admin'
import {Footer} from '../components/footer'
import {Arrow} from '../components/arrow'
import {DevTools} from '../components/devtools'
import {Toastr} from '../components/_toastr.jsx'
import '../html/css/style.css'
import '../html/css/nprogress.css'
import '../html/css/animate.min.css'
import '../html/css/toastr.min.css'

export const App = React.createClass({
    render() {
        const {route: {needLogin}} = this.props
        const menu = needLogin === "1" ? <MenuAdmin /> : <MenuFront />
        return (
            <div className="g-doc">
                <div className="g-hd">
                    <About></About>
                    {menu}
                </div>
                { this.props.children }
                <Footer />
                <Arrow />
                <DevTools />
                <Toastr />
            </div>
        )
    }
})
