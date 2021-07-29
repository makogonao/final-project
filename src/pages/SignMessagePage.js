import React, { Component } from 'react'
import "./Sign.css";
import { Link } from "react-router-dom";
import SignLinks from "./components/SignLinks";

export default class SignMessagePage extends Component {
    render() {
        return (
            <>
            <SignLinks />
            <div className="sign-container sign-message-page">
                <div>Регистрация прошла успешно.</div>
                <div>Перейдите на страницу <Link className="transitions link" to="/auth">авторизации</Link>.</div>
            </div>
            </>
        )
    }
}
