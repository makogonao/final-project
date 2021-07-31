import React, { Component } from "react";
import dayjs from "dayjs";
import "./Tasks.css";
import validator from "validator";
import { editTaskByID, archiveTasksByID} from "../../../api";

export default class Task extends Component {
    state = {
        isEdit: false,
        task_name: this.props.task.task_name,
        task_description: this.props.task.task_description,
        scheduled_date: this.props.task.scheduled_date,
    };

    handleIsEditStatus = (item) => {
        this.setState({
            isEdit: item,
        });
    };

    cancelChanges = () => {
        this.setState({
            task_name: this.props.task.task_name,
            task_description: this.props.task.task_description,
            scheduled_date: this.props.task.scheduled_date,
        })
    }

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
            },
            ()=>console.log(this.state.task_description)
        );
    };

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

    saveTask = () => {
        editTaskByID(this.props.task.id, localStorage.getItem("token"), dayjs(this.state.scheduled_date).format("YYYY-MM-DD mm:HH:ss"), this.state.task_name, this.state.task_description)
        .then((body) => {
            console.log(body.values)
        })
        .catch((err) => {
            this.props.changeUserStatus(false);
            console.error(err);
        });
        this.props.updateTasksList()
    }

    archiveTasks = () => {
        archiveTasksByID(this.props.task.id, localStorage.getItem("token"))
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
            <div className={`task ${this.state.isEdit && "task-is-edit"}`}>

                <div className="tasks-header-msg-btns">
                    <div className="task-heading">{this.state.task_name}</div>
                    <div>
                    <div className="item-btns-container">
                        {!this.state.isEdit && (<div className="material-icons item-btn" onClick={() => this.handleIsEditStatus(true)}>edit</div>)}
                        {/* {!this.state.isEdit && (<div className="material-icons item-btn">done</div>)} */}
                        {!this.state.isEdit && (<div className="material-icons item-btn" onClick={() => (this.archiveTasks())} >delete</div>)}
                        {this.state.isEdit && (<div className="material-icons item-btn" onClick={() => (this.saveTask(), this.handleIsEditStatus(false))}>save</div>)}
                        {this.state.isEdit && (<div className="material-icons item-btn" onClick={() =>  (this.handleIsEditStatus(false), this.cancelChanges())}>undo</div>)}
                    </div></div>
                </div>
                {this.state.isEdit && 
                <input className={`task-name ${this.state.isEdit && "task-name-is-edit"}`} value={this.state.task_name} disabled={!this.state.isEdit} onChange={(event) => this.changeTaskName(event)}/>}
                {this.state.isEdit && 
                (<input type="date" className={`task-name ${this.state.isEdit && "task-name-is-edit"}`} onChange={(event) => this.changeScheduledDate(event)}/>)}
                <textarea className={`task-description ${this.state.isEdit && "task-name-is-edit"}`} value={this.state.task_description} disabled={!this.state.isEdit} onChange={(event) => this.changeTaskDescription(event)}/>
            </div>
        );
    }
}
