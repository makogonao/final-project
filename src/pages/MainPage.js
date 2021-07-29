import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./Main.css";
import { getUserByID } from "../api";
import LeftMenuComponent from "./components/menu/LeftMenuComponent";
import RightMenuComponent from "./components/menu/RightMenuComponent";
import HeaderComponent from "./components/menu/HeaderComponent";
import Bargains from "./components/bargains/Bargains";
import News from "./components/news/News";
import Deliveries from "./components/deliveries/Deliveries";
import Employes from "./components/employes/Employes";
import Messages from "./components/messages/Messages";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/editProfile/EditProfile";

export default class MainPage extends Component {
    state = {
        isAuthorised: localStorage.getItem("authorized") === "true",
        userId: localStorage.getItem("userId"),
        user: {},
        activePage: "",
        findString: "",
    };

    changeFindString = (event) => {
        this.setState({
            findString: event.target.value,
        }, () => console.log(this.state.findString))
    }

    changeActivePage = (pageName) => {
        this.setState(
            {
                activePage: pageName,
            },
            () => console.log(this.state.activePage)
        );
    };

    changeUserStatus = (status) => {
        this.setState({
            isAuthorised: status,
        });
    };

    componentDidMount() {
        this.setState({
            isAuthorised: localStorage.getItem("authorized") === "true",
            userId: localStorage.getItem("userId"),
        });
        this.updateUserInfo();
    }

    updateUserInfo = () => {
        getUserByID(
            localStorage.getItem("userId"),
            localStorage.getItem("token")
        )
            .then((body) => {
                this.setState(
                    {
                        user: body.values[0],
                    }
                    //console.log(body.values[0])
                );
            })
            .catch((err) => {
                console.error(err);
            });
    };

    render() {
        if (!this.state.isAuthorised) {
            return <Redirect to="/auth" />;
        } else {
            return (
                <main>
                    <aside className="left-aside">
                        <LeftMenuComponent activePage={this.state.activePage} />
                    </aside>
                    <section>
                        <div className="header-container">
                            <HeaderComponent
                                changeFindString={(event) => this.changeFindString(event)}
                                changeUserStatus={this.changeUserStatus}
                                user={this.state.user}
                            />
                        </div>
                        <div className="page-container scroll-bar">
                            {this.state.activePage === "" && (
                                <div className="say-hello">
                                    Добро пожаловать,{" "}
                                    {this.state.user.user_name}!
                                </div>
                            )}
                            <Route path="/main/bargains" exact>
                                <Bargains
                                    changeUserStatus={this.changeUserStatus}
                                    changeActivePage={this.changeActivePage}
                                />
                            </Route>

                            <Route path="/main/news">
                                <News
                                    changeUserStatus={this.changeUserStatus}
                                    changeActivePage={this.changeActivePage}
                                />
                            </Route>

                            <Route path="/main/employes">
                                <Employes
                                    changeUserStatus={this.changeUserStatus}
                                    changeActivePage={this.changeActivePage}
                                    findString={this.state.findString}
                                />
                            </Route>

                            <Route path="/main/deliveries">
                                <Deliveries
                                    changeUserStatus={this.changeUserStatus}
                                    changeActivePage={this.changeActivePage}
                                />
                            </Route>

                            <Route path="/main/messages">
                                <Messages
                                    changeUserStatus={this.changeUserStatus}
                                    changeActivePage={this.changeActivePage}
                                />
                            </Route>

                            <Route path="/main/edit-profile">
                                <EditProfile
                                    updateUserInfo={this.updateUserInfo}
                                    changeUserStatus={this.changeUserStatus}
                                    changeActivePage={this.changeActivePage}
                                    user={this.state.user}
                                />
                            </Route>
                            <Route path="/main/profile/:id">
                                <Profile
                                    changeActivePage={this.changeActivePage}
                                    changeUserStatus={this.changeUserStatus}
                                />
                            </Route>
                        </div>
                    </section>

                    <aside className="right-aside">
                        <RightMenuComponent
                            changeUserStatus={this.changeUserStatus}
                        />
                    </aside>
                </main>
            );
        }
    }
}
