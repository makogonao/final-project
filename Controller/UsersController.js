"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const response = require("./../response");
const db = require("../settings/db");
const config = require("./../config");

exports.getAllUsers = (req, res) => {
    
    db.query(
        "select id, user_name, user_surname, user_patronymic_name, company_division, company_department, email, avatar, birth_date, gender, position, registration_date, last_activity_time, phone_number, user_role from `users` ",
        (err, rows, fields) => {
            if (err) {
                response.status(400, err, res);
            } else {
                response.status(200, rows, res);
            }
        }
    );
};

exports.getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    db.query(
        `select id, user_name, user_surname, user_patronymic_name, company_division, company_department, email, avatar, birth_date, gender, position, registration_date, last_activity_time, phone_number, user_role from users where id = '${userId}'`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, err, res);
            } else {
                response.status(200, rows, res);
            }
        }
    );
};

exports.signup = (req, res) => {
    console.log(req.body)
    db.query(
        `SELECT email FROM users WHERE email = '${req.body.email}'`,
        (err, rows, fields) => {
            if (err) {
                response.status(
                    200,
                    {
                        message: `not registred`,
                        error: `Ошибка ввода данных, вероятно заполненны не все обязательные поля.`
                    },
                    res
                );
                console.log(err);
            } else if (typeof rows !== "undefined" && rows.length > 0) {
                const row = JSON.parse(JSON.stringify(rows));
                row.map((userData) => {
                    response.status(
                        200,
                        {
                            message: `not registred`,
                            error: `Пользователь с таким e-mail уже зарегестрирован. `,
                        },
                        res
                    );
                    return true;
                });
            } else {
                const salt = bcrypt.genSaltSync(1);
                const userData = {
                    email:
                        typeof req.body.email !== "undefined"
                            ? `'${req.body.email}'`
                            : "NULL",
                    userName:
                        typeof req.body.userName !== "undefined"
                            ? `'${req.body.userName}'`
                            : "NULL",
                    userSurname:
                        typeof req.body.userSurname !== "undefined"
                            ? `'${req.body.userSurname}'`
                            : "NULL",
                    password:
                        typeof req.body.password !== "undefined"
                            ? `'${bcrypt.hashSync(req.body.password, salt)}'`
                            : "NULL",
                };

                const reqString = `${userData.email}, ${userData.userName}, ${userData.userSurname}, ${userData.password}`;

                const sql = `INSERT INTO users
                (email, user_name, user_surname, password) 
                VALUES
                (${reqString})`;

                db.query(sql, (error, results) => {
                    if (error) {
                        response.status(400, error, res);
                        console.log(req.body)
                    } else {
                        response.status(
                            200,
                            { message: `registered`, email: req.body.email, results },
                            res
                        );
                    }
                });
            }
        }
    );
};

exports.signin = (req, res) => {
    db.query(
        `select id, email, password from users where email = '${req.body.email}'`,
        (err, rows, fields) => {
            if (err) {
                response.status(404, err, res);
            } else if (rows.length <= 0) {
                response.status(200, {
                    message: `User not found`,
                    error: `Пользователь не найден`
                }, res);
            } else {
                const row = JSON.parse(JSON.stringify(rows));
                row.map((rw) => {
                    const password = bcrypt.compareSync(
                        req.body.password,
                        rw.password
                    );
                    if (password) {
                        const token = jwt.sign({userId: rw.id, email: rw.email}, config.jwt, {expiresIn: 120 * 120});

                        response.status(200,{message: "authorized", token: `Bearer ${token}`, userInfo: {id: rw.id, email: rw.email}}, res);
                    } else {
                        response.status(
                            200,
                            {
                                message: `Invalid password`,
                                error: `Неверный пароль`
                            },
                            res
                        );
                    }
                    return true;
                });
            }
        }
    );
};

exports.editProfile = (req, res) => {
    const userId = parseInt(req.params.id);

    db.query(
        `update users
         set 
         ${req.body.parameter} = ${typeof req.body.item !== "undefined" ? `'${req.body.item}'` : "NULL"}
         where id = '${userId}'`,
        (err, rows, fields) => {
            if (err) {
                response.status(400, { message: `error`, err}, res);
            } else {
                req.logout();
                    response.status(200, { message: `successful`}, res);
            }
        }
    );
}