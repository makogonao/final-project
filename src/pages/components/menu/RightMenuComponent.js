import React, { Component } from "react";
import dayjs from "dayjs";
import { getTasksByUserID, getAllUsers } from "../../../api";
import "./MenuComponent.css";
import "../calendar/calendar.css";
import MenuItem from "./MenuItem";
import Tasks from "../calendar/Tasks";
import Birthday from "../calendar/Birthday";
import Calendar from "react-calendar";

export default class RightMenuComponent extends Component {
    state = {
        menuItems: [
            {
                menuItem: "Органайзер",
                icon: "edit_calendar",
                pageName: "organaizer",
                link: "",
                isMainMenuItem: false,
                message: "Список задач на"
            },
            {
                menuItem: "Дни рождения",
                icon: "celebration",
                pageName: "bithday",
                link: "",
                isMainMenuItem: false,
                message: "Список именинников на"
            },
            {
                menuItem: "Погода",
                icon: "beach_access",
                pageName: "messages",
                link: "",
                isMainMenuItem: false,
                message: "Прогноз погоды на"
            },
        ],
        activeLink: {},
        activeDate: null,
        userTasks: [],
        users: [],
    };

    componentDidMount() {
        this.updateTasksList()
        this.updateUsersList()
        this.setState({
            activeLink: this.state.menuItems[0],
            activeDate: new Date(),
        });
    }

    updateTasksList = () => {
        getTasksByUserID(localStorage.getItem("userId"), localStorage.getItem("token"))
        .then((body) => {
            this.setState({
                userTasks: [...body.values.tasks],
            }, console.log(this.state.userTasks));
        })
        .catch((err) => {
            this.props.changeUserStatus(false);
            console.error(err);
        });
    }

    updateUsersList = () => {
        getAllUsers(localStorage.getItem("token"))
        .then((body) => {
            this.setState({
                users: [...body.values],
            });
        })
        .catch((err) => {
            this.props.changeUserStatus(false);
            console.error(err);
        });
    }
    
    changeActiveLink = (item) => {
        this.setState({
            activeLink: item,
        });
        this.changeDate(this.state.activeDate)
    };
    
    changeDate = (value) => {
        this.updateTasksList()
        this.updateUsersList()
        // getTasksByUserID(parseInt(localStorage.getItem("userId")), localStorage.getItem("token"))
        // .then((body) => {
        //     this.setState({
        //         userTasks: [...body.values.tasks],
        //     });
        // })
        // .catch((err) => {
        //     this.props.changeUserStatus(false);
        //     console.error(err);
        // });
        this.setState({
            activeDate: value,
        });
    };

    paintTasksDate = (date) => {
        const tasksDates = [];
        this.state.userTasks.forEach(element => {
            tasksDates.push(dayjs(element.scheduled_date).format("YYYY-MM-DD"))     
        });
        return (tasksDates.indexOf(dayjs(date).format("YYYY-MM-DD")) != -1)
    }

    paintBirthDates = (date) => {
        const birthDates = [];
        this.state.users.forEach(element => {
            birthDates.push(dayjs(element.birth_date).format("MM-DD"))     
        });
        return (birthDates.indexOf(dayjs(date).format("MM-DD")) != -1)
    }
    
    render() {
        return (
            <div className="menu-container">
                <ul>
                    {this.state.menuItems.map((item) => (
                        <MenuItem
                            key={item.menuItem}
                            item={item}
                            changeActiveLink={this.changeActiveLink}
                            activeLink={this.state.activeLink}
                        />
                    ))}
                </ul>
                <div className="widget">
                <Calendar
                    tileClassName={
                        (this.state.activeLink === this.state.menuItems[0] &&
                        (({activeStartDay, date, view})=> view === "month" && this.paintTasksDate(date) ? "day-with-taks" : null)) ||
                        (this.state.activeLink === this.state.menuItems[1] &&
                        (({activeStartDay, date, view})=> view === "month" && this.paintBirthDates(date) ? "day-with-taks" : null))}
                    maxDetail="month"
                    onClickDay={(value)=>this.changeDate(value)}
                    prev2Label={<span className="material-icons">navigate_before</span>}
                    prevLabel={<span className="material-icons">arrow_back_ios_new</span>}
                    nextLabel={<span className="material-icons">arrow_forward_ios</span>}
                    next2Label={<span className="material-icons">navigate_next</span>}
                    className="task"
                /></div>
                {this.state.activeLink === this.state.menuItems[0] &&
                 <Tasks 
                    activeLink={this.state.activeLink}
                    activeDate={this.state.activeDate}
                    userTasks={this.state.userTasks}
                    updateTasksList={this.updateTasksList} 
                />}
                {this.state.activeLink === this.state.menuItems[1] &&
                 <Birthday 
                    activeLink={this.state.activeLink}
                    activeDate={this.state.activeDate}
                    users={this.state.users}
                    updateTasksList={this.updateUsersList} 
                />}
                
            </div>
        );
    }
}
