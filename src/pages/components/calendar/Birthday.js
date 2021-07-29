import React, { Component } from 'react'
import dayjs from "dayjs";
import './birthday.css'
import BirthdayItem from "./BirthdayItem"

export default class Birthday extends Component {

    render() {
        return (
            <div className="birthdays-container">
                Список именинников на {dayjs(this.props.activeDate).format("DD.MM.YYYY")}
            {this.props.users
                .filter((item) => dayjs(item.birth_date).format("MM-DD") === dayjs(this.props.activeDate).format("MM-DD"))
                .map((item) => (
                    <BirthdayItem 
                    userName={item.user_name}
                    id={item.id}
                    userSurname={item.user_surname}
                    avatar={item.avatar}
                    />
                ))}
            </div>
        )
    }
}
