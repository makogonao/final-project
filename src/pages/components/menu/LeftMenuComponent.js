import React, { Component } from "react";
import "./MenuComponent.css";
import MenuItem from "./MenuItem";
import {Link} from "react-router-dom";

export default class LeftMenuComponent extends Component {
    state = {
        menuItems: [
            {
                id: 1,
                menuItem: "Моя страница",
                icon: "perm_identity",
                pageName: `Profile-${localStorage.getItem("userId")}`,
                link: `/main/profile/${localStorage.getItem("userId")}`,
                isMainMenuItem: true
            },

            {
                id: 2,
                menuItem: "Сотрудники",
                icon: "groups",
                pageName: "Employes",
                link: "/main/employes",
                isMainMenuItem: true
            },
            
            {   
                id: 3,
                menuItem: "Новости",
                icon: "dvr",
                pageName: "News",
                link: "/main/news",
                isMainMenuItem: true
            },
            
            {   
                id: 4,
                menuItem: "Мессенджер",
                icon: "mail",
                pageName: "Messages",
                link: "/main/messages",
                isMainMenuItem: true
            },
            
            {
                id: 5,
                menuItem: "Оказии",
                icon: "commute",
                pageName: "Bargains",
                link: "/main/bargains",
                isMainMenuItem: true
            },
            
            {
                id: 6,
                menuItem: "Поставка материалов",
                icon: "local_shipping",
                pageName: "Deliveries",
                link: "/main/deliveries",
                isMainMenuItem: true
            },
        ],
        activePage: "news",
    };

    changeActivePage = (item) => {
        this.setState({
            activePage: item,
        });
    };

    render() {
        return (
            <div className="menu-container">
                <ul>
                    {this.state.menuItems.map((item) => (
                        <Link key={item.id} to={item.link}>
                            <MenuItem
                                item={item}
                                changeActiveLink={this.changeActivePage}
                                activeLink={this.state.activePage}
                                isMainMenuItem={item.isMainMenuItem}
                                activePage={this.props.activePage}
                            />
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }
}
