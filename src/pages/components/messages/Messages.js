import React, { Component } from 'react'

export default class Messages extends Component {
    componentDidMount() {
        this.props.changeActivePage('Messages')
    }
    render() {


        return (
            <div>
                Мессенджер
            </div>
        )
    }
}
