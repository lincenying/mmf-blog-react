import React from 'react'
import {Clicker} from '../components/clicker'
import {SimpleClicker} from '../components/simpleclicker'

export const Main = React.createClass({
    render() {
        return (
            <div>
                <Clicker/>
                <SimpleClicker/>
            </div>
        )
    }
})
