import React, { Component } from 'react'

export default class Deliveries extends Component {

    componentDidMount() {
        this.props.changeActivePage('Deliveries')
    }

    render() {
        return (
            <div>
                Поставка метариалов
            </div>
        )
    }
}
