import React, { Component } from 'react'
import '../HeaderComponent.css'
import {Link} from "react-router-dom";

export default class FindComponent extends Component {

    state={
        findString: "",
    }

    handleInput = (event) => {
        this.setState({
            findString: event.target.value
        }, () => this.props.changeFindString(this.state.findString)
        )
    }

    clearFindString = () => {
        this.setState({
            findString: ""
        }, () => this.props.changeFindString(this.state.findString))
    }

    render() {
        return (
            <div className="header-find">
                <Link to="/main/employes"><input placeholder="поиск по сотрудникам" onChange={(event)=>this.handleInput(event)} onBlur={()=>this.clearFindString()} value={this.state.findString}></input></Link>
                <div className="material-icons search-icon">search</div>
            </div>
        )
    }
}
