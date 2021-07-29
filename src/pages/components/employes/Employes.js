import React, { Component } from "react";
import { getAllUsers } from "../../../api";
import "./Employes.css";
import ImployeItem from "./ImployeItem";


export default class Employes extends Component {
    state = {
        users: [],
        usersFullList: []
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.findString !== this.props.findString) {
            this.setState({
                users: this.state.usersFullList.filter((item)=>(
                    (item.company_division !== null) && item.company_division.toLowerCase().includes(this.props.findString.toLowerCase()) ||
                    (item.company_department !== null) && item.company_department.toLowerCase().includes(this.props.findString.toLowerCase()) ||
                    (item.position !== null) && item.position.toLowerCase().includes(this.props.findString.toLowerCase()) ||
                    (item.email !== null) && item.email.toLowerCase().includes(this.props.findString.toLowerCase()) ||
                    (`${item.user_surname} ${item.user_name} ${item.user_patronymic_name} ${item.user_surname}`).toLowerCase().includes(this.props.findString.toLowerCase()) ||
                    (item.phone_number !== null) && item.phone_number.toLowerCase().includes(this.props.findString.toLowerCase()) 
                    ))
            });
        }
    }
    

    componentDidMount() {
        getAllUsers(localStorage.getItem("token"))
            .then((body) => {
                console.log(body);
                this.setState({
                    users: [...body.values],
                    usersFullList: [...body.values],
                }, () => console.log(this.state.usersFullList));
            })
            .catch((err) => {
                this.props.changeUserStatus(false);
                console.error(err);
            });
            this.props.changeActivePage('Employes')
    }

    render() {
        return (
            <div className="employes-list">
                {this.state.users.map((item) => (
                        <ImployeItem
                            key={item.id}
                            id={item.id}
                            userName={item.user_name}
                            userSurname={item.user_surname}
                            userPatronymicName={item.user_patronymic_name}
                            companyDivision={item.company_division}
                            companyDepartment={item.company_department}
                            email={item.email}
                            avatar={item.avatar}
                            birthDate={item.birth_date}
                            gender={item.gender}
                            position={item.position}
                            registrationDate={item.registration_date}
                            lastActivityTime={item.last_activity_time}
                            phoneNumber={item.phone_number}
                            userRole={item.user_role}
                        />
                ))}
            </div>
        );
    }
}
