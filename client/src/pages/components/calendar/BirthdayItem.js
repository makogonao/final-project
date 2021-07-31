import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class BirthdayItem extends Component {
    render() {
        return (
            <div className="birthday-item">
                <div className="birthday-avatar"><Link to={`/main/profile/${this.props.id}`}>
                    {this.props.avatar !== null ? <img src={this.props.avatar} alt="avatar" /> :
                            <div className="birthday-user-btn transitions">
                                <span className="material-icons">person</span>
                            </div>}
                    </Link></div>
                <div className="birthday-user-name">{this.props.userSurname} {this.props.userName}</div>
            </div>
        )
    }
}
