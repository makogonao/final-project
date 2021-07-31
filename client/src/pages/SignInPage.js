import React, { Component } from "react";
import "./Sign.css";
import validator from "validator";
import { authUser } from "../api.js";
import SignLinks from "./components/SignLinks";
import { Redirect } from "react-router-dom";

export default class SignInComponent extends Component {
    state = {
        email: "",
        password: "",
        isValEmail: false,
        isValPassword: false,
        btnIsPressed: false,
        passIsVisible: false,
        userErr: false,
        passwordErr: false,
        authorized: false,
    };

    handleVisibility = () => {
        this.setState({
            passIsVisible: !this.state.passIsVisible,
        });
    };

    handleUserEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
        if (validator.isEmail(event.target.value)) {
            this.setState({
                isValEmail: true,
            });
        } else {
            this.setState({
                isValEmail: false,
            });
        }
    };

    handleUserPassword = (event) => {
        this.setState({
            password: event.target.value,
        });
        if (
            validator.isStrongPassword(event.target.value, {
                minLength: 1,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 0,
            })
        ) {
            this.setState({
                isValPassword: true,
            });
        } else {
            this.setState({
                isValPassword: false,
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.isValPassword && this.state.isValEmail) {
            const { email, password } = this.state;
            authUser(email, password)
                .then((body) => {
                    console.log(body);
                    if (body.values.message === "User not found") {
                        this.setState({
                            userErr: true,
                        })
                    } else if (body.values.message === "Invalid password") {
                        this.setState({
                            passwordErr: true,
                        })
                    } else if (body.values.message === "authorized") {
                        localStorage.setItem("token", body.values.token);
                        localStorage.setItem("userId", body.values.userInfo.id);
                        localStorage.setItem("authorized", "true");
                        this.setState({
                            authorized: true,
                        })
                    } else {
                        console.error('Неизвестная ошибка');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            this.setState({
                btnIsPressed: true,
            });
        }
    };

    render() {
    if (this.state.authorized) {
            return <Redirect to="/main" />;
    } else {
        return (
            <>
                <SignLinks />
                <div className="sign-container">
                    <form onSubmit={this.handleSubmit}>
                        <h2>Авторизация</h2>
                        <label>
                            <div className="input-heading">E-mail:</div>
                            <div
                                className={`sign-input-container transitions ${
                                    this.state.isValEmail && "validation-is-ok"
                                }`}
                                >
                                <input
                                    name="userEmail"
                                    onChange={this.handleUserEmail}
                                    ></input>
                            </div>
                            <div className="error-message-container transitions">
                                {this.state.btnIsPressed &&
                                    !this.state.isValEmail &&
                                    "Вы ввели некорректный e-mail."}
                                    {this.state.userErr && "Пользователь не найден"}
                            </div>
                        </label>

                        <label>
                            <div className="input-heading">Пароль:</div>
                            <div
                                className={`sign-input-container transitions ${
                                    this.state.isValPassword &&
                                    "validation-is-ok"
                                }`}
                            >
                                <input
                                    name="userPassword"
                                    type={
                                        this.state.passIsVisible
                                            ? "text"
                                            : "password"
                                    }
                                    onChange={this.handleUserPassword}
                                ></input>
                                <div
                                    className="material-icons show-hide-eye"
                                    onClick={this.handleVisibility}
                                >
                                    {this.state.passIsVisible
                                        ? "visibility"
                                        : "visibility_off"}
                                </div>
                            </div>
                            <div className="error-message-container transitions">
                                {this.state.btnIsPressed &&
                                    !this.state.isValPassword &&
                                    "Длина пароля не может быть менее 8 символов. Пароль должен содержать латинские буквы как верхнего, так и нижнего регистра, минимум одну цифру, минимум один спецсимвол."}
                                {this.state.passwordErr && "Неверный пароль"}
                            </div>
                        </label>

                        <button type="submit" className="transitions">
                            Войти
                        </button>
                    </form>
                </div>
            </>
        );
    }}
}
