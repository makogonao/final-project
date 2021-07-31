import React, { Component } from 'react'
import './Bargains.css'

export default class Bargains extends Component {

componentDidMount() {
    this.props.changeActivePage('Bargains')
}


    render() {
        return (
            <div>
                Оказии
            </div>
        )
    }
}
