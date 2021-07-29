import React, { Component } from "react";
import "./EditProfile.css";
import { editUserByID } from "../../../api";
import dayjs from "dayjs";
import validator from "validator";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
});

export default class EditProfile extends Component {
    state = {
        user: this.props.user,
        user_surname: this.props.user.user_surname,
        user_name: this.props.user.user_name,
        user_patronymic_name: this.props.user.user_patronymic_name,
        format_birth_date: dayjs(this.props.user.birth_date).format(
            "YYYY-MM-DD"
        ),
        birth_dateIsValid: false,
        birth_date: this.props.user.birth_date,
        gender: this.props.user.gender,
        avatar: this.props.user.avatar,
        company_division: this.props.user.company_division,
        company_department: this.props.user.company_department,
        position: this.props.user.position,
        phone_number: this.props.user.phone_number,
        email: this.props.user.email,
        password: this.props.user.password,
        user_role: this.props.user.user_role,
        editUserId: 0,

    };



    componentDidMount() {
        this.props.changeActivePage("EditProfile");
    }

    saveUserChangesByID = (id, parameter, item) => {
        editUserByID(id, localStorage.getItem("token"), parameter, item)
            .then((body) => {
                console.log(body);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    changeUserSurname = (event) => {
        this.setState(
            {
                user_surname: event.target.value,
            },
            () => console.log(this.state.user_surname)
        );
    };
    changeUserName = (event) => {
        this.setState(
            {
                user_name: event.target.value,
            },
            () => console.log(this.state.user_name)
        );
    };
    changeUserPatronymicName = (event) => {
        this.setState(
            {
                user_patronymic_name: event.target.value,
            },
            () => console.log(this.state.user_patronymic_name)
        );
    };
    changeBirthDate = (event) => {
        const dateValue = event.target.value
        if (validator.isDate(dateValue)) {
            this.setState(
                {
                    birth_date: dayjs(dateValue).format("YYYY-MM-DD"),
                    format_birth_date: dayjs(dateValue).format("YYYY-MM-DD"),
                },
                () => console.log(dayjs(dateValue).toISOString())
            );
        }
    };

    changeGender = (event) => {
        this.setState(
            {
                gender: event.target.value,
            },
            () => console.log(this.state.gender)
        );
    };
    changeAvatar = (event) => {
        this.setState(
            {
                avatar: event.target.value,
            },
            () => console.log(this.state.avatar)
        );
    };
    changeCompanyDivision = (event) => {
        this.setState(
            {
                company_division: event.target.value,
            },
            () => console.log(this.state.company_division)
        );
    };
    changeCompanyDepartment = (event) => {
        this.setState(
            {
                company_department: event.target.value,
            },
            () => console.log(this.state.company_department)
        );
    };
    changePosition = (event) => {
        this.setState(
            {
                position: event.target.value,
            },
            () => console.log(this.state.position)
        );
    };
    changePhoneNumber = (event) => {
        this.setState(
            {
                phone_number: event.target.value,
            },
            () => console.log(this.state.phone_number)
        );
    };
    changeUserRole = (event) => {
        this.setState(
            {
                user_role: event.target.value,
            },
            () => console.log(this.state.user_role)
        );
    };

    render() {
        return (
            <div className="edit-profile-container">
                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">
                            Ваша фамилия:{" "}
                        </div>
                        <div className="edit-user-item-input-container">
                            <input
                                name="user_surname"
                                value={this.state.user_surname}
                                onChange={this.changeUserSurname}
                            />
                        </div>
                    </div>
                    {this.state.user_surname !==
                        this.props.user.user_surname && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "user_surname",
                                        this.state.user_surname
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">Ваше имя: </div>
                        <div className="edit-user-item-input-container">
                            <input
                                name="user_name"
                                value={this.state.user_name}
                                onChange={this.changeUserName}
                            />
                        </div>
                    </div>
                    {this.state.user_name !== this.props.user.user_name && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "user_name",
                                        this.state.user_name
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">
                            Ваше отчество:{" "}
                        </div>
                        <div className="edit-user-item-input-container">
                            <input
                                name="user_patronymic_name"
                                value={this.state.user_patronymic_name}
                                onChange={this.changeUserPatronymicName}
                            />
                        </div>
                    </div>
                    {this.state.user_patronymic_name !==
                        this.props.user.user_patronymic_name && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "user_patronymic_name",
                                        this.state.user_patronymic_name
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">
                            Дата вашего рождения:
                        </div>
                        <div className="edit-user-item-input-container">
                            <TextField
                                className="date-picker"
                                id="date"
                                type="date"
                                defaultValue={this.state.format_birth_date}
                                onChange={(event) => this.changeBirthDate(event)}
                                InputProps={{ disableUnderline: true,}}
                            />
                        </div>
                    </div>
                    {dayjs(this.state.birth_date).format("YYYY-MM-DD") !== dayjs(this.props.user.birth_date).format("YYYY-MM-DD") && 
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "birth_date",
                                        this.state.birth_date
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    }
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">Ваш пол: </div>
                        <div className="edit-user-item-input-container">
                            <select
                                name="gender"
                                value={this.state.gender}
                                onChange={this.changeGender}
                            >
                                <option value={null}>Не указан</option>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>
                        </div>
                    </div>
                    {this.state.gender !== this.props.user.gender && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "gender",
                                        this.state.gender
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">Фотография: </div>
                        <div className="edit-user-item-input-container">
                            <input
                                type="filename"
                                name="avatar"
                                value={this.state.avatar}
                                onChange={this.changeAvatar}
                            />
                        </div>
                    </div>
                    {this.state.avatar !== this.props.user.avatar && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "avatar",
                                        this.state.avatar
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">
                            Ваше место работы:
                        </div>
                        <div className="edit-user-item-input-container">
                            <input
                                name="company_division"
                                value={this.state.company_division}
                                onChange={this.changeCompanyDivision}
                            />
                        </div>
                    </div>
                    {this.state.company_division !==
                        this.props.user.company_division && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "company_division",
                                        this.state.company_division
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">
                            Подразделение:{" "}
                        </div>
                        <div className="edit-user-item-input-container">
                            <input
                                name="company_department"
                                value={this.state.company_department}
                                onChange={this.changeCompanyDepartment}
                            />
                        </div>
                    </div>
                    {this.state.company_department !==
                        this.props.user.company_department && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "company_department",
                                        this.state.company_department
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">Должность: </div>
                        <div className="edit-user-item-input-container">
                            <input
                                name="position"
                                value={this.state.position}
                                onChange={this.changePosition}
                            />
                        </div>
                    </div>
                    {this.state.position !== this.props.user.position && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "position",
                                        this.state.position
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                <div className="edit-user-item-form">
                    <div className="edit-user-item">
                        <div className="edit-user-parameter">
                            Номер телефона:{" "}
                        </div>
                        <div className="edit-user-item-input-container">
                            <input
                                name="phone_number"
                                value={this.state.phone_number}
                                onChange={this.changePhoneNumber}
                            />
                        </div>
                    </div>
                    {this.state.phone_number !==
                        this.props.user.phone_number && (
                        <div className="save-user-changes-btn-container">
                            <button
                                className="transitions"
                                onClick={() => (
                                    this.saveUserChangesByID(
                                        this.state.user.id,
                                        "phone_number",
                                        this.state.phone_number
                                    ),
                                    this.props.updateUserInfo()
                                )}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    )}
                </div>

                {this.props.user.user_role === "Administrator" && (
                    <div className="edit-user-item-form">
                        <div className="edit-user-item">
                            <div className="edit-user-parameter">
                                Ваш статус на портале:
                            </div>
                            <div className="edit-user-item-input-container">
                                <select
                                    name="user_role"
                                    value={this.state.user_role}
                                    onChange={this.changeUserRole}
                                >
                                    <option value="User">
                                        Обычный пользователь
                                    </option>
                                    <option value="Administrator">
                                        Администратор
                                    </option>
                                </select>
                            </div>
                        </div>
                        {this.state.user_role !== this.props.user.user_role && (
                            <div className="save-user-changes-btn-container">
                                <button
                                    className="transitions"
                                    onClick={() => (
                                        this.saveUserChangesByID(
                                            this.state.user.id,
                                            "user_role",
                                            this.state.user_role
                                        ),
                                        this.props.updateUserInfo()
                                    )}
                                >
                                    Сохранить изменения
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
