import React, { Component } from "react";
import "./News.css";
import { getAllNews } from "../../../api";
import NewsItem from "./NewsItem";
import AddPost from "./AddPost";

export default class News extends Component {
    state = {
        news: [],
        isOpenAddPost: false,
    };

    componentDidMount() {
        this.props.changeActivePage("News");
        this.updateNewsList();
    }

    handleAddPostIsOpen = () => {
        this.setState({
            isOpenAddPost: !this.state.isOpenAddPost,
        });
    };

    updateNewsList = () => {
        getAllNews(localStorage.getItem("token"))
            .then((body) => {
                this.setState(
                    {
                        news: [...body.values.news],
                    },
                    () => console.log(this.state.news)
                );
            })
            .catch((err) => {
                this.props.changeUserStatus(false);
                console.error(err);
            });
    };

    render() {
        return (
            <div className="transitions news-container">
                <div
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
                </div>
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
        );
    }
}
