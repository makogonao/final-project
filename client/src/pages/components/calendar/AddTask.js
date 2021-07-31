import React, { Component } from "react";
import dayjs from "dayjs";
import "./Tasks.css";


export default class AddTask extends Component {
    render() {
        return (
            <div>
                <div className="new-task-heading">Новая задача</div>
                <input className="task-name task-name-is-edit" placeholder="Краткое наименование" onChange={(event)=>this.props.changeTaskName(event)}/>
                <input type="date" className="task-name task-name-is-edit" onChange={(event)=>this.props.changeScheduledDate(event)}/>
                <textarea className="task-description task-name-is-edit" placeholder="Описание задачи" onChange={(event)=>this.props.changeTaskDescription(event)}/>
            </div>
        );
    }
}
