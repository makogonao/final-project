import React, { Component } from "react";

export default class MenuItem extends Component {
    render() {
        return (
            <li
                className={`transitions ${this.props.item.isMainMenuItem ?
                    this.props.item.pageName === this.props.activePage && "active-menu-item":
                    this.props.item === this.props.activeLink && "active-menu-item"
                }`}
                onClick={() => {
                    this.props.changeActiveLink(this.props.item);
                }}
            >
                <span className="material-icons">{this.props.item.icon}</span>
                <span>{this.props.item.menuItem}</span>
            </li>
        );
    }
}
