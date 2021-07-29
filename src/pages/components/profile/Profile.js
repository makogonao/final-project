import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { getUserByID,  getNewsByUserID} from "../../../api";
import dayjs from "dayjs";
import moment from "moment";
import "./Profile.css"
import NewsItem from "../news/NewsItem";
import AddPost from "../news/AddPost";

class Profile extends Component {

    state={
        user: [],
        news: [],
        isOpenAddPost: false,
    }

    componentDidMount() {
        this.props.changeActivePage("UserProfile")
        getUserByID(this.props.match.params.id, localStorage.getItem("token"))
            .then((body) => {
                this.setState(
                    {
                        user: body.values[0],
                    }, () => (console.log(this.state.user))
                );
            })
            .catch((err) => {
                console.error(err);
            });
        this.updateNewsList()
        this.props.changeActivePage(`Profile-${localStorage.getItem("userId")}`)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params !== this.props.match.params) {
            getUserByID(this.props.match.params.id, localStorage.getItem("token"))
            .then((body) => {
                this.setState(
                    {
                        user: body.values[0],
                    }, () => (console.log(this.state.user))
                );
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }

    handleAddPostIsOpen = () => {
        this.setState({
            isOpenAddPost: !this.state.isOpenAddPost,
        });
    };

    updateNewsList = () => {
        getNewsByUserID(this.props.match.params.id, localStorage.getItem("token"))
            .then((body) => {
                this.setState(
                    {
                        news: [...body.values.news],
                    },
                    () => console.log(this.state.news)
                );
            })
            .catch((err) => {
                //this.props.changeUserStatus(false);
                console.error(err);
            });
    };

    


    render() {
        return (
            <div className="profile-page">
                <div className="prof-container">
                    <div className="profile-avatar-place">{this.state.user.avatar === null ? <div className="non-avatar">?</div> : <img src={this.state.user.avatar} alt="foto"/>}</div>
                    <div className="profile-list">
                        <div className="user-info-container">
                                <div className="user-full-name">{`${this.state.user.user_surname} ${this.state.user.user_name} ${this.state.user.user_patronymic_name === null ? "" : this.state.user.user_patronymic_name}`}</div>
                            {this.state.user.position !== null && 
                                <div className="parameter-container"><div className="iser-info-parameter">Должность:</div> <div className="user-info-item">{this.state.user.position}</div></div>}
                            {this.state.user.company_department !== null && 
                                <div className="parameter-container"><div className="iser-info-parameter">Подразделение:</div> <div className="user-info-item">{this.state.user.company_department}</div></div>}
                            {this.state.user.company_division !== null && 
                                <div className="parameter-container"><div className="iser-info-parameter">Организация:</div> <div className="user-info-item">{this.state.user.company_division}</div></div>}
                            {this.state.user.email !== null && 
                                <div className="parameter-container"><div className="iser-info-parameter">E-mail:</div> <div className="user-info-item"><a className="transitions" href={`mailto:${this.state.user.email}`}>{this.state.user.email}</a></div></div>}
                            {this.state.user.phone_number !== null && 
                                <div className="parameter-container"><div className="iser-info-parameter">Телефон:</div> <div className="user-info-item">{this.state.user.phone_number}</div></div>}
                            {this.state.user.birth_date !== null && 
                                <div className="parameter-container"><div className="iser-info-parameter">Дата рождения:</div> <div className="user-info-item">{dayjs(this.state.user.birth_date).format("DD.MM.YYYY")}</div></div>}
                        </div>
                    </div>
                </div>

                {this.props.match.params.id === localStorage.getItem("userId") && <div
                    className="transitions news-add-btn"
                    onClick={() => this.handleAddPostIsOpen()}
                >
                    <span className="transitions material-icons">
                        {this.state.isOpenAddPost ? "close" : "add"}
                    </span>
                    <span>
                        {this.state.isOpenAddPost
                            ? "Закрыть форму"
                            : "Добавить новость"}
                    </span>
                </div>}

                {this.state.isOpenAddPost && (
                    <AddPost
                        handleAddPostIsOpen={() => this.handleAddPostIsOpen()}
                        updateNewsList={() => this.updateNewsList()}
                    />
                )}

                {this.state.news.map((item) => (
                    <NewsItem
                        key={item.id}
                        id={item.id}
                        user_id={item.user_id}
                        post_date={item.post_date}
                        post_theme={item.post_theme}
                        post_text={item.post_text}
                        updateNewsList={() => this.updateNewsList()}
                    />
                ))}
            </div>
        )
    }

}

export default withRouter(Profile);


