import React, { Component } from "react";
import "./Sign.css";
import validator from "validator";
import { registerUser } from "../api.js";
import { Redirect } from "react-router-dom";
import SignLinks from "./components/SignLinks";


export default class Registration extends Component {
    state = {
        email: "",
        userName: "",
        userSurname: "",
        password: "",
        isValEmail: false,
        isValUserName: false,
        isValUserSurname: false,
        isValPassword: false,
        btnIsPressed: false,
        passIsVisible: false,
        registered: false,
        message: "",
    };

    handleVisibility = () => {
        this.setState({
            passIsVisible: !this.state.passIsVisible,
        });
    };

    handleUserName = (event) => {
        this.setState({
            userName: event.target.value,
        });
        if (validator.isLength(event.target.value, { min: 2, max: 20 })) {
            this.setState({
                isValUserName: true,
            });
        } else {
            this.setState({
                isValUserName: false,
            });
        }
    };

    handleUserSurname = (event) => {
        this.setState({
            userSurname: event.target.value,
        });
        if (validator.isLength(event.target.value, { min: 2, max: 20 })) {
            this.setState({
                isValUserSurname: true,
            });
        } else {
            this.setState({
                isValUserSurname: false,
            });
        }
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
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
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
        if (
            this.state.isValUserName &&
            this.state.isValUserSurname &&
            this.state.isValPassword &&
            this.state.isValEmail
        ) {
            const { email, userName, userSurname, password } = this.state;
            registerUser(email, userName, userSurname, password)
                .then((body) => {
                    if (body.values.message === "registered") {
                        console.log(body.values.message);
                        this.setState({
                            registered: true,
                        });
                    } else {
                        this.setState({
                            message: body.values.error,
                        });
                    }
                    console.log(body);
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
            if (this.state.registered) {
                    return <Redirect to="/reg-message" />;
            } else {
                return (
                    <>
                    <SignLinks />
                    <div className="sign-container">
                        <form onSubmit={this.handleSubmit}>
                            <h2>Регистрация</h2>
                            <label>
                                <div className="input-heading">Имя:</div>
                                <div
                                    className={`sign-input-container transitions ${
                                        this.state.isValUserName &&
                                        "validation-is-ok"
                                    }`}
                                >
                                    <input
                                        name="userName"
                                        onChange={this.handleUserName}
                                    ></input>
                                </div>
                                <div className="error-message-container transitions">
                                    {this.state.btnIsPressed &&
                                        !this.state.isValUserName &&
                                        "В имени не может быть меньше 2 и больше 20 символов."}
                                </div>
                            </label>

                            <label>
                                <div className="input-heading">Фамилия:</div>
                                <div
                                    className={`sign-input-container transitions ${
                                        this.state.isValUserSurname &&
                                        "validation-is-ok"
                                    }`}
                                >
                                    <input
                                        name="userSurname"
                                        onChange={this.handleUserSurname}
                                    ></input>
                                </div>
                                <div className="error-message-container transitions">
                                    {this.state.btnIsPressed &&
                                        !this.state.isValUserSurname &&
                                        "В фамилии не может быть меньше 2 и больше 20 символов."}
                                </div>
                            </label>

                            <label>
                                <div className="input-heading">E-mail:</div>
                                <div
                                    className={`sign-input-container transitions ${
                                        this.state.isValEmail &&
                                        "validation-is-ok"
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
                                    {(this.state.message !== "") && this.state.message}    
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
                                </div>
                            </label>

                            <button type="submit" className="transitions">
                                Зарегестрироваться
                            </button>
                            
                        </form>
                    </div>
                </>
            );
        }
    }
}
