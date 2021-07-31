import React, { Component } from 'react'
import "./Employes.css";
import { Link } from "react-router-dom";

export default class ImployeItem extends Component {

    render() {
        return (
            <div className="employe-item">
                <div className="avatar-place"><Link to={`/main/profile/${this.props.id}`}>{this.props.avatar === null ? <div className="non-avatar">?</div> : <img src={this.props.avatar} alt="foto"/>}</Link></div>
                <div className="user-info-container">
                            <div className="user-full-name">{`${this.props.userSurname} ${this.props.userName} ${this.props.userPatronymicName === null ? "" : this.props.userPatronymicName}`}</div>
                            {this.props.position !== null && 
                                <div className="parameter-container"><div className="iser-info-parameter">Должность:</div> <div className="user-info-item">{this.props.position}</div></div>}
                        {this.props.companyDepartment !== null && 
                            <div className="parameter-container"><div className="iser-info-parameter">Подразделение:</div> <div className="user-info-item">{this.props.companyDepartment}</div></div>}
                        {this.props.companyDivision !== null && 
                            <div className="parameter-container"><div className="iser-info-parameter">Организация:</div> <div className="user-info-item">{this.props.companyDivision}</div></div>}
                        {this.props.email !== null && 
                            <div className="parameter-container"><div className="iser-info-parameter">E-mail:</div> <div className="user-info-item"><a className="transitions" href={`mailto:${this.props.email}`}>{this.props.email}</a></div></div>}
                        {this.props.phoneNumber !== null && 
                            <div className="parameter-container"><div className="iser-info-parameter">Телефон:</div> <div className="user-info-item">{this.props.phoneNumber}</div></div>}
                </div>
            </div>
        )
    }
}
