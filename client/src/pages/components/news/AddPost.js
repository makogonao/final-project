import React, { Component } from 'react'
import dayjs from "dayjs"
import Author from './Author'
import { getUserByID } from "../../../api";
import { Link } from "react-router-dom";
import { addNewPost } from "../../../api";

export default class AddPost extends Component {

    state = {
        nowDate: Date(),
        user_id: localStorage.getItem('userId'),
        post_date: dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"),
        post_theme: this.props.post_theme,
        isValid: false,
        post_text: this.props.post_text,
        showAlltext:false,
        user: [],
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                nowDate: Date(),
                post_date: dayjs(Date()).format("YYYY-MM-DD HH:mm:ss"),
            })
        }, 1000)

        getUserByID(this.state.user_id, localStorage.getItem("token"))
        .then((body) => {
            this.setState({
                user: body.values[0],
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    changePostTheme = (event) => {
        this.setState({
            post_theme: event.target.value,
        })
    }
    
    changePostText = (event) => {
        this.setState({
            post_text: event.target.value,
        })
    }

    savePost = () => {
        addNewPost(localStorage.getItem("userId"), localStorage.getItem("token"), this.state.post_date, this.state.post_theme, this.state.post_text)
        .then((body) => {
            console.log(body.values)
        })
        .catch((err) => {
            console.error(err);
        });
        this.props.updateNewsList()
    }
    

    render() {
        return (
            <div>
                <div className="news-item">
                <div className="news-header">
                    <label style={{width: "100%"}}>
                        Тема:
                        {<textarea className="news-post-theme" value={this.state.post_theme} onChange={(event) => this.changePostTheme(event)}/>}
                    </label>
                </div>
                    <label>
                        Новость:
                        <textarea className="news-post-text" value={this.state.post_text} onChange={(event)=> this.changePostText(event)}/>
                    </label>
                <div className="news-post-footer">
                    <div className="news-post-footer-author">
                        <span>Автор:</span><Link to={`/main/profile/${this.state.user.id}`}><span className="news-links transitions">{` ${this.state.user.user_surname} ${this.state.user.user_name}`}</span></Link>
                    </div>
                    <div className="news-footer-date-btns">
                        <div className="news-btns-container">
                            <div className="material-icons item-btn" onClick={() => (this.savePost(), this.props.handleAddPostIsOpen())}>save</div>
                            <div className="material-icons item-btn" onClick={() =>  this.props.handleAddPostIsOpen()}>close</div>
                        </div>
                        <div className="news-post-footer-date">
                            {dayjs(this.state.nowDate).format("DD.MM.YYYY HH:mm")}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
