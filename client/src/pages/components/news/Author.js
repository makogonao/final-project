import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUserByID } from "../../../api";

export default class Author extends Component {
    state = {
        user: [],
    };

    componentDidMount() {
        getUserByID(this.props.user_id, localStorage.getItem("token"))
            .then((body) => {
                this.setState({
                    user: body.values[0],
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <div className="news-user-item">
                <div className="news-user-avatar">
                    <Link to={`/main/profile/${this.state.user.id}`}>
                        {this.state.user.avatar !== null ? <img src={this.state.user.avatar} alt="avatar" /> :
                            <div className="header-user-btn transitions">
                                <span className="material-icons">person</span>
                            </div>}
                    </Link>
                </div>
                {/* <div className="news-user-user-name">{this.state.user.user_surname} {this.state.user.user_name}</div> */}
            </div>
        );
    }
}
