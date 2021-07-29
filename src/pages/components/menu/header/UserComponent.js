import React, { Component } from "react";
import "../HeaderComponent.css";
import {Link} from "react-router-dom";

export default class UserComponent extends Component {

    state = {
        visible: false,
        userName: this.props.user.user_name,
    }

    hideMenu = () => {
        this.setState({
            visible: false,
        })
    }

    showMenu = () => {
        this.setState({
            visible: true,
        })
    }

    render() {
        return (
            <div className="header-user-btn-place">
                <div onMouseOver={()=>this.showMenu()} onMouseOut={()=>this.hideMenu()} className="header-user-btn transitions">
                    <span className="material-icons">person</span>
                    <div className={`profile-menu ${!this.state.visible && "none"}`}>
                        <ul>
                            <Link onClick={()=>this.hideMenu()} to="/main/edit-profile"><li><span className="material-icons">manage_accounts</span>Профиль</li></Link>
                            <li onClick={() => (this.props.changeUserStatus(false), localStorage.clear())}><span className="material-icons">logout</span>Выйти</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
