import React, { Component } from 'react'
import '../HeaderComponent.css'
import {Link} from "react-router-dom";

export default class FindComponent extends Component {
    render() {
        return (
            <div className="header-find">
                <Link to="/main/employes"><input placeholder="поиск по сотрудникам" onChange={(event) => this.props.changeFindString(event)}></input></Link>
                <div className="material-icons search-icon">search</div>
            </div>
        )
    }
}
