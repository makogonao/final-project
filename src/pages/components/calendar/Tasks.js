import React, { Component } from "react";
import dayjs from "dayjs";
import "./calendar.css";
import "./Tasks.css";
import Task from "./Task";
import AddTask from "./AddTask";
import validator from "validator";
import { addNewTask } from "../../../api";

export default class Tasks extends Component {

    state = {
        showAddform: false,
        scheduled_date: "",
        task_name: "",
        task_description: "",
    }

    changeShowAddForm = ()=> {
        this.setState({
            showAddform: !this.state.showAddform,
        })
    }

    changeScheduledDate = (event) => {
        const dateValue = event.target.value;
        if (validator.isDate(dateValue)) {
            this.setState(
                {
                    scheduled_date: dayjs(dateValue).format("YYYY-MM-DD"),
                },
                ()=>console.log(this.state.scheduled_date)
            );
        }
    };
    
    changeTaskName = (event) => {
        this.setState(
            {
                task_name: event.target.value,
            },
            ()=>console.log(this.state.task_name)
        );
    };

    changeTaskDescription = (event) => {
        this.setState(
            {
                task_description: event.target.value,
            }
        );
    };

    cancelAddNewTask = () => {
        this.setState({
            showAddform: false,
            scheduled_date: "",
            task_name: "",
            task_description: "",
        })
    }

    saveTask = () => {
        addNewTask(localStorage.getItem("userId"), localStorage.getItem("token"), dayjs(this.state.scheduled_date).format("YYYY-MM-DD mm:HH:ss"), this.state.task_name, this.state.task_description)
        .then((body) => {
            console.log(body.values)
        })
        .catch((err) => {
            this.props.changeUserStatus(false);
            console.error(err);
        });
        this.props.updateTasksList()
    }

    render() {
        return (
            <div className="widget calendar-items">

                <div className="tasks-header">
                    <div className="tasks-header-msg-btns">
                        <div className="tasks-header-message">
                            {` ${this.props.activeLink.message} ${dayjs(this.props.activeDate).format("DD.MM.YYYY")}`}
                        </div>
                        <div>
                            <div className="item-btns-container">
                                {this.state.showAddform && <div className="material-icons item-btn" onClick={()=>(this.changeShowAddForm(), this.saveTask())}>save</div>}
                                {this.state.showAddform && <div className="material-icons item-btn" onClick={()=>this.changeShowAddForm()}>close</div>}
                                {!this.state.showAddform && <div className="material-icons item-btn" onClick={()=>this.changeShowAddForm()}>add_task</div>}
                            </div>
                        </div>
                    </div>
                    {this.state.showAddform && 
                    <AddTask 
                        changeScheduledDate={this.changeScheduledDate}
                        changeTaskName={this.changeTaskName}
                        changeTaskDescription={this.changeTaskDescription}
                    />}
                </div>


                {this.props.userTasks
                .filter((item) => dayjs(item.scheduled_date).format("YYYY-MM-DD") === dayjs(this.props.activeDate).format("YYYY-MM-DD"))
                .map((item) => (
                    <Task
                        key={item.id}
                        task={item}   
                        updateTasksList={()=>this.props.updateTasksList()} 
                    />
                ))}

            </div>
        )
    }
}
