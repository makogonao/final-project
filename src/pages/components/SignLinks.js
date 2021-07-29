import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class SignLinks extends Component {
    render() {
        return (
            <div className="sign-links">
                <Link className="transitions" to="/reg">Регистрация</Link>
                <Link className="transitions" to="/auth">Авторизация</Link>
            </div>
        )
    }
}
