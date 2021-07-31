import React, { Component } from 'react'
import dayjs from "dayjs"
import Author from './Author'
import { getUserByID } from "../../../api";
import { Link } from "react-router-dom";
import { editNewByID, archiveNewByID} from "../../../api";

export default class NewsItem extends Component {

    state = {
        isEdit: false,
        post_theme: this.props.post_theme,
        post_text: this.props.post_text,
        post_date: Date(),
        showAlltext:false,
        user: [],
    }

    changeAllTextShow = () => {
        this.setState ({
            showAlltext: !this.state.showAlltext,
        })
    }
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
    handleIsEditStatus = (item) => {
        this.setState({
            isEdit: item,
        });
    };
    saveNew = () => {
        editNewByID(this.props.id, localStorage.getItem("token"), dayjs(this.props.post_date).format("YYYY-MM-DD HH:mm:ss"), this.state.post_theme, this.state.post_text)
        .then((body) => {
            console.log(body.values)
            this.props.updateNewsList()
        })
        .catch((err) => {
            console.error(err);
        });
    }
    archiveNew = () => {
        archiveNewByID(this.props.id, localStorage.getItem("token"))
        .then((body) => {
            console.log(body.values)
            this.props.updateNewsList()
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
    cancelChanges = () => {
        this.setState({
            post_theme: this.props.post_theme,
            post_text: this.props.post_text,
        })
    }

    render() {
        return (

            <div className="news-item">
                <div className="news-header">
                    <Author user_id={this.props.user_id} />
                    {!this.state.isEdit && <div className="news-post-theme">{this.props.post_theme}</div>}
                    {this.state.isEdit && <textarea className="news-post-theme" value={this.state.post_theme} onChange={(event)=>this.changePostTheme(event)}/>}
                </div>

                {!this.state.isEdit && 
                <div className="news-post-text">
                    {this.state.showAlltext ? this.props.post_text : `${this.props.post_text.substr(0, 299)}`}
                    {(this.props.post_text.length >= 300) && "..."}
                    {(this.props.post_text.length >= 300) && <span className="news-links transitions" onClick={this.changeAllTextShow}>{ !this.state.showAlltext ?" читать дальше" : " свернуть"}</span>}
                </div>}

                {this.state.isEdit && <textarea className="news-post-text" value={this.state.post_text}  onChange={(event)=>this.changePostText(event)}/>}


                <div className="news-post-footer">
                    <div className="news-post-footer-author">
                        <span>Автор:</span><Link to={`/main/profile/${this.state.user.id}`}><span className="news-links transitions">{` ${this.state.user.user_surname} ${this.state.user.user_name}`}</span></Link>
                    </div>
                    <div className="news-footer-date-btns">
                        {this.props.user_id === parseInt(localStorage.getItem('userId')) && <div className="news-btns-container">
                            {!this.state.isEdit && (<div className="material-icons item-btn" onClick={() => this.handleIsEditStatus(true)}>edit</div>)}
                            {!this.state.isEdit && (<div className="material-icons item-btn" onClick={() => this.archiveNew()} >delete</div>)}
                            {this.state.isEdit && (<div className="material-icons item-btn" onClick={() => (this.handleIsEditStatus(false), this.saveNew())}>save</div>)}
                            {this.state.isEdit && (<div className="material-icons item-btn" onClick={() =>  (this.handleIsEditStatus(false), this.cancelChanges())}>undo</div>)}
                        </div>}
                        <div className="news-post-footer-date">
                            {dayjs(this.props.post_date).format("DD.MM.YYYY HH:mm")}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
